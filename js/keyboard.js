window.onkeydown = function(e){
    e = e || window.event;
    var code = e.keyCode;
    if ( code === 37 ) {
    // Left key
	camera.vx = -camera.speed;
    } else if ( code === 38 ) {
    // Up key
	camera.vy = -camera.speed;
    } else if ( code === 39 ) {
    // Right key
	camera.vx = camera.speed;
    } else if ( code === 40 ) {
    // Down key
	camera.vy = camera.speed;
    }
	else if ( code === 73 ) {
		// "I" key
		if (isometric){
			isometric = false;
		}
		else{
			isometric = true;
		}
    }
};

window.onkeyup = function(e){
    e = e || window.event;
    var code = e.keyCode;
    if ( code === 37 ) {
    // Left key
	camera.vx = 0;
    } else if ( code === 38 ) {
    // Up key
	camera.vy = 0;
    } else if ( code === 39 ) {
    // Right key
	camera.vx = 0;
    } else if ( code === 40 ) {
    // Down key
	camera.vy = 0;
    }
	

};