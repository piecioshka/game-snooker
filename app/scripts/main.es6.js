require('../styles/scss/main.scss');
require('./debug-conf');

import Game from './Game';

let game = new Game();

game.mainChannel.subscribe('setup.ready', (payload) => {
    console.log(payload);
});

game.setup();
