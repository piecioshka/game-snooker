(function (global) {
    'use strict';

    // imports
    var snooker = global.snooker;

    var Lines = snooker.Lines = {
        _ctx: null,
        MARGIN: -15,
        initialize: function (options) {
            this._ctx = options.ctx;
        },
        draw: function (e) {
            var eO = e.eventObject();
            var cursor = {
                x: e.offsetX || eO.offsetX || eO.layerX,
                y: e.offsetY || eO.offsetY || eO.layerY
            };

            snooker.refreshViewPort();

            Lines.drawVerticalLine(cursor);
            Lines.drawHorizontalLine(cursor);
            Lines.drawHelperBox(cursor);
        },
        drawVerticalLine: function (cursor) {
            var ctx = Lines._ctx;
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = '#3a3a3a';
            ctx.moveTo(cursor.x + Lines.MARGIN, 0);
            ctx.lineTo(cursor.x + Lines.MARGIN, snooker.Table.HEIGHT);
            ctx.stroke();
            ctx.closePath()
        },
        drawHorizontalLine: function (cursor) {
            var ctx = Lines._ctx;
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = '#3a3a3a';
            ctx.moveTo(0, cursor.y + Lines.MARGIN);
            ctx.lineTo(snooker.Table.WIDTH, cursor.y + Lines.MARGIN);
            ctx.stroke();
            ctx.closePath();
        },
        drawHelperBox: function (cursor) {
            var ctx = Lines._ctx;
            var boxHeight = 20;
            ctx.fillStyle = '#eee';
            ctx.fillRect(cursor.x + 7, cursor.y - boxHeight - 7, 90, boxHeight);
            ctx.fillStyle = '#000';
            ctx.fillText('x: ' + (cursor.x + Lines.MARGIN), cursor.x + 15, cursor.y - boxHeight * 0.6);
            ctx.fillText('y: ' + (cursor.y + Lines.MARGIN), cursor.x + 55, cursor.y - boxHeight * 0.6);
        }
    };

}(this));
