(function (global) {
    "use strict";

    // imports
    var _ = global._;
    var snooker = (global.snooker = global.snooker || {});

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

    var Game = global.Game = {
        resourceLoader: null,
        status: null,
        currentBall: null
    };

    /**
     * Game scale value.
     * Bigger number => bigger game board.
     * @type {number}
     */
    Game.SCALE = 2; // global.innerWidth / 410.5;

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

    Game.MIN_POWER = 0;
    Game.MAX_POWER = 40;
    Game.STRENGTH = 1;

    Game.power = 0;

    var LOADING_PLACE_HOLDER_ID = 'loading-panel';
    var LOADING_PROGRESS_PLACE_HOLDER_ID = 'loader';
    var $loading = null;
    var $loader = null;

    _.extend(Game, {
        initialize: function (callback) {
            Game.status = Game.LOADING;

            Game.createLoading();
            Game.loadResources(function () {
                Game.destroyLoading();

                if (_.isFunction(callback)) {
                    callback();
                }

                Game.status = Game.READY;
                Game.currentBall = snooker.balls[0];
            });
        },
        createLoading: function () {
            $loading = document.createElement('div');
            $loading.id = LOADING_PLACE_HOLDER_ID;
            $loader = document.createElement('div');
            $loader.id = LOADING_PROGRESS_PLACE_HOLDER_ID;
            $loading.appendChild($loader);
            document.body.appendChild($loading);
        },
        destroyLoading: function () {
            $loading.parentNode.removeChild($loading);
        },
        updateLoadingProgress: function (percent) {
            $loader.style.width = (percent / 100 * 300) + "px";
        },
        loadResources: function (callback) {
            Game.resourceLoader = new ResourceLoader();
            Game.resourceLoader.addResource("table", "textures/table.png", ResourceType.IMAGE);

            var colors = ['white', 'green', 'brown', 'yellow', 'blue', 'pink', 'red', 'black'];

            _.each(colors, function (ball) {
                Game.resourceLoader.addResource("ball-" + ball, "textures/balls/" + ball + ".png", ResourceType.IMAGE);
            });

            Game.resourceLoader.addResource("power", "textures/power.png", ResourceType.IMAGE);

            var checkLoadedResource = setInterval(function () {
                var loadingStatus = Game.resourceLoader.getPercentStatus();
                Game.updateLoadingProgress(loadingStatus);
                // Events.log("Resource loading", loadingStatus + "%" );

                if (Game.resourceLoader.isAllResourcesLoaded()) {
                    clearInterval(checkLoadedResource);
                    setTimeout(callback, 300);
                }
            }, 10);

            Game.resourceLoader.preLoadingResources();
        },
        refreshViewPort: function () {
            snooker.refreshTable();
            snooker.refreshBalls();
        }
    });

}(this));
