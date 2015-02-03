define([
    'core/App',
    'core/helpers/PhaserModelHelper'
], function (App, PhaserModelHelper) {
    'use strict';
    
    function Pointer() {
        this._phaser = undefined;
        this.initialize();
    }

    Pointer.prototype.initialize = function () {
        // Cached ref to Phaser.Game
        var game = App.game.getPhaser();

        this._phaser = game.add.sprite(0, 0, 'ball-white');
        this._phaser.alpha = 0.5;
        this._phaser.anchor.setTo(0.5, 0.5);
    };

    Pointer.prototype.update = function () {
        // Cached ref to Phaser.Game
        var game = App.game.getPhaser();

        this._phaser.x = game.input.activePointer.worldX;
        this._phaser.y = game.input.activePointer.worldY;
    };

    _.extend(Pointer.prototype, PhaserModelHelper.prototype);
    
    return Pointer;
});
