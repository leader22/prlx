(function(global, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return factory(global, {});
        });
    } else if ('process' in global) {
        throw new Error('This module is only for browsers.');
    } else {
        global.Prlx = factory(global, {});
    }

}((this.self || global), function(global, Prlx, undefined) {
    'use strict';

    Prlx = function(options) {
        this.options = {
            fps: options.fps || 30,
            raf: options.raf || false
        };

        this._interval = null;
        this._methods  = {
            start: 'setTimeout   or requestAnimationFrame',
            stop:  'clearTimeout or cancelAnimationFrame'
        };

        this.handler = null;

        this.timer     = null;
        this.isStarted = false;

        this.initialize();
        return this;
    };

    Prlx.prototype = {
        constructor: Prlx,

        initialize: function() {
            this._interval = 1000 / this.options.fps;
            this._methods = (this.options.raf) ? {
                start: 'requestAnimationFrame',
                stop:  'cancelAnimationFrame'
            } : {
                start: 'setTimeout',
                stop:  'clearTimeout'
            };

            return this;
        },

        onScroll: function(handler) {
            var handler = handler.handleEvent ? handler.handleEvent : handler;
            if (handler === this.handler) { return false; }

            this.handler = handler;
        },

        start: function() {
            if (this.isStarted) {
                console.warn('Already started.');
                return;
            }
            if (this.handler === null) {
                console.warn('Handler is not defined.');
                return;
            }

            this._loop();
            this.isStarted = true;
        },

        dispose: function() {
            if (!this.isStarted) {
                console.warn('Not started.');
                return;
            }

            global[this._methods.stop](this.timer);
            this.timer = this.handler = null;
        },

        _loop: function() {
            var that = this;

            this.handler({
                x: global.scrollX,
                y: global.scrollY
            });

            this.timer = global[this._methods.start](function() { that._loop(); }, this._interval);
        }
    };

    return Prlx;
}));
