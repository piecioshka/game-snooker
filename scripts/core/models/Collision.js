(function (global) {
    'use strict';

    // imports
    var snooker = (global.snooker = global.snooker || {});

    function getBoardName(index) {
        return [undefined, 'left', 'right', 'right', 'bottom'][index];
    }

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
        }
    };

}(this));
