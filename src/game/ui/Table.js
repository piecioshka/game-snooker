(function () {
    "use strict";

    // master scope
    var global = this;

    var snooker = global.snooker || {};

    snooker.ui.TABLE_WIDTH = 600;
    snooker.ui.TABLE_HEIGHT = 300;

    snooker.ui.Table = function (name) {
        var self = this;

        if (!(this instanceof snooker.ui.Table)) {
            return new snooker.ui.Table(name);
        }

        this.table = null;

        var table = document.createElement('div');
        table.id = 'table';

        pklib.css.add_class(name, table);

        table.style.width = snooker.ui.TABLE_WIDTH;
        table.style.height = snooker.ui.TABLE_HEIGHT;
        self.table = document.body.appendChild(table);

        this.add_ball = function (ball) {
            // console.log("snooker.ui.Table: add_ball()");

            if (pklib.dom.is_element(ball)) {
                var ball = self.table.appendChild(ball);
                snooker.events.Ball.init(self.table, ball);
                return ball;
            } else {
                throw new TypeError("@ball is not Node");
            }
        };
    };

}).call(this);
