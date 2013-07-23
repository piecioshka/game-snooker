(function (global) {
    "use strict";

    var snooker = (global.snooker = global.snooker || {});
    var utils = (global.utils = global.utils || {});

    utils.listener.add(window, "load", snooker.init);

}(this));
