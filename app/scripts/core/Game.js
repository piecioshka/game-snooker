define([
    'lodash',
    'phaser',
    'core/helpers/PhaserModelHelper',
    'core/states/MainStage'
], function (_, Phaser, PhaserModelHelper, MainStage) {
    'use strict';

    var Game = function () {
        this._phaser = new Phaser.Game(821, 459, Phaser.CANVAS, 'playground');
    };

    Game.prototype.start = function () {
        this._phaser.state.add('main', MainStage);
        this._phaser.state.start('main');
    };

    _.extend(Game.prototype, PhaserModelHelper.prototype);

    return Game;
});
