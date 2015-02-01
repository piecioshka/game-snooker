define([
    'phaser',
    'core/App',
    'core/models/Model'
], function (Phaser, App, Model) {
    'use strict';

    function Table() {
        this._phaser = undefined;
        this.initialize();
    }

    Table.prototype = new Model();

    Table.prototype.initialize = function () {
        // Cached ref to Phaser.Game
        var game = App.game.getPhaser();

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Instead of line below:
        // game.world.setBounds(0, 0, 821, 459);

        // Use that construction, because Table (without bands) is main world
        // And by PhaserJS situation that sprite is bigger than world is not supported.
        game.world.bounds.setTo(55, 55, 711, 349);
        game.physics.setBoundsToWorld();

        this._phaser = game.add.tileSprite(0, 0, 821, 459, 'table');
    };

    Table.WIDTH = 821;
    Table.HEIGHT = 459;

    return Table;
});
