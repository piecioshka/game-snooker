(function () {
    "use strict";

    // some utils staff

    var global = this;

    // redefine console
    var _old_console_log = console.log;

    console.log = function () {
        var args = Array.prototype.slice.call(arguments);
        var date = get_date();
        args.unshift("[" + date + " game] ");
        _old_console_log.apply(console, args);
    };

    function get_date() {
        var lpad = pklib.string.lpad;

        var date = (new Date()),
            hour = lpad(date.getHours(), 2, "0"),
            minutes = lpad(date.getMinutes(), 2, "0"),
            seconds = lpad(date.getSeconds(), 2, "0"),
            milliseconds = lpad(date.getMilliseconds(), 3, "0");
        return hour + ":" + minutes + ":" + seconds + "." + milliseconds;
    }

}).call(this);
