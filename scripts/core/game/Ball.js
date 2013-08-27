/*global game */

(function (global) {
    "use strict";

    // imports
    var _ = global._;
    var snooker = (global.snooker = global.snooker || {});

    /**
     * @param {string} color
     * @class
     * @this {snooker.Ball}
     * @constructor
     */
    snooker.Ball = function (color) {
        if (!_.isString(color)) {
            throw new Error("snooker.Ball: color should creating with *string*, not " + typeof color);
        }

        /**
         * Reference to global context.
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = null;

        /**
         * Ball color.
         * @type {string}
         */
        this.color = color.toLowerCase();

        /**
         * Object with texture.
         * @type {Image}
         */
        this.texture = null;

        /**
         * Object position - use X & Y axis.
         * @type {object}
         */
        this.position = {
            x: null,
            y: null
        };

        /**
         * Speed.
         * @type {{x: null, y: null}}
         */
        this.velocity = {
            x: 0,
            y: 0
        };

        this.status = snooker.Ball.READY;

        /**
         * The power bar.
         * @type {snooker.PowerBar}
         */
        this.powerBar = new snooker.PowerBar(this);

        this.initialize();
    };

    snooker.Ball.READY = 0;
    snooker.Ball.MOVING = 1;

    /**
     * Setup Ball dimensions.
     * @type {number}
     */
    snooker.Ball.RADIUS = 5.25 * Game.SCALE;

    snooker.Ball.prototype = {
        initialize: function () {
            var resource = game.resourceLoader.getResource("ball-" + this.color);
            this.texture = resource.img;
        },
        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {Object} pos
         * @param {Object} pos.x
         * @param {Object} pos.y
         */
        build: function (ctx, pos) {
            this.ctx = ctx;
            this.position = pos;
            this.draw();
        },
        draw: function () {
            this.ctx.drawImage(this.texture, this.position.x, this.position.y, snooker.Ball.RADIUS * 2, snooker.Ball.RADIUS * 2);
        },
        move: function (direction, power) {
            snooker.drawBalls();
            this.animate("x", direction, power);
        },
        _isCollision: function (ball) {
            var pos = ball.position;
            var x = pos.x;
            var y = pos.y;
    
            if (x < snooker.Table.LEFT_BOARD) {
                ball.position.x = snooker.Table.LEFT_BOARD;
                // console.log('collision with *left* board');
                return true;
            } else if (x + (snooker.Ball.RADIUS * 2) > snooker.Table.RIGHT_BOARD) {
                ball.position.x = snooker.Table.RIGHT_BOARD - (snooker.Ball.RADIUS * 2);
                // console.log('collision with *right* board');
                return true;
            } else if (y < snooker.Table.TOP_BOARD) {
                ball.position.y = snooker.Table.TOP_BOARD;
                // console.log('collision with *top* board');
                return true;
            } else if (y + (snooker.Ball.RADIUS * 2) > snooker.Table.BOTTOM_BOARD) {
                ball.position.y = snooker.Table.BOTTOM_BOARD - (snooker.Ball.RADIUS * 2);
                // console.log('collision with *bottom* board');
                return true;
            }
    
            return false;
        },
        _update: function (ball) {
            var pos = this.position;
            ball.x = pos.x;
            ball.y = pos.y;
        },
        animate: function (axis, direction, velocity) {
            var self = this;
            var ball = snooker.getBallByColor(this.color);
    
            this.status = snooker.Ball.MOVING;
    
            function loop() {
                self.velocity[axis] = direction * velocity;
                self.position[axis] += self.velocity[axis];
    
                if (Math.abs(self.velocity[axis]) <= 0.2) {
                    self.status = snooker.Ball.READY;
                    return;
                }
    
                // If collision chane direction.
                if (self._isCollision(self)) {
                    direction *= -1;
                }
    
                // Update positions.
                self._update.call(self, ball);
    
                // Clear table
                snooker.table.draw();
    
                // Redraw table & each item on table;
                snooker.drawBalls();
    
                /**
                 * Slower...
                 * @type {number}
                 */
                velocity *= 0.95;
    
                requestAnimFrame(loop);
            }
    
            requestAnimFrame(loop);
        },
        updatePower: function (percentPower) {
            this.powerBar.update(this, percentPower);
        }
    }

}(this));
