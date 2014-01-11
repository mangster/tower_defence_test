var rect = document.getElementById("canvas").getBoundingClientRect();

// Get canvas offset
var offset = {
    x: rect.left,
    y: rect.top
};

/*
// zoom functionality
window.onmousewheel = function(e) {
	//TODO handle firefox
	if (e.wheelDelta > 0){
		blockSize *= 1.1;
	}
	else{
		blockSize *= 0.9;
	}
}
*/
window.onmousedown = function(e) {
    // IE
    e = e || window.event;
    
    // get event location
	var location = {
        x: e.pageX + camera.x,
        y: e.pageY - offset.y + camera.y
    };
	if (isometric){
		var worldLocation = screenToWorld(location);
		var tileNo = worldToGrid(worldLocation);
		for (var i = 0; i < map.length; i++){
			for (var j = 0; j < map[i].length; j++){
				var tile = map[i][j];
				tile.selected = false;
			}
		}
		
		//TODO ändra koll, så att x och y är inom map length
		if (map[tileNo.x][tileNo.y]) {
			console.log(map[tileNo.x][tileNo.y]);
			tile = map[tileNo.x][tileNo.y];
			tile.selected = true;
		}
		console.log("Clicked x = " + worldLocation.x + " Clicked y = " + worldLocation.y);
		console.log(tile);
	}
	else {
		var tileNo = worldToGrid(location);
		for (var i = 0; i < map.length; i++){
			for (var j = 0; j < map[i].length; j++){
				var tile = map[i][j];
				tile.selected = false;
			}
		}
		if (map[tileNo.x][tileNo.y]) {
			console.log(map[tileNo.x][tileNo.y]);
			tile = map[tileNo.x][tileNo.y];
			tile.selected = true;
		}
		console.log("Clicked x = " + location.x + " Clicked y = " + location.y);
		console.log(tile);
	}
	
};

window.onmousemove = function( e ) {
	// IE
    e = e || window.event;
	var location = {
        x: e.pageX + camera.x,
        y: e.pageY - offset.y + camera.y
    };
	/*
	for (var i = 0; i < map.nodes.length; i++){
		for (var j = 0; j < map.nodes[i].length; j++){
			map.nodes[i][j].highlighted = false;
		}
	}
	*/
	//tile = screenToTile(location.x, location.y);
	if (tile != null){		
		tile.highlighted = true;
	}
	//TODO lägg till koll att markören är inom canvasen
	//TODO bortkommenterad markering av ruta, medans jag jobbar med isometrin
	
	
};