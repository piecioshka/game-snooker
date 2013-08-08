(function (global) {
    "use strict";

    // imports
    var snooker = (global.snooker = global.snooker || {});
    var utils = (global.utils = global.utils || {});

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

    Game.power = 0;
    Game.MIN_POWER = 0;
    Game.MAX_POWER = 1000;
    Game.STRENGTH = 1;

    Game.prototype.initialize = function () {
        this.loadResources(function () {
            /**
             * Don't draw game in spec.
             */
            if (!(/spec\.html$/).test(location.pathname)) {
                snooker.draw();
            }

            game.status = Game.READY;
        });
    };

    Game.prototype.loadResources = function (callback) {
        var self = this;

        this.resourceLoader = new ResourceLoader();
        this.resourceLoader.addResource("table", "textures/table.png", ResourceType.IMAGE);

        _.each(snooker.MAP, function (ball) {
            self.resourceLoader.addResource("ball-" + ball.name, "textures/balls/" + ball.name + ".png", ResourceType.IMAGE);
        });

        var checkLoadedResource = setInterval(function () {
            var loadingStatus = self.resourceLoader.getPercentStatus();
            console.log("Resource loading", loadingStatus + "%" );

            if (self.resourceLoader.isAllResourcesLoaded()) {
                clearInterval(checkLoadedResource);

                if (_.isFunction(callback)) {
                    callback();
                }
            }
        }, 28);

        this.resourceLoader.preloadingResources();
    };

    Game.prototype.handleKeydown = function () {
        if (game.status === Game.READY) {
            if (Game.power === Game.MIN_POWER) {
                /**
                 * First value.
                 * @type {number}
                 */
                Game.power = Game.STRENGTH;
            } else {
                /**
                 * Exponentially increase.
                 * @type {number}
                 */
                Game.power += (Game.power / Game.STRENGTH) * Game.STRENGTH;
            }

            /**
             * Limit to maximum power in game.
             */
            if (Game.power > Game.MAX_POWER) {
                Game.power = Game.MAX_POWER;
            }
        } else {
            Game.power = 0;
        }
    };

    Game.prototype.handleKeyup = function (evt) {
        if (game.status === Game.READY) {
            var first_ball = snooker.balls[0];
            if (first_ball.status === snooker.Ball.READY) {
                first_ball.move(evt.keyCode, Game.power);
            }
            Game.power = 0;
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
