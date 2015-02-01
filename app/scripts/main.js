(function (root) {
    'use strict';

    require.config({
        paths: {
            events: 'vendor/events',
            lodash: 'vendor/lodash',
            phaser: 'vendor/phaser'
        },

        shim: {
            events: { exports: 'Events' },
            lodash: { exports: '_' },
            phaser: { exports: 'Phaser' }
        }
    });

    require([
        'core/App',
        'core/models/Game'
    ], function (App, Game) {
        App.game = new Game();
        App.game.start();
    });

}(this));
