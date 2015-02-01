define([
    'lodash',
    'core/App',
    'core/models/Ball'
], function (_, App, Ball) {
    'use strict';

    function WhiteBall(x, y, key) {
        this._catchFlag = false;
        this._analog = undefined;
        this._arrow = undefined;
        this._phaser = undefined;

        this.initialize(x, y, key);
        this.enableDragging();
        this._setupAnalog();
        this._setupArrow();
    }

    WhiteBall.prototype = Ball.prototype;

    WhiteBall.prototype.enableDragging = function () {
        this._phaser.inputEnabled = true;
        this._phaser.input.start(0, true);
        this._phaser.events.onInputDown.add(_.bind(this._drag, this));
        this._phaser.events.onInputUp.add(_.bind(this._drop, this));
    };

    WhiteBall.prototype._drag = function (player, pointer) {
        this._catchFlag = true;

        player.body.moves = false;
        player.body.velocity.setTo(0, 0);

        this._arrow.reset(player.x, player.y);
        this._analog.reset(player.x, player.y);
    };

    WhiteBall.prototype._drop = function () {
        this._catchFlag = false;
        this._phaser.body.moves = true;

        this._arrow.alpha = 0;
        this._analog.alpha = 0;

        var vectorX = (this._arrow.x - this._phaser.x) * 3;
        var vectorY = (this._arrow.y - this._phaser.y) * 3;

        this._phaser.body.velocity.setTo(vectorX, vectorY);
    };

    WhiteBall.prototype.isCatch = function () {
        return this._catchFlag == true;
    };

    WhiteBall.prototype.enableCollision = function () {
        // Cached ref to Phaser.Game
        var game = App.game.getPhaser();

        this._arrow.rotation = game.physics.arcade.angleBetween(this._arrow, this._phaser);

        if (this.isCatch()) {
            //  Track the ball sprite to the mouse
            this._phaser.x = game.input.activePointer.worldX;
            this._phaser.y = game.input.activePointer.worldY;

            this._arrow.alpha = 1;
            this._analog.alpha = 0.5;
            this._analog.rotation = this._arrow.rotation - 3.14 / 2;
            this._analog.height = game.physics.arcade.distanceBetween(this._arrow, this._phaser);
        }
    };

    WhiteBall.prototype._setupAnalog = function () {
        // Cached ref to Phaser.Game
        var game = App.game.getPhaser();

        this._analog = game.add.sprite(200, 450, 'analog');
        this._analog.width = 4;
        this._analog.rotation = 220;
        this._analog.alpha = 0;
        this._analog.anchor.setTo(0.5, 0.0);
    };

    WhiteBall.prototype._setupArrow = function () {
        // Cached ref to Phaser.Game
        var game = App.game.getPhaser();

        this._arrow = game.add.sprite(200, 450, 'arrow');
        this._arrow.anchor.setTo(0.1, 0.5);
        this._arrow.alpha = 0;
    };

    return WhiteBall;
});
