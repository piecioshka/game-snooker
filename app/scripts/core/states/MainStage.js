define([
    'phaser',
    'core/App',
    'core/collections/BallCollection',
    'core/models/Ball',
    'core/models/WhiteBall',
    'core/models/Table'
], function (Phaser, App, BallCollection, Ball, WhiteBall, Table) {
    'use strict';

    var balls;
    var whiteBall;

    var MainStage = {
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

        create: function () {
            // Cached ref to Phaser.Game
            new Table();

            var tableWidth = 821;
            var tableHeight = 459;
            var ballRadius = 10.5;

            balls = new BallCollection();

            whiteBall = balls.add(new WhiteBall(210, 255, 'ball-white'));

            balls.add(new Ball(tableWidth * 0.28, tableHeight * 0.37, 'ball-green'));
            balls.add(new Ball(tableWidth * 0.28, tableHeight / 2, 'ball-brown'));
            balls.add(new Ball(tableWidth * 0.28, tableHeight * 0.62, 'ball-yellow'));

            balls.add(new Ball(tableWidth / 2, tableHeight / 2, 'ball-blue'));
            balls.add(new Ball(tableWidth * 0.63, tableHeight / 2, 'ball-pink'));

            balls.add(new Ball(tableWidth * 0.67, tableHeight / 2, 'ball-red'));

            balls.add(new Ball(tableWidth * 0.693, tableHeight / 2 - ballRadius, 'ball-red'));
            balls.add(new Ball(tableWidth * 0.693, tableHeight / 2 + ballRadius, 'ball-red'));

            balls.add(new Ball(tableWidth * 0.717, tableHeight / 2 - ballRadius * 2, 'ball-red'));
            balls.add(new Ball(tableWidth * 0.717, tableHeight / 2, 'ball-red'));
            balls.add(new Ball(tableWidth * 0.717, tableHeight / 2 + ballRadius * 2, 'ball-red'));

            balls.add(new Ball(tableWidth * 0.74, tableHeight / 2 - ballRadius * 3, 'ball-red'));
            balls.add(new Ball(tableWidth * 0.74, tableHeight / 2 - ballRadius, 'ball-red'));
            balls.add(new Ball(tableWidth * 0.74, tableHeight / 2 + ballRadius, 'ball-red'));
            balls.add(new Ball(tableWidth * 0.74, tableHeight / 2 + ballRadius * 3, 'ball-red'));

            balls.add(new Ball(tableWidth * 0.765, tableHeight / 2 - ballRadius * 4.1, 'ball-red'));
            balls.add(new Ball(tableWidth * 0.765, tableHeight / 2 - ballRadius * 2, 'ball-red'));
            balls.add(new Ball(tableWidth * 0.765, tableHeight / 2, 'ball-red'));
            balls.add(new Ball(tableWidth * 0.765, tableHeight / 2 + ballRadius * 2, 'ball-red'));
            balls.add(new Ball(tableWidth * 0.765, tableHeight / 2 + ballRadius * 4.1, 'ball-red'));

            balls.add(new Ball(tableWidth * 0.86, tableHeight / 2, 'ball-black'));
        },

        update: function () {
            balls.enableCollisions();
            whiteBall.enableCollision();
        },

        render: function () {
            // Cached ref to Phaser.Game
            var game = App.game.getPhaser();

            game.debug.spriteCoords(whiteBall.getPhaser(), 80, 80);
        }
    };

    return MainStage;
});
