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
        this.img = null;

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
                this.animate("x", -1, power);
                break;
            case Keys.UP:
                this.animate("y", -1, power);
                break;
            case Keys.RIGHT:
                this.animate("x", 1, power);
                break;
            case Keys.DOWN:
                this.animate("y", 1, power);
                break;
        }
    };

    function isCollision(ball) {
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
    }

    function update(ball) {
        var pos = this.position;
        ball.x = pos.x;
        ball.y = pos.y;
    }

    snooker.Ball.prototype.animate = function (axis, direction, velocity) {
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

            /**
             * If collision chane direction.
             */
            if (isCollision(self)) {
                direction *= -1;
            }

            /**
             * Update positions.
             */
            update.call(self, ball);

            /**
             * Redraw table & each item on table;
             */
            snooker.draw();

            /**
             * Slower...
             * @type {number}
             */
            velocity *= 0.95;

            requestAnimFrame(loop);
        }

        requestAnimFrame(loop);
    };

    snooker.Ball.prototype.updatePower = function (percentPower) {
        var ctx = snooker.table.ctx;
        var resource = game.resourceLoader.getResource("power");
        var texture = resource.img;

        var sx = 0,
            sy = 0,
            sw = snooker.Ball.RADIUS * 3 * percentPower / 100,
            sh = snooker.Ball.RADIUS / 3,
            dx = this.position.x - snooker.Ball.RADIUS / 2,
            dy = this.position.y - 10,
            dw = snooker.Ball.RADIUS * 3 * percentPower / 100,
            dh = snooker.Ball.RADIUS / 3;

        /**
         * Add thin border around power bar.
         * @type {string}
         */
        ctx.fillStyle = "green";
        ctx.fillRect(dx - 1, dy - 1, snooker.Ball.RADIUS * 3, dh + 2);

        /**
         * For >=90% add fire shadow!
         */
        if (percentPower >= 90) {
            ctx.shadowColor = 'red';
            ctx.shadowBlur = 7;
        }

        ctx.drawImage(texture, sx, sy, sw, sh, dx, dy, dw, dh);
    };

}(this));
