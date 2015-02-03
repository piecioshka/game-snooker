(function (root) {
    'use strict';

    require.config({
        paths: {
            lodash: 'vendor/lodash',
            phaser: 'vendor/phaser',
            EventEmitter: 'vendor/EventEmitter'
        },

        shim: {
            lodash: { exports: '_' },
            phaser: { exports: 'Phaser' },
            EventEmitter: { deps: ['lodash'], exports: 'EventEmitter' }
        }
    });

    require([
        'core/App',
        'core/Game'
    ], function (App, Game) {
        App.game = new Game();
        App.game.start();
    });

}(this));
