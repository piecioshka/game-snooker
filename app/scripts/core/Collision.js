define([
    'underscore',
    'core/snooker'
], function (_, snooker) {
    'use strict';

    function getBoardName(index) {
        return [undefined, 'left', 'top', 'right', 'bottom'][index];
    }

    var tableWidth = TABLE_WIDTH;
    var leftBoard = TABLE_LEFT_BOARD;
    var topBoard = TABLE_TOP_BOARD;
    var rightBoard = TABLE_RIGHT_BOARD;
    var bottomBoard = TABLE_BOTTOM_BOARD;
    var radius = BALL_RADIUS;
    var diameter = radius * 2;

    var pots = {
        leftTop: [undefined,
            { min: topBoard, max: topBoard + diameter }, // left
            { min: leftBoard, max: leftBoard + diameter }, // top,
            undefined, // right
            undefined // bottom
        ],
        leftBottom: [undefined,
            { min: bottomBoard - diameter - radius, max: bottomBoard }, // left
            undefined, // top
            undefined, // right
            { min: leftBoard, max: leftBoard + diameter } // bottom
        ],

        middleTop: [undefined,
            undefined, // left
            { min: (tableWidth / 2) - (diameter * 2), max: (tableWidth / 2) + (diameter * 2) }, // top
            undefined, // right
            undefined // bottom
        ],
        middleBottom: [undefined,
            undefined, // left
            undefined, // top
            undefined, // right
            { min: (tableWidth / 2) - (diameter * 2), max: (tableWidth / 2) + (diameter * 2) } // bottom
        ],

        rightTop: [undefined,
            undefined, // left
            { min: rightBoard - diameter - radius, max: rightBoard }, // top
            { min: topBoard, max: topBoard + diameter }, // right
            undefined // bottom
        ],
        rightBottom: [undefined,
            undefined, // left
            undefined, // top
            { min: bottomBoard - diameter - radius, max: bottomBoard }, // right
            { min: rightBoard - diameter - radius, max: rightBoard } // bottom
        ]
    };

    function isTwoBallTouches(first, second) {
        var xAxisValue = Math.pow(Math.abs(first.position.x - second.position.x), 2);
        var yAxisValue = Math.pow(Math.abs(first.position.y - second.position.y), 2);
        return Math.sqrt(xAxisValue + yAxisValue) <= (BALL_RADIUS * 2);
    }

    var Collision = {
        isBallCollision: function (currentBall) {
            var collisionBall = null;
            _.each(snooker.balls, function (ball) {
                if (ball.color === currentBall.color) return;
                if (isTwoBallTouches(ball, currentBall)) {
                    collisionBall = ball;
                }
            });

            if (collisionBall) {
                Events.log('collision with *' + collisionBall.color + ' (id: ' + collisionBall.id + ') * ball');
            }
            return collisionBall;
        },
        isBoardCollision: function (ball) {
            var pos = ball.position;
            var x = pos.x;
            var y = pos.y;
            var state = 0;

            if (x < TABLE_LEFT_BOARD) {
                ball.position.x = TABLE_LEFT_BOARD;
                state = 1;
            } else if (y < TABLE_TOP_BOARD) {
                ball.position.y = TABLE_TOP_BOARD;
                state = 2;
            } else if (x + (BALL_RADIUS * 2) > TABLE_RIGHT_BOARD) {
                ball.position.x = TABLE_RIGHT_BOARD - (BALL_RADIUS * 2);
                state = 3;
            } else if (y + (BALL_RADIUS * 2) > TABLE_BOTTOM_BOARD) {
                ball.position.y = TABLE_BOTTOM_BOARD - (BALL_RADIUS * 2);
                state = 4;
            }

            if (state) {
                Events.log('collision with *' + getBoardName(state) + '* board', ball.position);
            }
            return state;
        },
        isPotCollision: function (board, ball) {
            var pos = ball.position;
            var status = false;
            var collisionPot = null;
            _.each(pots, function (pot, name) {
                var b, o;
                if (!board) return;

                b = pot[board];
                if (!b) return;

                o = [undefined, 'y', 'x', 'y', 'x'][board];

                if (b.min <= pos[o] && b.max >= pos[o]) {
                    collisionPot = name;
                    status = true;
                }
            });

            if (status) {
                Events.log('collision with *' + collisionPot + '* pot');
            }
            return status;
        }
    };
    return Collision;
});

