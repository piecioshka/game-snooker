(function (global) {
    "use strict";

    // imports
    var _ = global._;
    var Game = (global.Game = global.Game || {});

    function ScaleHelper() {

    }

    ScaleHelper.prototype.canScale = function (evt) {
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
    };

    ScaleHelper.prototype.setScale = function (evt) {
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
    };

    ScaleHelper.prototype.scale = function (evt) {
        if (this.canScale(evt)) {
            this.setScale(evt);
        }
    };

    // exports
    global.ScaleHelper = ScaleHelper;

}(this));
