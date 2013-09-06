(function (global) {
    'use strict';

    // imports
    var snooker = (global.snooker = global.snooker || {});
    var Game = (global.Game = global.Game || {});

    global.KeyHandler = {
        mouseDown: function () {
            // If current ball in during animation do nothing.
            if (this.currentBall.status !== snooker.Ball.READY) {
                return;
            }

            if (Game.velocity === Game.MIN_POWER) {
                Game.velocity = Game.STRENGTH;
            } else {
                Game.velocity += Game.STRENGTH;
            }

            // Limit to maximum power in game.
            if (Game.velocity > Game.MAX_POWER) {
                Game.velocity = Game.MAX_POWER;
            }

            var powerView = +(Game.velocity * 100 / Game.MAX_POWER);
            this.currentBall.updatePowerBar(powerView);
        },
        mouseUp: function (e) {
            // If current ball in during animation do nothing.
            if (this.currentBall.status !== snooker.Ball.READY) {
                return;
            }

            var pos = this.currentBall.position;
            var radius = snooker.Ball.RADIUS;

            var cursorX = e.layerX || e.eventObject().layerX || e.offsetX;
            var cursorY = e.layerY || e.eventObject().layerY || e.offsetY;

            this.currentBall.move({
                x: (pos.x + radius - cursorX) / 100,
                y: (pos.y + radius - cursorY) /100
            }, Game.velocity);

            Game.velocity = 0;
        }
    };

}(this));