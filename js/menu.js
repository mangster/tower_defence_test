var menu = {
	x: canvas.width/2 - 250,
	y: canvas.height - 110,
	width : 500,
	height : 100,
	color : "rgba(40, 40, 40, .8)"
}
	
function drawMenu (){
	menu.x = canvas.width/2 - 250;
	menu.y = canvas.height - 130;
	ctx.fillStyle = menu.color;
	ctx.fillRect (menu.x, menu.y, menu.width, menu.height);
}
