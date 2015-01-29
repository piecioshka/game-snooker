define([
    'underscore'
], function (_) {
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

    Table.prototype = {
        initialize: function () {
            // do smth...
        },
        build: function () {
            this.canvas = document.createElement('canvas');
            this.canvas.setAttribute('width', TABLE_WIDTH + 'px');
            this.canvas.setAttribute('height', TABLE_HEIGHT + 'px');
            this._render();

            _.extend(this.canvas.style, {
                'width': TABLE_WIDTH + 'px',
                'height': TABLE_HEIGHT + 'px',
                'marginLeft': (-1 * TABLE_WIDTH / 2) + 'px',
                'marginTop': (-1 * TABLE_HEIGHT / 2) + 'px'
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
           this.ctx.clearRect(0, 0, TABLE_WIDTH, TABLE_HEIGHT);
        }
    };
    return Table;
});
