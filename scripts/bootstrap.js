(function (global) {
    'use strict';

    // imports
    var snooker = global.snooker;
    var KeyHandler = global.KeyHandler;

    var stopEvent = function (e) {
        if (!e) {
            return;
        }
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

            snooker.Lines.initialize({
                ctx: snooker.table.ctx
            });

            (function (can) {
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
                    Events.bind(can, event, startAction);
                });

                Events.bind(can, 'mousemove', snooker.Lines.draw);

                _.each([
                    "mouseup", "touchend", "touchcancel",
                    "touchleave", "touchmove", "tap",
                    "dbltap", "dragmove", "dragend"
                ], function (event) {
                    Events.bind(can, event, stopAction);
                });
            }(snooker.table.canvas));
        });
    }

    Events.ready(bootstrap);
}(this));