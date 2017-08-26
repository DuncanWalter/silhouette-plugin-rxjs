(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(require("rxjs/BehaviorSubject"), require("silhouette-core")); else if (typeof define === "function" && define.amd) define([ "rxjs/BehaviorSubject", "silhouette-core" ], factory); else if (typeof exports === "object") exports["silhouette"] = factory(require("rxjs/BehaviorSubject"), require("silhouette-core")); else root["silhouette"] = factory(root["rxjs/BehaviorSubject"], root["silhouette-core"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports, name, getter) {
            if (!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, {
                    configurable: false,
                    enumerable: true,
                    get: getter
                });
            }
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function getDefault() {
                return module["default"];
            } : function getModuleExports() {
                return module;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 0);
    }([ function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _BehaviorSubject = __webpack_require__(1);
        var _silhouetteCore = __webpack_require__(2);
        const __stream__ = Symbol("stream");
        let f = function(settings) {
            return {
                prototype: {
                    [_silhouetteCore.symbols.__push__]: next => (function({value: value, done: done}) {
                        next.call(this, {
                            value: value,
                            done: done
                        });
                        if (this[__stream__] instanceof _BehaviorSubject.BehaviorSubject) {
                            if (done) {
                                this[__stream__].complete();
                            } else {
                                this[__stream__].next(value);
                            }
                        } else {
                            this[__stream__] = value;
                        }
                        if (done) {
                            Reflect.ownKeys(this).forEach(key => this[key][_silhouetteCore.symbols.__push__]({
                                done: done
                            }));
                        }
                    }),
                    asObservable: next => (function() {
                        if (next) {
                            throw new Error("RXJS plugin cannot overwrite asObservable properties defined by other plugins");
                        }
                        if (!(this[__stream__] instanceof _BehaviorSubject.BehaviorSubject)) {
                            this[__stream__] = new _BehaviorSubject.BehaviorSubject(this[__stream__]);
                        }
                        return this[__stream__].asObservable();
                    })
                }
            };
        };
        exports.default = f;
    }, function(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_1__;
    }, function(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_2__;
    } ]);
});