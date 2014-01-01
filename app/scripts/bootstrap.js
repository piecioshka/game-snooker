define([
    'core/KeyHandler',
    'core/Game',
    'core/Lines'
], function (KeyHandler, Game, Lines) {
    'use strict';

    var stopEvent = function (e) {
        if (!e) return;
        if (_.isFunction(e.preventDefault)) {
            e.preventDefault();
        }
        if (_.isFunction(e.stopPropagation)) {
            e.stopPropagation();
        }
    };

    function bootstrap() {
        Game.initialize(function () {
            Game.drawTable();
            Game.drawBalls();
            // Game.drawCues();

            Lines.initialize({
                ctx: Game.table.ctx
            });

            var interval;

            function startAction(e) {
                clearInterval(interval);
                interval = setInterval(startAction, 50);
                KeyHandler.mouseDown();
                stopEvent(e);
            }
            function stopAction(e) {
                clearInterval(interval);
                KeyHandler.mouseUp(e);
                stopEvent(e);
            }

            _.each([
                "mousedown", "touchstart", "dragstart"
            ], function (event) {
                Events.bind(Game.table.canvas, event, startAction);
            });

            Events.bind(Game.table.canvas, 'mousemove', Lines.draw);

            _.each([
                "mouseup", "touchend", "touchcancel",
                "touchleave", "touchmove", "tap",
                "dbltap", "dragmove", "dragend"
            ], function (event) {
                Events.bind(Game.table.canvas, event, stopAction);
            });
        });
    }

    return {
        setup: function (fn) {
            bootstrap();
            fn(Game);
        }
    };

});

