(function (global) {
    "use strict";

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
            this.currentBall.updatePower(powerView);
        },

        mouseUp: function (e) {
            // If current ball in during animation do nothing.
            if (this.currentBall.status !== snooker.Ball.READY) {
                return;
            }

            this.currentBall.move({
                x: (this.currentBall.position.x - e.layerX) / 100,
                y: (this.currentBall.position.y - e.layerY) /100
            }, Game.velocity);
            Game.velocity = 0;
        }
    };

}(this));