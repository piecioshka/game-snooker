define([
    'core/Game'
], function (Game) {
    'use strict';

    var KeyHandler = {
        mouseDown: function () {
            // If current ball in during animation do nothing.
            if (Game.currentBall.status !== BALL_READY) return;

            if (Game.power === GAME_MIN_POWER) {
                Game.power = GAME_STRENGTH;
            } else {
                Game.power += GAME_STRENGTH;
            }

            // Limit to maximum power in game.
            if (Game.power > GAME_MAX_POWER) {
                Game.power = GAME_MAX_POWER;
            }

            var powerView = +(Game.power * 100 / GAME_MAX_POWER);
            Game.currentBall.updatePowerBar(powerView);
        },
        mouseUp: function (e) {
            // If current ball in during animation do nothing.
            if (Game.currentBall.status !== BALL_READY) return;

            var pos = Game.currentBall.position;
            var radius = BALL_RADIUS;

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
    return KeyHandler;
});

