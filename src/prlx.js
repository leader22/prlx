module.exports = (function(global) {
    'use strict';

    const Eve = require('./eve');

    class Prlx extends Eve {
        constructor(options) {
            super();
            this.options = {
                fps: options.fps || 30,
                raf: options.raf || false
            };

            this.posX  = 0;
            this.posY  = 0;
            this.timer = null;

            this.isStarted = false;

            return this;
        }

        handleEvent() {
            this.posX = global.scrollX;
            this.posY = global.scrollY;
        }

        _loop() {
            this.trigger('scroll', { x: this.posX, y: this.posY });

            let interval = 1000 / this.options.fps;
            let loopFunc = (this.options.raf) ? 'requestAnimationFrame' : 'setTimeout';
            this.timer = global[loopFunc](() => { this._loop(); }, interval);
        }

        start() {
            if (this.isStarted) {
                console.warn('Already started.');
                return;
            }

            global.addEventListener('scroll', this, false);
            this._loop();
            this.isStarted = true;
        }

        dispose() {
            let clearFunc = (this.options.raf) ? 'cancelAnimationFrame' : 'clearTimeout';
            global[clearFunc](this.timer);
            this.timer = null;
            global.removeEventListener('scroll', this, false);
        }
    }

    return Prlx;

}(this.self || global));
