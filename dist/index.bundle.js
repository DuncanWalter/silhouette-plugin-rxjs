(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(require("silhouette-core")); else if (typeof define === "function" && define.amd) define([ "silhouette-core" ], factory); else if (typeof exports === "object") exports["silhouette"] = factory(require("silhouette-core")); else root["silhouette"] = factory(root["silhouette-core"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_20__) {
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
        return __webpack_require__(__webpack_require__.s = 8);
    }([ function(module, exports, __webpack_require__) {
        "use strict";
        (function(global) {
            var __window = typeof window !== "undefined" && window;
            var __self = typeof self !== "undefined" && typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && self;
            var __global = typeof global !== "undefined" && global;
            var _root = __window || __global || __self;
            exports.root = _root;
            (function() {
                if (!_root) {
                    throw new Error("RxJS could not find any global context (window, self, global)");
                }
            })();
        }).call(exports, __webpack_require__(12));
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var isArray_1 = __webpack_require__(14);
        var isObject_1 = __webpack_require__(15);
        var isFunction_1 = __webpack_require__(4);
        var tryCatch_1 = __webpack_require__(16);
        var errorObject_1 = __webpack_require__(5);
        var UnsubscriptionError_1 = __webpack_require__(17);
        var Subscription = function() {
            function Subscription(unsubscribe) {
                this.closed = false;
                this._parent = null;
                this._parents = null;
                this._subscriptions = null;
                if (unsubscribe) {
                    this._unsubscribe = unsubscribe;
                }
            }
            Subscription.prototype.unsubscribe = function() {
                var hasErrors = false;
                var errors;
                if (this.closed) {
                    return;
                }
                var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
                this.closed = true;
                this._parent = null;
                this._parents = null;
                this._subscriptions = null;
                var index = -1;
                var len = _parents ? _parents.length : 0;
                while (_parent) {
                    _parent.remove(this);
                    _parent = ++index < len && _parents[index] || null;
                }
                if (isFunction_1.isFunction(_unsubscribe)) {
                    var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ? flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [ errorObject_1.errorObject.e ]);
                    }
                }
                if (isArray_1.isArray(_subscriptions)) {
                    index = -1;
                    len = _subscriptions.length;
                    while (++index < len) {
                        var sub = _subscriptions[index];
                        if (isObject_1.isObject(sub)) {
                            var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                            if (trial === errorObject_1.errorObject) {
                                hasErrors = true;
                                errors = errors || [];
                                var err = errorObject_1.errorObject.e;
                                if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                                    errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                                } else {
                                    errors.push(err);
                                }
                            }
                        }
                    }
                }
                if (hasErrors) {
                    throw new UnsubscriptionError_1.UnsubscriptionError(errors);
                }
            };
            Subscription.prototype.add = function(teardown) {
                if (!teardown || teardown === Subscription.EMPTY) {
                    return Subscription.EMPTY;
                }
                if (teardown === this) {
                    return this;
                }
                var subscription = teardown;
                switch (typeof teardown) {
                  case "function":
                    subscription = new Subscription(teardown);

                  case "object":
                    if (subscription.closed || typeof subscription.unsubscribe !== "function") {
                        return subscription;
                    } else if (this.closed) {
                        subscription.unsubscribe();
                        return subscription;
                    } else if (typeof subscription._addParent !== "function") {
                        var tmp = subscription;
                        subscription = new Subscription();
                        subscription._subscriptions = [ tmp ];
                    }
                    break;

                  default:
                    throw new Error("unrecognized teardown " + teardown + " added to Subscription.");
                }
                var subscriptions = this._subscriptions || (this._subscriptions = []);
                subscriptions.push(subscription);
                subscription._addParent(this);
                return subscription;
            };
            Subscription.prototype.remove = function(subscription) {
                var subscriptions = this._subscriptions;
                if (subscriptions) {
                    var subscriptionIndex = subscriptions.indexOf(subscription);
                    if (subscriptionIndex !== -1) {
                        subscriptions.splice(subscriptionIndex, 1);
                    }
                }
            };
            Subscription.prototype._addParent = function(parent) {
                var _a = this, _parent = _a._parent, _parents = _a._parents;
                if (!_parent || _parent === parent) {
                    this._parent = parent;
                } else if (!_parents) {
                    this._parents = [ parent ];
                } else if (_parents.indexOf(parent) === -1) {
                    _parents.push(parent);
                }
            };
            Subscription.EMPTY = function(empty) {
                empty.closed = true;
                return empty;
            }(new Subscription());
            return Subscription;
        }();
        exports.Subscription = Subscription;
        function flattenUnsubscriptionErrors(errors) {
            return errors.reduce(function(errs, err) {
                return errs.concat(err instanceof UnsubscriptionError_1.UnsubscriptionError ? err.errors : err);
            }, []);
        }
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var root_1 = __webpack_require__(0);
        var Symbol = root_1.root.Symbol;
        exports.rxSubscriber = typeof Symbol === "function" && typeof Symbol.for === "function" ? Symbol.for("rxSubscriber") : "@@rxSubscriber";
        exports.$$rxSubscriber = exports.rxSubscriber;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = undefined && undefined.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var isFunction_1 = __webpack_require__(4);
        var Subscription_1 = __webpack_require__(1);
        var Observer_1 = __webpack_require__(6);
        var rxSubscriber_1 = __webpack_require__(2);
        var Subscriber = function(_super) {
            __extends(Subscriber, _super);
            function Subscriber(destinationOrNext, error, complete) {
                _super.call(this);
                this.syncErrorValue = null;
                this.syncErrorThrown = false;
                this.syncErrorThrowable = false;
                this.isStopped = false;
                switch (arguments.length) {
                  case 0:
                    this.destination = Observer_1.empty;
                    break;

                  case 1:
                    if (!destinationOrNext) {
                        this.destination = Observer_1.empty;
                        break;
                    }
                    if (typeof destinationOrNext === "object") {
                        if (destinationOrNext instanceof Subscriber) {
                            this.destination = destinationOrNext;
                            this.destination.add(this);
                        } else {
                            this.syncErrorThrowable = true;
                            this.destination = new SafeSubscriber(this, destinationOrNext);
                        }
                        break;
                    }

                  default:
                    this.syncErrorThrowable = true;
                    this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                    break;
                }
            }
            Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function() {
                return this;
            };
            Subscriber.create = function(next, error, complete) {
                var subscriber = new Subscriber(next, error, complete);
                subscriber.syncErrorThrowable = false;
                return subscriber;
            };
            Subscriber.prototype.next = function(value) {
                if (!this.isStopped) {
                    this._next(value);
                }
            };
            Subscriber.prototype.error = function(err) {
                if (!this.isStopped) {
                    this.isStopped = true;
                    this._error(err);
                }
            };
            Subscriber.prototype.complete = function() {
                if (!this.isStopped) {
                    this.isStopped = true;
                    this._complete();
                }
            };
            Subscriber.prototype.unsubscribe = function() {
                if (this.closed) {
                    return;
                }
                this.isStopped = true;
                _super.prototype.unsubscribe.call(this);
            };
            Subscriber.prototype._next = function(value) {
                this.destination.next(value);
            };
            Subscriber.prototype._error = function(err) {
                this.destination.error(err);
                this.unsubscribe();
            };
            Subscriber.prototype._complete = function() {
                this.destination.complete();
                this.unsubscribe();
            };
            Subscriber.prototype._unsubscribeAndRecycle = function() {
                var _a = this, _parent = _a._parent, _parents = _a._parents;
                this._parent = null;
                this._parents = null;
                this.unsubscribe();
                this.closed = false;
                this.isStopped = false;
                this._parent = _parent;
                this._parents = _parents;
                return this;
            };
            return Subscriber;
        }(Subscription_1.Subscription);
        exports.Subscriber = Subscriber;
        var SafeSubscriber = function(_super) {
            __extends(SafeSubscriber, _super);
            function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
                _super.call(this);
                this._parentSubscriber = _parentSubscriber;
                var next;
                var context = this;
                if (isFunction_1.isFunction(observerOrNext)) {
                    next = observerOrNext;
                } else if (observerOrNext) {
                    next = observerOrNext.next;
                    error = observerOrNext.error;
                    complete = observerOrNext.complete;
                    if (observerOrNext !== Observer_1.empty) {
                        context = Object.create(observerOrNext);
                        if (isFunction_1.isFunction(context.unsubscribe)) {
                            this.add(context.unsubscribe.bind(context));
                        }
                        context.unsubscribe = this.unsubscribe.bind(this);
                    }
                }
                this._context = context;
                this._next = next;
                this._error = error;
                this._complete = complete;
            }
            SafeSubscriber.prototype.next = function(value) {
                if (!this.isStopped && this._next) {
                    var _parentSubscriber = this._parentSubscriber;
                    if (!_parentSubscriber.syncErrorThrowable) {
                        this.__tryOrUnsub(this._next, value);
                    } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                        this.unsubscribe();
                    }
                }
            };
            SafeSubscriber.prototype.error = function(err) {
                if (!this.isStopped) {
                    var _parentSubscriber = this._parentSubscriber;
                    if (this._error) {
                        if (!_parentSubscriber.syncErrorThrowable) {
                            this.__tryOrUnsub(this._error, err);
                            this.unsubscribe();
                        } else {
                            this.__tryOrSetError(_parentSubscriber, this._error, err);
                            this.unsubscribe();
                        }
                    } else if (!_parentSubscriber.syncErrorThrowable) {
                        this.unsubscribe();
                        throw err;
                    } else {
                        _parentSubscriber.syncErrorValue = err;
                        _parentSubscriber.syncErrorThrown = true;
                        this.unsubscribe();
                    }
                }
            };
            SafeSubscriber.prototype.complete = function() {
                var _this = this;
                if (!this.isStopped) {
                    var _parentSubscriber = this._parentSubscriber;
                    if (this._complete) {
                        var wrappedComplete = function() {
                            return _this._complete.call(_this._context);
                        };
                        if (!_parentSubscriber.syncErrorThrowable) {
                            this.__tryOrUnsub(wrappedComplete);
                            this.unsubscribe();
                        } else {
                            this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                            this.unsubscribe();
                        }
                    } else {
                        this.unsubscribe();
                    }
                }
            };
            SafeSubscriber.prototype.__tryOrUnsub = function(fn, value) {
                try {
                    fn.call(this._context, value);
                } catch (err) {
                    this.unsubscribe();
                    throw err;
                }
            };
            SafeSubscriber.prototype.__tryOrSetError = function(parent, fn, value) {
                try {
                    fn.call(this._context, value);
                } catch (err) {
                    parent.syncErrorValue = err;
                    parent.syncErrorThrown = true;
                    return true;
                }
                return false;
            };
            SafeSubscriber.prototype._unsubscribe = function() {
                var _parentSubscriber = this._parentSubscriber;
                this._context = null;
                this._parentSubscriber = null;
                _parentSubscriber.unsubscribe();
            };
            return SafeSubscriber;
        }(Subscriber);
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function isFunction(x) {
            return typeof x === "function";
        }
        exports.isFunction = isFunction;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        exports.errorObject = {
            e: {}
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        exports.empty = {
            closed: true,
            next: function(value) {},
            error: function(err) {
                throw err;
            },
            complete: function() {}
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = undefined && undefined.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var ObjectUnsubscribedError = function(_super) {
            __extends(ObjectUnsubscribedError, _super);
            function ObjectUnsubscribedError() {
                var err = _super.call(this, "object unsubscribed");
                this.name = err.name = "ObjectUnsubscribedError";
                this.stack = err.stack;
                this.message = err.message;
            }
            return ObjectUnsubscribedError;
        }(Error);
        exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var _BehaviorSubject = __webpack_require__(9);
        var _silhouetteCore = __webpack_require__(20);
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
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = undefined && undefined.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var Subject_1 = __webpack_require__(10);
        var ObjectUnsubscribedError_1 = __webpack_require__(7);
        var BehaviorSubject = function(_super) {
            __extends(BehaviorSubject, _super);
            function BehaviorSubject(_value) {
                _super.call(this);
                this._value = _value;
            }
            Object.defineProperty(BehaviorSubject.prototype, "value", {
                get: function() {
                    return this.getValue();
                },
                enumerable: true,
                configurable: true
            });
            BehaviorSubject.prototype._subscribe = function(subscriber) {
                var subscription = _super.prototype._subscribe.call(this, subscriber);
                if (subscription && !subscription.closed) {
                    subscriber.next(this._value);
                }
                return subscription;
            };
            BehaviorSubject.prototype.getValue = function() {
                if (this.hasError) {
                    throw this.thrownError;
                } else if (this.closed) {
                    throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                } else {
                    return this._value;
                }
            };
            BehaviorSubject.prototype.next = function(value) {
                _super.prototype.next.call(this, this._value = value);
            };
            return BehaviorSubject;
        }(Subject_1.Subject);
        exports.BehaviorSubject = BehaviorSubject;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = undefined && undefined.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var Observable_1 = __webpack_require__(11);
        var Subscriber_1 = __webpack_require__(3);
        var Subscription_1 = __webpack_require__(1);
        var ObjectUnsubscribedError_1 = __webpack_require__(7);
        var SubjectSubscription_1 = __webpack_require__(19);
        var rxSubscriber_1 = __webpack_require__(2);
        var SubjectSubscriber = function(_super) {
            __extends(SubjectSubscriber, _super);
            function SubjectSubscriber(destination) {
                _super.call(this, destination);
                this.destination = destination;
            }
            return SubjectSubscriber;
        }(Subscriber_1.Subscriber);
        exports.SubjectSubscriber = SubjectSubscriber;
        var Subject = function(_super) {
            __extends(Subject, _super);
            function Subject() {
                _super.call(this);
                this.observers = [];
                this.closed = false;
                this.isStopped = false;
                this.hasError = false;
                this.thrownError = null;
            }
            Subject.prototype[rxSubscriber_1.rxSubscriber] = function() {
                return new SubjectSubscriber(this);
            };
            Subject.prototype.lift = function(operator) {
                var subject = new AnonymousSubject(this, this);
                subject.operator = operator;
                return subject;
            };
            Subject.prototype.next = function(value) {
                if (this.closed) {
                    throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                }
                if (!this.isStopped) {
                    var observers = this.observers;
                    var len = observers.length;
                    var copy = observers.slice();
                    for (var i = 0; i < len; i++) {
                        copy[i].next(value);
                    }
                }
            };
            Subject.prototype.error = function(err) {
                if (this.closed) {
                    throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                }
                this.hasError = true;
                this.thrownError = err;
                this.isStopped = true;
                var observers = this.observers;
                var len = observers.length;
                var copy = observers.slice();
                for (var i = 0; i < len; i++) {
                    copy[i].error(err);
                }
                this.observers.length = 0;
            };
            Subject.prototype.complete = function() {
                if (this.closed) {
                    throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                }
                this.isStopped = true;
                var observers = this.observers;
                var len = observers.length;
                var copy = observers.slice();
                for (var i = 0; i < len; i++) {
                    copy[i].complete();
                }
                this.observers.length = 0;
            };
            Subject.prototype.unsubscribe = function() {
                this.isStopped = true;
                this.closed = true;
                this.observers = null;
            };
            Subject.prototype._trySubscribe = function(subscriber) {
                if (this.closed) {
                    throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                } else {
                    return _super.prototype._trySubscribe.call(this, subscriber);
                }
            };
            Subject.prototype._subscribe = function(subscriber) {
                if (this.closed) {
                    throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                } else if (this.hasError) {
                    subscriber.error(this.thrownError);
                    return Subscription_1.Subscription.EMPTY;
                } else if (this.isStopped) {
                    subscriber.complete();
                    return Subscription_1.Subscription.EMPTY;
                } else {
                    this.observers.push(subscriber);
                    return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
                }
            };
            Subject.prototype.asObservable = function() {
                var observable = new Observable_1.Observable();
                observable.source = this;
                return observable;
            };
            Subject.create = function(destination, source) {
                return new AnonymousSubject(destination, source);
            };
            return Subject;
        }(Observable_1.Observable);
        exports.Subject = Subject;
        var AnonymousSubject = function(_super) {
            __extends(AnonymousSubject, _super);
            function AnonymousSubject(destination, source) {
                _super.call(this);
                this.destination = destination;
                this.source = source;
            }
            AnonymousSubject.prototype.next = function(value) {
                var destination = this.destination;
                if (destination && destination.next) {
                    destination.next(value);
                }
            };
            AnonymousSubject.prototype.error = function(err) {
                var destination = this.destination;
                if (destination && destination.error) {
                    this.destination.error(err);
                }
            };
            AnonymousSubject.prototype.complete = function() {
                var destination = this.destination;
                if (destination && destination.complete) {
                    this.destination.complete();
                }
            };
            AnonymousSubject.prototype._subscribe = function(subscriber) {
                var source = this.source;
                if (source) {
                    return this.source.subscribe(subscriber);
                } else {
                    return Subscription_1.Subscription.EMPTY;
                }
            };
            return AnonymousSubject;
        }(Subject);
        exports.AnonymousSubject = AnonymousSubject;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var root_1 = __webpack_require__(0);
        var toSubscriber_1 = __webpack_require__(13);
        var observable_1 = __webpack_require__(18);
        var Observable = function() {
            function Observable(subscribe) {
                this._isScalar = false;
                if (subscribe) {
                    this._subscribe = subscribe;
                }
            }
            Observable.prototype.lift = function(operator) {
                var observable = new Observable();
                observable.source = this;
                observable.operator = operator;
                return observable;
            };
            Observable.prototype.subscribe = function(observerOrNext, error, complete) {
                var operator = this.operator;
                var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
                if (operator) {
                    operator.call(sink, this.source);
                } else {
                    sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
                }
                if (sink.syncErrorThrowable) {
                    sink.syncErrorThrowable = false;
                    if (sink.syncErrorThrown) {
                        throw sink.syncErrorValue;
                    }
                }
                return sink;
            };
            Observable.prototype._trySubscribe = function(sink) {
                try {
                    return this._subscribe(sink);
                } catch (err) {
                    sink.syncErrorThrown = true;
                    sink.syncErrorValue = err;
                    sink.error(err);
                }
            };
            Observable.prototype.forEach = function(next, PromiseCtor) {
                var _this = this;
                if (!PromiseCtor) {
                    if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                        PromiseCtor = root_1.root.Rx.config.Promise;
                    } else if (root_1.root.Promise) {
                        PromiseCtor = root_1.root.Promise;
                    }
                }
                if (!PromiseCtor) {
                    throw new Error("no Promise impl found");
                }
                return new PromiseCtor(function(resolve, reject) {
                    var subscription;
                    subscription = _this.subscribe(function(value) {
                        if (subscription) {
                            try {
                                next(value);
                            } catch (err) {
                                reject(err);
                                subscription.unsubscribe();
                            }
                        } else {
                            next(value);
                        }
                    }, reject, resolve);
                });
            };
            Observable.prototype._subscribe = function(subscriber) {
                return this.source.subscribe(subscriber);
            };
            Observable.prototype[observable_1.observable] = function() {
                return this;
            };
            Observable.create = function(subscribe) {
                return new Observable(subscribe);
            };
            return Observable;
        }();
        exports.Observable = Observable;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var g;
        g = function() {
            return this;
        }();
        try {
            g = g || Function("return this")() || (1, eval)("this");
        } catch (e) {
            if (typeof window === "object") g = window;
        }
        module.exports = g;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var Subscriber_1 = __webpack_require__(3);
        var rxSubscriber_1 = __webpack_require__(2);
        var Observer_1 = __webpack_require__(6);
        function toSubscriber(nextOrObserver, error, complete) {
            if (nextOrObserver) {
                if (nextOrObserver instanceof Subscriber_1.Subscriber) {
                    return nextOrObserver;
                }
                if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
                    return nextOrObserver[rxSubscriber_1.rxSubscriber]();
                }
            }
            if (!nextOrObserver && !error && !complete) {
                return new Subscriber_1.Subscriber(Observer_1.empty);
            }
            return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
        }
        exports.toSubscriber = toSubscriber;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        exports.isArray = Array.isArray || function(x) {
            return x && typeof x.length === "number";
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function isObject(x) {
            return x != null && typeof x === "object";
        }
        exports.isObject = isObject;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var errorObject_1 = __webpack_require__(5);
        var tryCatchTarget;
        function tryCatcher() {
            try {
                return tryCatchTarget.apply(this, arguments);
            } catch (e) {
                errorObject_1.errorObject.e = e;
                return errorObject_1.errorObject;
            }
        }
        function tryCatch(fn) {
            tryCatchTarget = fn;
            return tryCatcher;
        }
        exports.tryCatch = tryCatch;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = undefined && undefined.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var UnsubscriptionError = function(_super) {
            __extends(UnsubscriptionError, _super);
            function UnsubscriptionError(errors) {
                _super.call(this);
                this.errors = errors;
                var err = Error.call(this, errors ? errors.length + " errors occurred during unsubscription:\n  " + errors.map(function(err, i) {
                    return i + 1 + ") " + err.toString();
                }).join("\n  ") : "");
                this.name = err.name = "UnsubscriptionError";
                this.stack = err.stack;
                this.message = err.message;
            }
            return UnsubscriptionError;
        }(Error);
        exports.UnsubscriptionError = UnsubscriptionError;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var root_1 = __webpack_require__(0);
        function getSymbolObservable(context) {
            var $$observable;
            var Symbol = context.Symbol;
            if (typeof Symbol === "function") {
                if (Symbol.observable) {
                    $$observable = Symbol.observable;
                } else {
                    $$observable = Symbol("observable");
                    Symbol.observable = $$observable;
                }
            } else {
                $$observable = "@@observable";
            }
            return $$observable;
        }
        exports.getSymbolObservable = getSymbolObservable;
        exports.observable = getSymbolObservable(root_1.root);
        exports.$$observable = exports.observable;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var __extends = undefined && undefined.__extends || function(d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
        var Subscription_1 = __webpack_require__(1);
        var SubjectSubscription = function(_super) {
            __extends(SubjectSubscription, _super);
            function SubjectSubscription(subject, subscriber) {
                _super.call(this);
                this.subject = subject;
                this.subscriber = subscriber;
                this.closed = false;
            }
            SubjectSubscription.prototype.unsubscribe = function() {
                if (this.closed) {
                    return;
                }
                this.closed = true;
                var subject = this.subject;
                var observers = subject.observers;
                this.subject = null;
                if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
                    return;
                }
                var subscriberIndex = observers.indexOf(this.subscriber);
                if (subscriberIndex !== -1) {
                    observers.splice(subscriberIndex, 1);
                }
            };
            return SubjectSubscription;
        }(Subscription_1.Subscription);
        exports.SubjectSubscription = SubjectSubscription;
    }, function(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_20__;
    } ]);
});