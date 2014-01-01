define([
    'underscore'
], function (_) {
    'use strict';

    function getWhiteBall() {
        return _.findWhere(Game.balls, { color: "white" });
    }

    var KeyHandler = {
        mouseDown: function () {
            var whiteBall = getWhiteBall();

            // if white ball in during animation do nothing
            if (whiteBall.status !== BALL_READY) return;

            if (whiteBall.power === GAME_MIN_POWER) {
                whiteBall.power = GAME_STRENGTH;
            } else {
                whiteBall.power += GAME_STRENGTH;
            }

            // Limit to maximum power in game.
            if (whiteBall.power > GAME_MAX_POWER) {
                whiteBall.power = GAME_MAX_POWER;
            }

            var powerView = +(whiteBall.power * 100 / GAME_MAX_POWER);
            whiteBall.updatePowerBar(powerView);
        },
        mouseUp: function (e) {
            var whiteBall = getWhiteBall();

            // if current ball in during animation do nothing.
            if (whiteBall.status !== BALL_READY) return;

            var pos = whiteBall.position;
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

            whiteBall.move(velocity);
        }
    };
    return KeyHandler;
});
