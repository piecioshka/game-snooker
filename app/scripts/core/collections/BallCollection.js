define([
    'lodash',
    'core/App',
    'core/helpers/PhaserModelHelper'
], function (_, App, PhaserModelHelper) {
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

    _.extend(BallCollection.prototype, PhaserModelHelper.prototype);

    return BallCollection;
});
