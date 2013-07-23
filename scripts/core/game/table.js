(function (global) {
    "use strict";

    var snooker = (global.snooker = global.snooker || {});
    var utils = (global.utils = global.utils || {});

    snooker.Table = function () {
        console.log("snooker.Table()");
        this.canvas = null;
    };

    snooker.Table.WIDTH = 720;
    snooker.Table.HEIGHT = 360;

    snooker.Table.prototype.create = function (callback) {
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("width", snooker.Table.WIDTH + "px");
        this.canvas.setAttribute("height", snooker.Table.HEIGHT + "px");
        this._render();
        this.ctx = this.canvas.getContext("2d");
        this._addTexture(callback);
    };

    snooker.Table.prototype._render = function () {
        var body = document.body;
        _.each(body.childNodes, function (node) {
            body.removeChild(node);
        });
        body.appendChild(this.canvas);
    };

    snooker.Table.prototype._addTexture = function (callback) {
        var self = this;
        var img = new Image();
        img.src = "textures/table.gif";

        utils.listener.add(img, "load", function () {
            self.ctx.drawImage(img, 0, 0, snooker.Table.WIDTH, snooker.Table.HEIGHT);
            if (typeof callback === "function") {
                callback(self.ctx);
            }
        });
    };

}(this));
