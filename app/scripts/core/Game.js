define([
    'underscore',
    'events',
    'core/Loader',
    'core/ResourceLoader',
    'models/Ball',
    'models/Cue',
    'models/PowerBar',
    'models/Table'
], function (_, Events, Loader, ResourceLoader, Ball, Cue, PowerBar, Table) {
    "use strict";

    var Game = {
        resourceLoader: null,

        status: null,

        /**
         * Power of shot.
         * @type {number}
         */
        power: 0,

        /**
         * Table of game, in snooker is all playing area.
         * @type {Table}
         */
        table:  null,

        /**
         * List of balls.
         * @type {Array.<Ball>}
         */
        balls: [],

        initialize: function (callback) {
            Game.status = GAME_LOADING;

            Loader.createLoading();
            Game.loadResources(function () {
                Loader.destroyLoading();

                if (_.isFunction(callback)) {
                    callback();
                }

                Game.status = GAME_READY;
            });
        },

        loadResources: function (callback) {
            Game.resourceLoader = new ResourceLoader();

            var colors = ['white', 'green', 'brown', 'yellow', 'blue', 'pink', 'red', 'black'];

            _.each(colors, function (ball) {
                Game.resourceLoader.addResource("ball-" + ball, "textures/balls/" + ball + ".png", ResourceLoader.IMAGE);
            });

            Game.resourceLoader.addResource("power", "textures/power.png", ResourceLoader.IMAGE);

            var checkLoadedResource = setInterval(function () {
                var loadingStatus = Game.resourceLoader.getPercentStatus();
                Loader.updateLoadingProgress(loadingStatus);
                // Events.log("Resource loading", loadingStatus + "%" );

                if (Game.resourceLoader.isAllResourcesLoaded()) {
                    clearInterval(checkLoadedResource);
                    setTimeout(callback, 300);
                }
            }, 10);

            Game.resourceLoader.preLoadingResources();
        },

        drawTable: function () {
            this.table = new Table();
            this.table.build();
        },

        drawCues: function () {
            var ctx = this.table.ctx;
            var tableHeight = Table.HEIGHT;

            new Cue().create(ctx, {
                x: 170, y: tableHeight * 0.15
            });

            new Cue().create(ctx, {
                x: 170, y: tableHeight * 0.85
            });
        },

        drawBalls: function () {
            var self = this;
            var ctx = self.table.ctx;

            var tableWidth = TABLE_WIDTH;
            var tableHeight = TABLE_HEIGHT;
            var ballRadius = BALL_RADIUS;

            this.balls.push(new Ball('white', ctx, {
                x: tableWidth * 0.225, y: tableHeight * 0.53
            }));

            this.balls.push(new Ball('green', ctx, {
                x: tableWidth * 0.265, y: tableHeight * 0.35
            }));
            this.balls.push(new Ball('brown', ctx, {
                x: tableWidth * 0.265, y: tableHeight / 2 - ballRadius
            }));
            this.balls.push(new Ball('yellow', ctx, {
                x: tableWidth * 0.265, y: tableHeight * 0.6
            }));
            this.balls.push(new Ball('blue', ctx, {
                x: tableWidth / 2 - ballRadius, y: tableHeight / 2 - ballRadius
            }));
            this.balls.push(new Ball('pink', ctx, {
                x: tableWidth * 0.63, y: tableHeight / 2 - ballRadius
            }));

            // 1
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.67, y: tableHeight / 2 - ballRadius
            }));

            // 2
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.70, y: tableHeight / 2 - ballRadius * 1.5 - ballRadius
            }));
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.70, y: tableHeight / 2 + ballRadius * 1.5 - ballRadius
            }));

            // 3
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.73, y: tableHeight / 2 - ballRadius * 3 - ballRadius
            }));
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.73, y: tableHeight / 2 - ballRadius
            }));
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.73, y: tableHeight / 2 + ballRadius * 3 - ballRadius
            }));

            // 4
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.76, y: tableHeight / 2 - ballRadius * 4.5 - ballRadius
            }));
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.76, y: tableHeight / 2 - ballRadius * 1.5 - ballRadius
            }));
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.76, y: tableHeight / 2 + ballRadius * 1.5 - ballRadius
            }));
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.76, y: tableHeight / 2 + ballRadius * 4.5 - ballRadius
            }));

            // 5
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.79, y: tableHeight / 2 - ballRadius * 6 - ballRadius
            }));
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.79, y: tableHeight / 2 - ballRadius * 3 - ballRadius
            }));
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.79, y: tableHeight / 2 - ballRadius
            }));
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.79, y: tableHeight / 2 + ballRadius * 3 - ballRadius
            }));
            this.balls.push(new Ball('red', ctx, {
                x: tableWidth * 0.79, y: tableHeight / 2 + ballRadius * 6 - ballRadius
            }));

            this.balls.push(new Ball('black', ctx, {
                x: tableWidth * 0.84, y: tableHeight / 2 - ballRadius
            }));
        },

        refreshBalls: function () {
            _.each(this.balls, function (ball) {
                // If the ball has not been removed, draw it
                if (ball.status !== BALL_REMOVED) {
                    ball.draw();
                }
            });
        },

        refreshTable: function () {
            this.table.draw();
        },

        refreshViewPort: function () {
            this.refreshTable();
            this.refreshBalls();
        }
    };

    return Game;
});
