define([
    'underscore',
    'core/Collision',
    'models/PowerBar'
], function (_, Collision, PowerBar) {
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
        this.status = BALL_READY;
        /**
         * The power bar.
         * @type {PowerBar}
         */
        this.powerBar = new PowerBar(this);

        /**
         * Hit power.
         * @type {number}
         */
        this.power = 0;

        this.initialize();
    }

    Ball.prototype = {
        initialize: function () {
            var resource = Game.resourceLoader.getResource('ball-' + this.color);
            this.texture = resource.img;
            this.draw();
        },
        draw: function () {
            var ballDiameter = BALL_RADIUS * 2;
            var pos = this.position;
            this.ctx.drawImage(this.texture, pos.x, pos.y, ballDiameter, ballDiameter);
        },
        move: function (cursorPosition) {
            Game.refreshBalls();
            this.animate(cursorPosition);
        },
        animate: function (cursorDelta) {
            var self = this;

            this.status = BALL_MOVING;

            function loop() {
                self.position.x += (self.velocity.x = cursorDelta.x * self.power);
                self.position.y += (self.velocity.y = cursorDelta.y * self.power);

/*****************************************************************************/

                if (
                    Math.abs(self.velocity.x) <= 0.1 &&
                    Math.abs(self.velocity.y) <= 0.1
                ) {
                    self.status = BALL_READY;
                    self.velocity.x = self.velocity.y = 0;
                    return;
                }

                // ball slower
                self.power *= 0.95;

                // safety value
                if (Math.abs(self.power) <= 0.3) {
                    self.status = BALL_READY;
                    self.power = 0;
                    return;
                }

/*****************************************************************************/

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
                    console.warn('*' + self.color + '-' + self.id + '* in pot!');

                    self.status = BALL_REMOVED;
                    Game.refreshViewPort();
                    return;
                }

                // 3) check collision with other ball
                var collisionBall = Collision.isBallCollision(self);
                if (collisionBall) {
                    // collision ball the same power as white ball
                    collisionBall.power = self.power * 0.8;

                    // moving collision ball
                    collisionBall.animate({
                        x: cursorDelta.x,
                        y: cursorDelta.y
                    });

                    // white ball decrease power hit
                    self.power *= 0.4;
                }

                Game.refreshViewPort();

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
