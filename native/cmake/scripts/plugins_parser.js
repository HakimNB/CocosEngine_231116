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
        console.error(`[searching plugins] directory ${searchPath} does not exist`);
        continue;
    }
    search_cc_config_json_levels(searchPath, 1);
}


if (cc_config_json_list.length === 0) {
    console.warn("[searching plugins] no plugins found!");
    process.exit(0)
}

for (let dir of cc_config_json_list) {
    console.log(`[searching plugins] locate dir: ${dir}`)
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

function search_config_for_cmake(libs, dir) {
    let config_directories = [];
    for (let lib of libs) {
        const cmake_dirs = [];
        const raw_lib_name = lib.split(':')[0];
        const possible_names = [`${raw_lib_name}-config.cmake`, `${raw_lib_name}Config.cmake`];
        find_files_in_dir_recursive(0, possible_names, dir, cmake_dirs);
        const cfgDirs = cmake_dirs.map(x => path.resolve(path.dirname(x)));
        if (cmake_dirs.length > 1) {
            console.error(`multiple ${raw_lib_name}-config.cmake found`);
            console.error(cmake_dirs);
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
        return false;
    }
    if (support_platforms.length > 0 && support_platforms.indexOf(PLATFORM_NAME_FROM_CMAKE) < 0) {
        // unsupported platform
        return false;
    }
    if (disabled_platforms.indexOf(PLATFORM_NAME_FROM_CMAKE) > -1) {
        // disable by user settings
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

console.log(`engine version ${read_engine_version()}`);

const output_lines = ["# plugins found & enabled in search path"];
for (let plugin_dir of cc_config_json_list) {
    try {
        let cc_plugin_file = path.join(plugin_dir, CC_PLUGIN_JSON_STR);
        let cc_plugin_content = fs.readFileSync(cc_plugin_file, { encoding: 'utf8' });
        let cc_plugin_json = JSON.parse(cc_plugin_content);
        if (!test_enable_by_configurations(cc_plugin_json)) {
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
            // console.log(pkg);
            output_lines.push(`cc_load_plugin(TARGET ${pkg.target} ${pkg.depends.length > 0 ? "DEPENDS " + pkg.depends.map(x => `"${x}"`).join(" ") : ""} PATHS "${project_to_plugin_dir}/${PLATFORM_NAME_FROM_CMAKE}")`)
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
