(function (global) {
    "use strict";

    // imports
    var _ = global._;
    var snooker = (global.snooker = global.snooker || {});
    var Keys = (global.Keys = global.Keys || {});

    /**
     * @param {string} color
     * @constructor
     */
    snooker.Ball = function (color) {
        if (!_.isString(color)) {
            throw new Error("snooker.Ball: color should creating with *string*, not " + typeof color);
        }

        /**
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = null;

        /**
         * @type {string}
         */
        this.color = color.toLowerCase();

        /**
         * @type {Image}
         */
        this.img = null;

        /**
         * Positions
         * @type {object}
         */
        this.position = {
            x: null,
            y: null
        };

        this.status = snooker.Ball.READY;
    };

    snooker.Ball.READY = 0;
    snooker.Ball.MOVING = 1;

    /**
     * Setup Ball dimensions.
     * @type {number}
     */
    snooker.Ball.RADIUS = 5.25 * Game.SCALE;

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {Object} pos
     * @param {Object} pos.x
     * @param {Object} pos.y
     * @returns {Ball}
     */
    snooker.Ball.prototype.build = function (ctx, pos) {
        this.ctx = ctx;
        this.position = pos;
        this.draw();
        return this;
    };

    snooker.Ball.prototype.draw = function () {
        var resource = game.resourceLoader.getResource("ball-" + this.color);
        var texture = resource.img;
        this.ctx.drawImage(texture, this.position.x, this.position.y, snooker.Ball.RADIUS * 2, snooker.Ball.RADIUS * 2);
    };

    snooker.Ball.prototype.move = function (direction, power) {
        snooker.draw();

        switch (direction) {
            case Keys.LEFT:
                this.animate("x", (-1) * power);
                break;
            case Keys.UP:
                this.animate("y", (-1) * power);
                break;
            case Keys.RIGHT:
                this.animate("x", power);
                break;
            case Keys.DOWN:
                this.animate("y", power);
                break;
        }
    };

    snooker.Ball.prototype.animate = function (direction, power) {
        var self = this;
        var ball = snooker.getBallByColor(this.color);
        var limit = ball[direction] + power;

        global.requestAnimFrame(function () {
            ball.status = snooker.Ball.MOVING;

            /*
            var l = {
                limit: limit,
                power: power
            };
            l[direction] = ball[direction];
            console.log(l);
            */

            if (power > 0) {
                ball[direction]++;
                if (ball[direction] >= limit) {
                    ball[direction] = limit;
                    ball.status = snooker.Ball.READY;
                } else {
                    self.animate(direction, --power);
                }
            } else {
                ball[direction]--;
                if (ball[direction] <= limit) {
                    ball[direction] = limit;
                    ball.status = snooker.Ball.READY;
                } else {
                    self.animate(direction, ++power);
                }
            }

            snooker.draw();
        });
    };

}(this));
