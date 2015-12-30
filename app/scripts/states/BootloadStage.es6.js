import debug from 'debug';

let log = debug('bootload:stage');

class BootloadStage extends Phaser.State {
    preload() {
        log('preload');
        this.load.path = 'assets/';

        this.load.images(['power', 'table', 'cue']);

        this.load.spritesheet('balls', 'balls.png', 21, 21);

        this.load.json('balls', 'balls.json');

        this.load.physics('table');
    }

    create() {
        log('create');
        this.state.start('main');
    }
}

export default BootloadStage;
