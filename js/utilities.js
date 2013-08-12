function randNum( min, max ) {
    return Math.random() * ( max - min ) + min;
};

function detectCollision (obj1, obj2){
	if (obj1.x > obj2.x - obj2.radius -obj1.radius && obj1.x < obj2.x + obj2.radius + obj1.radius && obj1.y > obj2.y - obj2.radius - obj1.radius && obj1.y < obj2.y + obj2.radius + obj1.radius){
		return true;
	}
	else {
		return false;
	}
};

function flyTo (obj1, obj2){
	var dx = obj2.xCenter - obj1.x
	var dy = obj2.yCenter - obj1.y
	if (dx != 0 || dy!= 0){
		vx = obj1.speed * (dx / Math.sqrt(dx*dx + dy*dy))
		vy = obj1.speed * (dy / Math.sqrt(dx*dx + dy*dy))

		obj1.x += vx
		obj1.y += vy
	}
}
//return which map tile belongs to these coordinates
function getTile(x, y){
	for (i = 0; i < map.length; i++){
			if (x >= map[i].x && x < map[i].x + blockSize && y >= map[i].y && y < map[i].y + blockSize){		
				return map[i];
			}
		}
}

function getNeighbours (tile){
	var neighbours = [];
	for (i = 0; i < map.length; i++){
		//get top
		if(tile.x === map[i].x && tile.y-blockSize === map[i].y){
			neighbours.push(map[i]);
		}		
		//get right
		if(tile.y === map[i].y && tile.x+blockSize === map[i].x){
			neighbours.push(map[i]);
		}
		//get bottom
		if(tile.x === map[i].x && tile.y+blockSize === map[i].y){
			neighbours.push(map[i]);
		}
		//get left
		if(tile.y === map[i].y && tile.x-blockSize === map[i].x){
			neighbours.push(map[i]);
		}
		//get top left
		if(tile.x-blockSize === map[i].x && tile.y-blockSize === map[i].y){
			neighbours.push(map[i]);
		}		
		//get top right
		if(tile.x+blockSize === map[i].x && tile.y-blockSize === map[i].y){
			neighbours.push(map[i]);
		}	
		//get bottom left
		if(tile.x-blockSize === map[i].x && tile.y+blockSize === map[i].y){
			neighbours.push(map[i]);
		}
		//get bottom right
		if(tile.x+blockSize === map[i].x && tile.y+blockSize === map[i].y){
			neighbours.push(map[i]);
		}
		
	}
	return neighbours;
}

function goTo (obj1, obj2){
	if (typeof(obj1.path[0])==="object"){
		var dx = obj1.path[0].xCenter - obj1.x
		var dy = obj1.path[0].yCenter - obj1.y
		
		//console.log(obj1.x , obj1.path[0].xCenter);
		
		if(obj1.x > obj1.path[0].xCenter-1 && obj1.x < obj1.path[0].xCenter+1 && obj1.y > obj1.path[0].yCenter-1 && obj1.y < obj1.path[0].yCenter+1){
			obj1.path.splice(0, 1);
			if (!(typeof(obj1.path[0])==="object")){
				obj1.target = map[0];
			}
		}
		else{
			vx = obj1.speed * (dx / Math.sqrt(dx*dx + dy*dy))
			vy = obj1.speed * (dy / Math.sqrt(dx*dx + dy*dy))

			obj1.x += vx
			obj1.y += vy
		}
		/*if (dx != 0 || dy!= 0){
			vx = obj1.speed * (dx / Math.sqrt(dx*dx + dy*dy))
			vy = obj1.speed * (dy / Math.sqrt(dx*dx + dy*dy))

			obj1.x += vx
			obj1.y += vy
		}
		else {
			obj1.path.splice(0, 1);
		}*/
	}
	else {
		getPath(obj1, obj2); //TODO set a Get tile for the target, if the target is not a tile
	}
}

function getPath (obj1, obj2){
//{
		//reset the search values
		for (i = 0; i < map.length; i++){
			map[i].parent = null;
			map[i].g = 0;
			map[i].h = 0;
			map[i].f = 0;
		}
		var openList = [];		
		var closedList = [];
		//get the position of obj1
		var start = getTile(obj1.x, obj1.y); 
		var current = start;
		openList.push(current);
		
		//start the loop here, run it while the path hasn't been found
		var searching = true;
		while(searching){
		
		var neighbours = getNeighbours(current);
			//check neighbours
			for (i = 0; i < neighbours.length; i++){
				//check that  they're passable
				if (neighbours[i].passability >= 1){ 
					var listCheck1 = false;
					var listCheck2 = false;
					//check that they're not in the closed list already
					for (j = 0; j < closedList.length; j++){
						if (neighbours[i] === closedList[j]){
							listCheck1 = true;
						}
					}
					//check if they're already in the open list
					for (j = 0; j < openList.length; j++){
						if (neighbours[i] === openList[j]){
							listCheck2 = true;
							//check if the g is better now g TODO: SET G TO COMPLETE PATH TO START, NOT JUST TO CURRENT
							var dx = neighbours[i].xCenter - current.xCenter;
							var dy = neighbours[i].yCenter - current.yCenter;
							var tempG = Math.sqrt(dx*dx + dy*dy) + current.g;
							if (tempG < neighbours[i].g){
								neighbours[i].parent = current;
								neighbours[i].g = tempG;
							}
						}
					}
					if (listCheck1 === false && listCheck2 === false){
						//set the current square as the parent of these squares
						neighbours[i].parent = current;
						openList.push(neighbours[i]);	
					}
								
				}
			}
			//remove the current tile from the open list and add it to the closed list
			for (i = 0; i < openList.length; i++){
				if (openList[i] === current){
					openList.splice(i, 1);
					closedList.push(current);
				}
			}
			// calculate g, h and f for every item in the open list
			for (i = 0; i < openList.length; i++){
				//if (openList[i].g <= 0){
					//get g TODO: SET G TO COMPLETE PATH TO START, NOT JUST TO CURRENT
					var dx = openList[i].xCenter - current.xCenter;
					var dy = openList[i].yCenter - current.yCenter;				
					openList[i].g = Math.sqrt(dx*dx + dy*dy) + openList[i].parent.g;
					
					
					/*var curr = openList[i];
					if (curr.parent != null) {
						openList[i] += curr.parent.g;
					}*/
					
					
					//get h
					dx = obj2.xCenter - openList[i].xCenter;
					dy = obj2.yCenter - openList[i].yCenter;
					openList[i].h = Math.sqrt(dx*dx + dy*dy);
					//get f
					openList[i].f = openList[i].g + openList[i].h;
				//}
			}
			//pick the square with the lowest f score, make it the new current, drop it from the open list and add to the closed list. Repeat
			var tmp;
			var lowest = Number.POSITIVE_INFINITY;
			for (i = 0; i < openList.length; i++){			
				tmp = openList[i].f;
				if (tmp < lowest){
					lowest = tmp;
					current = openList[i];
				}
			
			}
		for (i = 0; i < closedList.length; i++){
				//TODO check target tile
				if (closedList[i] === obj2){
					searching = false;
					//console.log("I FOUND DA TARGET MADDDAFAKKAS");
					var curr = current;
					var path = [];
					while (curr.parent) {
						//console.log("adding a node to path");
						obj1.path.unshift(curr);
						curr = curr.parent;
					}
					/*
					var curr = currentNode;
					var ret = [];
					while(curr.parent) {
					ret.push(curr);
					curr = curr.parent;*/
				}
			}
		}
		//test, visualise the open list
		for (i=  0; i < obj1.path.length; i++){
			obj1.path[i].color = obj1.color;
		}
		for (i = 0; i < openList.length; i++){
			ctx.fillText("f:" + Math.round(openList[i].f), openList[i].x, openList[i].y+blockSize-1);
			ctx.fillText("g:" + Math.round(openList[i].g), openList[i].x, openList[i].y+blockSize-11);
			ctx.fillText("h:" + Math.round(openList[i].h), openList[i].x, openList[i].y+blockSize-21);
			//openList[i].color = "rgba(255,255,255,1)";
			//current.color = "rgba (0,0,0,1)";
		}
		for (i = 0; i < closedList.length; i++){
			ctx.fillText("f:" + Math.round(closedList[i].f), closedList[i].x, closedList[i].y+blockSize-1);
			ctx.fillText("g:" + Math.round(closedList[i].g), closedList[i].x, closedList[i].y+blockSize-11);
			ctx.fillText("h:" + Math.round(closedList[i].h), closedList[i].x, closedList[i].y+blockSize-21);
			//closedList[i].color = "rgba(255,255,255,1)";
			//current.color = "rgba (0,0,0,1)";
		}
	//}
}