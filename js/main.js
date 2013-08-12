// Get the canvas element
var canvas = document.getElementById( "canvas" );
// Get our 2D context for drawing
var ctx = canvas.getContext( "2d" );

// Frames-per-second
var FPS = 30;

var blockSize = 30;

test = new Image();
test.src= "img/test.png";
tower = new Image();
tower.src= "img/tower.png";






//testar att flytta runt en karaktär
var hero = {
	    x : canvas.width/2,
		y : canvas.height/2,
		vx: 0,
		vy: 0,
		radius : 15,
		
		color : "rgba(255, 0, 0, .5)",
		update: function() {
			this.x += this.vx / FPS;
			this.y += this.vy / FPS;
			// Collision detection
			if ( ( this.x - this.radius ) < 0 ) {
				this.x = this.radius;
			}
			if ( ( this.x + this.radius ) > canvas.width ) {
				this.x = canvas.width - this.radius;
			}
			if ( ( this.y - this.radius ) < 0 ) {
				this.y = this.radius;
			}
			if ( ( this.y + this.radius ) > canvas.height ) {
				this.y = canvas.height - this.radius;
			}
    }
};



// Game loop draw function
function draw() {
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
	drawMap();
	drawBullets();
    drawEnemies();
	drawTowers();
	drawMenu();
	
	//draw hero
	ctx.drawImage(test,hero.x,hero.y);

	
	
	
}
// Game loop update function
function update() {
	hero.update();
	updateTowers();
	updateMap();
	updateBullets();
	//update enemies
	updateEnemies();
}



function tick() {
    draw();
    update(); 
	
}

setInterval( tick, 1000 / FPS );