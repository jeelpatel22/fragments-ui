// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  function $parcel$resolve(url) {  url = importMap[url] || url;  return import.meta.resolve(distDir + url);}newRequire.resolve = $parcel$resolve;

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"7wZbQ":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "9440bf780f77c784";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"2R06K":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _auth = require("./auth");
var _api = require("./api");
var _dbJs = require("./db.js");
var _dbJsDefault = parcelHelpers.interopDefault(_dbJs);
var _swRegisterJs = require("./sw-register.js");
// PWA and offline support
let isOnline = navigator.onLine;
let offlineActions = [];
let syncInProgress = false;
const conversionTargets = {
    'text/plain': [
        'text/plain'
    ],
    'text/markdown': [
        'text/markdown',
        'text/html',
        'text/plain'
    ],
    'text/html': [
        'text/html',
        'text/plain'
    ],
    'text/csv': [
        'text/csv',
        'text/plain',
        'application/json'
    ],
    'application/json': [
        'application/json',
        'application/yaml',
        'text/plain'
    ],
    'application/yaml': [
        'application/yaml',
        'text/plain'
    ],
    'image/png': [
        'image/png',
        'image/jpeg',
        'image/webp',
        'image/avif'
    ],
    'image/jpeg': [
        'image/png',
        'image/jpeg',
        'image/webp',
        'image/avif'
    ],
    'image/webp': [
        'image/png',
        'image/jpeg',
        'image/webp',
        'image/avif'
    ],
    'image/gif': [
        'image/png',
        'image/jpeg',
        'image/webp',
        'image/avif'
    ],
    'image/avif': [
        'image/png',
        'image/jpeg',
        'image/webp',
        'image/avif'
    ]
};
function getExtensionForType(type) {
    const parts = type.split('/');
    if (parts[0] === 'image') return parts[1];
    if (parts[0] === 'text' && parts[1] === 'plain') return 'txt';
    if (parts[0] === 'text' && parts[1] === 'markdown') return 'md';
    if (parts[0] === 'text' && parts[1] === 'html') return 'html';
    if (parts[0] === 'text' && parts[1] === 'csv') return 'csv';
    if (parts[0] === 'application' && parts[1] === 'json') return 'json';
    if (parts[0] === 'application' && parts[1] === 'yaml') return 'yaml';
    return '';
}
// Enhanced conversion mapping that matches backend exactly
function getConversionExtension(sourceType, targetType) {
    // Handle image conversions
    if (sourceType.startsWith('image/')) {
        if (targetType === 'image/png') return 'png';
        if (targetType === 'image/jpeg') return 'jpg';
        if (targetType === 'image/webp') return 'webp';
        if (targetType === 'image/avif') return 'avif';
        return '';
    }
    // Handle text conversions - only allow supported conversions
    if (sourceType.startsWith('text/')) {
        if (targetType === 'text/plain') return 'txt';
        if (targetType === 'text/markdown') return 'md';
        if (targetType === 'text/html') return 'html';
        if (targetType === 'text/csv') return 'csv';
        if (targetType === 'application/json') return 'json';
        if (targetType === 'application/yaml') return 'yaml';
        return '';
    }
    // Handle application conversions - only allow supported conversions
    if (sourceType.startsWith('application/')) {
        if (targetType === 'application/json') return 'json';
        if (targetType === 'application/yaml') return 'yaml';
        if (targetType === 'text/plain') return 'txt';
        // Remove unsupported conversions
        return '';
    }
    return '';
}
// PWA Offline Support Functions
function updateOfflineStatus() {
    const offlineIndicator = document.getElementById('offline-indicator');
    const onlineStatus = document.getElementById('online-status');
    const offlineStatus = document.getElementById('offline-status');
    const offlineWarning = document.getElementById('offline-warning');
    if (isOnline) {
        document.body.classList.remove('offline');
        if (offlineIndicator) offlineIndicator.classList.add('hidden');
        if (offlineWarning) offlineWarning.classList.add('hidden');
        if (onlineStatus) onlineStatus.classList.remove('hidden');
        if (offlineStatus) offlineStatus.classList.add('hidden');
    } else {
        document.body.classList.add('offline');
        if (offlineIndicator) offlineIndicator.classList.remove('hidden');
        if (offlineWarning) offlineWarning.classList.remove('hidden');
        if (onlineStatus) onlineStatus.classList.add('hidden');
        if (offlineStatus) offlineStatus.classList.remove('hidden');
    }
}
async function addOfflineAction(action) {
    try {
        console.log("\uD83D\uDD04 Adding offline action:", action);
        await (0, _dbJsDefault.default).addOfflineAction(action);
        offlineActions.push(action);
        console.log("\u2705 Action queued for offline sync:", action);
        // Debug: check if action was actually stored
        const storedActions = await (0, _dbJsDefault.default).getOfflineActions();
        console.log("\uD83D\uDCCB Current offline actions after adding:", storedActions);
    } catch (error) {
        console.error("\u274C Failed to queue offline action:", error);
    }
}
async function syncOfflineActions() {
    if (syncInProgress) {
        console.log('Sync already in progress, skipping...');
        return;
    }
    // Check if we have offline actions first
    const actions = await (0, _dbJsDefault.default).getOfflineActions();
    console.log("\uD83D\uDD0D Found offline actions:", actions);
    if (actions.length === 0) {
        console.log('No offline actions to sync');
        return;
    }
    console.log(`\u{1F680} Starting offline sync for ${actions.length} actions...`);
    console.log("\uD83D\uDCE1 Current online status:", isOnline);
    syncInProgress = true;
    try {
        for (const action of actions)try {
            console.log(`Processing action: ${action.type}`, action);
            let actionSuccessful = false;
            switch(action.type){
                case 'CREATE':
                    await (0, _api.createFragment)(action.data.content, action.data.type);
                    actionSuccessful = true;
                    break;
                case 'UPDATE':
                    await (0, _api.updateFragment)(action.data.id, action.data.content, action.data.type);
                    actionSuccessful = true;
                    break;
                case 'DELETE':
                    try {
                        await (0, _api.deleteFragment)(action.data.id);
                        actionSuccessful = true;
                    } catch (deleteError) {
                        // Special handling for DELETE actions that get 404
                        if (deleteError.status === 404 || deleteError.message && deleteError.message.includes('404')) {
                            console.log(`\u{2705} Fragment already deleted (404) - marking DELETE action as successful`);
                            actionSuccessful = true; // Fragment is already gone, so DELETE action succeeded
                        } else throw deleteError; // Re-throw other errors
                    }
                    break;
            }
            if (actionSuccessful) {
                await (0, _dbJsDefault.default).removeOfflineAction(action.id);
                console.log(`\u{2705} Successfully synced action: ${action.type}`);
            }
        } catch (error) {
            console.error(`\u{274C} Failed to sync action: ${action.type}`, action, error);
            // Check if this is a retryable error
            const isRetryable = !(error.status === 404) && !error.message?.includes('404') && !error.message?.includes('Not Found');
            if (isRetryable && action.retryCount < 3) {
                action.retryCount = (action.retryCount || 0) + 1;
                console.log(`Retrying action ${action.type} (attempt ${action.retryCount})`);
                // Remove the old action first to avoid IndexedDB constraint errors
                try {
                    await (0, _dbJsDefault.default).removeOfflineAction(action.id);
                    await (0, _dbJsDefault.default).addOfflineAction(action);
                } catch (dbError) {
                    console.error(`Failed to update retry count for action ${action.type}:`, dbError);
                    // If we can't update the retry count, just remove the action
                    await (0, _dbJsDefault.default).removeOfflineAction(action.id);
                }
            } else {
                console.log(`Action ${action.type} failed - removing from queue (not retryable or max retries reached)`);
                await (0, _dbJsDefault.default).removeOfflineAction(action.id);
            }
        }
        console.log("\uD83C\uDF89 Offline sync completed");
    } catch (error) {
        console.error("\uD83D\uDCA5 Offline sync failed:", error);
    } finally{
        syncInProgress = false;
    }
}
async function renderFragments() {
    console.log('Available conversion targets:', conversionTargets);
    const fragmentsList = document.getElementById('fragments-list');
    fragmentsList.innerHTML = '';
    try {
        let fragments = [];
        if (isOnline) // Try to get fragments from API
        try {
            const response = await (0, _api.listFragments)(true);
            fragments = response.data?.fragments || response.fragments || [];
            // Cache fragments locally
            for (const fragment of fragments)await (0, _dbJsDefault.default).saveFragment(fragment);
        } catch (error) {
            console.log('API failed, using cached fragments');
            fragments = await (0, _dbJsDefault.default).getAllFragments();
        }
        else // Offline mode - use cached fragments
        fragments = await (0, _dbJsDefault.default).getAllFragments();
        if (fragments.length === 0) {
            fragmentsList.innerHTML = '<li>No fragments found.</li>';
            return;
        }
        // Store fragments globally for access in event handlers
        window.currentFragments = fragments;
        fragments.forEach((fragment)=>{
            const li = document.createElement('li');
            // Parse the fragment type correctly, handling both full type and mimeType
            let type = fragment.type;
            if (type && type.includes(';')) // Handle types like "text/plain; charset=utf-8"
            type = type.split(';')[0].trim();
            const targets = conversionTargets[type] || [];
            console.log('Fragment type:', fragment.type, 'Parsed type:', type, 'Available targets:', targets);
            // Generate dropdown options manually to ensure they're created
            let dropdownOptions = '';
            if (targets && targets.length > 0) {
                targets.forEach((target)=>{
                    dropdownOptions += `<option value="${target}">${target}</option>`;
                });
                console.log('Generated dropdown options:', dropdownOptions);
            } else {
                console.warn('No targets found for type:', type);
                dropdownOptions = `<option value="${type}">${type}</option>`;
            }
            li.innerHTML = `
        <div class="fragment-header">
          <div class="fragment-info">
            <div class="fragment-id">${fragment.id}</div>
            <div class="fragment-type">${fragment.type}</div>
            <div class="fragment-meta">
              <span>\u{1F4CF} ${fragment.size} bytes</span>
              <span>\u{1F4C5} Created: ${new Date(fragment.created).toLocaleString()}</span>
              <span>\u{1F504} Updated: ${new Date(fragment.updated).toLocaleString()}</span>
            </div>
          </div>
          <div class="fragment-actions">
            <button class="btn btn-danger delete-btn" data-id="${fragment.id}">\u{1F5D1}\u{FE0F} Delete</button>
            <button class="btn btn-warning edit-btn" data-id="${fragment.id}" data-type="${fragment.type}">\u{270F}\u{FE0F} Edit</button>
          </div>
        </div>
        <div class="fragment-conversion">
          <span>\u{1F504} Convert to:</span>
          <select class="conversion-select" data-id="${fragment.id}">
            ${dropdownOptions}
          </select>
          <button class="btn btn-success view-convert-btn" data-id="${fragment.id}">\u{1F441}\u{FE0F} View Converted</button>
        </div>
      `;
            // Add manual sync button if there are offline actions
            if (window.offlineActions && window.offlineActions.length > 0) {
                const syncButton = document.createElement('button');
                syncButton.textContent = `\u{1F504} Sync ${window.offlineActions.length} Offline Actions`;
                syncButton.className = 'btn btn-warning';
                syncButton.style.marginTop = '10px';
                syncButton.onclick = ()=>{
                    console.log('Manual sync triggered');
                    syncOfflineActions();
                };
                li.appendChild(syncButton);
            }
            console.log('Final HTML for fragment:', fragment.id, ':', li.innerHTML);
            fragmentsList.appendChild(li);
        });
        // Delete
        fragmentsList.querySelectorAll('.delete-btn').forEach((button)=>{
            button.onclick = async (e)=>{
                const id = e.target.dataset.id;
                try {
                    if (isOnline) {
                        console.log("\uD83C\uDF10 Online mode - deleting fragment directly");
                        await (0, _api.deleteFragment)(id);
                    } else {
                        console.log("\uD83D\uDCF1 Offline mode - queuing delete action");
                        // Offline mode - queue for sync
                        await addOfflineAction({
                            type: 'DELETE',
                            data: {
                                id
                            }
                        });
                        alert('Delete queued for sync when online!');
                    }
                    // Remove from local cache
                    await (0, _dbJsDefault.default).deleteFragment(id);
                    await renderFragments();
                } catch (err) {
                    alert(`Delete failed: ${err.message}`);
                    console.error(err);
                }
            };
        });
        // Edit
        fragmentsList.querySelectorAll('.edit-btn').forEach((button)=>{
            button.onclick = async (e)=>{
                const id = e.target.dataset.id;
                const currentType = e.target.dataset.type;
                try {
                    let current;
                    if (isOnline) {
                        const resp = await (0, _api.getFragmentData)(id);
                        current = await resp.text();
                    } else {
                        // Offline mode - get from cache
                        const fragment = await (0, _dbJsDefault.default).getFragment(id);
                        current = fragment?._data || 'Content not available offline';
                    }
                    const newContent = prompt(`Edit content for ${id}`, current);
                    if (newContent === null) return;
                    const newType = prompt('Update type (leave as current if unsure):', currentType) || currentType;
                    if (isOnline) await (0, _api.updateFragment)(id, newContent, newType);
                    else {
                        // Offline mode - queue for sync
                        await addOfflineAction({
                            type: 'UPDATE',
                            data: {
                                id,
                                content: newContent,
                                type: newType
                            }
                        });
                        alert('Update queued for sync when online!');
                    }
                    await renderFragments();
                } catch (err) {
                    alert(`Update failed: ${err.message}`);
                    console.error(err);
                }
            };
        });
        // Convert/View
        fragmentsList.querySelectorAll('.view-convert-btn').forEach((button)=>{
            button.onclick = async (e)=>{
                const id = e.target.dataset.id;
                const select = e.target.previousElementSibling; // the select
                const targetType = select.value;
                // Find the fragment to get its source type
                const fragment = window.currentFragments.find((f)=>f.id === id);
                if (!fragment) {
                    alert('Fragment not found');
                    return;
                }
                const sourceType = fragment.type.split(';')[0]; // Remove charset if present
                const ext = getConversionExtension(sourceType, targetType);
                if (!ext) {
                    alert(`Unsupported conversion from ${sourceType} to ${targetType}`);
                    return;
                }
                try {
                    console.log(`Converting fragment ${id} from ${sourceType} to ${targetType} using extension .${ext}`);
                    const response = await (0, _api.getFragmentData)(id, ext);
                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error('Conversion failed:', response.status, errorText);
                        throw new Error(`Conversion failed: ${response.status} - ${errorText}`);
                    }
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    // For text-based conversions, show in new window
                    if (targetType.startsWith('text/') || targetType === 'application/json' || targetType === 'application/yaml' || targetType === 'text/csv') {
                        const text = await blob.text();
                        const newWindow = window.open('', '_blank');
                        newWindow.document.write(`
              <html>
                <head><title>Converted Fragment</title></head>
                <body>
                  <h2>Converted Fragment: ${id}</h2>
                  <p><strong>From:</strong> ${sourceType}</p>
                  <p><strong>To:</strong> ${targetType}</p>
                  <hr>
                  <pre style="white-space: pre-wrap; word-wrap: break-word;">${text}</pre>
                </body>
              </html>
            `);
                        newWindow.document.close();
                    } else // For images, open directly
                    window.open(url, '_blank');
                    URL.revokeObjectURL(url);
                } catch (err) {
                    console.error('Conversion error:', err);
                    alert(`Conversion error: ${err.message}`);
                }
            };
        });
    } catch (err) {
        console.error('Failed to load fragments:', err);
        fragmentsList.innerHTML = `<li>Error loading fragments: ${err.message}</li>`;
    }
}
(async function init() {
    // Initialize PWA features
    (0, _swRegisterJs.registerServiceWorker)();
    (0, _swRegisterJs.setupInstallPrompt)();
    // Initialize IndexedDB
    try {
        await (0, _dbJsDefault.default).init();
        console.log('IndexedDB initialized successfully');
    } catch (error) {
        console.error('Failed to initialize IndexedDB:', error);
    }
    // Set up online/offline event listeners
    window.addEventListener('online', ()=>{
        console.log('Browser went online - triggering sync');
        isOnline = true;
        updateOfflineStatus();
        // Force sync of offline actions
        setTimeout(()=>{
            syncOfflineActions();
        }, 1000); // Small delay to ensure network is ready
    });
    window.addEventListener('offline', ()=>{
        console.log('Browser went offline');
        isOnline = false;
        updateOfflineStatus();
    });
    // Initial offline status
    updateOfflineStatus();
    // Also listen for visibility changes (when user comes back to tab)
    document.addEventListener('visibilitychange', ()=>{
        if (!document.hidden && isOnline) {
            console.log('Tab became visible - checking for offline actions');
            syncOfflineActions();
        }
    });
    // Add periodic online check for Firefox compatibility
    setInterval(async ()=>{
        try {
            // Try to make a simple network request to detect online status
            const response = await fetch('/favicon.ico', {
                method: 'HEAD',
                cache: 'no-cache'
            });
            if (response.ok && !isOnline) {
                console.log('Network check detected online status - triggering sync');
                isOnline = true;
                updateOfflineStatus();
                syncOfflineActions();
            }
        } catch (error) {
            // Network request failed, we're offline
            if (isOnline) {
                console.log('Network check detected offline status');
                isOnline = false;
                updateOfflineStatus();
            }
        }
    }, 5000); // Check every 5 seconds
    const url = new URL(window.location.href);
    // Handle Hosted UI errors returned as query params
    const oauthError = url.searchParams.get('error');
    const oauthErrorDesc = url.searchParams.get('error_description');
    if (oauthError) {
        alert(`Sign-in error: ${decodeURIComponent(oauthErrorDesc || oauthError)}`);
        history.replaceState({}, '', '/');
    }
    // Handle Cognito callback on any path if code param exists
    if (url.searchParams.get('code')) {
        const success = await (0, _auth.handleCallback)();
        if (success) {
            console.log('Cognito login successful!');
            // Clear the URL parameters and update the UI
            history.replaceState({}, '', '/');
            // Update the authentication UI to show signed-in state
            updateAuthUI();
            return;
        } else {
            console.error('Cognito login failed or cancelled.');
            alert('Login failed or cancelled.');
            history.replaceState({}, '', '/');
            return;
        }
    }
    // Wire up authentication UI
    const signInBtn = document.getElementById('signin');
    const userStatus = document.getElementById('user-status');
    const signOutBtn = document.getElementById('signout');
    const loadFragmentsBtn = document.getElementById('load-fragments-btn');
    function updateAuthUI() {
        if ((0, _auth.isAuthenticated)()) {
            // User is signed in
            if (signInBtn) signInBtn.classList.add('hidden');
            if (userStatus) userStatus.classList.remove('hidden');
        } else {
            // User is not signed in
            if (signInBtn) signInBtn.classList.remove('hidden');
            if (userStatus) userStatus.classList.add('hidden');
        }
    }
    if (signInBtn) signInBtn.onclick = (0, _auth.login);
    if (signOutBtn) signOutBtn.onclick = ()=>{
        (0, _auth.logout)();
        updateAuthUI();
    };
    if (loadFragmentsBtn) loadFragmentsBtn.onclick = ()=>{
        renderFragments();
    };
    // Initialize auth UI
    updateAuthUI();
    // Periodically check authentication status to keep UI in sync
    setInterval(()=>{
        updateAuthUI();
    }, 2000); // Check every 2 seconds
    const typeSelect = document.getElementById('type');
    const textArea = document.getElementById('content');
    const imageDiv = document.getElementById('image-input');
    const imageFile = document.getElementById('image-file');
    // toggle inputs based on selected type
    if (typeSelect) {
        const toggleInputs = ()=>{
            const t = typeSelect.value;
            if (t.startsWith('image/')) {
                textArea.style.display = 'none';
                imageDiv.style.display = 'block';
            } else {
                textArea.style.display = 'block';
                imageDiv.style.display = 'none';
                // Simple placeholder based on type
                let placeholder = '';
                switch(t){
                    case 'text/plain':
                        placeholder = 'Enter plain text content...';
                        break;
                    case 'text/markdown':
                        placeholder = 'Enter markdown content...';
                        break;
                    case 'text/html':
                        placeholder = 'Enter HTML content...';
                        break;
                    case 'text/csv':
                        placeholder = 'Enter CSV content (comma-separated values)...';
                        break;
                    case 'application/json':
                        placeholder = 'Enter JSON content...';
                        break;
                    case 'application/yaml':
                        placeholder = 'Enter YAML content...';
                        break;
                    default:
                        placeholder = 'Enter content...';
                }
                // Update textarea placeholder only
                if (textArea) {
                    textArea.placeholder = placeholder;
                    textArea.value = ''; // Clear any existing content
                }
            }
        };
        typeSelect.addEventListener('change', toggleInputs);
        toggleInputs(); // Initialize with current selection
    }
    // Add manual sync button
    const syncBtn = document.createElement('button');
    syncBtn.textContent = "\uD83D\uDD04 Manual Sync Offline Actions";
    syncBtn.className = 'btn btn-warning';
    syncBtn.style.margin = '10px';
    syncBtn.onclick = async ()=>{
        console.log('Manual sync button clicked');
        const actions = await (0, _dbJsDefault.default).getOfflineActions();
        console.log('Found offline actions:', actions);
        if (actions.length > 0) await syncOfflineActions();
        else alert('No offline actions to sync');
    };
    // Add clear offline actions button
    const clearBtn = document.createElement('button');
    clearBtn.textContent = "\uD83D\uDDD1\uFE0F Clear All Offline Actions";
    clearBtn.className = 'btn btn-danger';
    clearBtn.style.margin = '10px';
    clearBtn.onclick = async ()=>{
        console.log('Clear offline actions button clicked');
        const actions = await (0, _dbJsDefault.default).getOfflineActions();
        console.log('Current offline actions before clear:', actions);
        // Clear all offline actions
        for (const action of actions)await (0, _dbJsDefault.default).removeOfflineAction(action.id);
        console.log('All offline actions cleared');
        alert(`Cleared ${actions.length} offline actions`);
    };
    // Insert sync button before load button
    const loadBtn = document.getElementById('load-fragments');
    if (loadBtn) {
        loadBtn.parentNode.insertBefore(syncBtn, loadBtn);
        loadBtn.parentNode.insertBefore(clearBtn, syncBtn);
        loadBtn.onclick = async ()=>{
            if (!(0, _auth.isAuthenticated)()) {
                if (isLocalDevelopment()) // For local development, just load fragments directly
                await renderFragments();
                else alert('Please sign in first.');
                return;
            }
            await renderFragments();
        };
    }
    const createForm = document.getElementById('create-form');
    if (createForm) createForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        if (!(0, _auth.isAuthenticated)()) {
            if (isLocalDevelopment()) ;
            else {
                alert('Please sign in first.');
                return;
            }
        }
        const type = typeSelect?.value || 'text/plain';
        try {
            if (type.startsWith('image/')) {
                if (!imageFile.files || imageFile.files.length === 0) {
                    alert('Please choose an image file.');
                    return;
                }
                const buf = await imageFile.files[0].arrayBuffer();
                if (isOnline) await (0, _api.createFragment)(buf, type);
                else {
                    // Offline mode - queue for sync
                    await addOfflineAction({
                        type: 'CREATE',
                        data: {
                            content: buf,
                            type
                        }
                    });
                    alert('Fragment queued for sync when online!');
                }
                imageFile.value = '';
            } else {
                const content = (textArea?.value || '').trim();
                if (!content) {
                    alert('Please enter some content.');
                    return;
                }
                if (isOnline) await (0, _api.createFragment)(content, type);
                else {
                    // Offline mode - queue for sync
                    await addOfflineAction({
                        type: 'CREATE',
                        data: {
                            content,
                            type
                        }
                    });
                    alert('Fragment queued for sync when online!');
                }
                textArea.value = '';
            }
            if (isOnline) alert('Fragment created!');
            await renderFragments();
        } catch (err) {
            console.error('Failed to create fragment:', err);
            alert(`Error creating fragment: ${err.message}`);
        }
    });
})();

},{"./auth":"4f9sv","./api":"38UJz","./db.js":"jkmVr","./sw-register.js":"lEFgn","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4f9sv":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleCallback", ()=>handleCallback);
parcelHelpers.export(exports, "getIdToken", ()=>getIdToken);
// Check if we're in local development mode
parcelHelpers.export(exports, "isLocalDevelopment", ()=>isLocalDevelopment);
// For assignment submission, always use AWS Cognito authentication
parcelHelpers.export(exports, "isAuthenticated", ()=>isAuthenticated);
// Always use AWS Cognito login flow
parcelHelpers.export(exports, "login", ()=>login);
parcelHelpers.export(exports, "logout", ()=>logout);
var _config = require("./config");
const STORAGE_KEY = 'tokens';
function base64UrlEncode(arrBuf) {
    return btoa(String.fromCharCode(...new Uint8Array(arrBuf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function sha256(str) {
    const data = new TextEncoder().encode(str);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return base64UrlEncode(hash);
}
async function handleCallback() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    if (!code) return false;
    const verifier = sessionStorage.getItem('pkce_verifier');
    if (!verifier) return false;
    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: (0, _config.COGNITO_CLIENT_ID),
        code,
        redirect_uri: (0, _config.COGNITO_REDIRECT_URI),
        code_verifier: verifier
    });
    const resp = await fetch(`${(0, _config.COGNITO_DOMAIN)}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    });
    if (!resp.ok) return false;
    const tokens = await resp.json();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
    history.replaceState({}, '', '/');
    return true;
}
function getIdToken() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw)?.id_token || null;
    } catch  {
        return null;
    }
}
function isLocalDevelopment() {
    return (0, _config.API_URL).includes('localhost') && window.location.hostname === 'localhost';
}
function isAuthenticated() {
    return Boolean(getIdToken());
}
async function login() {
    const verifier = base64UrlEncode(crypto.getRandomValues(new Uint8Array(32)));
    const challenge = await sha256(verifier);
    sessionStorage.setItem('pkce_verifier', verifier);
    const params = new URLSearchParams({
        client_id: (0, _config.COGNITO_CLIENT_ID),
        response_type: 'code',
        scope: (0, _config.COGNITO_SCOPES).join(' '),
        redirect_uri: (0, _config.COGNITO_REDIRECT_URI),
        code_challenge_method: 'S256',
        code_challenge: challenge
    });
    window.location = `${0, _config.COGNITO_DOMAIN}/oauth2/authorize?${params.toString()}`;
}
function logout() {
    localStorage.removeItem(STORAGE_KEY);
    const params = new URLSearchParams({
        client_id: (0, _config.COGNITO_CLIENT_ID),
        logout_uri: (0, _config.COGNITO_REDIRECT_URI)
    });
    window.location = `${0, _config.COGNITO_DOMAIN}/logout?${params.toString()}`;
}

},{"./config":"8oaOz","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"8oaOz":[function(require,module,exports,__globalThis) {
// For assignment submission, always use AWS
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "API_URL", ()=>API_URL);
parcelHelpers.export(exports, "COGNITO_DOMAIN", ()=>COGNITO_DOMAIN);
parcelHelpers.export(exports, "COGNITO_CLIENT_ID", ()=>COGNITO_CLIENT_ID);
parcelHelpers.export(exports, "COGNITO_REDIRECT_URI", ()=>COGNITO_REDIRECT_URI);
parcelHelpers.export(exports, "COGNITO_SCOPES", ()=>COGNITO_SCOPES);
const API_URL = 'http://fragments-lb-589502560.us-east-1.elb.amazonaws.com';
const COGNITO_DOMAIN = 'https://us-east-1i0hiccnzl.auth.us-east-1.amazoncognito.com';
const COGNITO_CLIENT_ID = '53lkg3nbp11fqunpjph06e9o77';
const COGNITO_REDIRECT_URI = 'http://localhost:1234';
const COGNITO_SCOPES = [
    'openid',
    'email'
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jnFvT":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"38UJz":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "listFragments", ()=>listFragments);
parcelHelpers.export(exports, "createFragment", ()=>createFragment);
parcelHelpers.export(exports, "deleteFragment", ()=>deleteFragment);
parcelHelpers.export(exports, "updateFragment", ()=>updateFragment);
parcelHelpers.export(exports, "getFragmentData", ()=>getFragmentData);
parcelHelpers.export(exports, "getFragmentInfo", ()=>getFragmentInfo);
var _config = require("./config");
var _auth = require("./auth");
async function request(path, opts = {}) {
    const headers = new Headers(opts.headers || {});
    // Always use Cognito for assignment submission
    const idToken = (0, _auth.getIdToken)();
    if (idToken) headers.set('Authorization', `Bearer ${idToken}`);
    const resp = await fetch(`${(0, _config.API_URL)}${path}`, {
        ...opts,
        headers
    });
    return resp;
}
async function listFragments(expand = true) {
    const r = await request(`/v1/fragments?expand=${expand ? '1' : '0'}`);
    if (!r.ok) throw new Error('list failed');
    return r.json();
}
async function createFragment(content, contentType) {
    const r = await request('/v1/fragments', {
        method: 'POST',
        headers: {
            'Content-Type': contentType
        },
        body: content
    });
    if (!r.ok) throw new Error('create failed');
    return r.json();
}
async function deleteFragment(id) {
    const r = await request(`/v1/fragments/${id}`, {
        method: 'DELETE'
    });
    if (!r.ok) {
        const errorMessage = `delete failed: ${r.status} ${r.statusText}`;
        const error = new Error(errorMessage);
        error.status = r.status;
        error.statusText = r.statusText;
        throw error;
    }
    return r.json();
}
async function updateFragment(id, content, contentType) {
    const r = await request(`/v1/fragments/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': contentType
        },
        body: content
    });
    if (!r.ok) throw new Error('update failed');
    return r.json();
}
async function getFragmentData(id, ext = '') {
    const path = ext ? `/v1/fragments/${id}.${ext}` : `/v1/fragments/${id}`;
    const r = await request(path);
    if (!r.ok) throw new Error('get data failed');
    return r;
}
async function getFragmentInfo(id) {
    const r = await request(`/v1/fragments/${id}/info`);
    if (!r.ok) throw new Error('get info failed');
    return r.json();
}

},{"./config":"8oaOz","./auth":"4f9sv","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jkmVr":[function(require,module,exports,__globalThis) {
// IndexedDB service for offline data persistence
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class FragmentDB {
    constructor(){
        this.dbName = 'FragmentsDB';
        this.version = 1;
        this.db = null;
        this.initPromise = null;
    }
    // Initialize the database
    async init() {
        if (this.initPromise) return this.initPromise;
        this.initPromise = new Promise((resolve, reject)=>{
            const request = indexedDB.open(this.dbName, this.version);
            request.onerror = ()=>{
                console.error('Failed to open database:', request.error);
                reject(request.error);
            };
            request.onsuccess = ()=>{
                this.db = request.result;
                console.log('Database opened successfully');
                resolve(this.db);
            };
            request.onupgradeneeded = (event)=>{
                const db = event.target.result;
                // Create fragments store
                if (!db.objectStoreNames.contains('fragments')) {
                    const fragmentStore = db.createObjectStore('fragments', {
                        keyPath: 'id'
                    });
                    fragmentStore.createIndex('ownerId', 'ownerId', {
                        unique: false
                    });
                    fragmentStore.createIndex('type', 'type', {
                        unique: false
                    });
                    fragmentStore.createIndex('created', 'created', {
                        unique: false
                    });
                }
                // Create offline actions store
                if (!db.objectStoreNames.contains('offlineActions')) {
                    const actionStore = db.createObjectStore('offlineActions', {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    actionStore.createIndex('type', 'type', {
                        unique: false
                    });
                    actionStore.createIndex('timestamp', 'timestamp', {
                        unique: false
                    });
                }
                // Create sync queue store
                if (!db.objectStoreNames.contains('syncQueue')) {
                    const syncStore = db.createObjectStore('syncQueue', {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    syncStore.createIndex('action', 'action', {
                        unique: false
                    });
                    syncStore.createIndex('timestamp', 'timestamp', {
                        unique: false
                    });
                }
                console.log('Database schema created/updated');
            };
        });
        return this.initPromise;
    }
    // Fragment operations
    async saveFragment(fragment) {
        await this.init();
        return new Promise((resolve, reject)=>{
            const transaction = this.db.transaction([
                'fragments'
            ], 'readwrite');
            const store = transaction.objectStore('fragments');
            const request = store.put(fragment);
            request.onsuccess = ()=>{
                console.log('Fragment saved to IndexedDB:', fragment.id);
                resolve(fragment);
            };
            request.onerror = ()=>{
                console.error('Failed to save fragment:', request.error);
                reject(request.error);
            };
        });
    }
    async getFragment(id) {
        await this.init();
        return new Promise((resolve, reject)=>{
            const transaction = this.db.transaction([
                'fragments'
            ], 'readonly');
            const store = transaction.objectStore('fragments');
            const request = store.get(id);
            request.onsuccess = ()=>{
                resolve(request.result || null);
            };
            request.onerror = ()=>{
                console.error('Failed to get fragment:', request.error);
                reject(request.error);
            };
        });
    }
    async getAllFragments(ownerId) {
        await this.init();
        return new Promise((resolve, reject)=>{
            const transaction = this.db.transaction([
                'fragments'
            ], 'readonly');
            const store = transaction.objectStore('fragments');
            const index = store.index('ownerId');
            const request = index.getAll(ownerId);
            request.onsuccess = ()=>{
                resolve(request.result || []);
            };
            request.onerror = ()=>{
                console.error('Failed to get fragments:', request.error);
                reject(request.error);
            };
        });
    }
    async deleteFragment(id) {
        await this.init();
        return new Promise((resolve, reject)=>{
            const transaction = this.db.transaction([
                'fragments'
            ], 'readwrite');
            const store = transaction.objectStore('fragments');
            const request = store.delete(id);
            request.onsuccess = ()=>{
                console.log('Fragment deleted from IndexedDB:', id);
                resolve();
            };
            request.onerror = ()=>{
                console.error('Failed to delete fragment:', request.error);
                reject(request.error);
            };
        });
    }
    // Offline actions management
    async addOfflineAction(action) {
        await this.init();
        return new Promise((resolve, reject)=>{
            const transaction = this.db.transaction([
                'offlineActions'
            ], 'readwrite');
            const store = transaction.objectStore('offlineActions');
            const offlineAction = {
                ...action,
                timestamp: Date.now(),
                retryCount: 0
            };
            const request = store.add(offlineAction);
            request.onsuccess = ()=>{
                console.log('Offline action added:', offlineAction);
                resolve(request.result);
            };
            request.onerror = ()=>{
                console.error('Failed to add offline action:', request.error);
                reject(request.error);
            };
        });
    }
    async getOfflineActions() {
        await this.init();
        return new Promise((resolve, reject)=>{
            const transaction = this.db.transaction([
                'offlineActions'
            ], 'readonly');
            const store = transaction.objectStore('offlineActions');
            const request = store.getAll();
            request.onsuccess = ()=>{
                resolve(request.result || []);
            };
            request.onerror = ()=>{
                console.error('Failed to get offline actions:', request.error);
                reject(request.error);
            };
        });
    }
    async removeOfflineAction(id) {
        await this.init();
        return new Promise((resolve, reject)=>{
            const transaction = this.db.transaction([
                'offlineActions'
            ], 'readwrite');
            const store = transaction.objectStore('offlineActions');
            const request = store.delete(id);
            request.onsuccess = ()=>{
                console.log('Offline action removed:', id);
                resolve();
            };
            request.onerror = ()=>{
                console.error('Failed to remove offline action:', request.error);
                reject(request.error);
            };
        });
    }
    // Sync queue management
    async addToSyncQueue(syncItem) {
        await this.init();
        return new Promise((resolve, reject)=>{
            const transaction = this.db.transaction([
                'syncQueue'
            ], 'readwrite');
            const store = transaction.objectStore('syncQueue');
            const queueItem = {
                ...syncItem,
                timestamp: Date.now(),
                status: 'pending'
            };
            const request = store.add(queueItem);
            request.onsuccess = ()=>{
                console.log('Item added to sync queue:', queueItem);
                resolve(request.result);
            };
            request.onerror = ()=>{
                console.error('Failed to add to sync queue:', request.error);
                reject(request.error);
            };
        });
    }
    async getSyncQueue() {
        await this.init();
        return new Promise((resolve, reject)=>{
            const transaction = this.db.transaction([
                'syncQueue'
            ], 'readonly');
            const store = transaction.objectStore('syncQueue');
            const request = store.getAll();
            request.onsuccess = ()=>{
                resolve(request.result || []);
            };
            request.onerror = ()=>{
                console.error('Failed to get sync queue:', request.error);
                reject(request.error);
            };
        });
    }
    async removeFromSyncQueue(id) {
        await this.init();
        return new Promise((resolve, reject)=>{
            const transaction = this.db.transaction([
                'syncQueue'
            ], 'readwrite');
            const store = transaction.objectStore('syncQueue');
            const request = store.delete(id);
            request.onsuccess = ()=>{
                console.log('Item removed from sync queue:', id);
                resolve();
            };
            request.onerror = ()=>{
                console.error('Failed to remove from sync queue:', request.error);
                reject(request.error);
            };
        });
    }
    // Utility methods
    async clearAll() {
        await this.init();
        return new Promise((resolve, reject)=>{
            const transaction = this.db.transaction([
                'fragments',
                'offlineActions',
                'syncQueue'
            ], 'readwrite');
            const fragmentStore = transaction.objectStore('fragments');
            const actionStore = transaction.objectStore('offlineActions');
            const syncStore = transaction.objectStore('syncQueue');
            const fragmentRequest = fragmentStore.clear();
            const actionRequest = actionStore.clear();
            const syncRequest = syncStore.clear();
            transaction.oncomplete = ()=>{
                console.log('All data cleared from IndexedDB');
                resolve();
            };
            transaction.onerror = ()=>{
                console.error('Failed to clear data:', transaction.error);
                reject(transaction.error);
            };
        });
    }
    async getDatabaseSize() {
        await this.init();
        return new Promise((resolve, reject)=>{
            const transaction = this.db.transaction([
                'fragments',
                'offlineActions',
                'syncQueue'
            ], 'readonly');
            const fragmentStore = transaction.objectStore('fragments');
            const actionStore = transaction.objectStore('offlineActions');
            const syncStore = transaction.objectStore('syncQueue');
            const fragmentRequest = fragmentStore.count();
            const actionRequest = actionStore.count();
            const syncRequest = syncStore.count();
            let counts = {
                fragments: 0,
                actions: 0,
                sync: 0
            };
            fragmentRequest.onsuccess = ()=>{
                counts.fragments = fragmentRequest.result;
            };
            actionRequest.onsuccess = ()=>{
                counts.actions = actionRequest.result;
            };
            syncRequest.onsuccess = ()=>{
                counts.sync = syncRequest.result;
            };
            transaction.oncomplete = ()=>{
                resolve(counts);
            };
            transaction.onerror = ()=>{
                reject(transaction.error);
            };
        });
    }
}
// Export singleton instance
const fragmentDB = new FragmentDB();
exports.default = fragmentDB;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"lEFgn":[function(require,module,exports,__globalThis) {
// Service Worker Registration Module
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "registerServiceWorker", ()=>registerServiceWorker);
// PWA Install prompt
parcelHelpers.export(exports, "setupInstallPrompt", ()=>setupInstallPrompt);
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', async ()=>{
            try {
                // Use dynamic import for service worker to be Parcel-compatible
                const registration = await navigator.serviceWorker.register(require("6e6aad37e3b1aca2"), {
                    scope: './'
                });
                console.log('Service Worker registered successfully:', registration.scope);
                // Check for updates
                registration.addEventListener('updatefound', ()=>{
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', ()=>{
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) console.log('New version available');
                    });
                });
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        });
        // Handle offline/online status
        window.addEventListener('online', ()=>{
            console.log('App is online');
            document.body.classList.remove('offline');
            // Trigger sync when back online
            if (navigator.serviceWorker.controller) navigator.serviceWorker.controller.postMessage({
                type: 'SYNC'
            });
        });
        window.addEventListener('offline', ()=>{
            console.log('App is offline');
            document.body.classList.add('offline');
        });
    }
}
function setupInstallPrompt() {
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e)=>{
        e.preventDefault();
        deferredPrompt = e;
        // Show install button
        const installButton = document.getElementById('install-app');
        if (installButton) {
            installButton.style.display = 'block';
            installButton.onclick = ()=>{
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then((choiceResult)=>{
                        if (choiceResult.outcome === 'accepted') {
                            console.log('User accepted the install prompt');
                            installButton.style.display = 'none';
                        } else console.log('User dismissed the install prompt');
                        deferredPrompt = null;
                    });
                }
            };
        }
    });
}

},{"6e6aad37e3b1aca2":"iSs9O","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"iSs9O":[function(require,module,exports,__globalThis) {
module.exports = module.bundle.resolve("sw.js");

},{}]},["7wZbQ","2R06K"], "2R06K", "parcelRequirec284", {}, "./", "/")

//# sourceMappingURL=fragments-ui.0f77c784.js.map
