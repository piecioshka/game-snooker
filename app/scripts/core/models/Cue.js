define([
    'core/App',
    'core/helpers/PhaserModelHelper'
], function (App, PhaserModelHelper) {
    'use strict';

    function Cue() {
        this._phaser = undefined;
        this.initialize();
    }

    Cue.prototype.initialize = function () {
        // Cached ref to Phaser.Game
        var game = App.game.getPhaser();

        this._phaser = game.add.sprite(100, 100, 'cue');
        this._phaser.anchor.setTo(-0.05, 0.5);
    };

    Cue.prototype.update = function (whiteBall, pointer) {
        // Cached ref to Phaser.Game
        var game = App.game.getPhaser();

        var ball = whiteBall.getPhaser();

        var angle = game.physics.arcade.angleBetween(ball, pointer.getPhaser());

        this._phaser.rotation = angle + 110;
        this._phaser.x = ball.x;
        this._phaser.y = ball.y;
    };

    Cue.prototype.hide = function () {
        this._phaser.alpha = 0;
    };

    Cue.prototype.show = function () {
        this._phaser.alpha = 1;
    };

    _.extend(Cue.prototype, PhaserModelHelper.prototype);

    return Cue;
});
