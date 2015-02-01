define([
    'core/App',
    'core/models/Ball'
], function (App, Ball) {
    'use strict';

    function BallCollection() {
        this._phaser = undefined;
        this.initialize();
    }

    BallCollection.prototype.initialize = function () {
        var game = App.game.getPhaser();
        this._phaser = game.add.group();
    };

    /**
     * @param {Ball} ball
     */
    BallCollection.prototype.add = function (ball) {
        this._phaser.add(ball.getPhaser());
        return ball;
    };

    BallCollection.prototype.enableCollisions = function () {
        var game = App.game.getPhaser();
        game.physics.arcade.collide(this._phaser, this._phaser);
    };

    return BallCollection;
});
