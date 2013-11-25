define([
    'underscore',
    'core/Game'
], function (_, Game) {
    'use strict';

    /**
     * @class
     * @constructor
     * @this Table
     */
    function Table() {
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

        this.initialize();
    }

    /**
     * Setup Table dimensions.
     * @type {number}
     */
    Table.WIDTH = 410.5 * Game.SCALE;
    Table.HEIGHT = 229.5 * Game.SCALE;

    Table.LEFT_BOARD = (Table.WIDTH - Game.WIDTH)/2;
    Table.RIGHT_BOARD = Table.LEFT_BOARD + Game.WIDTH;
    Table.TOP_BOARD = (Table.HEIGHT - Game.HEIGHT)/2;
    Table.BOTTOM_BOARD = Table.TOP_BOARD + Game.HEIGHT;

    Table.prototype = {
        initialize: function () {
            // do smth...
        },
        build: function () {
            this.canvas = document.createElement('canvas');
            this.canvas.setAttribute('width', Table.WIDTH + 'px');
            this.canvas.setAttribute('height', Table.HEIGHT + 'px');
            this._render();

            _.extend(this.canvas.style, {
                'width': Table.WIDTH + 'px',
                'height': Table.HEIGHT + 'px',
                'marginLeft': (-1 * Table.WIDTH / 2) + 'px',
                'marginTop': (-1 * Table.HEIGHT / 2) + 'px'
            });

            this.ctx = this.canvas.getContext('2d');
        },
        _render: function () {
            var body = document.body;
            var canvas = document.getElementsByTagName('canvas');

            // If exists <canvas> tag delete this.
            if (canvas.length) {
                canvas[0].parentNode.removeChild(canvas[0]);
            }

            // Append <canvas> to <body> tag.
            body.appendChild(this.canvas);
        },
        draw: function () {
           this.ctx.clearRect(0, 0, Table.WIDTH, Table.HEIGHT);
        }
    };
    return Table;
});

