define([
    'models/Ball',
    'core/Game'
], function (Ball, Game) {
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
            var ballRadius = Ball.RADIUS;

            this.position.x = ball.position.x - ballRadius / 2;
            this.position.y = ball.position.y - 10;

            var sx = 0,
                sy = 0,
                sw = ballRadius * 3 * power / 100,
                sh = ballRadius / 3,
                dx = this.position.x,
                dy = this.position.y,
                dw = ballRadius * 3 * power / 100,
                dh = ballRadius / 3;

            /**
             * Add thin border around power bar.
             * @type {string}
             */
            ctx.fillStyle = 'green';
            ctx.fillRect(dx - 1, dy - 1, ballRadius * 3, dh + 2);

            var maxWidth = this.texture.width;

            sw = (sw > maxWidth) ? maxWidth : sw;
            dw = (dw > maxWidth) ? maxWidth : dw;

            ctx.drawImage(this.texture, sx, sy, sw, sh, dx, dy, dw, dh);
        }
    };
    return PowerBar;
});

