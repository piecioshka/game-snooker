(function (global) {
    "use strict";

    // imports
    var _ = global._;
    var snooker = (global.snooker = global.snooker || {});

    /**
     * Table of game, in snooker is all playing area.
     * @type {snooker.Table}
     */
    snooker.table = null;

    /**
     * List of balls.
     * @type {Array.<snooker.Ball>}
     */
    snooker.balls = [];

    snooker.BEFORE_PAINTED = 0;
    snooker.PAINTED = 1;

    snooker.READY = snooker.BEFORE_PAINTED;

    snooker.draw = function () {
        var self = this;

        snooker.READY = snooker.BEFORE_PAINTED;

        this.table = new snooker.Table();
        this.table.build();

        /*
        new snooker.Cue().create(context, {
            x: 170,
            y: snooker.Table.HEIGHT * 0.15
        });

        new snooker.Cue().create(context, {
            x: 170,
            y: snooker.Table.HEIGHT * 0.85
        });
        */

        onEachBall(function (type, position) {
            var ball = new snooker.Ball(type);
            ball.build(self.table.ctx, position);
            self.table.addBall(ball);
        });

        snooker.READY = snooker.PAINTED;
    };

    function onEachBall(callback) {
        _.each(snooker.MAP, function (balls, type) {
            _.each(balls, function (position) {
                if (_.isFunction(callback)) {
                    callback(type, position);
                }
            });
        });
    }

    snooker.MAP = {
        "white": [{ x: snooker.Table.WIDTH * 0.225, y: snooker.Table.HEIGHT * 0.53 }],
        "green": [{ x: snooker.Table.WIDTH * 0.265, y: snooker.Table.HEIGHT * 0.35 }],
        "brown": [{ x: snooker.Table.WIDTH * 0.265, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS}],
        "yellow": [{ x: snooker.Table.WIDTH * 0.265, y: snooker.Table.HEIGHT * 0.6 }],
        "blue": [{ x: snooker.Table.WIDTH / 2 - snooker.Ball.RADIUS, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS }],
        "pink": [{ x: snooker.Table.WIDTH * 0.63, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS}],
        "red": [
            // 1
            { x: snooker.Table.WIDTH * 0.67, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS },

            // 2
            { x: snooker.Table.WIDTH * 0.70, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 1.5 - snooker.Ball.RADIUS },
            { x: snooker.Table.WIDTH * 0.70, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 1.5 - snooker.Ball.RADIUS },

            // 3
            { x: snooker.Table.WIDTH * 0.73, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 3 - snooker.Ball.RADIUS },
            { x: snooker.Table.WIDTH * 0.73, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS },
            { x: snooker.Table.WIDTH * 0.73, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 3 - snooker.Ball.RADIUS },

            // 4
            { x: snooker.Table.WIDTH * 0.76, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 4.5 - snooker.Ball.RADIUS },
            { x: snooker.Table.WIDTH * 0.76, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 1.5 - snooker.Ball.RADIUS },
            { x: snooker.Table.WIDTH * 0.76, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 1.5 - snooker.Ball.RADIUS },
            { x: snooker.Table.WIDTH * 0.76, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 4.5 - snooker.Ball.RADIUS },

            // 5
            { x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 6 - snooker.Ball.RADIUS },
            { x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 3 - snooker.Ball.RADIUS },
            { x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS },
            { x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 3 - snooker.Ball.RADIUS },
            { x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 6 - snooker.Ball.RADIUS }
        ],
        "black": [{ x: snooker.Table.WIDTH * 0.84, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS}]
    };

}(this));
