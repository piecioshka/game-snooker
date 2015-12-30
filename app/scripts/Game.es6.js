import Conf from './conf';
import BootloadStage from './states/BootloadStage';
import GameStage from './states/GameStage';
import Postal from 'postal';

class Game {
    game = null;
    mainChannel = null;

    constructor() {
        let game = this.game = new Phaser.Game(Conf.GAME_WIDTH, Conf.GAME_HEIGHT, Phaser.CANVAS, 'app');

        let mainChannel = this.mainChannel = game.mainChannel = Postal.channel('main');
        mainChannel.publish('setup.ready', {
            setup: 'ready'
        });
    }

    setup() {
        this.game.state.add('boot', BootloadStage);
        this.game.state.add('main', GameStage);

        this.game.state.start('boot');
    }
}

export default Game;
