define([
    'phaser',
    'core/states/MainStage'
], function (Phaser, MainStage) {
    'use strict';

    var Game = function () {
        this._phaser = new Phaser.Game(821, 459, Phaser.CANVAS, 'playground');
    };

    Game.prototype.start = function () {
        this._phaser.state.add('main', MainStage);
        this._phaser.state.start('main');
    };

    Game.prototype.getPhaser = function () {
        return this._phaser;
    };

    return Game;
});
