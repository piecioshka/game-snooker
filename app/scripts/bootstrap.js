define([
    'core/snooker',
    'core/KeyHandler',
    'core/Game',
    'core/Lines'
], function (snooker, KeyHandler, Game, Lines) {
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
            snooker.drawTable();
            snooker.drawBalls();
            // snooker.drawCues();

            Lines.initialize({
                ctx: snooker.table.ctx
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
                Events.bind(snooker.table.canvas, event, startAction);
            });

            Events.bind(snooker.table.canvas, 'mousemove', Lines.draw);

            _.each([
                "mouseup", "touchend", "touchcancel",
                "touchleave", "touchmove", "tap",
                "dbltap", "dragmove", "dragend"
            ], function (event) {
                Events.bind(snooker.table.canvas, event, stopAction);
            });
        });
    }

    return {
        setup: function () {
            bootstrap();
        }
    };

});

