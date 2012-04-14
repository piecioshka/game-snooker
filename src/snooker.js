snooker = this.snooker || {};

snooker.Table = function(name){
	
	var self = this;
	this.ui = null;
	
	(function init(){
		self.ui = new snooker.ui.Table(name);
	})();

	this.addBall = function(ball){
		return self.ui.addBall(ball);
	};

	this.addBalls = function(balls){
		for(var i = 0; i < balls.length; ++i){
			self.addBall(balls[i]);
		}
	};
	
	snooker.info('snooker.Table (',name,')');
	
	return this;
}

snooker.Ball = function(color){
	
	var _ball = null;

	(function init(){
		_ball = new snooker.ui.Ball(color);
	})();
	
	return _ball;
}

snooker.init = function(){
	
	new snooker.Table('stolik').addBalls([
		new snooker.Ball('red'),
		new snooker.Ball('pink'),
		new snooker.Ball('gray'),
		new snooker.Ball('black'),
		new snooker.Ball('yellow'),
		new snooker.Ball('blue'),
		new snooker.Ball('orange'),
		new snooker.Ball('green')
	]);
}

window.onload = snooker.init;
