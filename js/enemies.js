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
function createEnemy(xIn, yIn, type){
	switch(type){
		case "red":
			enemies.push({
				x: xIn,
				y: yIn,
				vx: 0,
				vy: 0,
				path: [],
				target: map[378],
				radius: 15,
				speed: 1,
				health: 50,
				totalHealth: 50,
				color: "rgba(255, 0, 0, .5)"
			});
			break;
		case "blue":
			enemies.push({
				x: xIn,
				y: yIn,
				vx: 0,
				vy: 0,
				path: [],
				target: map[382],
				radius: 15,
				speed: 2,
				health: 50,
				totalHealth: 50,
				color: "rgba(0, 0, 255, .5)"
			});
			break;
		case "yellow":
			enemies.push({
				x: xIn,
				y: yIn,
				vx: 0,
				vy: 0,
				path: [],
				target: map[382],
				radius: 15,
				speed: 3,
				health: 50,
				totalHealth: 50,
				color: "rgba(255, 255, 0, .5)"
			});
			break;
		default:
			enemies.push({
				x: xIn,
				y: yIn,
				vx: 0,
				vy: 0,
				path: [],
				target: map[382],
				radius: 15,
				speed: 1,
				health: 50,
				totalHealth: 50,
				color: "rgba(255, 255, 255, .5)"
			});
			break;
	}
}

//createEnemy(500,10, "red");	
//createEnemy(40,200,"blue");
createEnemy(100,310,"yellow");
	
function drawEnemies(){
	for ( var i = 0; i < enemies.length; i++ ) {
        var p = enemies[i];
        ctx.beginPath();
        ctx.arc( p.x, p.y, p.radius, 0, 2 * Math.PI );
        ctx.fillStyle = p.color;
        ctx.fill();
		
		//draw healthbar
		if (p.health < p.totalHealth){
			ctx.fillStyle = "rgba(0, 255, 0, 1)";
			ctx.fillRect (p.x-blockSize/2, p.y-25, blockSize, 7);
			ctx.fillStyle = "rgba(200, 0, 0, 1)"
			ctx.fillRect (p.x+1-blockSize/2, p.y+1-25, blockSize-2, 7-2);
			//area that is not damaged
			ctx.fillStyle = "rgba(0, 200, 0, 1)"
			ctx.fillRect (p.x+1-blockSize/2, p.y+1-25, (blockSize-2)*(p.health/p.totalHealth), 7-2); 
		}
    }
}

function updateEnemies(){
	for ( var i = 0; i < enemies.length; i++ ) {
        
		//check health of enemies
		var p = enemies[i];
		if (p.health <= 0){
			enemies.splice(i, 1);
		}
        //move enemies
		//goTo(p, p.target);
		getPath(p, p.target);
		//flyTo(p, map[191]);
		
		/*
		p.vx += p.ax /FPS;
        p.vy += p.ay /FPS;
        p.x += p.vx /FPS;
        p.y += p.vy /FPS;
		*/

		// bounce off walls
        if ( ( p.x - p.radius ) < 0 ) {
            p.x = p.radius;
            p.vx = -p.vx;
        }
        if ( ( p.x + p.radius ) > canvas.width ) {
            p.x = canvas.width -p.radius;
            p.vx = -p.vx;
        }
        if ( ( p.y - p.radius ) < 0 ) {
            p.y = p.radius;
            p.vy = -p.vy;
        }
        if ( ( p.y + p.radius ) > canvas.height ) {
            p.y = canvas.height - p.radius;
            p.vy = -p.vy;
        }
    }
}