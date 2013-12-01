define([
], function () {
    'use strict';

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
            var notSmall = evt.wheelDelta < 0 && GAME_SCALE === GAME_SMALLEST_SCALE;

            // No zoom, the biggest version.
            var nonZoom = evt.wheelDelta > 0 && GAME_SCALE === GAME_BIGGEST_SCALE;

            return !notSmall || !nonZoom;
        },
        setScale: function (evt) {
            /**
             * Change SCALE value.
             * @type {number}
             */
            GAME_SCALE += 0.05 * (evt.wheelDelta / 10);

            /**
             * Secure for change SCALE not too small.
             */
            if (GAME_SCALE < GAME_SMALLEST_SCALE) {
                GAME_SCALE = GAME_SMALLEST_SCALE;
            }

            /**
             * Secure for change SCALE not too big.
             */
            if (GAME_SCALE > GAME_BIGGEST_SCALE) {
                GAME_SCALE = GAME_BIGGEST_SCALE;
            }
        },
        scale: function (evt) {
            if (this.canScale(evt)) {
                this.setScale(evt);
            }
        }
    };
    return ScaleHelper;
});

