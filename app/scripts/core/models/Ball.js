define([
    'phaser',
    'core/App',
    'core/models/Model'
], function (Phaser, App, Model) {
    'use strict';

    function Ball(x, y, key) {
        this._phaser = undefined;
        this.initialize(x, y, key);
    }

    Ball.prototype = Model.prototype;

    Ball.prototype.initialize = function (x, y, key) {
        // Cached ref to Phaser.Game
        var game = App.game.getPhaser();

        this._phaser = game.add.sprite(x, y, key);

        game.physics.enable([this._phaser], Phaser.Physics.ARCADE);

        this._phaser.anchor.set(0.5);
        this._phaser.body.collideWorldBounds = true;
        this._phaser.body.bounce.set(0.5);
        this._phaser.body.drag.set(20, 20);
    };

    Ball.RADIUS = 10.5;

    return Ball;
});
