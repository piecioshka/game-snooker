define([
    'phaser',
    'core/App',
    'core/models/Ball',
    'core/models/Table'
], function (Phaser, App, Ball, Table) {
    'use strict';

    var analog;
    var arrow;
    var catchFlag = false;
    var launchVelocity = 0;

    var balls;
    var whiteBall;

    var Bootstrap = {
        preload: function () {
            // Cached ref to Phaser.Game
            var game = App.game.getPhaser();

            // Load assets.
            game.load.image('power', 'assets/images/power.png');
            game.load.image('table', 'assets/images/table.png');

            game.load.image('ball-black', 'assets/images/balls/black.png');
            game.load.image('ball-blue', 'assets/images/balls/blue.png');
            game.load.image('ball-brown', 'assets/images/balls/brown.png');
            game.load.image('ball-green', 'assets/images/balls/green.png');
            game.load.image('ball-pink', 'assets/images/balls/pink.png');
            game.load.image('ball-red', 'assets/images/balls/red.png');
            game.load.image('ball-white', 'assets/images/balls/white.png');
            game.load.image('ball-yellow', 'assets/images/balls/yellow.png');
        },

        _setupAnalog: function () {
            // Cached ref to Phaser.Game
            var game = App.game.getPhaser();

            analog = game.add.sprite(200, 450, 'power');
            analog.width = 8;
            analog.rotation = 220;
            analog.alpha = 0;
            analog.anchor.setTo(0.5, 0.0);
        },

        _setupArrow: function () {
            // Cached ref to Phaser.Game
            var game = App.game.getPhaser();

            arrow = game.add.sprite(200, 450, 'ball-white');
            arrow.anchor.setTo(0.1, 0.5);
            arrow.alpha = 0;
        },

        _createBall: function (x, y, key) {
            // Cached ref to Phaser.Game
            var game = App.game.getPhaser();

            var ball = game.add.sprite(x, y, key, 1, balls);

            game.physics.enable([ball], Phaser.Physics.ARCADE);

            ball.anchor.set(0.5);
            ball.body.collideWorldBounds = true;
            ball.body.bounce.set(0.5);
            ball.body.drag.set(20, 20);

            return ball;
        },

        _setupInput: function (ball) {
            ball.inputEnabled = true;
            ball.input.start(0, true);
            ball.events.onInputDown.add(this._drag);
            ball.events.onInputUp.add(this._drop);
        },

        create: function () {
            // Cached ref to Phaser.Game
            new Table();

            this._setupAnalog();
            this._setupArrow();

            var tableWidth = 821;
            var tableHeight = 459;
            var ballRadius = 10.5;

            var game = App.game.getPhaser();
            balls = game.add.group();

            whiteBall = this._createBall(210, 255, 'ball-white');
            this._setupInput(whiteBall);

            var greenBall = this._createBall(tableWidth * 0.28, tableHeight * 0.37, 'ball-green');
            var brownBall = this._createBall(tableWidth * 0.28, tableHeight / 2, 'ball-brown');
            var yellowBall = this._createBall(tableWidth * 0.28, tableHeight * 0.62, 'ball-yellow');

            var blueBall = this._createBall(tableWidth / 2, tableHeight / 2, 'ball-blue');
            var pinkBall = this._createBall(tableWidth * 0.63, tableHeight / 2, 'ball-pink');

            var red1Ball = this._createBall(tableWidth * 0.67, tableHeight / 2, 'ball-red');

            var red2Ball = this._createBall(tableWidth * 0.693, tableHeight / 2 - ballRadius, 'ball-red');
            var red3Ball = this._createBall(tableWidth * 0.693, tableHeight / 2 + ballRadius, 'ball-red');

            var red4Ball = this._createBall(tableWidth * 0.717, tableHeight / 2 - ballRadius * 2, 'ball-red');
            var red5Ball = this._createBall(tableWidth * 0.717, tableHeight / 2, 'ball-red');
            var red6Ball = this._createBall(tableWidth * 0.717, tableHeight / 2 + ballRadius * 2, 'ball-red');

            var red7Ball = this._createBall(tableWidth * 0.74, tableHeight / 2 - ballRadius * 3, 'ball-red');
            var red8Ball = this._createBall(tableWidth * 0.74, tableHeight / 2 - ballRadius, 'ball-red');
            var red9Ball = this._createBall(tableWidth * 0.74, tableHeight / 2 + ballRadius, 'ball-red');
            var red10Ball = this._createBall(tableWidth * 0.74, tableHeight / 2 + ballRadius * 3, 'ball-red');

            var red11Ball = this._createBall(tableWidth * 0.765, tableHeight / 2 - ballRadius * 4.1, 'ball-red');
            var red12Ball = this._createBall(tableWidth * 0.765, tableHeight / 2 - ballRadius * 2, 'ball-red');
            var red13Ball = this._createBall(tableWidth * 0.765, tableHeight / 2, 'ball-red');
            var red14Ball = this._createBall(tableWidth * 0.765, tableHeight / 2 + ballRadius * 2, 'ball-red');
            var red15Ball = this._createBall(tableWidth * 0.765, tableHeight / 2 + ballRadius * 4.1, 'ball-red');

            var blackBall = this._createBall(tableWidth * 0.86, tableHeight / 2, 'ball-black');
        },

        _drag: function (player, pointer) {
            catchFlag = true;

            player.body.moves = false;
            player.body.velocity.setTo(0, 0);
            arrow.reset(player.x, player.y);
            analog.reset(player.x, player.y);
        },

        _drop: function () {
            catchFlag = false;
            whiteBall.body.moves = true;

            arrow.alpha = 0;
            analog.alpha = 0;

            var Xvector = (arrow.x - whiteBall.x) * 3;
            var Yvector = (arrow.y - whiteBall.y) * 3;

            whiteBall.body.velocity.setTo(Xvector, Yvector);
        },

        update: function () {
            // Cached ref to Phaser.Game
            var game = App.game.getPhaser();

            game.physics.arcade.collide(balls, balls);

            arrow.rotation = game.physics.arcade.angleBetween(arrow, whiteBall);

            if (catchFlag == true) {
                //  Track the ball sprite to the mouse
                whiteBall.x = game.input.activePointer.worldX;
                whiteBall.y = game.input.activePointer.worldY;

                arrow.alpha = 1;
                analog.alpha = 0.5;
                analog.rotation = arrow.rotation - 3.14 / 2;
                analog.height = game.physics.arcade.distanceBetween(arrow, whiteBall);
                launchVelocity = analog.height;
            }
        },

        render: function () {
            // Cached ref to Phaser.Game
            var game = App.game.getPhaser();

            game.debug.spriteCoords(whiteBall, 80, 80);
            game.debug.text('Launch Velocity: ' + parseInt(launchVelocity, 10), 80, 30, 'rgb(0,255,0)');
        }
    };

    return Bootstrap;
});
