class Ball {
    raw = null;

    constructor(game, x, y, type, group) {
        this.raw = game.add.tileSprite(x, y, 21, 21, 'balls', type);

        group.add(this.raw);
    }
}

export default Ball;
