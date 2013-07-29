(function (global) {
    "use strict";

    var snooker = (global.snooker = global.snooker || {});

    snooker.Ball = function (color) {
        this.color = color.toLowerCase();
    };

    snooker.Ball.RADIUS = 10;

    snooker.Ball.prototype.create = function (ctx, position) {
        var x = position.x || _.random(snooker.Ball.RADIUS, snooker.Table.WIDTH - snooker.Ball.RADIUS);
        var y = position.y || _.random(snooker.Ball.RADIUS, snooker.Table.HEIGHT - snooker.Ball.RADIUS);

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, y, snooker.Ball.RADIUS, 0, Math.PI * 2, false);
        ctx.fill();
    };

}(this));
