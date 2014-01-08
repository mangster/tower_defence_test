//Skapa random karta
var map = generateRandom(mapWidth/blockSize, mapHeight/blockSize, 0.1);

var nodes = [];
var row = [];

for (var i = 0; i < 3; i++){
	row = [];
	for (var j = 0; j < 4; j++){
		row.push(1);
	}
	nodes.push(row);
}

function updateMap(){
	/*for ( var i = 0; i < map.length; i++ ) {
    }*/
}

function drawMap(){
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	
	
	//TODO lägg till en koll om blocket syns på canvasen, rita inte ut om ej
	for (var i = 0; i < map.nodes.length; i++){
		for (var j = map.nodes[i].length-1; j >= 0; j--){
			var tile = map.nodes[i][j];
			drawTile(tile);
		}
	}
	ctx.fillStyle = "rgba(255, 255, 0, 1)";
	ctx.fillRect ((50 + canvas.width/2)-camera.x, (50 + canvas.height/2)-camera.y, blockSize, blockSize);
	
	// TODO vanliga utritningen bortkommenterad medan jag jobbar med isometrin
	/*
	for (var i = 0; i < map.nodes.length; i++){
		
		for (var j = 0; j < map.nodes[i].length; j++){
			p = map.nodes[i][j];

			
			// Om blocket syns på kameran så rita ut det
			if (inView(p.x*blockSize, p.y*blockSize)){
				if (p.highlighted){
					ctx.fillStyle = "rgba(255, 255, 0, 1)";
					ctx.fillRect ((p.x*blockSize)-camera.x, (p.y*blockSize)-camera.y, blockSize, blockSize);
					ctx.fillStyle = "rgba(0, 255, 0, 1)";
					ctx.fillRect ((p.x*blockSize)+2-camera.x, (p.y*blockSize)+2-camera.y, blockSize-4, blockSize-4);
				}
				else if (p.type === 1){
					ctx.fillStyle = "rgba(0, 200, 0, 1)";
					ctx.fillRect ((p.x*blockSize)-camera.x, (p.y*blockSize)-camera.y, blockSize, blockSize);
					ctx.fillStyle = "rgba(0, 255, 0, 1)";
					ctx.fillRect ((p.x*blockSize)+1-camera.x, (p.y*blockSize)+1-camera.y, blockSize-2, blockSize-2);
				}
				else{
					ctx.fillStyle = "rgba(0, 200, 0, 1)";
					ctx.fillRect ((p.x*blockSize)-camera.x, (p.y*blockSize)-camera.y, blockSize, blockSize);
					ctx.fillStyle = "rgba(100, 100, 100, 1)";
					ctx.fillRect ((p.x*blockSize)+1-camera.x, (p.y*blockSize)+1-camera.y, blockSize-2, blockSize-2);
				}
			}
		}
	}*/
}