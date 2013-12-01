define([
    'underscore',
    'models/Ball',
    'models/Table',
    'models/Cue'
], function (_, Ball, Table, Cue) {
    'use strict';

    var snooker = {};

    /**
     * Table of game, in snooker is all playing area.
     * @type {Table}
     */
    snooker.table = null;

    /**
     * List of balls.
     * @type {Array.<Ball>}
     */
    snooker.balls = [];

    snooker.drawTable = function () {
        this.table = new Table();
        this.table.build();
    };

    snooker.drawCues = function () {
        var ctx = this.table.ctx;
        var tableHeight = Table.HEIGHT;

        new Cue().create(ctx, {
            x: 170, y: tableHeight * 0.15
        });

        new Cue().create(ctx, {
            x: 170, y: tableHeight * 0.85
        });
    };

    snooker.drawBalls = function () {
        var self = this;
        var ctx = self.table.ctx;

        var tableWidth = TABLE_WIDTH;
        var tableHeight = TABLE_HEIGHT;
        var ballRadius = BALL_RADIUS;

        snooker.balls.push(new Ball('white', ctx, {
            x: tableWidth * 0.225, y: tableHeight * 0.53
        }));

        snooker.balls.push(new Ball('green', ctx, {
            x: tableWidth * 0.265, y: tableHeight * 0.35
        }));
        snooker.balls.push(new Ball('brown', ctx, {
            x: tableWidth * 0.265, y: tableHeight / 2 - ballRadius
        }));
        snooker.balls.push(new Ball('yellow', ctx, {
            x: tableWidth * 0.265, y: tableHeight * 0.6
        }));
        snooker.balls.push(new Ball('blue', ctx, {
            x: tableWidth / 2 - ballRadius, y: tableHeight / 2 - ballRadius
        }));
        snooker.balls.push(new Ball('pink', ctx, {
            x: tableWidth * 0.63, y: tableHeight / 2 - ballRadius
        }));

        // 1
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.67, y: tableHeight / 2 - ballRadius
        }));

        // 2
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.70, y: tableHeight / 2 - ballRadius * 1.5 - ballRadius
        }));
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.70, y: tableHeight / 2 + ballRadius * 1.5 - ballRadius
        }));

        // 3
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.73, y: tableHeight / 2 - ballRadius * 3 - ballRadius
        }));
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.73, y: tableHeight / 2 - ballRadius
        }));
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.73, y: tableHeight / 2 + ballRadius * 3 - ballRadius
        }));

        // 4
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.76, y: tableHeight / 2 - ballRadius * 4.5 - ballRadius
        }));
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.76, y: tableHeight / 2 - ballRadius * 1.5 - ballRadius
        }));
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.76, y: tableHeight / 2 + ballRadius * 1.5 - ballRadius
        }));
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.76, y: tableHeight / 2 + ballRadius * 4.5 - ballRadius
        }));

        // 5
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.79, y: tableHeight / 2 - ballRadius * 6 - ballRadius
        }));
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.79, y: tableHeight / 2 - ballRadius * 3 - ballRadius
        }));
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.79, y: tableHeight / 2 - ballRadius
        }));
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.79, y: tableHeight / 2 + ballRadius * 3 - ballRadius
        }));
        snooker.balls.push(new Ball('red', ctx, {
            x: tableWidth * 0.79, y: tableHeight / 2 + ballRadius * 6 - ballRadius
        }));

        snooker.balls.push(new Ball('black', ctx, {
            x: tableWidth * 0.84, y: tableHeight / 2 - ballRadius
        }));
    };

    snooker.refreshBalls = function () {
        _.each(snooker.balls, function (ball) {
            // If the ball has not been removed, draw it
            if (ball.status !== BALL_REMOVED) {
                ball.draw();
            }
        });
    };

    snooker.refreshTable = function () {
        snooker.table.draw();
    };

    snooker.refreshViewPort = function () {
        snooker.refreshTable();
        snooker.refreshBalls();
    };
    return snooker;
});
