import Conf from '../conf';
import Ball from '../model/ball';
import debug from 'debug';

let log = debug('main:state');

class GameState extends Phaser.State {
    table = null;
    pockets = null;

    balls = null;
    ballMaterial = null;

    speed = 0;
    allowShotSpeed = 15.0;

    cue = null;
    fill = null;
    fillRect = null;
    aimLine = null;

    cueball = null;

    resetting = false;
    placeball = null;
    placeRect = null;

    preload() {
        this.input.maxPointers = 1;
        this.scale.pageAlignHorizontally = true;
        this.game.renderer.renderSession.roundPixels = true;
        this.physics.startSystem(Phaser.Physics.P2JS);
    }

    create() {
        this._createTable();
        this._createPockets();
        this._createBalls();
        this._setupImpact();
        this._createCue();

        this.input.addMoveCallback(this.updateCue, this);
        this.input.onDown.add(this.takeShot, this);
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

    _createBalls() {
        this.balls = this.add.physicsGroup(Phaser.Physics.P2JS);
        this.balls.enableBodyDebug = Conf.DEBUG;

        this.ballMaterial = this.physics.p2.createMaterial('ballMaterial');

        let balls = this.cache.getJSON('balls');
        balls.list.forEach(({ name, type, position: { x, y } }) => {
            new Ball(this, Conf.GAME_WIDTH * x, Conf.GAME_HEIGHT * y, type, this.balls);
        });

        let cueball = balls.cueball;
        this.cueball = new Ball(this, Conf.GAME_WIDTH * cueball.position.x, Conf.GAME_HEIGHT * cueball.position.y, cueball.type, this.balls);

        //  Our placing cue ball
        this.placeball = this.add.sprite(0, 0, 'balls', 6);
        this.placeball.anchor.set(0.5);
        this.placeball.visible = false;

        this.placeRect = new Phaser.Rectangle(112, 128, 576, 352);
    }

    //  P2 Impact Events
    _setupImpact() {
        this.physics.p2.setImpactEvents(true);

        var ballVsTableMaterial = this.physics.p2.createContactMaterial(this.ballMaterial, this.tableMaterial);
        ballVsTableMaterial.restitution = 0.6;

        var ballVsBallMaterial = this.physics.p2.createContactMaterial(this.ballMaterial, this.ballMaterial);
        ballVsBallMaterial.restitution = 0.9;
    }

    _createCue() {
        this.cue = this.add.sprite(0, 0, 'cue');
        this.cue.anchor.y = 0.5;

        this.fill = this.add.sprite(0, 0, 'fill');
        this.fill.anchor.y = 0.5;
        this.fillRect = new Phaser.Rectangle(0, 0, 332, 6);
        this.fill.crop(this.fillRect);

        this.aimLine = new Phaser.Line(this.cueball.x, this.cueball.y, this.cueball.x, this.cueball.y);
    }

    takeShot() {
        if (this.speed > this.allowShotSpeed) {
            return;
        }

        var speed = (this.aimLine.length / 3);

        if (speed > 112) {
            speed = 112;
        }

        this.updateCue();

        var px = (Math.cos(this.aimLine.angle) * speed);
        var py = (Math.sin(this.aimLine.angle) * speed);

        this.cueball.body.applyImpulse([px, py], this.cueball.x, this.cueball.y);

        this.cue.visible = false;
        this.fill.visible = false;
    }

    hitPocket(ball) {
        //  Cue ball reset
        if (ball.sprite === this.cueball) {
            this.resetCueBall();
        } else {
            ball.sprite.destroy();

            if (this.balls.total === 1) {
                this.time.events.add(2000, this.gameOver, this);
            }
        }
    }

    gameOver() {
        this.state.restart();
    }

    resetCueBall() {
        this.cueball.body.setZeroVelocity();

        //  Move it to a 'safe' area
        this.cueball.body.x = 16;
        this.cueball.body.y = 16;

        this.resetting = true;

        //  We disable the physics body and stick the ball to the pointer
        this.cueball.visible = false;

        this.placeball.x = this.input.activePointer.x;
        this.placeball.y = this.input.activePointer.y;
        this.placeball.visible = true;

        this.input.onDown.remove(this.takeShot, this);
        this.input.onDown.add(this.placeCueBall, this);
    }

    placeCueBall() {
        //  Check it's not colliding with other balls

        var a = new Phaser.Circle(this.placeball.x, this.placeball.y, 26);
        var b = new Phaser.Circle(0, 0, 26);

        for (var i = 0; i < this.balls.length; i++) {
            var ball = this.balls.children[i];

            if (ball.frame !== 2 && ball.exists) {
                b.x = ball.x;
                b.y = ball.y;

                if (Phaser.Circle.intersects(a, b)) {
                    //  No point going any further
                    return;
                }
            }
        }

        this.cueball.reset(this.placeball.x, this.placeball.y);
        this.cueball.body.reset(this.placeball.x, this.placeball.y);
        this.cueball.visible = true;

        this.placeball.visible = false;

        this.resetting = false;

        this.input.onDown.remove(this.placeCueBall, this);
        this.input.onDown.add(this.takeShot, this);
    }

    updateCue() {
        this.aimLine.start.set(this.cueball.x, this.cueball.y);
        this.aimLine.end.set(this.input.activePointer.x, this.input.activePointer.y);

        this.cue.position.copyFrom(this.aimLine.start);
        this.cue.rotation = this.aimLine.angle;

        this.fill.position.copyFrom(this.aimLine.start);
        this.fill.rotation = this.aimLine.angle;

        this.fillRect.width = this.aimLine.length;
        this.fill.updateCrop();
    }

    update() {
        if (this.resetting) {
            this.placeball.x = this.math.clamp(this.input.x, this.placeRect.left, this.placeRect.right);
            this.placeball.y = this.math.clamp(this.input.y, this.placeRect.top, this.placeRect.bottom);
        } else {
            this.updateSpeed();
            this.updateCue();
        }
    }

    updateSpeed() {
        this.speed = Math.sqrt(this.cueball.body.velocity.x * this.cueball.body.velocity.x + this.cueball.body.velocity.y * this.cueball.body.velocity.y);

        if (this.speed < this.allowShotSpeed) {
            if (!this.cue.visible) {
                this.cue.visible = true;
                this.fill.visible = true;
            }
        } else if (this.speed < 3.0) {
            this.cueball.body.setZeroVelocity();
        }
    }

    render() {
        // this.game.debug.inputInfo(32, 32);
        // this.game.debug.pointer(this.game.input.activePointer);

        // this.game.debug.spriteInfo(sprite, 32, 32);
        // this.game.debug.spriteCoords(sprite, 32, 128);
        // this.game.debug.spriteInputInfo(sprite, 32, 192);
        // this.game.debug.spriteBounds(sprite);

        // this.game.debug.pixel(100, 100, 'red', 5);

        if (Conf.DEBUG) {
            if (this.speed < 6) {
                this.game.debug.geom(this.aimLine);
            }

            this.game.debug.text("speed: " + this.speed, 540, 24);
            this.game.debug.text("power: " + (this.aimLine.length / 3), 540, 48);
        }
    }
}

export default GameState;
