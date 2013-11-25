define([
    'underscore',
    'core/snooker',
    'core/Game',
    'models/PowerBar'
], function (_, snooker, Game, PowerBar) {
    'use strict';

    /**
     * @param {string} color
     * @param {CanvasRenderingContext2D} ctx
     * @param {Object} pos
     * @param {Object} pos.x
     * @param {Object} pos.y
     * @class
     * @this Ball
     * @constructor
     */
    function Ball(color, ctx, pos) {
        if (!_.isString(color)) {
            throw new Error('Ball: color should creating with *string*, not ' + typeof color);
        }

        this.id = _.uniqueId('ball_');

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
        this.status = Ball.READY;
        /**
         * The power bar.
         * @type {PowerBar}
         */
        this.powerBar = new PowerBar(this);

        this.initialize();
    }

    Ball.READY = 0;
    Ball.MOVING = 1;
    Ball.REMOVED = 2;

    /**
     * Setup Ball dimensions.
     * @type {number}
     */
    Ball.RADIUS = 5.25 * Game.SCALE;

    Ball.prototype = {
        initialize: function () {
            var resource = Game.resourceLoader.getResource('ball-' + this.color);
            this.texture = resource.img;
            this.draw();
        },
        draw: function () {
            var ballDiameter = Ball.RADIUS * 2;
            var pos = this.position;
            this.ctx.drawImage(this.texture, pos.x, pos.y, ballDiameter, ballDiameter);
        },
        move: function (cursorPosition) {
            snooker.refreshBalls();
            this.animate(cursorPosition);
        },
        animate: function (cursorDelta) {
            var self = this;

            this.status = Ball.MOVING;

            function loop() {
                self.position.x += (self.velocity.x = cursorDelta.x * Game.power);
                self.position.y += (self.velocity.y = cursorDelta.y * Game.power);

                if (
                    Math.abs(self.velocity.x) <= 0.1 &&
                    Math.abs(self.velocity.y) <= 0.1
                ) {
                    self.status = Ball.READY;
                    return;
                }

                // 1) check board collision
                var direction = Collision.isBoardCollision(self);
                // Board collision change direction
                switch (direction) {
                    case 1: cursorDelta.x *= -1; break; // left
                    case 2: cursorDelta.y *= -1; break; // top
                    case 3: cursorDelta.x *= -1; break; // right
                    case 4: cursorDelta.y *= -1; break; // down
                }

                // 2) check pot collision
                if (Collision.isPotCollision(direction, self)) {
                    self.status = Ball.REMOVED;
                    snooker.refreshViewPort();
                    return;
                }

                // 3) check collision with other ball
                var collisionBall = Collision.isBallCollision(self);
                // Disable undone resolve collision
                if (0 && collisionBall) {
                    collisionBall.animate({
                        x: cursorDelta.x * 0.95,
                        y: cursorDelta.y * 0.95
                    });
                }

                snooker.refreshViewPort();

                // Slower...
                Game.power *= 0.95;

                requestAnimFrame(loop);
            }

            requestAnimFrame(loop);
        },
        updatePowerBar: function (percentPower) {
            this.powerBar.update(this, percentPower);
        }
    };

    return Ball;
});
