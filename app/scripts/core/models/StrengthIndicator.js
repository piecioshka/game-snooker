define([
    'lodash',
    'core/App',
    'core/helpers/PhaserModelHelper'
], function (_, App, PhaserModelHelper) {
    'use strict';
    
    function StrengthIndicator() {
        this._phaser = undefined;
        this.initialize();
    }

    StrengthIndicator.prototype.initialize = function () {
        // Cached ref to Phaser.Game
        var game = App.game.getPhaser();

        var strength = this._phaser = game.add.sprite(0, 0, 'power');
        this._phaser.anchor.setTo(0.5, 0.5);
        this._phaser.alpha = 1;
        this._phaser.defaultWidth = this._phaser.width;
        this._phaser.width = 0;

        var growInterval;

        game.input.onDown.add(function () {
            growInterval = setInterval(_.bind(this.grow, this), 100);
            App.game.emit('stop:ball');
        }, this);

        game.input.onUp.add(function () {
            clearInterval(growInterval);
            App.game.emit('fire:ball', {
                strength: strength.width / strength.defaultWidth
            });
            strength.width = 0;
        }, this);
    };

    StrengthIndicator.prototype.update = function (whiteBall) {
        var ball = whiteBall.getPhaser();
        var anchor = ball.anchor;

        this._phaser.x =
            // Start on the left of ball
            (ball.x - anchor.x * ball.width) -
            // Add padding with diff of widths.
            (this._phaser.width - ball.width) / 2;

        this._phaser.y =
            // Start on the top of ball
            ball.y - anchor.y * ball.height -
            // Add padding on the top
            ball.height / 2;
    };

    StrengthIndicator.prototype.grow = function () {
        var strength = this._phaser;

        if (strength.width < strength.defaultWidth) {
            strength.width++;
        }
    };

    _.extend(StrengthIndicator.prototype, PhaserModelHelper.prototype);

    return StrengthIndicator;
});
