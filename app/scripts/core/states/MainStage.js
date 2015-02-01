define([
    'phaser',
    'core/App',
    'core/models/Ball',
    'core/models/WhiteBall',
    'core/models/Table'
], function (Phaser, App, Ball, WhiteBall, Table) {
    'use strict';

    var table;
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
            table = new Table();

            whiteBall = table.add(new WhiteBall(210, 255, 'ball-white'));

            table.add(new Ball(Table.WIDTH * 0.28, Table.HEIGHT * 0.37, 'ball-green'));
            table.add(new Ball(Table.WIDTH * 0.28, Table.HEIGHT / 2, 'ball-brown'));
            table.add(new Ball(Table.WIDTH * 0.28, Table.HEIGHT * 0.62, 'ball-yellow'));

            table.add(new Ball(Table.WIDTH / 2, Table.HEIGHT / 2, 'ball-blue'));
            table.add(new Ball(Table.WIDTH * 0.63, Table.HEIGHT / 2, 'ball-pink'));

            table.add(new Ball(Table.WIDTH * 0.67, Table.HEIGHT / 2, 'ball-red'));

            table.add(new Ball(Table.WIDTH * 0.693, Table.HEIGHT / 2 - Ball.RADIUS, 'ball-red'));
            table.add(new Ball(Table.WIDTH * 0.693, Table.HEIGHT / 2 + Ball.RADIUS, 'ball-red'));

            table.add(new Ball(Table.WIDTH * 0.717, Table.HEIGHT / 2 - Ball.RADIUS * 2, 'ball-red'));
            table.add(new Ball(Table.WIDTH * 0.717, Table.HEIGHT / 2, 'ball-red'));
            table.add(new Ball(Table.WIDTH * 0.717, Table.HEIGHT / 2 + Ball.RADIUS * 2, 'ball-red'));

            table.add(new Ball(Table.WIDTH * 0.74, Table.HEIGHT / 2 - Ball.RADIUS * 3, 'ball-red'));
            table.add(new Ball(Table.WIDTH * 0.74, Table.HEIGHT / 2 - Ball.RADIUS, 'ball-red'));
            table.add(new Ball(Table.WIDTH * 0.74, Table.HEIGHT / 2 + Ball.RADIUS, 'ball-red'));
            table.add(new Ball(Table.WIDTH * 0.74, Table.HEIGHT / 2 + Ball.RADIUS * 3, 'ball-red'));

            table.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2 - Ball.RADIUS * 4.1, 'ball-red'));
            table.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2 - Ball.RADIUS * 2, 'ball-red'));
            table.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2, 'ball-red'));
            table.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2 + Ball.RADIUS * 2, 'ball-red'));
            table.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2 + Ball.RADIUS * 4.1, 'ball-red'));

            table.add(new Ball(Table.WIDTH * 0.86, Table.HEIGHT / 2, 'ball-black'));
        },

        update: function () {
            table.enableCollisions();
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
