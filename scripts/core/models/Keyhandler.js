(function (global) {
  "use strict";

  // imports
  var snooker = (global.snooker = global.snooker || {});
  var Game = (global.Game = global.Game || {});
  var Keys = (global.Keys = global.Keys || {});

  global.KeyHandler = {
    handleKeyDown: function (evt) {
      if (_.contains(Keys, evt.keyCode)) {
        if (game.status === Game.READY) {
          if (Game.velocity === Game.MIN_POWER) {
            /**
             * First value.
             * @type {number}
             */
            Game.velocity = Game.STRENGTH;
          } else {
            /**
             * Exponentially increase.
             * @type {number}
             */
              // Game.velocity += (Game.velocity / Game.STRENGTH) * Game.STRENGTH;
            Game.velocity += Game.STRENGTH;
          }

          /**
           * Limit to maximum power in game.
           */
          if (Game.velocity > Game.MAX_POWER) {
            Game.velocity = Game.MAX_POWER;
          }

          var powerView = +(Game.velocity * 100 / Game.MAX_POWER);
          this.currentBall.updatePower(powerView);
        } else {
          Game.velocity = 0;
        }
      }
    },

    handleKeyUp: function (evt) {
      if (game.status === Game.READY) {
        if (this.currentBall.status === snooker.Ball.READY) {
          this.currentBall.move(evt.keyCode, Game.velocity);
        }
        Game.velocity = 0;
      }
    }
  };

}(this));