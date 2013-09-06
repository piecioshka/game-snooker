(function (global) {
    'use strict';

    // imports
    var Game = (global.Game = global.Game || {});

    /**
     * @class
     * @constructor
     */
    function ScaleHelper() {
        // empty
    }

    ScaleHelper.prototype = {
        canScale: function (evt) {
            // No small, smallest version.
            var notSmall = evt.wheelDelta < 0 && Game.SCALE === Game.SMALLEST_SCALE;

            // No zoom, the biggest version.
            var nonZoom = evt.wheelDelta > 0 && Game.SCALE === Game.BIGGEST_SCALE;

            return !notSmall || !nonZoom;
        },
        setScale: function (evt) {
            /**
             * Change SCALE value.
             * @type {number}
             */
            Game.SCALE += 0.05 * (evt.wheelDelta / 10);

            /**
             * Secure for change SCALE not too small.
             */
            if (Game.SCALE < Game.SMALLEST_SCALE) {
                Game.SCALE = Game.SMALLEST_SCALE;
            }

            /**
             * Secure for change SCALE not too big.
             */
            if (Game.SCALE > Game.BIGGEST_SCALE) {
                Game.SCALE = Game.BIGGEST_SCALE;
            }
        },
        scale: function (evt) {
            if (this.canScale(evt)) {
                this.setScale(evt);
            }
        }
    };

    // exports
    global.ScaleHelper = ScaleHelper;

}(this));
