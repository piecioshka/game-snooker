define([
    'underscore',
    'events',
    'core/Loader',
    'core/ResourceLoader'
], function (_, Events, Loader, ResourceLoader) {
    "use strict";

    var Game = {
        resourceLoader: null,
        status: null,
        currentBall: null,
        /**
         * Power of shot.
         * @type {number}
         */
        power: 0,

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
        }
    };

    return Game;
});

