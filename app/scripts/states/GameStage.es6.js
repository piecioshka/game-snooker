import Conf from '../conf';
import Ball from '../model/Ball';
import debug from 'debug';

let log = debug('main:stage');

class GameStage extends Phaser.State {
    table = null;
    pockets = null;
    balls = null;

    preload() {
        this.input.maxPointers = 1;
        this.scale.pageAlignHorizontally = true;
        this.game.renderer.renderSession.roundPixels = true;
        this.physics.startSystem(Phaser.Physics.P2JS);
    }

    create() {
        this._createTable();
        this._createPockets();

        this.balls = this.add.group();

        let balls = this.cache.getJSON('balls');
        balls.forEach(({ name, type, position: { x, y } }) => {
            return new Ball(this.game, Conf.GAME_WIDTH * x, Conf.GAME_HEIGHT * y, type, this.balls);
        });
    }

    _createTable() {
        this.table = this.add.sprite(Conf.GAME_WIDTH / 2, Conf.GAME_HEIGHT / 2, 'table');
        this.physics.p2.enable(this.table, Conf.DEBUG);

        this.table.body.static = true;
        this.table.body.clearShapes();
        this.table.body.loadPolygon('table', 'table');

        this.tableMaterial = this.physics.p2.createMaterial('tableMaterial', this.table.body);
    }

    _createPockets() {
        this.pockets = this.add.sprite();
        this.physics.p2.enable(this.pockets, Conf.DEBUG);

        this.pockets.body.static = true;
        this.pockets.body.clearShapes();

        let pockets = this.cache.getJSON('pockets');
        pockets.forEach(({ x, y, size }) => {
            this.pockets.body.addCircle(size, x, y);
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

export default GameStage;
