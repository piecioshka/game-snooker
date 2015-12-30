require('../styles/scss/main.scss');
require('./debug-conf');

import Game from './Game';
import debug from 'debug';

let game = new Game();
let log = debug('main');

game.mainChannel.subscribe('setup.ready', (payload) => {
    log(payload);
});

game.setup();
