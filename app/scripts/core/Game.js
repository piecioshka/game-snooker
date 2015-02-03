define([
    'lodash',
    'phaser',
    'EventEmitter',
    'core/helpers/PhaserModelHelper',
    'core/states/MainStage'
], function (_, Phaser, EventEmitter, PhaserModelHelper, MainStage) {
    'use strict';

    var Game = function () {
        var game = this._phaser = new Phaser.Game(821, 459, Phaser.CANVAS, 'playground', 'main', true);

        require(['vendor/phaser-debug'], function (Plugin) {
            game.add.plugin(Plugin);
        });
    };

    Game.prototype.start = function () {
        this._phaser.state.add('main', MainStage);
    };

    _.extend(Game.prototype, PhaserModelHelper.prototype);
    _.extend(Game.prototype, EventEmitter);

    return Game;
});
