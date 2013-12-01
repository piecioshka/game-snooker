define([
    'core/Game'
], function (Game) {
    'use strict';

    /**
     * @class
     * @constructor
     * @this PowerBar
     */
    function PowerBar() {
        this.position = {
            x: null,
            y: null
        };
        /**
         * Texture.
         * @type {Image}
         */
        this.texture = null;

        this.initialize();
    }

    PowerBar.prototype = {
        initialize: function () {
            var resource = Game.resourceLoader.getResource('power');
            this.texture = resource.img;
        },
        update: function (ball, power) {
            var ctx = ball.ctx;

            this.position.x = ball.position.x - BALL_RADIUS / 2;
            this.position.y = ball.position.y - 10;

            var sx = 0,
                sy = 0,
                sw = BALL_RADIUS * 3 * power / 100,
                sh = BALL_RADIUS / 3,
                dx = this.position.x,
                dy = this.position.y,
                dw = BALL_RADIUS * 3 * power / 100,
                dh = BALL_RADIUS / 3;

            /**
             * Add thin border around power bar.
             * @type {string}
             */
            ctx.fillStyle = 'green';
            ctx.fillRect(dx - 1, dy - 1, BALL_RADIUS * 3, dh + 2);

            var maxWidth = this.texture.width;

            sw = (sw > maxWidth) ? maxWidth : sw;
            dw = (dw > maxWidth) ? maxWidth : dw;

            ctx.drawImage(this.texture, sx, sy, sw, sh, dx, dy, dw, dh);
        }
    };
    return PowerBar;
});

