require('../styles/main.scss');
require('./debug-conf');

import Game from './game';
import debug from 'debug';

let game = new Game();
let log = debug('game');

game.mainChannel.subscribe('*', (data, { topic }) => {
    log(topic);
});

game.setup();
