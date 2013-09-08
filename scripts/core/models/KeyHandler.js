(function (global) {
    'use strict';

    // imports
    var snooker = (global.snooker = global.snooker || {});
    var Game = (global.Game = global.Game || {});

    global.KeyHandler = {
        mouseDown: function () {
            // If current ball in during animation do nothing.
            if (Game.currentBall.status !== snooker.Ball.READY) {
                return;
            }

            if (Game.power === Game.MIN_POWER) {
                Game.power = Game.STRENGTH;
            } else {
                Game.power += Game.STRENGTH;
            }

            // Limit to maximum power in game.
            if (Game.power > Game.MAX_POWER) {
                Game.power = Game.MAX_POWER;
            }

            var powerView = +(Game.power * 100 / Game.MAX_POWER);
            Game.currentBall.updatePowerBar(powerView);
        },
        mouseUp: function (e) {
            // If current ball in during animation do nothing.
            if (Game.currentBall.status !== snooker.Ball.READY) {
                return;
            }

            var pos = Game.currentBall.position;
            var radius = snooker.Ball.RADIUS;

            var eO = e.eventObject();

            var cursor = {
                x: e.offsetX || eO.offsetX || eO.layerX,
                y: e.offsetY || eO.offsetY || eO.layerY
            };

            var directions = {
                x: (pos.x > cursor.x) ? 1 : -1,
                y: (pos.y > cursor.y) ? 1 : -1
            };

            var velocity = {
                x: (pos.x + radius - cursor.x) / 100,
                y: (pos.y + radius - cursor.y) / 100
            };

            Game.currentBall.move(velocity);
        }
    };

}(this));