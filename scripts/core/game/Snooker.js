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
        var ctx = this.table.ctx;
        var tableHeight = snooker.Table.HEIGHT;

        new snooker.Cue().create(ctx, {
            x: 170, y: tableHeight * 0.15
        });

        new snooker.Cue().create(ctx, {
            x: 170, y: tableHeight * 0.85
        });
    };

    snooker.drawBalls = function () {
        var self = this;
        var ctx = self.table.ctx;

        var tableWidth = snooker.Table.WIDTH;
        var tableHeight = snooker.Table.HEIGHT;
        var ballRadius = snooker.Ball.RADIUS;

        self.table.addBall(new snooker.Ball('white', ctx, {
            x: tableWidth * 0.225, y: tableHeight * 0.53
        }));

        self.table.addBall(new snooker.Ball('green', ctx, {
            x: tableWidth * 0.265, y: tableHeight * 0.35
        }));
        self.table.addBall(new snooker.Ball('brown', ctx, {
            x: tableWidth * 0.265, y: tableHeight / 2 - ballRadius
        }));
        self.table.addBall(new snooker.Ball('yellow', ctx, {
            x: tableWidth * 0.265, y: tableHeight * 0.6
        }));
        self.table.addBall(new snooker.Ball('blue', ctx, {
            x: tableWidth / 2 - ballRadius, y: tableHeight / 2 - ballRadius
        }));
        self.table.addBall(new snooker.Ball('pink', ctx, {
            x: tableWidth * 0.63, y: tableHeight / 2 - ballRadius
        }));

        // 1
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.67, y: tableHeight / 2 - ballRadius
        }));

        // 2
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.70, y: tableHeight / 2 - ballRadius * 1.5 - ballRadius
        }));
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.70, y: tableHeight / 2 + ballRadius * 1.5 - ballRadius
        }));

        // 3
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.73, y: tableHeight / 2 - ballRadius * 3 - ballRadius
        }));
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.73, y: tableHeight / 2 - ballRadius
        }));
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.73, y: tableHeight / 2 + ballRadius * 3 - ballRadius
        }));

        // 4
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.76, y: tableHeight / 2 - ballRadius * 4.5 - ballRadius
        }));
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.76, y: tableHeight / 2 - ballRadius * 1.5 - ballRadius
        }));
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.76, y: tableHeight / 2 + ballRadius * 1.5 - ballRadius
        }));
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.76, y: tableHeight / 2 + ballRadius * 4.5 - ballRadius
        }));

        // 5
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.79, y: tableHeight / 2 - ballRadius * 6 - ballRadius
        }));
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.79, y: tableHeight / 2 - ballRadius * 3 - ballRadius
        }));
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.79, y: tableHeight / 2 - ballRadius
        }));
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.79, y: tableHeight / 2 + ballRadius * 3 - ballRadius
        }));
        self.table.addBall(new snooker.Ball('red', ctx, {
            x: tableWidth * 0.79, y: tableHeight / 2 + ballRadius * 6 - ballRadius
        }));

        self.table.addBall(new snooker.Ball('black', ctx, {
            x: tableWidth * 0.84, y: tableHeight / 2 - ballRadius
        }));
    };

    snooker.refreshTable = function () {
        snooker.table.draw();
    };

    snooker.refreshBalls = function () {
        _.each(snooker.balls, function (ball) {
            ball.draw();
        });
    };

}(this));
