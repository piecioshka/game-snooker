(function (global) {
    "use strict";

    // imports
    var _ = global._;
    var Game = (global.Game = global.Game || {});

    /**
     * @class
     * @constructor
     * @type {ScaleHelper}
     */
    function ScaleHelper() {
        // empty
    }

    ScaleHelper.prototype = {
        canScale: function (evt) {
            /**
             * No small, smallest version.
             */
            if (evt.wheelDelta < 0 && Game.SCALE === Game.SMALLEST_SCALE) {
                return false;
            }

            /**
             * No zoom, the biggest version.
             */
            if (evt.wheelDelta > 0 && Game.SCALE === Game.BIGGEST_SCALE) {
                return false;
            }

            return true;
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
