snooker = this.snooker || {};
snooker.ui = snooker.ui || {};

snooker.ui.BALL_WIDTH = 20;
snooker.ui.BALL_HEIGHT = 20;

snooker.ui.Ball = function(color){
	var ball = document.createElement('span');
    pklib.css.addClass('ball', ball);
    ball.id = color;
    ball.style.background = color;
    ball.style.left = Math.round(Math.random()*(snooker.ui.TABLE_WIDTH-snooker.ui.BALL_WIDTH));
    ball.style.top = Math.round(Math.random()*(snooker.ui.TABLE_HEIGHT-snooker.ui.BALL_HEIGHT));
    ball.style.width = snooker.ui.BALL_WIDTH;
    ball.style.height = snooker.ui.BALL_HEIGHT;
    ball.style.lineHeight = snooker.ui.BALL_HEIGHT + 'px';
    /* for FF 3.x.x */
    ball.style.MozBorderRadius = ball.style.borderRadius = snooker.ui.BALL_HEIGHT/2 + 'px';
    ball.style.MozBoxShadow = ball.style.boxShadow = '#aaa 3px 3px 10px';
    ball.innerHTML = Math.ceil(Math.random()*9);
	return ball;
};
