(function (root) {
    'use strict';

    var EventEmitter = {

        /**
         * Register listener.
         *
         * @param {string} name
         * @param {Function} fn
         * @param {Object} [ctx]
         */
        on: function on(name, fn, ctx) {
            assert(_.isString(name), 'EventEmitter#on: `name` is not a string');
            assert(_.isFunction(fn), 'EventEmitter#on: `fn` is not a function');

            if (!_.isArray(this._listeners)) {
                this._listeners = [];
            }

            // Push to private lists of listeners.
            this._listeners.push({
                name: name,
                fn: fn,
                // If the context is not passed, use `this`.
                ctx: ctx || this
            });
        },

        /**
         * Register listener. Remove them after once event triggered.
         *
         * @param {string} name
         * @param {Function} fn
         * @param {Object} [ctx]
         */
        once: function (name, fn, ctx) {
            ctx = ctx || this;

            var self = this;
            var handle = function () {
                fn.apply(ctx, arguments);
                self.off(name, handle);
            };
            this.on(name, handle, ctx);
        },

        /**
         * Unregister listener.
         *
         * @param {string} [name]
         * @param {Function} [fn]
         */
        off: function (name, fn) {
            if (!_.isArray(this._listeners)) {
                this._listeners = [];
            }

            _.each(this._listeners, function (listener, index) {
                if (name) {
                    if (listener.name === name) {
                        if (_.isFunction(fn)) {
                            if (listener.fn === fn) {
                                this._listeners.splice(index, 1);
                            }
                        } else {
                            this._listeners.splice(index, 1);
                        }
                    }
                } else {
                    this._listeners.splice(index, 1);
                }
            }, this);
        },

        /**
         * Trigger event.
         *
         * @param {string} name
         * @param {Object} [params]
         */
        emit: function emit(name, params) {
            assert(_.isString(name), 'EventEmitter#emit: `name` is not a string');

            if (!_.isArray(this._listeners)) {
                this._listeners = [];
            }

            _.each(this._listeners, function (event) {
                if (event.name === name) {
                    event.fn.call(event.ctx, params);
                }
            });
        }

    };
    
    function assert(condition, message) {
        if (!condition) {
            throw new Error('Assertion error' || message);
        }
    }

    // Export `EventEmitter`.
    return (root.EventEmitter = EventEmitter);

}(this));
