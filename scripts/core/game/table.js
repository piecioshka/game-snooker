(function (global) {
    "use strict";

    var snooker = (global.snooker = global.snooker || {});
    var utils = (global.utils = global.utils || {});

    /**
     * @constructor
     */
    snooker.Table = function () {
        this.canvas = null;
        this.ctx = null;
    };

    snooker.Table.WIDTH = 720;
    snooker.Table.HEIGHT = 360;

    /**
     * @param {Function} callback
     */
    snooker.Table.prototype.create = function (callback) {
        this.canvas = document.createElement("canvas");
        this.canvas.setAttribute("width", snooker.Table.WIDTH + "px");
        this.canvas.setAttribute("height", snooker.Table.HEIGHT + "px");
        this._render();

        this.ctx = this.canvas.getContext("2d");
        this._addTexture(callback);
    };

    /**
     * @private
     */
    snooker.Table.prototype._render = function () {
        var body = document.body;
        _.each(body.childNodes, function (node) {
            body.removeChild(node);
        });
        body.appendChild(this.canvas);
    };

    /**
     * @private
     */
    snooker.Table.prototype._drawDField = function () {
        this.ctx.save();

        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.moveTo(snooker.Table.WIDTH * 0.2, snooker.Table.HEIGHT * 0.15);
        this.ctx.lineTo(snooker.Table.WIDTH * 0.2, snooker.Table.HEIGHT * 0.85);
        this.ctx.moveTo(snooker.Table.WIDTH * 0.2, snooker.Table.HEIGHT * 0.4);
        this.ctx.arc(snooker.Table.WIDTH * 0.2, snooker.Table.HEIGHT / 2, snooker.Table.HEIGHT * 0.2, Math.PI / 2, Math.PI * 1.5, false);
        this.ctx.stroke();

        this.ctx.restore();
    };

    /**
     * @param {Function} callback
     * @private
     */
    snooker.Table.prototype._addTexture = function (callback) {
        var self = this;
        var img = new Image();
        img.src = "textures/table.gif";

        utils.listener.add(img, "load", function () {
            self.ctx.drawImage(img, 0, 0, snooker.Table.WIDTH, snooker.Table.HEIGHT);
            self._drawDField();

            if (typeof callback === "function") {
                callback(self.ctx);
            }
        });
    };

}(this));
