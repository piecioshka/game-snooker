(function (global) {
    'use strict';

    // imports
    var _ = global._;
    var snooker = (global.snooker = global.snooker || {});

    function getBoardName(index) {
        return [undefined, 'left', 'top', 'right', 'bottom'][index];
    }



    var tableWidth = snooker.Table.WIDTH;
    var leftBoard = snooker.Table.LEFT_BOARD;
    var topBoard = snooker.Table.TOP_BOARD;
    var rightBoard = snooker.Table.RIGHT_BOARD;
    var bottomBoard = snooker.Table.BOTTOM_BOARD;
    var radius = snooker.Ball.RADIUS;
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

    snooker.Collision = {
        isBallCollision: function (ball) {

        },
        isBoardCollision: function (ball) {
            var pos = ball.position;
            var x = pos.x;
            var y = pos.y;
            var state = 0;

            if (x < snooker.Table.LEFT_BOARD) {
                ball.position.x = snooker.Table.LEFT_BOARD;
                state = 1;
            } else if (y < snooker.Table.TOP_BOARD) {
                ball.position.y = snooker.Table.TOP_BOARD;
                state = 2;
            } else if (x + (snooker.Ball.RADIUS * 2) > snooker.Table.RIGHT_BOARD) {
                ball.position.x = snooker.Table.RIGHT_BOARD - (snooker.Ball.RADIUS * 2);
                state = 3;
            } else if (y + (snooker.Ball.RADIUS * 2) > snooker.Table.BOTTOM_BOARD) {
                ball.position.y = snooker.Table.BOTTOM_BOARD - (snooker.Ball.RADIUS * 2);
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

            _.each(pots, function (pot, name) {
                var b, o;
                if (!board) return;

                b = pot[board];
                if (!b) return;

                o = [undefined, 'y', 'x', 'y', 'x'][board];

                if (b.min <= pos[o] && b.max >= pos[o]) {
                    console.log('collision with *' + name + '* pot');
                    status = true;
                }
            });

            return status;
        }
    };

}(this));
