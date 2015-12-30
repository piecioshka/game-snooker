import debug from 'debug';

let log = debug('bootload:state');

class BootloadState extends Phaser.State {
    preload() {
        this.game.mainChannel.publish('bootload:start');

        this.load.path = 'assets/';
        this.load.images(['table', 'cue', 'fill']);
        this.load.spritesheet('balls', 'balls.png', 21, 21);
        this.load.json('balls', 'balls.json');
        this.load.json('pockets', 'pockets.json');
        this.load.physics('table');

        this.game.mainChannel.publish('bootload:done');
    }

    create() {
        this.state.start('main');
    }
}

export default BootloadState;
