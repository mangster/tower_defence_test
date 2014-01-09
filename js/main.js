// Get the canvas element
var canvas = document.getElementById( "canvas" );
// Get our 2D context for drawing
var ctx = canvas.getContext( "2d" );

// Frames-per-second
var FPS = 30;

var blockSize = 30;
var cellWidth = blockSize;
var cellHeight = blockSize;
var mapWidth = 1000;
var mapHeight = 1000;
var isometric = false;
var counter = 0;

test = new Image();
test.src= "img/test.png";
tower = new Image();
tower.src= "img/tower.png";


// Game loop draw function
function draw() {
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
	drawMap();
	//drawBullets();
    drawEnemies();
	//drawTowers();
	drawMenu();
	
	
	
}
// Game loop update function
function update() {
	camera.update();
	//updateTowers();
	updateMap();
	//updateBullets();
	//updateEnemies();
}



function tick() {
    draw();
    update(); 
	
}

setInterval( tick, 1000 / FPS );