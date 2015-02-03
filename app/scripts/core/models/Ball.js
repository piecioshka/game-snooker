define([
    'lodash',
    'phaser',
    'core/App',
    'core/helpers/PhaserModelHelper'
], function (_, Phaser, App, PhaserModelHelper) {
    'use strict';

    function Ball(x, y, key, table) {
        this._phaser = undefined;
        this.initialize(x, y, key, table);
    }

    Ball.prototype.initialize = function (x, y, key, table) {
        var ball = this._phaser = table.getBalls().getPhaser().create(x, y, key);
        var body = ball.body;

        body.setCircle(Ball.RADIUS);
        body.fixedRotation = true;
        body.mass = 0.7;
        body.damping = 0.5;
    };

    Ball.RADIUS = 10.5;

    _.extend(Ball.prototype, PhaserModelHelper.prototype);

    return Ball;
});
