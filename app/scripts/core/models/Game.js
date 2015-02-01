define([
    'phaser',
    'core/models/Model',
    'core/states/MainStage'
], function (Phaser, Model, MainStage) {
    'use strict';

    var Game = function () {
        this._phaser = new Phaser.Game(821, 459, Phaser.CANVAS, 'playground');
    };

    Game.prototype = Model.prototype;

    Game.prototype.start = function () {
        this._phaser.state.add('main', MainStage);
        this._phaser.state.start('main');
    };

    return Game;
});
