// Create enemies
var enemies = [];

//create enemies
/*for (var i = 0; i < 10; i++ ) {
    enemies.push({
        // Create random values for each of these:
        x: randNum( 30, canvas.width - 30 ),
        y: randNum( 30, canvas.height - 30 ),
        vx: randNum( -50, 50 ),
        vy: randNum( -50, 50 ),
        ax: randNum( -40, 40 ),
        ay: randNum( -40, 40 ),
        radius: 15,
        health: 50,
		totalHealth: 50,
        color: "rgba(255, 255, 255, .5)"
    });
}*/

function createEnemy (pos, type){
	var radius = 15;
	var circle = new SAT.Circle(new SAT.Vector(pos.x,pos.y), radius);
	circle.vx = 0;
	circle.vy = 0;
	circle.path = [];
	circle.target = mapTwoD[5][5];
	circle.speed = 2;
	circle.totalHealth = 50;
	circle.health = circle.totalHealth;
	circle.type = type;
	enemies.push(circle);
}
/*function createEnemy(pos, type){
	switch(type){
		case "red":
			enemies.push({
				x: pos.x,
				y: pos.y,
				vx: 0,
				vy: 0,
				path: [],
				target: mapTwoD[2][2],
				radius: 15,
				speed: 2,
				health: 50,
				totalHealth: 50,
				color: "rgba(255, 0, 0, .5)"
			});
			break;
		case "blue":
			enemies.push({
				x: pos[0],
				y: pos[1],
				vx: 0,
				vy: 0,
				path: [],
				target: mapTwoD[2][2],
				radius: 15,
				speed: 2,
				health: 50,
				totalHealth: 50,
				color: "rgba(0, 0, 255, .5)"
			});
			break;
		case "yellow":
			enemies.push({
				x: pos[0],
				y: pos[1],
				vx: 0,
				vy: 0,
				path: [],
				target: mapTwoD[2][2],
				radius: 15,
				speed: 3,
				health: 50,
				totalHealth: 50,
				color: "rgba(255, 255, 0, .5)"
			});
			break;
		default:
			enemies.push({
				x: pos[0],
				y: pos[1],
				vx: 0,
				vy: 0,
				path: [],
				target: mapTwoD[2][2],
				radius: 15,
				speed: 1,
				health: 50,
				totalHealth: 50,
				color: "rgba(255, 255, 255, .5)"
			});
			break;
	}
}
*/
createEnemy(mapTwoD[0][0].pos, "red");	
//createEnemy([map.nodes[1][1].x, map.nodes[1][1].y], "blue");
//createEnemy(100,310,"yellow");
	
function drawEnemies(){
	if (isometric){
		for ( var i = 0; i < enemies.length; i++ ) {
			var p = enemies[i];			
			drawEnemy(p);
		}
	}
	else{
		//draw 2d
		for ( var i = 0; i < enemies.length; i++ ) {
			var p = enemies[i];			
			drawEnemy(p);
		}
	}
	
		
	//draw healthbar
	/*
	if (p.health < p.totalHealth){
		ctx.fillStyle = "rgba(0, 255, 0, 1)";
		ctx.fillRect (p.x-camera.x-blockSize/2, p.y-camera.y-25, blockSize, 7);
		ctx.fillStyle = "rgba(200, 0, 0, 1)"
		ctx.fillRect (p.x+1-camera.x-blockSize/2, p.y-camera.y+1-25, blockSize-2, 7-2);
		//area that is not damaged
		ctx.fillStyle = "rgba(0, 200, 0, 1)"
		ctx.fillRect (p.x+1-camera.x-blockSize/2, p.y-camera.y+1-25, (blockSize-2)*(p.health/p.totalHealth), 7-2); 
	}*/
}

function updateEnemies(){
	if (enemies.length > 0){
		for ( var i = 0; i < enemies.length; i++ ) {
			
			//check health of enemies
			var p = enemies[i];
			if (p.health <= 0){
				enemies.splice(i, 1);
			}
			//om ingen path så skaffa en
			if (!p.path[0]){
				//om den redan står på target
				var start = screenToTile(p.x, p.y);
				var end = p.target;
				p.path = astar.search(map.nodes, start, end, false);
				if (!p.path[0]){
					console.log("enemy placed on a friggin rock ya moron!");
				}
			}

			else if (tileToScreen(p.path[0]).x > p.x - blockSize*2 && tileToScreen(p.path[0]).x < p.x + blockSize*2 && tileToScreen(p.path[0]).y > p.y - blockSize*2 && tileToScreen(p.path[0]).y < p.x + blockSize*2){
				//ta bort [0] från path om detectcollision true
				p.path.splice(0, 1);
				//console.log(p.path);
				if (p.path.length === 0){
					console.log("arrived at target");
					console.log(p.path.length);
				}
			}
			
			else{
				//console.log("x: " + p.x + " " + "y: " + p.y + " canvaswidth: " + canvas.width+ " canvasheight: " + canvas.height);
				//goTo(p, tileToScreen(p.path[0]));		
				null;
			}
			//console.log(p.path[0]);
			//console.log(tileToScreen(p.path[0]).x + " " + p.x);
		}
	}
}