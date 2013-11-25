require.config({
    paths: {
        events: "vendor/events/events",
        underscore: "vendor/underscore/underscore"
    },
    shim: {
        underscore: {
            exports: "_"
        },
        events: {
            exports: "Events"
        }
    }
});

/**
 * @see: http://webstuff.nfshost.com/anim-timing/Overview.html
 */
window.requestAnimFrame = (function() {
    return requestAnimationFrame    ||
        webkitRequestAnimationFrame ||
        mozRequestAnimationFrame    ||
        oRequestAnimationFrame      ||
        msRequestAnimationFrame     ||
        function(/* function */ callback, /* DOMElement */ element) {
            setTimeout(callback, 1000 / 60);
        };
})();


require([
    'bootstrap'
], function (Bootstrap) {
    Bootstrap.setup();
});
