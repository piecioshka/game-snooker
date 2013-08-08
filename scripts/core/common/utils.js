(function (global) {
    "use strict";

    // imports
    var utils = (global.utils = global.utils || {});
    var listener = (utils.listener = utils.listener || {});
    var event = (utils.event = utils.event || {});

    /**
     * @param {Object} obj
     * @param {string} name
     * @param {Function} callback
     */
    listener.add = function (obj, name, callback) {
        if (obj.addEventListener) {
            obj.addEventListener(name, callback);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + name, callback);
        } else {
            obj["on" + name] = callback;
        }
    };

    event.disable = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
    };

}(this));
