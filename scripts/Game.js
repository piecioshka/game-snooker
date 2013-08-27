(function (global) {
    "use strict";

    // imports
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

    Game.MIN_POWER = 0;
    Game.MAX_POWER = 40; // 100
    Game.STRENGTH = 3;

    Game.velocity = 0;

    Game.prototype.initialize = function (callback) {
        var self = this;
        this.loadResources(function () {
            if (_.isFunction(callback)) {
                callback();
            }

            self.status = Game.READY;
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
            // Events.log("Resource loading", loadingStatus + "%" );

            if (self.resourceLoader.isAllResourcesLoaded()) {
                clearInterval(checkLoadedResource);

                if (_.isFunction(callback)) {
                    callback();
                }
            }
        }, 10);

        this.resourceLoader.preloadingResources();
    };

}(this));
