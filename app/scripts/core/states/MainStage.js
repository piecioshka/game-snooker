define([
    'phaser',
    'core/App',
    'core/models/Ball',
    'core/models/WhiteBall',
    'core/models/Table',
    'core/models/Cue',
    'core/models/Pointer',
    'core/models/StrengthIndicator'
], function (Phaser, App, Ball, WhiteBall, Table, Cue, Pointer, StrengthIndicator) {
    'use strict';

    var table;
    var whiteBall;
    var pointer;
    var strengthIndicator;
    var cue;

    var MainStage = {
        preload: function () {
            // Cached ref to Phaser.Game
            var game = App.game.getPhaser();

            // Load assets.
            game.load.image('power', 'assets/images/power.png');
            game.load.image('table', 'assets/images/table.png');
            game.load.image('cue', 'assets/images/cue.png');

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
            var game = App.game.getPhaser();

            // Instead of line below:
            // game.world.setBounds(0, 0, 821, 459);

            // Use that construction, because Table (without bands) is main world
            // And by PhaserJS situation that sprite is bigger than world is not supported.
            game.world.bounds.setTo(55, 55, 711, 349);
            game.physics.setBoundsToWorld();

            game.physics.startSystem(Phaser.Physics.P2JS);

            game.physics.p2.restitution = 0.9;
            game.physics.p2.friction = 1;
            game.physics.p2.applyDamping = true;

            // Setup main models.
            // ------------------

            table = new Table();
            cue = new Cue();
            pointer = new Pointer();
            strengthIndicator = new StrengthIndicator();

            App.game.on('fire:ball', function (params) {
                var ball = whiteBall.getPhaser();
                var ghost = pointer.getPhaser();

                var vectorX = (ghost.x - ball.x) * 3;
                var vectorY = (ghost.y - ball.y) * 3;

                ball.body.velocity.x = vectorX * params.strength;
                ball.body.velocity.y = vectorY * params.strength;

                cue.hide();
            });

            App.game.on('stop:ball', function () {
                var ball = whiteBall.getPhaser();
                ball.body.setZeroVelocity();

                cue.show();
            });

            // Setup balls.
            // ------------

            whiteBall = table.add(new WhiteBall(210, 255, 'ball-white', table));

            table.add(new Ball(Table.WIDTH * 0.28, Table.HEIGHT * 0.37, 'ball-green', table));
            table.add(new Ball(Table.WIDTH * 0.28, Table.HEIGHT / 2, 'ball-brown', table));
            table.add(new Ball(Table.WIDTH * 0.28, Table.HEIGHT * 0.62, 'ball-yellow', table));

            table.add(new Ball(Table.WIDTH / 2, Table.HEIGHT / 2, 'ball-blue', table));
            table.add(new Ball(Table.WIDTH * 0.63, Table.HEIGHT / 2, 'ball-pink', table));

            table.add(new Ball(Table.WIDTH * 0.67, Table.HEIGHT / 2, 'ball-red', table));

            table.add(new Ball(Table.WIDTH * 0.693, Table.HEIGHT / 2 - Ball.RADIUS, 'ball-red', table));
            table.add(new Ball(Table.WIDTH * 0.693, Table.HEIGHT / 2 + Ball.RADIUS, 'ball-red', table));

            table.add(new Ball(Table.WIDTH * 0.717, Table.HEIGHT / 2 - Ball.RADIUS * 2.1, 'ball-red', table));
            table.add(new Ball(Table.WIDTH * 0.717, Table.HEIGHT / 2, 'ball-red', table));
            table.add(new Ball(Table.WIDTH * 0.717, Table.HEIGHT / 2 + Ball.RADIUS * 2.1, 'ball-red', table));

            table.add(new Ball(Table.WIDTH * 0.74, Table.HEIGHT / 2 - Ball.RADIUS * 3.1, 'ball-red', table));
            table.add(new Ball(Table.WIDTH * 0.74, Table.HEIGHT / 2 - Ball.RADIUS, 'ball-red', table));
            table.add(new Ball(Table.WIDTH * 0.74, Table.HEIGHT / 2 + Ball.RADIUS, 'ball-red', table));
            table.add(new Ball(Table.WIDTH * 0.74, Table.HEIGHT / 2 + Ball.RADIUS * 3.1, 'ball-red', table));

            table.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2 - Ball.RADIUS * 4.2, 'ball-red', table));
            table.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2 - Ball.RADIUS * 2.1, 'ball-red', table));
            table.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2, 'ball-red', table));
            table.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2 + Ball.RADIUS * 2.1, 'ball-red', table));
            table.add(new Ball(Table.WIDTH * 0.765, Table.HEIGHT / 2 + Ball.RADIUS * 4.2, 'ball-red', table));

            table.add(new Ball(Table.WIDTH * 0.86, Table.HEIGHT / 2, 'ball-black', table));
        },

        update: function () {
            pointer.update();
            strengthIndicator.update(whiteBall);
            cue.update(whiteBall, pointer);
        },

        render: function () {
            // Cached ref to Phaser.Game
            var game = App.game.getPhaser();
            game.debug.spriteCoords(whiteBall.getPhaser(), 80, 80);
        }
    };

    return MainStage;
});
