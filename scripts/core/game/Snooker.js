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

    snooker.draw = function () {
        var self = this;

        this.table = new snooker.Table();
        this.table.build();

        /*
        new snooker.Cue().create(this.table.ctx, {
            x: 170,
            y: snooker.Table.HEIGHT * 0.15
        });

        new snooker.Cue().create(this.table.ctx, {
            x: 170,
            y: snooker.Table.HEIGHT * 0.85
        });
        */

        _.each(snooker.MAP, function (ball) {
            var uiBall = new snooker.Ball(ball.name);
            uiBall.build(self.table.ctx, {
                x: ball.x,
                y: ball.y
            });
            self.table.addBall(uiBall);
        });
    };

    snooker.MAP = [
        { name: "white", x: snooker.Table.WIDTH * 0.225, y: snooker.Table.HEIGHT * 0.53 },
        { name: "green", x: snooker.Table.WIDTH * 0.265, y: snooker.Table.HEIGHT * 0.35 },
        { name: "brown", x: snooker.Table.WIDTH * 0.265, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS},
        { name: "yellow", x: snooker.Table.WIDTH * 0.265, y: snooker.Table.HEIGHT * 0.6 },
        { name: "blue", x: snooker.Table.WIDTH / 2 - snooker.Ball.RADIUS, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS },
        { name: "pink", x: snooker.Table.WIDTH * 0.63, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS},
        // 1
        { name: "red", x: snooker.Table.WIDTH * 0.67, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS },

        // 2
        { name: "red", x: snooker.Table.WIDTH * 0.70, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 1.5 - snooker.Ball.RADIUS },
        { name: "red", x: snooker.Table.WIDTH * 0.70, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 1.5 - snooker.Ball.RADIUS },

        // 3
        { name: "red", x: snooker.Table.WIDTH * 0.73, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 3 - snooker.Ball.RADIUS },
        { name: "red", x: snooker.Table.WIDTH * 0.73, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS },
        { name: "red", x: snooker.Table.WIDTH * 0.73, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 3 - snooker.Ball.RADIUS },

        // 4
        { name: "red", x: snooker.Table.WIDTH * 0.76, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 4.5 - snooker.Ball.RADIUS },
        { name: "red", x: snooker.Table.WIDTH * 0.76, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 1.5 - snooker.Ball.RADIUS },
        { name: "red", x: snooker.Table.WIDTH * 0.76, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 1.5 - snooker.Ball.RADIUS },
        { name: "red", x: snooker.Table.WIDTH * 0.76, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 4.5 - snooker.Ball.RADIUS },

        // 5
        { name: "red", x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 6 - snooker.Ball.RADIUS },
        { name: "red", x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS * 3 - snooker.Ball.RADIUS },
        { name: "red", x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS },
        { name: "red", x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 3 - snooker.Ball.RADIUS },
        { name: "red", x: snooker.Table.WIDTH * 0.79, y: snooker.Table.HEIGHT / 2 + snooker.Ball.RADIUS * 6 - snooker.Ball.RADIUS },
        { name: "black", x: snooker.Table.WIDTH * 0.84, y: snooker.Table.HEIGHT / 2 - snooker.Ball.RADIUS}
    ];

    snooker.getBallByColor = function (name) {
        return _.findWhere(snooker.MAP, { name: name });
    }

}(this));
