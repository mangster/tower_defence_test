var rect = document.getElementById("canvas").getBoundingClientRect();

// Get canvas offset
var offset = {
    x: rect.left,
    y: rect.top
};

window.onmousedown = function(e) {
    // IE
    e = e || window.event;
    
    // get event location
	
	var location = {
        x: e.pageX - offset.x,
        y: e.pageY - offset.y
    };
	if (location.x >= 0 && location.x <= canvas.width && location.y >= 0 && location.y <= canvas.height){
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
	}
};

window.onmousemove = function( e ) {
	// IE
    e = e || window.event;
	var location = {
        x: e.pageX - offset.x,
        y: e.pageY - offset.y
    };
	if (location.x >= 0 && location.x <= canvas.width && location.y >= 0 && location.y <= canvas.height){
		for (i = 0; i < map.length; i++){
			map[i].highlighted = false;
			if (location.x >= map[i].x && location.x < map[i].x + blockSize && location.y >= map[i].y && location.y < map[i].y + blockSize){		
				map[i].highlighted = true;
			}
		}
		//createTower(location);
	}
};