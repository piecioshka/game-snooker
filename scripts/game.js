(function (global) {
    "use strict";

    var snooker = (global.snooker = global.snooker || {});
    var utils = (global.utils = global.utils || {});

    function setScale(evt) {
        snooker.SCALE += 0.05 * (evt.wheelDelta / 10);

        /**
         * Secure for not too small.
         */
        if (snooker.SCALE < 1) {
            snooker.SCALE = 1;
        }

        /**
         * Secure for not too big.
         */
        if (snooker.SCALE > 3) {
            snooker.SCALE = 3;
        }
    }

    utils.listener.add(window, "load", function () {
        snooker.init();
    });

    utils.listener.add(document, "mousewheel", function (evt) {
        setScale(evt);

        snooker.init();

        evt.preventDefault();
        evt.stopPropagation();
    });

}(this));
