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
            new Table();

            balls = new BallCollection();

            whiteBall = balls.add(new WhiteBall(210, 255, 'ball-white'));

            balls.add(new Ball(Table.WIDTH * 0.28, Table.HEIGHT * 0.37, 'ball-green'));
            balls.add(new Ball(Table.WIDTH * 0.28, Table.HEIGHT / 2, 'ball-brown'));
            balls.add(new Ball(Table.WIDTH * 0.28, Table.HEIGHT * 0.62, 'ball-yellow'));

            balls.add(new Ball(Table.WIDTH / 2, Table.HEIGHT / 2, 'ball-blue'));
            balls.add(new Ball(Table.WIDTH * 0.63, Table.HEIGHT / 2, 'ball-pink'));

            balls.add(new Ball(Table.WIDTH * 0.67, Table.HEIGHT / 2, 'ball-red'));

            balls.add(new Ball(Table.WIDTH * 0.693, Table.HEIGHT / 2 - Ball.RADIUS, 'ball-red'));
            balls.add(new Ball(Table.WIDTH * 0.693, Table.HEIGHT / 2 + Ball.RADIUS, 'ball-red'));

            balls.add(new Ball(Table.WIDTH * 0.717, Table.HEIGHT / 2 - Ball.RADIUS * 2, 'ball-red'));
            balls.add(new Ball(Table.WIDTH * 0.717, Table.HEIGHT / 2, 'ball-red'));
            balls.add(new Ball(Table.WIDTH * 0.717, Table.HEIGHT / 2 + Ball.RADIUS * 2, 'ball-red'));

            balls.add(new Ball(Table.WIDTH * 0.74, Table.HEIGHT / 2 - Ball.RADIUS * 3, 'ball-red'));
            balls.add(new Ball(Table.WIDTH * 0.74, Table.HEIGHT / 2 - Ball.RADIUS, 'ball-red'));
            balls.add(new Ball(Table.WIDTH * 0.74, Table.HEIGHT / 2 + Ball.RADIUS, 'ball-red'));
            balls.add(new Ball(Table.WIDTH * 0.74, Table.HEIGHT / 2 + Ball.RADIUS * 3, 'ball-red'));

            balls.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2 - Ball.RADIUS * 4.1, 'ball-red'));
            balls.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2 - Ball.RADIUS * 2, 'ball-red'));
            balls.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2, 'ball-red'));
            balls.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2 + Ball.RADIUS * 2, 'ball-red'));
            balls.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2 + Ball.RADIUS * 4.1, 'ball-red'));

            balls.add(new Ball(Table.WIDTH * 0.86, Table.HEIGHT / 2, 'ball-black'));
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
