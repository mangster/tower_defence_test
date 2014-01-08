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
	console.log("clicked x = " + location.x);
	console.log("clicked y = " + location.y);
	var tile = screenToTile(location.x,location.y)
	console.log("clicked tile = " + tile);
	console.log("tile center: " + tileToScreen(tile).x + " " + tileToScreen(tile).y);
	/*if (location.x >= 0 && location.x <= canvas.width && location.y >= 0 && location.y <= canvas.height){
		for (i = 0; i < map.length; i++){
			map[i].selected = false;
			if (map[i].highlighted){
			//if (location.x >= map[i].x && location.x < map[i].x + blockSize && location.y >= map[i].y && location.y < map[i].y + blockSize){		
				createTower (map[i].x, map[i].y);
				map[i].selected = true;
				console.log(i);
			}
		}
		//createTower(location);
	}*/
};

window.onmousemove = function( e ) {
	// IE
    e = e || window.event;
	var location = {
        x: e.pageX + camera.x,
        y: e.pageY - offset.y + camera.y
    };
	
	for (var i = 0; i < map.nodes.length; i++){
		for (var j = 0; j < map.nodes[i].length; j++){
			map.nodes[i][j].highlighted = false;
		}
	}
	tile = screenToTile(location.x, location.y);
	if (tile != null){		
		tile.highlighted = true;
	}
	//TODO lägg till koll att markören är inom canvasen
	//TODO bortkommenterad markering av ruta, medans jag jobbar med isometrin
	
	
};