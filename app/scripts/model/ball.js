import debug from 'debug';

let log = debug('ball');

class Ball {
    phaser = null;
    state = null;

    constructor(state, x, y, type, group) {
        this.state = state;

        var ball = group.create(x, y, 'balls', type);

        ball.body.setCircle(10);
        ball.body.fixedRotation = true;
        ball.body.setMaterial(state.ballMaterial);
        ball.body.damping = 0.40;
        ball.body.angularDamping = 0.45;
        ball.body.createBodyCallback(state.pockets, state.hitPocket, state);

        this.phaser = ball;
    }

    get x() {
        return this.phaser.x;
    }

    get y() {
        return this.phaser.y;
    }

    get body() {
        return this.phaser.body;
    }
}

export default Ball;
