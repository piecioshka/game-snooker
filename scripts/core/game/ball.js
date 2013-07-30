(function (global) {
    "use strict";

    var snooker = (global.snooker = global.snooker || {});

    /**
     * @param {string} color
     * @constructor
     */
    snooker.Ball = function (color) {
        if (typeof color !== "string") {
            throw new Error("snooker.Ball should creating with *string*, not " + typeof color);
        }

        /**
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = null;

        /**
         * @type {string}
         */
        this.color = color.toLowerCase();
    };

    snooker.Ball.RADIUS = 10;

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {Object} position
     * @param {Object} position.x
     * @param {Object} position.y
     * @returns {Ball}
     */
    snooker.Ball.prototype.create = function (ctx, position) {
        this.ctx = ctx;

        this.ctx.save();

        var x = position.x || _.random(snooker.Ball.RADIUS, snooker.Table.WIDTH - snooker.Ball.RADIUS);
        var y = position.y || _.random(snooker.Ball.RADIUS, snooker.Table.HEIGHT - snooker.Ball.RADIUS);

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, y, snooker.Ball.RADIUS, 0, Math.PI * 2, false);
        ctx.fill();

        this.ctx.restore();

        return this;
    };

}(this));
