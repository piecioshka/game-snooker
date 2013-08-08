(function (global) {
    "use strict";

    // imports
    var snooker = (global.snooker = global.snooker || {});
    var utils = (global.utils = global.utils || {});

    function Game() {
        this.resourceLoader = null;
    }

    /**
     * Game scale value.
     * Bigger number => bigger game board.
     * @type {number}
     */
    Game.SCALE = 2;

    Game.SMALLEST_SCALE = 1;
    Game.BIGGEST_SCALE = 3;

    Game.power = 0;
    Game.STRENGTH = 5;

    /**
     * Setup Game dimensions.
     * @type {number}
     */
    Game.WIDTH =  356.9 * Game.SCALE;
    Game.HEIGHT = 177.8 * Game.SCALE;

    Game.prototype.initialize = function () {
        this.loadResources(function () {
            /**
             * Don't draw game in spec.
             */
            if (!(/spec\.html$/).test(location.pathname)) {
                snooker.draw();
            }
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
        if (snooker.READY === snooker.PAINTED) {
            Game.power += Game.STRENGTH;
        } else {
            Game.power = 0;
        }
    };

    Game.prototype.handleKeyup = function (evt) {
        if (snooker.READY === snooker.PAINTED) {
            var first_ball = snooker.balls[0];
            first_ball.move(evt.keyCode, Game.power);
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
