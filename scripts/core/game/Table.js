(function (global) {
    "use strict";

    // imports
    var _ = global._;
    var snooker = (global.snooker = global.snooker || {});

    /**
     * @constructor
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
         * Object with texture.
         * @type {Image}
         */
        this.img = null;
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

    snooker.Table.prototype.build = function () {
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

        this.draw();
    };

    /**
     * @private
     */
    snooker.Table.prototype._render = function () {
        var body = document.body;
        var canvas = document.getElementsByTagName("canvas");

        /**
         * If exists <canvas> tag delete this.
         */
        if (canvas.length) {
            canvas[0].parentNode.removeChild(canvas[0]);
        }

        /**
         * Append <canvas> to <body> tag.
         */
        body.appendChild(this.canvas);
    };

    snooker.Table.prototype.draw = function () {
        var resource = game.resourceLoader.getResource("table");
        var texture = resource.img;
        this.ctx.drawImage(texture, 0, 0, snooker.Table.WIDTH, snooker.Table.HEIGHT);
    };

    /**
     * Add balls on table and balls list.
     * @param {snooker.Ball} ball
     */
    snooker.Table.prototype.addBall = function (ball) {
        snooker.balls.push(ball);
    };

}(this));
