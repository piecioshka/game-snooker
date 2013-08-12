(function (global) {
    "use strict";

    // imports
    var snooker = (global.snooker = global.snooker || {});
    var utils = (global.utils = global.utils || {});
    var Keys = (global.Keys = global.Keys || {});

    /**
     * @see: http://webstuff.nfshost.com/anim-timing/Overview.html
     */
    global.requestAnimFrame = (function() {
        return global.requestAnimationFrame    ||
            global.webkitRequestAnimationFrame ||
            global.mozRequestAnimationFrame    ||
            global.oRequestAnimationFrame      ||
            global.msRequestAnimationFrame     ||
            function(/* function */ callback, /* DOMElement */ element) {
                global.setTimeout(callback, 1000 / 60);
            };
    })();

    function Game() {
        this.resourceLoader = null;
        this.status = Game.LOADING;
        this.currentBall = null;
    }

    /**
     * Game scale value.
     * Bigger number => bigger game board.
     * @type {number}
     */
    Game.SCALE = 2;

    Game.SMALLEST_SCALE = 1;
    Game.BIGGEST_SCALE = 3;

    Game.READY = 0;
    Game.LOADING = 1;

    /**
     * Setup Game dimensions.
     * @type {number}
     */
    Game.WIDTH =  356.9 * Game.SCALE;
    Game.HEIGHT = 177.8 * Game.SCALE;

    Game.velocity = 0;
    Game.MIN_POWER = 0;
    Game.MAX_POWER = 40; // 100
    Game.STRENGTH = 1; // 3

    Game.prototype.initialize = function () {
        var self = this;
        this.loadResources(function () {
            /**
             * Don't draw game in spec.
             */
            if (!(/spec\.html$/).test(location.pathname)) {
                snooker.draw();
            }

            game.status = Game.READY;

            self.currentBall = snooker.balls[0];
        });
    };

    Game.prototype.loadResources = function (callback) {
        var self = this;

        this.resourceLoader = new ResourceLoader();
        this.resourceLoader.addResource("table", "textures/table.png", ResourceType.IMAGE);

        _.each(snooker.MAP, function (ball) {
            self.resourceLoader.addResource("ball-" + ball.name, "textures/balls/" + ball.name + ".png", ResourceType.IMAGE);
        });

        this.resourceLoader.addResource("power", "textures/power.png", ResourceType.IMAGE);

        var checkLoadedResource = setInterval(function () {
            var loadingStatus = self.resourceLoader.getPercentStatus();
            // console.log("Resource loading", loadingStatus + "%" );

            if (self.resourceLoader.isAllResourcesLoaded()) {
                clearInterval(checkLoadedResource);

                if (_.isFunction(callback)) {
                    callback();
                }
            }
        }, 10);

        this.resourceLoader.preloadingResources();
    };

    Game.prototype.handleKeydown = function (evt) {
        if (_.contains(Keys, evt.keyCode)) {
            if (game.status === Game.READY) {
                if (Game.velocity === Game.MIN_POWER) {
                    /**
                     * First value.
                     * @type {number}
                     */
                    Game.velocity = Game.STRENGTH;
                } else {
                    /**
                     * Exponentially increase.
                     * @type {number}
                     */
                    // Game.velocity += (Game.velocity / Game.STRENGTH) * Game.STRENGTH;
                    Game.velocity += Game.STRENGTH;
                }

                /**
                 * Limit to maximum power in game.
                 */
                if (Game.velocity > Game.MAX_POWER) {
                    Game.velocity = Game.MAX_POWER;
                }

                var powerView = +(Game.velocity * 100 / Game.MAX_POWER);
                this.currentBall.updatePower(powerView);
            } else {
                Game.velocity = 0;
            }
        }
    };

    Game.prototype.handleKeyup = function (evt) {
        if (game.status === Game.READY) {
            if (this.currentBall.status === snooker.Ball.READY) {
                this.currentBall.move(evt.keyCode, Game.velocity);
            }
            Game.velocity = 0;
        }
    };

    // exports
    global.Game = Game;
    var game = global.game = new Game();

    // support events
    utils.listener.add(window, "load", game.initialize.bind(game));
    utils.listener.add(window, "keydown", game.handleKeydown.bind(game));
    utils.listener.add(window, "keyup", game.handleKeyup.bind(game));

    // disabled events
    utils.listener.add(document, "mousewheel", utils.event.disable);

}(this));
