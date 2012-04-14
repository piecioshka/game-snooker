snooker = this.snooker || {};

snooker.log = function () {
	if (window.console && console.log) {
	    var args = Array.prototype.slice.call(arguments);
		console.log(args.join(" "));
	}
}

snooker.info = function () {
	if (window.console && console.info) {
        var args = Array.prototype.slice.call(arguments);
		console.info(args.join(" "));
	}
}

snooker.error = function () {
	if (window.console && console.error) {
        var args = Array.prototype.slice.call(arguments);
		console.error(args.join(" "));
	}
}

snooker.warn = function () {
	if (window.console && console.warn) {
        var args = Array.prototype.slice.call(arguments);
		console.warn(args.join(" "));
	}
}
