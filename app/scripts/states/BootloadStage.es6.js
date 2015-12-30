import debug from 'debug';

let log = debug('bootload:stage');

class BootloadStage extends Phaser.State {
    preload() {
        log('preload');
        this.load.image('power', 'assets/images/power.png');
        this.load.image('table', 'assets/images/table.png');
        this.load.image('cue', 'assets/images/cue.png');

        this.load.image('ball-black', 'assets/images/balls/black.png');
        this.load.image('ball-blue', 'assets/images/balls/blue.png');
        this.load.image('ball-brown', 'assets/images/balls/brown.png');
        this.load.image('ball-green', 'assets/images/balls/green.png');
        this.load.image('ball-pink', 'assets/images/balls/pink.png');
        this.load.image('ball-red', 'assets/images/balls/red.png');
        this.load.image('ball-white', 'assets/images/balls/white.png');
        this.load.image('ball-yellow', 'assets/images/balls/yellow.png');

        this.load.json('balls-positions', 'assets/balls.json');

        this.load.physics('physicsTable', 'assets/physics/table-2.json');
        this.load.physics('wb', 'assets/physics/ball.json');
    }

    create() {
        log('create');
        this.state.start('main');
    }
}

export default BootloadStage;
