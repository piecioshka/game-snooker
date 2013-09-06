/*global game */

(function (global) {
    'use strict';

    // imports
    var _ = global._;
    var snooker = (global.snooker = global.snooker || {});

    /**
     * @param {string} color
     * @param {CanvasRenderingContext2D} ctx
     * @param {Object} pos
     * @param {Object} pos.x
     * @param {Object} pos.y
     * @class
     * @this snooker.Ball
     * @constructor
     */
    snooker.Ball = function (color, ctx, pos) {
        if (!_.isString(color)) {
            throw new Error('snooker.Ball: color should creating with *string*, not ' + typeof color);
        }

        /**
         * Reference to global context.
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = ctx;
        /**
         * Ball color.
         * @type {string}
         */
        this.color = color.toLowerCase();
        /**
         * Texture.
         * @type {Image}
         */
        this.texture = null;
        /**
         * Object position - use X & Y axis.
         * @type {object}
         */
        this.position = pos;
        /**
         * Speed.
         * @type {{x: null, y: null}}
         */
        this.velocity = {
            x: 0, y: 0
        };
        /**
         * Current ball status.
         * @type {number}
         */
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
            var resource = game.resourceLoader.getResource('ball-' + this.color);
            this.texture = resource.img;
            this.draw();
        },
        draw: function () {
            var ballDiameter = snooker.Ball.RADIUS * 2;
            var pos = this.position;
            this.ctx.drawImage(this.texture, pos.x, pos.y, ballDiameter, ballDiameter);
        },
        move: function (cursorPosition, power) {
            // Redraw all balls
            snooker.refreshBalls();
            // Animate current selected ball
            this.animate(cursorPosition, power);
        },
        animate: function (cursorDelta, velocity) {
            var self = this;

            this.status = snooker.Ball.MOVING;
    
            function loop() {
                self.position.x += (self.velocity.x = cursorDelta.x * velocity);
                self.position.y += (self.velocity.y = cursorDelta.y * velocity);

                if (
                    Math.abs(self.velocity.x) <= 0.1 &&
                    Math.abs(self.velocity.y) <= 0.1
                ) {
                    self.status = snooker.Ball.READY;
                    return;
                }

                var direction = snooker.Collision.isBoardCollision(self);

                // If collision chane direction
                switch (direction) {
                    case 1: cursorDelta.x *= -1; break; // left
                    case 2: cursorDelta.y *= -1; break; // top
                    case 3: cursorDelta.x *= -1; break; // right
                    case 4: cursorDelta.y *= -1; break; // down
                }

                // Clear table
                snooker.refreshTable();
    
                // Redraw each ball on table
                snooker.refreshBalls();

                // Slower...
                velocity *= 0.95;
    
                requestAnimFrame(loop);
            }
    
            requestAnimFrame(loop);
        },
        updatePower: function (percentPower) {
            this.powerBar.update(this, percentPower);
        }
    };

}(this));
