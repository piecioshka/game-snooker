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

    snooker.drawTable = function () {
        this.table = new snooker.Table();
        this.table.build();
        this.table.draw();
    };

    snooker.drawCues = function () {
        new snooker.Cue().create(this.table.ctx, {
            x: 170,
            y: snooker.Table.HEIGHT * 0.15
        });

        new snooker.Cue().create(this.table.ctx, {
            x: 170,
            y: snooker.Table.HEIGHT * 0.85
        });
    };

    snooker.drawBalls = function () {
        var self = this;

        _.each(snooker.MAP, function (ball) {
            var uiBall = new snooker.Ball(ball.name);
            uiBall.build(self.table.ctx, {
                x: ball.x,
                y: ball.y
            });
            self.table.addBall(uiBall);
        });
    };

    snooker.MAP = (function () {
        var tableWidth = snooker.Table.WIDTH;
        var tableHeight = snooker.Table.HEIGHT;
        var ballRadius = snooker.Ball.RADIUS;

        return [
            { name: "white", x: tableWidth * 0.225, y: tableHeight * 0.53 },
            { name: "green", x: tableWidth * 0.265, y: tableHeight * 0.35 },
            { name: "brown", x: tableWidth * 0.265, y: tableHeight / 2 - ballRadius},
            { name: "yellow", x: tableWidth * 0.265, y: tableHeight * 0.6 },
            { name: "blue", x: tableWidth / 2 - ballRadius, y: tableHeight / 2 - ballRadius },
            { name: "pink", x: tableWidth * 0.63, y: tableHeight / 2 - ballRadius},
            // 1
            { name: "red", x: tableWidth * 0.67, y: tableHeight / 2 - ballRadius },

            // 2
            { name: "red", x: tableWidth * 0.70, y: tableHeight / 2 - ballRadius * 1.5 - ballRadius },
            { name: "red", x: tableWidth * 0.70, y: tableHeight / 2 + ballRadius * 1.5 - ballRadius },

            // 3
            { name: "red", x: tableWidth * 0.73, y: tableHeight / 2 - ballRadius * 3 - ballRadius },
            { name: "red", x: tableWidth * 0.73, y: tableHeight / 2 - ballRadius },
            { name: "red", x: tableWidth * 0.73, y: tableHeight / 2 + ballRadius * 3 - ballRadius },

            // 4
            { name: "red", x: tableWidth * 0.76, y: tableHeight / 2 - ballRadius * 4.5 - ballRadius },
            { name: "red", x: tableWidth * 0.76, y: tableHeight / 2 - ballRadius * 1.5 - ballRadius },
            { name: "red", x: tableWidth * 0.76, y: tableHeight / 2 + ballRadius * 1.5 - ballRadius },
            { name: "red", x: tableWidth * 0.76, y: tableHeight / 2 + ballRadius * 4.5 - ballRadius },

            // 5
            { name: "red", x: tableWidth * 0.79, y: tableHeight / 2 - ballRadius * 6 - ballRadius },
            { name: "red", x: tableWidth * 0.79, y: tableHeight / 2 - ballRadius * 3 - ballRadius },
            { name: "red", x: tableWidth * 0.79, y: tableHeight / 2 - ballRadius },
            { name: "red", x: tableWidth * 0.79, y: tableHeight / 2 + ballRadius * 3 - ballRadius },
            { name: "red", x: tableWidth * 0.79, y: tableHeight / 2 + ballRadius * 6 - ballRadius },
            { name: "black", x: tableWidth * 0.84, y: tableHeight / 2 - ballRadius}
        ];
    }());

    snooker.getBallByColor = function (name) {
        return _.findWhere(snooker.MAP, { name: name });
    }

}(this));
