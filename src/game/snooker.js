(function () {
    "use strict";

    // master scope
    var global = this;

    // global objects
    global.snooker = {};
    global.snooker.ui = {};
    global.snooker.events = {};

    snooker.Table = function (name) {

        if (!(this instanceof snooker.Table)) {
            return new snooker.Table(name);
        }

        var self = this;

        this.ui = null;

        (function init() {
            self.ui = new snooker.ui.Table(name);
        })();

        this.add_ball = function (ball) {
            return self.ui.add_ball(ball);
        };

        this.add_balls = function (balls) {
            for (var i = 0; i < balls.length; ++i) {
                self.add_ball(balls[i]);
            }
        };

        console.log('snooker.Table (', name, ')');
    };

    snooker.Ball = function (color) {

        if (!(this instanceof snooker.Ball)) {
            return new snooker.Ball(color);
        }

        console.log('snooker.Ball (', color, ')');

        return new snooker.ui.Ball(color);
    };

    snooker.init = function () {
        new snooker.Table('stolik').add_balls([
            new snooker.Ball('red'),
            new snooker.Ball('pink'),
            new snooker.Ball('gray'),
            new snooker.Ball('black'),
            new snooker.Ball('yellow'),
            new snooker.Ball('blue'),
            new snooker.Ball('orange'),
            new snooker.Ball('green')
        ]);
    };

    window.onload = snooker.init;

}).call(this);
