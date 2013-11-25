define([
], function () {
    'use strict';

    /**
     * @class
     * @constructor
     * @this Cue
     */
    function Cue() {
        /**
         * Reference to global context.
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = null;
    }

    Cue.WIDTH = 514;
    Cue.HEIGHT = 4;

    Cue.prototype = {
        /**
         * @param {CanvasRenderingContext2D} ctx
         * @param {Object} position
         * @param {number} position.x
         * @param {number} position.y
         * @param {number} [angle] TODO: make rotation
         * @returns {Cue}
         */
        create: function (ctx, position, angle) {
            this.ctx = ctx;
            ctx.save();

            var x = position.x || 100;
            var y = position.y || 50;

            ctx.fillStyle = 'black';
            ctx.fillRect(x, y, 150, Cue.HEIGHT);
            ctx.strokeRect(x, y, 150, Cue.HEIGHT);

            ctx.fillStyle = 'brown';
            ctx.fillRect(x + 150, y, 250, Cue.HEIGHT);
            ctx.strokeRect(x + 150, y, 250, Cue.HEIGHT);

            ctx.fillStyle = 'black';
            ctx.fillRect(x + 400, y, 10, Cue.HEIGHT);
            ctx.strokeRect(x + 400, y, 10, Cue.HEIGHT);

            ctx.fillStyle = 'white';
            ctx.fillRect(x + 410, y, 4, Cue.HEIGHT);
            ctx.strokeRect(x + 410, y, 4, Cue.HEIGHT);

            ctx.restore();
            return this;
        }
    };

    return Cue;
});

