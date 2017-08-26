(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(require("rxjs/BehaviorSubject")); else if (typeof define === "function" && define.amd) define([ "rxjs/BehaviorSubject" ], factory); else if (typeof exports === "object") exports["silhouette"] = factory(require("rxjs/BehaviorSubject")); else root["silhouette"] = factory(root["rxjs/BehaviorSubject"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
        exports.default = function(settings) {
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
        var _BehaviorSubject = __webpack_require__(1);
        var _silhouetteCore = __webpack_require__(2);
        const __stream__ = Symbol("stream");
    }, function(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_1__;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        (function webpackUniversalModuleDefinition(root, factory) {
            if (true) module.exports = factory(__webpack_require__(3)); else if (typeof define === "function" && define.amd) define([ "vitrarius" ], factory); else if (typeof exports === "object") exports["silhouette"] = factory(require("vitrarius")); else root["silhouette"] = factory(root["vitrarius"]);
        })(undefined, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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
                return __webpack_require__(__webpack_require__.s = 2);
            }([ function(module, exports) {
                module.exports = __WEBPACK_EXTERNAL_MODULE_0__;
            }, function(module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                const __DEFINE__ = exports.__DEFINE__ = Symbol("__DEFINE__");
                const __REMOVE__ = exports.__REMOVE__ = Symbol("__REMOVE__");
                const __path__ = exports.__path__ = Symbol("path");
                const __reducers__ = exports.__reducers__ = Symbol("reducers");
                const __push__ = exports.__push__ = Symbol("push");
                const __store__ = exports.__store__ = Symbol("store");
                const __root__ = exports.__root__ = Symbol("root");
                const __create__ = exports.__create__ = Symbol("create");
            }, function(module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.symbols = undefined;
                exports.create = create;
                var _vitrarius = __webpack_require__(0);
                var _symbols = __webpack_require__(1);
                var __symbols__ = _interopRequireWildcard(_symbols);
                var _reducer = __webpack_require__(3);
                function _interopRequireWildcard(obj) {
                    if (obj && obj.__esModule) {
                        return obj;
                    } else {
                        var newObj = {};
                        if (obj != null) {
                            for (var key in obj) {
                                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                            }
                        }
                        newObj.default = obj;
                        return newObj;
                    }
                }
                let symbols = exports.symbols = __symbols__;
                function diff(pat, trg) {
                    if (!(pat instanceof Object || pat instanceof Array)) {
                        return trg !== undefined;
                    }
                    return Object.keys(pat).reduce((a, k) => a && trg[k] && diff(pat[k], trg[k]), trg !== undefined);
                }
                function syncQueue() {
                    let active = false;
                    let next = {};
                    let last = next;
                    return {
                        enqueue(action) {
                            last.value = action;
                            last.next = {};
                            last = last.next;
                        },
                        forEach(fun) {
                            if (active) {
                                return;
                            }
                            active = true;
                            while (next.next) {
                                fun(next.value);
                                next = next.next;
                            }
                            active = false;
                        }
                    };
                }
                function defineSilhouette() {
                    let actionQueue = syncQueue();
                    class Silhouette {
                        [_symbols.__create__](parent, member) {
                            let sil = new Silhouette();
                            sil[_symbols.__path__] = parent ? [ ...parent[_symbols.__path__], member ] : [];
                            sil[_symbols.__reducers__] = {};
                            if (parent !== undefined) {
                                parent[member] = sil;
                            }
                            return sil;
                        }
                        define(val, ...path) {
                            if (!(0, _vitrarius.view)((0, _vitrarius.compose)(...path.map(k => (0, _vitrarius.lens)(o => o[k], (o, r) => r)), diff.bind(null, val)), this)) {
                                actionQueue.enqueue({
                                    type: "__DEFINE__",
                                    [_symbols.__DEFINE__]: true,
                                    val: val,
                                    path: [ ...this[_symbols.__path__], ...path ]
                                });
                                actionQueue.forEach(this[_symbols.__store__].dispatch);
                            }
                        }
                        remove(...path) {
                            actionQueue.enqueue({
                                type: "__REMOVE__",
                                [_symbols.__REMOVE__]: true,
                                path: [ ...this[_symbols.__path__], ...path ]
                            });
                            actionQueue.forEach(this[_symbols.__store__].dispatch);
                        }
                        dispatch(type, payload) {
                            actionQueue.enqueue(Object.assign({
                                type: type
                            }, payload));
                            actionQueue.forEach(this[_symbols.__store__].dispatch);
                        }
                        extend(type, reducer, compose = false) {
                            this[_symbols.__reducers__][type] = reducer;
                        }
                        [_symbols.__push__]() {}
                    }
                    return Silhouette;
                }
                function applyPlugin(base, plugin) {
                    Reflect.ownKeys(plugin).forEach(key => {
                        if (plugin[key] instanceof Function) {
                            base[key] = plugin[key](base[key]);
                        } else if (plugin[key] instanceof Object) {
                            base[key] = applyPlugin(base[key] || {}, plugin[key]);
                        } else {
                            throw new Error("The plugin provided contained terminal properties which were not middleware functions.");
                        }
                    });
                    return base;
                }
                function create(...plugins) {
                    let Silhouette = defineSilhouette();
                    let namespace = {
                        Silhouette: Silhouette,
                        prototype: Silhouette.prototype,
                        reducer: _reducer.reducer.bind(Silhouette),
                        createStore(reducer) {
                            let state = {};
                            return {
                                dispatch(action) {
                                    state = reducer(state, action);
                                }
                            };
                        },
                        createSil(store) {
                            let sil = namespace.Silhouette.prototype[_symbols.__create__]();
                            namespace.Silhouette.prototype[_symbols.__store__] = store;
                            namespace.Silhouette.prototype[_symbols.__root__] = sil;
                            namespace.Silhouette.created = true;
                            return sil;
                        }
                    };
                    plugins.reverse().forEach(plugin => {
                        applyPlugin(namespace, plugin, namespace);
                    });
                    let store = namespace.createStore(namespace.reducer);
                    return namespace.createSil(store);
                }
            }, function(module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.reducer = reducer;
                var _vitrarius = __webpack_require__(0);
                var _symbols = __webpack_require__(1);
                var _optics = __webpack_require__(4);
                function reducer(state = {}, action) {
                    if (!this.created) {
                        return state;
                    }
                    let path, payload, val, sil = this.prototype[_symbols.__root__];
                    switch (true) {
                      case action[_symbols.__DEFINE__]:
                        ({val: val, path: path} = action);
                        let _define = (0, _vitrarius.compose)(...path.map(_optics.traverse), o => Object.assign(o, {
                            val: val
                        }), _optics.assert);
                        return (0, _vitrarius.view)(_define, {
                            state: state,
                            sil: sil
                        });

                      case action[_symbols.__REMOVE__]:
                        ({path: path} = action);
                        let eraser = (0, _optics.erase)(path.pop());
                        let remove = (0, _vitrarius.compose)(...path.map(_optics.traverse), eraser);
                        return (0, _vitrarius.view)(remove, {
                            state: state,
                            sil: sil
                        });

                      default:
                        path = action[_symbols.__path__] || [];
                        let dispatch = (0, _vitrarius.compose)(...path.map(_optics.traverse), _optics.contort);
                        return (0, _vitrarius.view)(dispatch, {
                            state: state,
                            sil: sil,
                            action: action
                        });
                    }
                }
            }, function(module, exports, __webpack_require__) {
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.contort = contort;
                exports.traverse = traverse;
                exports.assert = assert;
                exports.erase = erase;
                var _vitrarius = __webpack_require__(0);
                var _symbols = __webpack_require__(1);
                function contort({state: state, sil: sil, action: action}) {
                    let transitional = state;
                    if (sil[_symbols.__reducers__][action.type]) {
                        transitional = sil[_symbols.__reducers__][action.type](state, action);
                    }
                    if (transitional === undefined) {
                        throw new Error("Reducer returned undefined; are you missing a return statement?");
                    }
                    if (transitional !== state) {
                        Object.keys(sil).forEach(key => {
                            if (!transitional.hasOwnProperty(key)) {
                                sil[key][_symbols.__push__]({
                                    done: true
                                });
                                delete sil[key];
                            }
                        });
                        Object.keys(transitional).forEach(key => {
                            if (!sil.hasOwnProperty(key)) {
                                sil[_symbols.__create__](sil, key);
                            }
                        });
                    }
                    let itr = Object.keys(transitional)[Symbol.iterator]();
                    let fun = frag => {
                        let member = itr.next().value;
                        return {
                            state: frag,
                            action: action,
                            sil: sil[member] || sil[_symbols.__create__](sil, member)
                        };
                    };
                    let final = (0, _vitrarius.view)((0, _vitrarius.compose)((0, _vitrarius.each)(), fun, contort), transitional);
                    if (final != state) {
                        sil[_symbols.__push__]({
                            done: false,
                            value: final
                        });
                    }
                    return final;
                }
                function traverse(member) {
                    return (0, _vitrarius.optic)(({state: state, sil: sil, action: action}, next) => {
                        return (0, _vitrarius.view)((0, _vitrarius.compose)(member, fragment => {
                            if (!sil[member]) {
                                sil[_symbols.__create__](sil, member);
                            }
                            let ret = next({
                                state: fragment || {},
                                sil: sil[member],
                                action: action
                            });
                            if (ret !== state) {
                                sil[member][_symbols.__push__]({
                                    done: false,
                                    value: ret
                                });
                            }
                            return ret;
                        }), state);
                    });
                }
                let blank = {};
                let asObject = o => o instanceof Object ? o : undefined;
                let asArray = a => a instanceof Array ? a : undefined;
                function assert({state: state, sil: sil, val: val}) {
                    return __assert__(state, sil, val);
                }
                function __assert__(state, sil, val) {
                    let flag = state === undefined;
                    if (asArray(val)) {
                        if (!asArray(state)) {
                            let res = val.map((elem, index) => {
                                sil[_symbols.__create__](sil, index);
                                return __assert__(undefined, sil[index], elem);
                            });
                            sil[_symbols.__push__]({
                                value: res
                            });
                            return val;
                        } else {
                            return state;
                        }
                    } else if (asObject(val)) {
                        let diff = {};
                        Object.keys(val).forEach(key => {
                            if (!sil.hasOwnProperty(key)) {
                                flag = true;
                                sil[_symbols.__create__](sil, key);
                                diff[key] = __assert__(undefined, sil[key], val[key]);
                            } else {
                                let temp = __assert__(state[key], sil[key], val[key]);
                                if (temp !== state[key]) {
                                    flag = true;
                                    diff[key] = temp;
                                }
                            }
                        });
                        if (flag || !asObject(state)) {
                            var res = Object.assign({}, asObject(state) || blank, diff);
                            sil[_symbols.__push__]({
                                value: res
                            });
                            return res;
                        } else {
                            return state;
                        }
                    } else {
                        if (flag) {
                            sil[_symbols.__push__]({
                                value: val
                            });
                            return val;
                        } else {
                            return state;
                        }
                    }
                }
                function erase(member) {
                    return (0, _vitrarius.optic)(({state: state, sil: sil}) => {
                        let _state = state;
                        if (state.hasOwnProperty(member)) {
                            _state = Object.assign({}, state);
                            delete _state[member];
                            sil[member][_symbols.__push__]({
                                done: true
                            });
                            delete sil[member];
                        }
                        return _state;
                    });
                }
            } ]);
        });
    }, function(module, exports, __webpack_require__) {
        "use strict";
        (function webpackUniversalModuleDefinition(root, factory) {
            if (true) module.exports = factory(); else if (typeof define === "function" && define.amd) define([], factory); else if (typeof exports === "object") exports["vitrarius"] = factory(); else root["vitrarius"] = factory();
        })(undefined, function() {
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
                exports.optic = optic;
                exports.lens = lens;
                exports.compose = compose;
                exports.chain = chain;
                exports.traversal = traversal;
                class Optic {
                    constructor(fun) {
                        this.exec = fun;
                    }
                }
                const id = id => id;
                let view = exports.view = ((optic, target) => {
                    if (optic instanceof Optic) {
                        return optic.exec(target);
                    } else {
                        return compose(optic).exec(target);
                    }
                });
                function trusted(operation) {
                    return new Optic((target, itr) => {
                        let {done: done, value: value} = itr ? itr.next() : {
                            done: true
                        };
                        if (done) {
                            return operation(target, id);
                        } else {
                            return operation(target, target => value.exec(target, itr));
                        }
                    });
                }
                function optic(operation) {
                    return new Optic((target, itr) => {
                        let {done: done, value: value} = itr ? itr.next() : {
                            done: true
                        };
                        if (done) {
                            return operation(target, id);
                        } else {
                            let safe = true;
                            let next = target => {
                                if (safe) {
                                    safe = false;
                                } else {
                                    throw `The 'next' function was called twice; for library performance, optics calling 'next' more than once must be created with 'traversal' in place of 'optic'`;
                                }
                                return value.exec(target, itr);
                            };
                            let ret = operation(target, next);
                            if (itr.return) {
                                itr.return();
                            }
                            return ret;
                        }
                    });
                }
                function lens(distort, correct) {
                    return trusted((o, n) => correct(o, n(distort(o))), false);
                }
                function compile(optics) {
                    return optics.map(l => {
                        if (typeof l === "string" || typeof l === "number") {
                            return pluck(l);
                        } else if (l instanceof Array) {
                            return compose(...l);
                        } else if (l instanceof Function) {
                            return trusted((target, next) => {
                                return next(l(target));
                            });
                        } else {
                            return l;
                        }
                    });
                }
                function compose(...optics) {
                    let lst = compile(optics);
                    let itr = lst[Symbol.iterator]();
                    itr.next();
                    return new Optic((target, i) => {
                        let ret = lst[0].exec(target, function*() {
                            yield* itr;
                            if (i !== undefined) {
                                yield* i;
                            }
                        }());
                        if (itr.return) {
                            itr.return();
                        }
                        return ret;
                    });
                }
                function chain(...optics) {
                    return trusted((target, next) => {
                        return next(compile(optics).reduce((acc, optic) => {
                            return view(optic, acc);
                        }, target));
                    }, false);
                }
                let pluck = exports.pluck = (mem => lens(obj => obj[mem], (obj, val) => {
                    if (obj[mem] === val) {
                        return obj;
                    } else {
                        let r = obj instanceof Array ? obj.map(i => i) : Object.assign({}, obj);
                        if (typeof mem === "number" && !obj instanceof Array) {
                            throw new Error("The 'pluck' lens will not assign numeric member keys to non-Arrays");
                        }
                        if (typeof mem === "string" && !obj instanceof Object) {
                            throw new Error("The 'pluck' lens will not assign string member keys to non-Objects");
                        }
                        r[mem] = val;
                        return r;
                    }
                }));
                let inject = exports.inject = ((prop, val) => lens(target => target, (target, ret) => {
                    if (val === ret[prop]) {
                        return target;
                    } else {
                        let r = Object.assign({}, ret);
                        r[prop] = val;
                        return r;
                    }
                }));
                let remove = exports.remove = (prop => lens(obj => obj, (obj, ret) => {
                    if (!prop in ret) {
                        return ret;
                    } else {
                        let r = Object.assign({}, ret);
                        delete r[prop];
                        return r;
                    }
                }));
                let where = exports.where = (predicate => {
                    return optic((target, next) => {
                        return predicate(target) ? next(target) : target;
                    }, false);
                });
                function traversal(operation) {
                    return new Optic((target, itr) => {
                        let {done: done, value: value} = itr ? itr.next() : {
                            done: true
                        };
                        if (done) {
                            return operation(target, id => id);
                        } else {
                            let lst = [];
                            while (!done) {
                                lst.push(value);
                                ({done: done, value: value} = itr.next());
                            }
                            let next = target => {
                                let itr = lst[Symbol.iterator]();
                                let {done: done, value: value} = itr.next();
                                let ret = done ? target : value.exec(target, itr);
                                if (itr.return) {
                                    itr.return();
                                }
                                return ret;
                            };
                            return operation(target, next);
                        }
                    });
                }
                let each = exports.each = (() => {
                    return traversal((target, next) => {
                        let r;
                        if (target instanceof Object) {
                            r = Object.keys(target).reduce((a, k) => {
                                a[k] = next(target[k]);
                                return a;
                            }, {});
                            return Object.keys(r).reduce((a, k) => {
                                return r[k] === a[k] ? a : r;
                            }, target);
                        } else if (target instanceof Array) {
                            r = target.reduce((a, e, i) => {
                                a[i] = next(e);
                                return a;
                            }, []);
                            return r.reduce((a, e, i) => {
                                return e === a[i] ? a : r;
                            }, target);
                        } else {
                            return target;
                        }
                    });
                });
                let join = pattern => {
                    let index = -1;
                    let input, output, result = {};
                    let keys = Object.keys(pattern);
                    return trusted((target, next) => {
                        if (index < 0) {
                            input = target;
                            index += 1;
                        } else if (index < keys.length) {
                            input[keys[index++]] = target;
                        }
                        if (index < keys.length) {
                            result[keys[index]] = next(input[keys[index]]);
                        } else {
                            output = next(input);
                        }
                        return --index < 0 ? result : output[keys[index]];
                    });
                };
                let parallelize = exports.parallelize = (pattern => {
                    return new Optic((target, itr) => {
                        let keys = Object.keys(pattern);
                        let joiner = join(pattern);
                        let r = compose(joiner, keys.map(k => [ pattern[k], joiner ])).exec(target, itr);
                        return Object.keys(r).concat(keys).reduce((a, k) => {
                            return r[k] === a[k] ? a : r;
                        }, target);
                    });
                });
            } ]);
        });
    } ]);
});