import Conf from './conf';
import BootloadStage from './states/BootloadStage';
import MainStage from './states/MainStage';
import Postal from 'postal';

class Game {
    mainChannel = null;

    constructor() {
        this.mainChannel = Postal.channel('main');
    }

    setup() {
        var game = new Phaser.Game(Conf.GAME_WIDTH, Conf.GAME_HEIGHT, Phaser.CANVAS, 'app');

        game.state.add('boot', BootloadStage);
        game.state.add('main', MainStage);

        game.state.start('boot');

        this.mainChannel.publish('setup.ready', {
            setup: 'ready'
        });
    }
}

export default Game;
