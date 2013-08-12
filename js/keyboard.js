window.onkeydown = function(e){
    e = e || window.event;
    var code = e.keyCode;
    if ( code === 37 ) {
    // Left key
    hero.vx = -200;
    } else if ( code === 38 ) {
    // Up key
    hero.vy = -200;
    } else if ( code === 39 ) {
    // Right key
    hero.vx = 200;
    } else if ( code === 40 ) {
    // Down key
    hero.vy = 200;
    }
};

window.onkeyup = function(e){
    e = e || window.event;
    var code = e.keyCode;
    if ( code === 37 ) {
    // Left key
    hero.vx = 0;
    } else if ( code === 38 ) {
    // Up key
    hero.vy = 0;
    } else if ( code === 39 ) {
    // Right key
    hero.vx = 0;
    } else if ( code === 40 ) {
    // Down key
    hero.vy = 0;
    }
};