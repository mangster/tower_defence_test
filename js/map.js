//Skapa random karta
var grid = generateRandom(mapWidth/blockSize, mapHeight/blockSize, 0.1);
var map = [];

var nodes = [];
var row = [];

//create 2d-representation of the map
for (var i = 0; i < grid.nodes.length; i++){
	row = [];
	for (var j = 0; j < grid.nodes[i].length; j++){
		var tile = grid.nodes[i][j];
		var cellPoints = getWorldSquareBoundaries(tile.x, tile.y);
		var polygon = new SAT.Polygon(new SAT.Vector(cellPoints.center.x, cellPoints.center.y), [
		  new SAT.Vector(cellPoints.point1.x, cellPoints.point1.y),
		  new SAT.Vector(cellPoints.point2.x, cellPoints.point2.y),
		  new SAT.Vector(cellPoints.point3.x, cellPoints.point3.y),
		  new SAT.Vector(cellPoints.point4.x, cellPoints.point4.y)
		]);
		polygon.type = tile.type;
		//polygon.pos = mapToTwoD(tile.pos, 0);
		//tile.twoDRef = polygon;
		row.push(polygon);
	}
	map.push(row);
}

function updateMap(){
	/*for ( var i = 0; i < grid.length; i++ ) {
    }*/
}

function drawMap(){
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	
	//TODO lägg till en koll om blocket syns på canvasen, rita inte ut om ej
	if (isometric){
		for (var i = 0; i < map.length; i++){
			for (var j = map[i].length -1; j >= 0; j--){i
				var tile = map[i][j];
				drawScreenTile(tile);
			}
		}
		/*for (var i = 0; i < grid.nodes.length; i++){
			for (var j = grid.nodes[i].length-1; j >= 0; j--){
				var tile = grid.nodes[i][j];
				drawTile(tile);
			}
		}*/
	}
	else{
		for (var i = 0; i < map.length; i++){
			for (var j = 0; j < map[i].length; j++){
				var tile = map[i][j];
				drawWorldTile(tile);
			}
		}
	}
}