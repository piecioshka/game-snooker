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

    var Game = global.Game = function () {
        this.resourceLoader = null;
        this.status = Game.LOADING;
        this.currentBall = null;
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

    Game.velocity = 0;

    var LOADING_PLACE_HOLDER_ID = 'loading-panel';
    var LOADING_PROGRESS_PLACE_HOLDER_ID = 'loader';
    var $loading = null;
    var $loader = null;

    Game.prototype = {
        initialize: function (callback) {
            var self = this;
            this.createLoading();
            this.loadResources(function () {
                self.destroyLoading();
                if (_.isFunction(callback)) {
                    callback();
                }

                self.status = Game.READY;
                self.currentBall = snooker.balls[0];
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
            var self = this;

            this.resourceLoader = new ResourceLoader();
            this.resourceLoader.addResource("table", "textures/table.png", ResourceType.IMAGE);

            var colors = ['white', 'green', 'brown', 'yellow', 'blue', 'pink', 'red', 'black'];

            _.each(colors, function (ball) {
                self.resourceLoader.addResource("ball-" + ball, "textures/balls/" + ball + ".png", ResourceType.IMAGE);
            });

            this.resourceLoader.addResource("power", "textures/power.png", ResourceType.IMAGE);

            var checkLoadedResource = setInterval(function () {
                var loadingStatus = self.resourceLoader.getPercentStatus();
                self.updateLoadingProgress(loadingStatus);
                // Events.log("Resource loading", loadingStatus + "%" );

                if (self.resourceLoader.isAllResourcesLoaded()) {
                    clearInterval(checkLoadedResource);
                    setTimeout(callback, 700);
                }
            }, 10);

            this.resourceLoader.preLoadingResources();
        }
    };

}(this));
