import Conf from '../conf';
import debug from 'debug';

let log = debug('main:stage');

class MainStage extends Phaser.State {
    create() {
        log('create');
        this.add.image(0, 0, 'table');

        let balls = this.cache.getJSON('balls');
        log(balls);

        balls.forEach(({ name, type, position: { x, y } }, index) => {
            this.add.tileSprite(Conf.GAME_WIDTH * x, Conf.GAME_HEIGHT * y, 21, 21, 'balls', type);
        });
    }

    update() {
        // log('update');
    }

    render() {
        // this.game.debug.inputInfo(32, 32);
        // this.game.debug.pointer(this.game.input.activePointer);

        // this.game.debug.spriteInfo(sprite, 32, 32);
        // this.game.debug.spriteCoords(sprite, 32, 128);
        // this.game.debug.spriteInputInfo(sprite, 32, 192);
        // this.game.debug.spriteBounds(sprite);

        // this.game.debug.pixel(100, 100, 'red', 5);
    }
}

export default MainStage;
