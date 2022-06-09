const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const { filter } = require('async');
const version_parser = require('./plugin_support/plugin_cfg');

const MAX_SEARCH_LEVEL = 5;
const CC_PLUGIN_JSON_STR = 'cc_plugin.json';

const node_path = process.argv.shift();
const script_path = process.argv.shift();
const search_path_input_file = process.argv.shift();
const plugin_cmake_output_file = process.argv.shift();
const PLATFORM_NAME_FROM_CMAKE = process.argv.shift();

const PROJ_SEARCH_PATHS = fs.readFileSync(search_path_input_file, 'utf8').
    split('\n').
    map(x => x.trim()).
    filter(x => x.length > 0 && !x.startsWith("#"));

const cc_config_json_list = [];

function search_cc_config_json_levels(dir, depth) {
    console.log(`[searching plugins] search dir ${dir}`);
    if (depth > MAX_SEARCH_LEVEL) return;
    const st = fs.statSync(dir);
    if (!st.isDirectory()) return;

    let subfiles = fs.readdirSync(dir);
    let subdirs = [];
    for (let item of subfiles) {
        if (item === "." || item === "..") continue;
        let fp = path.join(dir, item);
        const subst = fs.statSync(fp);
        if (subst.isFile() && item === CC_PLUGIN_JSON_STR) {
            cc_config_json_list.push(dir);
            return;
        }
        if (subst.isDirectory()) {
            subdirs.push(fp);
        }
    }
    for (let sd of subdirs) {
        search_cc_config_json_levels(sd, depth + 1);
    }
}

for (let searchPath of PROJ_SEARCH_PATHS) {
    if (!fs.existsSync(searchPath)) {
        console.warn(`[searching plugins] directory ${searchPath} does not exist`);
        continue;
    }
    search_cc_config_json_levels(searchPath, 1);
}


if (cc_config_json_list.length === 0) {
    console.warn("[searching plugins] no plugins found!");
    process.exit(0)
}

for (let dir of cc_config_json_list) {
    console.log(`[searching plugins]   plugin dir found: ${dir}`)
}

function read_engine_version() {
    const pkg = path.join(__dirname, '../../../package.json');
    return require(pkg).version;
}

function parse_package_dependency(info) {
    let pkgs = [];
    for (let m of info.modules) {
        if (m.platforms && m.platforms.indexOf(PLATFORM_NAME_FROM_CMAKE) < 0) {
            continue;
        }
        pkgs.push({ target: m.target, depends: m.depends || [] });
    }
    return pkgs;
}

function get_property_variants(obj, ...names) {
    for (let n of names) {
        if (obj.hasOwnProperty(n)) {
            return obj[n];
        }
        if (n.indexOf('_') >= 0) {
            const k = n.replace(/_/g, '-');
            if (obj.hasOwnProperty(k)) {
                return obj[k];
            }
        }
        if (n.indexOf('-') >= 0) {
            const k = n.replace(/-/g, '_');
            if (obj.hasOwnProperty(k)) {
                return obj[k];
            }
        }
    }
    return undefined;
}


function find_files_in_dir_recursive(depth, possible_names, dir, results) {
    if (depth > MAX_SEARCH_LEVEL) {
        return;
    }
    if(!fs.existsSync(dir)) {
        console.warn(`  [error] '${dir}' does not exist`)
        return;
    }
    let list = fs.readdirSync(dir);
    let dstFiles = possible_names.map(x => path.join(dir, x)).filter(f => {
        return fs.existsSync(f);
    });
    if (dstFiles.length > 0) {
        results.push(...dstFiles);
    }
    for (let e of list) {
        if (e.startsWith('.')) continue;
        let p = path.join(dir, e);
        let st = fs.statSync(p);
        if (st.isDirectory()) {
            find_files_in_dir_recursive(depth + 1, possible_names, p, results);
        }
    }
}

/**
 * Search *-config.cmake
 * @param {*} libs 
 * @param {*} dir 
 * @returns Directories which contains *-config.cmake
 */
function search_config_for_cmake(libs, dir) {
    let config_directories = [];
    for (let lib of libs) {
        const cmake_dirs = [];
        const raw_lib_name = lib.split(/@/)[0];
        const possible_names = [`${raw_lib_name}-config.cmake`, `${raw_lib_name}Config.cmake`];
        find_files_in_dir_recursive(0, possible_names, dir, cmake_dirs);
        const cfgDirs = cmake_dirs.map(x => path.resolve(path.dirname(x)));
        if (cmake_dirs.length > 1) {
            console.warn(`multiple ${raw_lib_name}-config.cmake found`);
            console.warn(cmake_dirs);
        }
        if (cmake_dirs.length > 0) {
            config_directories.push({ name: `${raw_lib_name}_DIR`, path: cfgDirs[0] });
        }
    }
    return config_directories;
}

function test_enable_by_configurations(config) {
    const support_platforms = get_property_variants(config, "platforms") || [];
    const disable_all = get_property_variants(config, "disable", "disabled") || false;
    const disabled_platforms = get_property_variants(config, "disable-by-platforms", "disabled-by-platforms") || [];
    const engine_version_value = get_property_variants(config, "engine-version");
    if (disable_all) {
        // all disabled 
        console.log(`plugin is disabled.`);
        return false;
    }
    if (support_platforms.length > 0 && support_platforms.indexOf(PLATFORM_NAME_FROM_CMAKE) < 0) {
        // unsupported platform
        console.log(`plugin is not supported by current platform ${PLATFORM_NAME_FROM_CMAKE}.`);
        return false;
    }
    if (disabled_platforms.indexOf(PLATFORM_NAME_FROM_CMAKE) > -1) {
        // disable by user settings
        console.log(`plugin is disabled by setting.`);
        return false;
    }

    const ENGINE_VERSION = read_engine_version().replace(/^(v|V)/, '');
    try {
        const version_filter = version_parser.parse(engine_version_value);
        const version_valid = version_filter.match(ENGINE_VERSION);
        if (!version_valid) {
            console.warn(`Engine version '${ENGINE_VERSION}' mismatch '${engine_version_value}'`);
        }
    } catch (e) {
        console.error(`Failed to parse 'engine-version', value: '${engine_version_value}'`);
        console.error(e);
        return false;
    }
    return true;
}

function validate_cc_plugin_json_format(tag, content) {
    const field_required = (obj, field_name) => {
        if (Object.hasOwnProperty(obj, field_name)) {
            console.warn(`${tag} field '${field_name}' is not set`);
            return false;
        }
        return true;
    }
    const required_fields = ["name", "version", "engine-version", "author", "description", "modules", "platforms"];
    for (const f of required_fields) {
        if (!field_required(content, f)) {
            return false;
        }
    }
    const modules = content["modules"];
    if (modules.length == 0) {
        console.warn(`${tag} modules field is empty`);
        return false;
    }

    for (let m of modules) {
        const mod_fields = ["target"];
        for (const f of mod_fields) {
            if (!field_required(m, f)) {
                console.warn(`${tag} module field ${f} is not set`);
                return false;
            }
        }
    }
    return true;
}

console.log(`Engine version: ${read_engine_version()}`);

/// Generate Pre-AutoLoadPlugins.cmake

let output_lines = ["# plugins found & enabled in search path", "", ""];
for (let plugin_dir of cc_config_json_list) {
    let load_plugins = [];
    let plugin_search_path = {};
    try {
        let maybe_plugin_name = path.basename(plugin_dir);
        console.log(`Parsing plugin directory ${maybe_plugin_name}`);
        let cc_plugin_file = path.join(plugin_dir, CC_PLUGIN_JSON_STR);
        let cc_plugin_content = fs.readFileSync(cc_plugin_file, { encoding: 'utf8' });
        let cc_plugin_json = JSON.parse(cc_plugin_content);
        if (!validate_cc_plugin_json_format(`Parsing module ${maybe_plugin_name}:`, cc_plugin_json)) {
            continue;
        }
        if (!test_enable_by_configurations(cc_plugin_json)) {
            console.warn(` ${maybe_plugin_name} disabled by configuration`);
            continue;
        }
        const packages = parse_package_dependency(cc_plugin_json);
        const platform_plugin_dir = path.join(plugin_dir, PLATFORM_NAME_FROM_CMAKE);
        const cc_project_dir = path.dirname(plugin_cmake_output_file);
        let project_to_plugin_dir = path.relative(cc_project_dir, plugin_dir).replace(/\\/g, '/');
        project_to_plugin_dir = `\${CC_PROJECT_DIR}/${project_to_plugin_dir}`;
        for (let pkg of packages) {
            let cmake_configs = search_config_for_cmake([pkg.target, ...pkg.depends], platform_plugin_dir);
            if (cmake_configs.length > 0) {
                for (const cfg of cmake_configs) {
                    const relocate = path.relative(cc_project_dir, cfg.path).replace(/\\/g, '/');
                    output_lines.push(`set(${cfg.name} "\${CC_PROJECT_DIR}/${relocate}")`);
                }
            }
            load_plugins = load_plugins.concat([...pkg.depends, pkg.target]);
            output_lines.push(`list(APPEND CC_LOADED_PLUGINS`);
            output_lines = output_lines.concat(`  ${pkg.target}`);
            output_lines.push(`)`);
        }
        let search_path = `${project_to_plugin_dir}/${PLATFORM_NAME_FROM_CMAKE}`;
        let plugin_names = load_plugins.map(x => x.split(/@/));
        for (let plg of plugin_names) {
            output_lines.push("");
            if (plg[1]) {
                output_lines.push(`find_package(${plg[0]} ${plg[1]}`);
            } else {
                output_lines.push(`find_package(${plg[0]}`);
            }
            output_lines.push(`  NAMES "${plg[0]}"`);
            output_lines.push(`  PATHS "${search_path}"`);
            output_lines.push(`  NO_DEFAULT_PATH`);
            output_lines.push(`)`);
        }
        if (packages.length > 0) {
            console.log(` record plugin ${maybe_plugin_name}`);
        } else {
            console.warn(` no sub module found`);
        }
    } catch (e) {
        console.error(`Parsing plugin directory: ${plugin_dir}`)
        console.error(e);
    }
}

if (cc_config_json_list.length == 0) {
    console.log(`Try unlink file ${out_file}`)
    if (fs.existsSync(out_file)) {
        fs.unlinkSync(out_file);
    }
} else {
    fs.writeFileSync(plugin_cmake_output_file, output_lines.join("\n") + "\n", { encoding: 'utf8' });
}
