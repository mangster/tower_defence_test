var menu = {
	x: canvas.width/2 - 250,
	y: canvas.height - 110,
	width : 500,
	height : 100,
	color : "rgba(0, 0, 0, .8)"
}
	
function drawMenu (){
	ctx.fillStyle = menu.color;
	ctx.fillRect (menu.x, menu.y, menu.width, menu.height);
}