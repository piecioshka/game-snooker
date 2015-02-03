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
        body.mass = 0.4;
        body.damping = 0.1;

        body.onBeginContact.add(function () {
            body.velocity.y *= 0.7;
            body.velocity.x *= 0.7;
        }, this);

        body.onEndContact.add(function () {
            body.velocity.y *= 0.7;
            body.velocity.x *= 0.7;
        }, this);
    };

    Ball.RADIUS = 10.5;

    _.extend(Ball.prototype, PhaserModelHelper.prototype);

    return Ball;
});
