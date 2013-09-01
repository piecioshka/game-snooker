/*global game */

(function (global) {
    "use strict";

    // imports
    var document = global.document;
    var _ = global._;
    var snooker = (global.snooker = global.snooker || {});

    /**
     * @class
     * @constructor
     * @this snooker.Table
     */
    snooker.Table = function () {
        /**
         * Reference to global object.
         * @type {HTMLElement}
         */
        this.canvas = null;
        /**
         * Reference to global object.
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = null;
        /**
         * Texture.
         * @type {Image}
         */
        this.texture = null;

        this.initialize();
    };

    /**
     * Setup Table dimensions.
     * @type {number}
     */
    snooker.Table.WIDTH = 410.5 * Game.SCALE;
    snooker.Table.HEIGHT = 229.5 * Game.SCALE;

    snooker.Table.LEFT_BOARD = (snooker.Table.WIDTH - Game.WIDTH)/2;
    snooker.Table.RIGHT_BOARD = snooker.Table.LEFT_BOARD + Game.WIDTH;
    snooker.Table.TOP_BOARD = (snooker.Table.HEIGHT - Game.HEIGHT)/2;
    snooker.Table.BOTTOM_BOARD = snooker.Table.TOP_BOARD + Game.HEIGHT;

    snooker.Table.prototype = {
        initialize: function () {
            var resource = game.resourceLoader.getResource("table");
            this.texture = resource.img;
        },
        build: function () {
            this.canvas = document.createElement("canvas");
            this.canvas.setAttribute("width", snooker.Table.WIDTH + "px");
            this.canvas.setAttribute("height", snooker.Table.HEIGHT + "px");
            this._render();

            _.extend(this.canvas.style, {
                "width": snooker.Table.WIDTH + "px",
                "height": snooker.Table.HEIGHT + "px",
                "margin-left": (-1 * snooker.Table.WIDTH / 2) + "px",
                "margin-top": (-1 * snooker.Table.HEIGHT / 2) + "px"
            });

            this.ctx = this.canvas.getContext("2d");
        },
        _render: function () {
            var body = document.body;
            var canvas = document.getElementsByTagName("canvas");

            // If exists <canvas> tag delete this.
            if (canvas.length) {
                canvas[0].parentNode.removeChild(canvas[0]);
            }

            // Append <canvas> to <body> tag.
            body.appendChild(this.canvas);
        },
        draw: function () {
            this.ctx.drawImage(this.texture, 0, 0, snooker.Table.WIDTH, snooker.Table.HEIGHT);
        },
        addBall: function (ball) {
            snooker.balls.push(ball);
        }
    };

}(this));
