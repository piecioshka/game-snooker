define([
    'lodash',
    'phaser',
    'core/App',
    'core/helpers/PhaserModelHelper',
    'core/collections/BallCollection'
], function (_, Phaser, App, PhaserModelHelper, BallCollection) {
    'use strict';

    function Table() {
        this._phaser = undefined;
        this._balls = undefined;
        this.initialize();
    }

    Table.prototype.initialize = function () {
        // Cached ref to Phaser.Game
        var game = App.game.getPhaser();

        // Instead of line below:
        // game.world.setBounds(0, 0, 821, 459);

        // Use that construction, because Table (without bands) is main world
        // And by PhaserJS situation that sprite is bigger than world is not supported.
        game.world.bounds.setTo(55, 55, 711, 349);
        game.physics.setBoundsToWorld();

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.restitution = 0.9;
        game.physics.p2.friction = 1;
        game.physics.p2.applyDamping = true;

        this._phaser = game.add.tileSprite(0, 0, 821, 459, 'table');

        this._balls = new BallCollection();
    };

    Table.prototype.add = function (ball) {
        return this._balls.add(ball);
    };

    Table.prototype.getBalls = function () {
        return this._balls;
    };

    Table.WIDTH = 821;
    Table.HEIGHT = 459;

    _.extend(Table.prototype, PhaserModelHelper.prototype);

    return Table;
});
