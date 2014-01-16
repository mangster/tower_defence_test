window.onkeydown = function(e){
    e = e || window.event;
    var code = e.keyCode;
    if ( code === 37 ) {
    // Left key
        focus.vx = 0.1;
		focus.vz = -0.1;
    } else if ( code === 38 ) {
    // Up key
        focus.vx = 0.1;
		focus.vz = 0.1;
    } else if ( code === 39 ) {
    // Right key
        focus.vx = -0.1;
		focus.vz = 0.1;
    } else if ( code === 40 ) {
    // Down key
        focus.vx = -0.1;
		focus.vz = -0.1;
    }
};

window.onkeyup = function(e){
    e = e || window.event;
    var code = e.keyCode;
    if ( code === 37 ) {
    // Left key
        focus.vx = 0;
		focus.vz = 0;
    } else if ( code === 38 ) {
    // Up key
        focus.vx = 0;
		focus.vz = 0;
    } else if ( code === 39 ) {
    // Right key
        focus.vx = 0;
		focus.vz = 0;
    } else if ( code === 40 ) {
    // Down key
        focus.vx = 0;
		focus.vz = 0;
    }
        

};
/*var keyboard = new THREEx.KeyboardState();

// keydown
keyboard.domElement.addEventListener('keydown', function(event){
	if( keyboard.eventMatches(event, 'up')){
		focus.vx = 0.1;
		focus.vz = 0.1;
	}
	if( keyboard.eventMatches(event, 'right')){
		//focus.vx = 0.1;
		focus.vx = -0.1;
		focus.vz = 0.1;
	}
	if( keyboard.eventMatches(event, 'down')){
		//focus.vx = 0.1;
		focus.vx = -0.1;
		focus.vz = -0.1;
	}
	if( keyboard.eventMatches(event, 'left')){
		//focus.vx = 0.1;
		focus.vx = 0.1;
		focus.vz = -0.1;
	}
})
// keyup
keyboard.domElement.addEventListener('keyup', function(event){
	if( keyboard.eventMatches(event, 'up')){
			focus.vx = 0;
			focus.vz = 0;
	}
	if( keyboard.eventMatches(event, 'right')){
			focus.vx = 0;
			focus.vz = 0;
	}
	if( keyboard.eventMatches(event, 'down')){
			focus.vx = 0;
			focus.vz = 0;
	}
	if( keyboard.eventMatches(event, 'left')){
			focus.vx = 0;
			focus.vz = 0;
	}
})
*/