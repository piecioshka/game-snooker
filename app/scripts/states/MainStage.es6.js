import Conf from '../conf';
import debug from 'debug';

let log = debug('main:stage');

class MainStage extends Phaser.State {
    create() {
        log('create');
        this.add.image(0, 0, 'table');

        let balls = this.cache.getJSON('balls-positions');
        log(balls);

        balls.forEach(({ name, position: { x, y } }) => {
            this.add.image(Conf.GAME_WIDTH * x, Conf.GAME_HEIGHT * y, `ball-${name}`);
        });
    }

    update() {
        // log('update');
    }

    render() {

    }
}

export default MainStage;
