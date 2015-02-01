define([
    'core/App'
], function (App) {
    'use strict';

    function BallCollection() {
        this._phaser = undefined;
        this.initialize();
    }

    BallCollection.prototype.initialize = function () {
        // Cached ref to Phaser.Game
        var game = App.game.getPhaser();

        this._phaser = game.add.group();
    };

    BallCollection.prototype.add = function (ball) {
        this._phaser.add(ball.getPhaser());
        return ball;
    };

    BallCollection.prototype.enableCollisions = function () {
        // Cached ref to Phaser.Game
        var game = App.game.getPhaser();

        game.physics.arcade.collide(this._phaser, this._phaser);
    };

    return BallCollection;
});
