snooker = this.snooker || {};
snooker.events = snooker.events || {};
 
snooker.events.ball = (function(){
	
	var _colissions = function(area){
		var elements = area.childNodes,
            XYarr = [],
            bigUp = 0.7;

		for(var i = 0, len = elements.length; i < len; ++i){
			var item = elements[i],
			
                ol = item.offsetLeft,
                ot = item.offsetTop,
                
                cenL = ol + item.offsetWidth/2,
                cenT = ot + item.offsetHeight/2;
			
			XYarr.push({
				'obj': item, 
				'left': cenL, 
				'top': cenT
			});
		}
		
		for(var i = 0; i < XYarr.length; ++i){
			var el = XYarr[i];
			
			for(var j = i +1; j < XYarr.length; ++j){
				var newel = XYarr[j],
				
				    lx = el.left - newel.left,
				    tx = el.top - newel.top,
				    tlmix = Math.pow(lx, 2) + Math.pow(tx, 2);
				    
				(tlmix < 0) && (tlmix*=(-1));
				
				var sqrt = Math.round(Math.sqrt(tlmix));
				
				// colission
				if( sqrt <= el.obj.offsetWidth/2 + newel.obj.offsetWidth/2){
					//snooker.log('collision..');
					
					var elErr = newel,
					   elOK = el;
					
					// if bigger color is extend 
					if(newel.obj.offsetWidth > el.obj.offsetWidth){
						elErr = el;
						elOK = newel;
					}
					
					// var childToDelete = area.querySelector('.'.concat(elErr.obj.className.split(' ').join('.')));
					var childToDelete = pklib.dom.byId(elErr.obj.id),
                        numberContent = parseInt(childToDelete.innerHTML, 10),
                        childToDeleteWidth = childToDelete.offsetWidth,
                        childToDeleteHeight = childToDelete.offsetHeight;
                        
					area.removeChild(childToDelete);
					
					// var scallEl = area.querySelector('.'.concat(elOK.obj.className.split(' ').join('.')));
					var scallEl = pklib.dom.byId(elOK.obj.id);
					scallEl.innerHTML = parseInt(scallEl.innerHTML, 10) + numberContent;
					// bigger 
					scallEl.style.width = (scallEl.offsetWidth + childToDeleteWidth) * bigUp;
					scallEl.style.height = (scallEl.offsetHeight + childToDeleteHeight) * bigUp;
					scallEl.style.lineHeight = scallEl.offsetHeight + 'px';
					/* for FF 3.x.x */
					scallEl.style.MozBorderRadius = scallEl.style.borderRadius = scallEl.offsetHeight/2 + 'px';
					
					var ifOKLeft = parseInt(area.style.width, 10) - (scallEl.offsetLeft + scallEl.offsetWidth);
					var ifOKTop = parseInt(area.style.height, 10) - (scallEl.offsetTop + scallEl.offsetHeight);	
					
					if( ifOKTop < 0 ) {
						scallEl.style.top = scallEl.offsetTop + ifOKTop;
					}   
					if(ifOKLeft < 0 ){
						scallEl.style.left = scallEl.offsetLeft + ifOKLeft;
					}
					
				}
			}
			
		}
		
		delete XYarr;
		
	}
	
	return {
		init: function(table, ball){
			
            if (pklib.dom.isNode(ball)) {
				
				_colissions(table);
				
				var hisL = null,
				    hisT = null,
				    histTimer = null,
				    
				    _ball = pklib.dom.byId(ball.id),
				    
				    w = ball.offsetWidth,
				    h = ball.offsetHeight,
				    
				    cenBw = Math.round(w/3*2),
				    cenBh = Math.round(h/3*2),
				    
				    ow = parseInt(ball.style.left, 10),
				    oh = parseInt(ball.style.top, 10),
				    
				    tw = table.clientWidth,
				    th = table.clientHeight,
				    
				    tow = table.offsetLeft,
				    toh = table.offsetTop,
				    
				    pull = null;
				
				// ball.addEventListener('mousedown', function(){
				pklib.event.add(ball, 'mousedown', function(){
					this.draggable = true;
					
					w = _ball.offsetWidth;
					h = _ball.offsetHeight;
					
					hisL = ball.offsetLeft;
					hisT = ball.offsetTop;
					
					histTimer = new Date().getTime();
					clearInterval(pull);
					
				}, true);
				
				// ball.addEventListener('mouseup', function(){
				pklib.event.add(ball, 'mouseup', function(){
					this.draggable = false;
					
					w = _ball.offsetWidth;
					h = _ball.offsetHeight;
					
					var newL = ball.offsetLeft - hisL,
                        newT = ball.offsetTop - hisT,
                        
                        modNewL = (newL < 0) && (newL * (-1)),
                        modNewT = (newT < 0) && (newT * (-1)),
                        
                        pows = Math.pow(modNewL, 2) - Math.pow(modNewT, 2);
                        
					(pows < 0) && (pows *= (-1));
					
					
					var s = Math.ceil(Math.sqrt(pows)), // street					
                        t = (new Date().getTime() - histTimer)/13, // time
                        v = Math.ceil(s/t), // speed ( v )
                        v1 = newL/t, // up
				        v2 = newT/t; // right
					
					//snooker.log(s, t+'ms', v+'p/s', v1+'p/s', v2+'p/s');
					
					var mover = 1;
					pull = setTimeout(function puller(){
						
						if(!_ball.draggable){
							
							w = _ball.offsetWidth;
							h = _ball.offsetHeight;
							
							var intl = parseInt(ball.style.left, 10),
                                intt = parseInt(ball.style.top, 10),
                                
                                intTw = parseInt(table.clientWidth - w, 10),
                                intTh = parseInt(table.clientHeight - h, 10),
                                
                                leftPos = intl + v1;
                                
							if( leftPos >= 0 && leftPos <= intTw ){
								// flying on the table
							} else {
								snooker.info(ball.className, '- collision with left wall:', leftPos, intTw);
								v1*=(-1);
							}
							
							ball.style.left = intl + v1;
							
							var topPos = intt + v2;
							if( topPos >= 0 && topPos <= intTh ){
								// flying on the table
							} else{
								snooker.info(ball.className, '- collision with top wall:', topPos, intTh);
								v2*=(-1);
							}
							
							ball.style.top = intt + v2;
							
							clearTimeout(pull);
							if(mover < 300) {
								setTimeout(puller, mover);
							} else {
								snooker.warn(ball.className, ' stopped!');
								mover = 1;
							}
						
							mover *= 1.1;	
							
							_colissions(table);
							
						}
					}, mover);
					
				}, true);
				
				// table.addEventListener('mousemove', function(evt){
				pklib.event.add(table, 'mousemove', function(evt){
					ball.style.border = '1px solid black';
					
					if(ball.draggable){
						ball.style.border = '1px solid red';
						
						w = _ball.offsetWidth;
						h = _ball.offsetHeight;
						
						var x = evt.clientX;
						var y = evt.clientY;

						var pl = x - cenBw - tow;
						var pt = y - cenBh - toh;
				
						(pl >= 0 && pl < (tw - w)) && (_ball.style.left = pl);
						(pt >= 0 && pt < (th - h)) && (_ball.style.top = pt);
						
						_colissions(table);
					}
					
				}, true);
				
			} else {
				snooker.error('Ball is not HTMLSpanElement');
			}
		}
	};
	
})();
