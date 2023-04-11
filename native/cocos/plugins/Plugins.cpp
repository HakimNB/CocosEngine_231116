/****************************************************************************
 Copyright (c) 2022-2023 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
****************************************************************************/
#include "Plugins.h"
#include "java/jni/JniHelper.h"
#include "plugins/Plugins.h"

#include "base/Log.h"

#include <dlfcn.h>
#include <string.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <memory>

#include "cocos/platform/java/jni/JniImp.h"

#if !CC_USE_PLUGINS
extern "C" void cc_load_all_plugins() { // NOLINT
}
#endif

static void get_directory_from_path(const char *filepath, char *dirpath, size_t dirpath_size) { // NOLINT
    const char *lastSlash = strrchr(filepath, '/');
    if (lastSlash) {
        size_t length = lastSlash - filepath;
        snprintf(dirpath, dirpath_size, "%.*s", static_cast<int>(length), filepath);
    } else {
        strncpy(dirpath, ".", dirpath_size);
    }
}

namespace {
class PluginInst final {
public:
    enum class State {
        UNINITED,
        INITIALIZED,
        DEINITED,
    };
    PluginInst(const char *path, void *lib, const ccstd::vector<ccstd::string> &args);
    ~PluginInst();
    void init();
    void deinit();

private:
    State _state = State::UNINITED;
    std::string _path;
    void *_handle{nullptr};
    CC_PLUGIN_INIT_FN _init;
    CC_PLUGIN_DEINIT_FN _deinit;
    std::vector<std::string> _args;
    std::vector<const char *> _argp;
};

PluginInst::PluginInst(const char *path, void *lib, const ccstd::vector<ccstd::string> &args) {
    _path = path;
    _handle = lib;
    _init = reinterpret_cast<CC_PLUGIN_INIT_FN>(dlsym(_handle, CC_PLUGIN_INIT_SYM));
    _deinit = reinterpret_cast<CC_PLUGIN_DEINIT_FN>(dlsym(_handle, CC_PLUGIN_DEINIT_SYM));
    _argp.emplace_back(_path.c_str());
    _args = args;
    for (auto &a : _args) {
        _argp.push_back(_args.back().c_str());
    }
}

PluginInst::~PluginInst() {
    if (_state == State::INITIALIZED) {
        deinit();
    }
}

void PluginInst::init() {
    if (_init && _state == State::UNINITED) {
        _init(static_cast<int>(_argp.size()), _argp.data());
        _state = State::INITIALIZED;
    }
}

void PluginInst::deinit() {
    if (_deinit && _state == State::INITIALIZED) {
        _deinit(static_cast<int>(_argp.size()), _argp.data());
        _state = State::DEINITED;
    }

    if (_handle) {
        dlclose(_handle);
        _handle = nullptr;
    }
}

using Map = std::unique_ptr<std::unordered_map<std::string, std::unique_ptr<PluginInst>>>;

Map pluginMap;

Map &getPluginStorage() {
    if (!pluginMap) {
        pluginMap = std::make_unique<Map::element_type>();
    }
    return pluginMap;
}

} // namespace

int cc_load_dyn_plugin(const char *srcPath, const ccstd::vector<ccstd::string> &args) {
    struct stat libstat;
    auto &plugins = getPluginStorage();
    auto itr = plugins->find(srcPath);

    if (itr != plugins->end()) {
        CC_LOG_INFO("Dynamic library '%s' already loaded", srcPath);
        return 1;
    }

    int finfo = lstat(srcPath, &libstat);
    if (finfo) {
        CC_LOG_ERROR("Dynamic library '%s' not found, error: %s ", srcPath, strerror(errno));
        return 1;
    }

    std::string pathToLoad;
    if ((libstat.st_mode & S_IXUSR) == 0) {
        pathToLoad = cc::copyToLibFile(srcPath);
    } else {
        pathToLoad = srcPath;
    }
    CC_LOG_INFO("Copy file %s to %s", srcPath, pathToLoad.c_str());

    void *handle = dlopen(pathToLoad.c_str(), RTLD_NOW);

    if (handle == nullptr) {
        CC_LOG_ERROR("Failed to load dynamic library '%s', error: %s ", pathToLoad.c_str(),
                     strerror(errno));
        return 1;
    }

    char parentdir[256] = {0};
    get_directory_from_path(srcPath, parentdir, sizeof(parentdir));
    auto &plugin = (*plugins)[srcPath] = std::make_unique<PluginInst>(parentdir, handle, args);
    plugin->init();

    CC_LOG_INFO("Load library '%'", srcPath);
    return 0;
}

int cc_unload_dyn_plugin(const char *srcPath) {
    auto &plugins = getPluginStorage();
    auto itr = plugins->find(srcPath);
    if (itr == plugins->end()) {
        CC_LOG_ERROR("Plugin not loaded: %s", srcPath);
        return -1;
    }
    auto &plugin = (*plugins)[srcPath];
    plugin->deinit();
    plugins->erase(itr);
    return 0;
}

int cc_unload_all_dyn_plugins() {
    auto &plugins = getPluginStorage();
    for (auto &p : *plugins) {
        p.second->deinit();
    }
    plugins->clear();
    return 0;
}