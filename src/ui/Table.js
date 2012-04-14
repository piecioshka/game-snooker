snooker = this.snooker || {};
snooker.ui = snooker.ui || {};

snooker.ui.TABLE_WIDTH = 600;
snooker.ui.TABLE_HEIGHT = 300;

snooker.ui.Table = function(name){
	
	var self = this;
	this.table = null;
		
	(function init(){
		var table = document.createElement('div');
		table.id = 'table';
		pklib.css.addClass(name, table);
		table.style.width = snooker.ui.TABLE_WIDTH; 
		table.style.height = snooker.ui.TABLE_HEIGHT; 
		self.table = document.body.appendChild(table);
	})();
		
	this.addBall = function(ball){
		if (pklib.dom.isNode(ball)) {
			var _ball = self.table.appendChild(ball);
			snooker.events.ball.init(self.table, ball);
			return _ball;
		}			
	};
	
	return this;
	
};
