(function (global) {
    "use strict";

    var snooker = (global.snooker = global.snooker || {});

    snooker.init = function () {
        new snooker.Table().create(function (context) {
            onEachBall(function (type, position) {
                new snooker.Ball(type).create(context, position);
            });
        });
    };

    function onEachBall(callback) {
        _.each(snooker.getMap(), function (balls, type) {
            _.each(balls, function (position) {
                if (typeof callback === "function") {
                    callback(type, position);
                }
            });
        });
    }

    snooker.getMap = function () {
        return {
            "WHITE": [{ x: snooker.Table.WIDTH * 0.15, y: snooker.Table.HEIGHT * 0.6 }],
            "YELLOW": [{ x: snooker.Table.WIDTH * 0.2, y: snooker.Table.HEIGHT * 0.3 }],
            "BROWN": [{ x: snooker.Table.WIDTH * 0.2, y: snooker.Table.HEIGHT / 2 }],
            "GREEN": [{ x: snooker.Table.WIDTH * 0.2, y: snooker.Table.HEIGHT * 0.7}],
            "BLUE": [{ x: snooker.Table.WIDTH / 2, y: snooker.Table.HEIGHT / 2}],
            "PINK": [{ x: snooker.Table.WIDTH * 0.63, y: snooker.Table.HEIGHT / 2}],
            "RED": [
                // 1
                { x: snooker.Table.WIDTH * 0.67, y: snooker.Table.HEIGHT / 2 },

                // 2
                { x: snooker.Table.WIDTH * 0.70, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 1.5 },
                { x: snooker.Table.WIDTH * 0.70, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 1.5 },

                // 3
                { x: snooker.Table.WIDTH * 0.73, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 3 },
                { x: snooker.Table.WIDTH * 0.73, y: snooker.Table.HEIGHT / 2 },
                { x: snooker.Table.WIDTH * 0.73, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 3 },

                // 4
                { x: snooker.Table.WIDTH * 0.76, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 4.5 },
                { x: snooker.Table.WIDTH * 0.76, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 1.5 },
                { x: snooker.Table.WIDTH * 0.76, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 1.5 },
                { x: snooker.Table.WIDTH * 0.76, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 4.5 },

                // 5
                { x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 6 },
                { x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 3 },
                { x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 },
                { x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 3 },
                { x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 6 }
            ],
            "BLACk": [{ x: snooker.Table.WIDTH * 0.86, y: snooker.Table.HEIGHT / 2}]
        };
    };

}(this));
