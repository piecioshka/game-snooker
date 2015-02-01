define([
    'phaser',
    'core/App'
], function (Phaser, App) {
    'use strict';

    var Table = function () {
        this.initialize();
    };

    Table.prototype.initialize = function () {
        // Cached ref to Phaser.Game
        var game = App.game.getPhaser();

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // game.world.setBounds(0, 0, 821, 459);
        game.world.bounds.setTo(55, 55, 711, 349);
        game.physics.setBoundsToWorld();

        game.add.tileSprite(0, 0, 821, 459, 'table');
    };

    return Table;
});