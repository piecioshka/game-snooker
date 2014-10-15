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

// Game

window.GAME_SCALE = 2;
window.GAME_SMALLEST_SCALE = 1;
window.GAME_BIGGEST_SCALE = 3;

// Game states

window.GAME_READY = 0;
window.GAME_LOADING = 1;

window.GAME_WIDTH =  356.9 * GAME_SCALE;
window.GAME_HEIGHT = 177.8 * GAME_SCALE;

// Game hit limits

window.GAME_STRENGTH = 1;
window.GAME_MIN_POWER = 0;
window.GAME_MAX_POWER = 60;

// Table

window.TABLE_WIDTH = 410.5 * GAME_SCALE;
window.TABLE_HEIGHT = 229.5 * GAME_SCALE;

window.TABLE_LEFT_BOARD = (TABLE_WIDTH - GAME_WIDTH)/2;
window.TABLE_RIGHT_BOARD = TABLE_LEFT_BOARD + GAME_WIDTH;
window.TABLE_TOP_BOARD = (TABLE_HEIGHT - GAME_HEIGHT)/2;
window.TABLE_BOTTOM_BOARD = TABLE_TOP_BOARD + GAME_HEIGHT;

// Ball

window.BALL_RADIUS = 5.25 * GAME_SCALE;

// Ball states

window.BALL_READY = 0;
window.BALL_MOVING = 1;
window.BALL_REMOVED = 2;

// Cue

window.CUE_WIDTH = 514;
window.CUE_HEIGHT = 4;

require([
    'bootstrap'
], function (Bootstrap) {
    Bootstrap.setup(function (Game) {
        window.Game = Game;
    });
});
