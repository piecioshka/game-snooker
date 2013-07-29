(function (global) {
    "use strict";

    var utils = (global.utils = global.utils || {});
    var listener = (utils.listener = utils.listener || {});

    listener.add = function (obj, name, callback) {
        if (obj.addEventListener) {
            obj.addEventListener(name, callback);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + name, callback);
        } else {
            obj["on" + name] = callback;
        }
    };

}(this));
