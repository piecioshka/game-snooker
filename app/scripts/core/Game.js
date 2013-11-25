define([
    'underscore',
    'events',
    'core/snooker',
    'core/Loader',
    'core/ResourceLoader'
], function (_, Events, snooker, Loader, ResourceLoader) {
    "use strict";

    var Game = {
        resourceLoader: null,
        status: null,
        currentBall: null,

        initialize: function (callback) {
            Game.status = Game.LOADING;

            Loader.createLoading();
            Game.loadResources(function () {
                Loader.destroyLoading();

                if (_.isFunction(callback)) {
                    callback();
                }

                Game.status = Game.READY;
                // Game.currentBall = snooker.balls[0];
            });
        },
        loadResources: function (callback) {
            Game.resourceLoader = new ResourceLoader();
            Game.resourceLoader.addResource("table", "textures/table.png", ResourceLoader.IMAGE);

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
        }
    };

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

    Game.STRENGTH = 1;

    Game.MIN_POWER = 0;
    Game.MAX_POWER = 40;

    /**
     * Power of shot.
     * @type {number}
     */
    Game.power = 0;

    return Game;
});

