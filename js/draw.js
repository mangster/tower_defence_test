function drawWorldCircle (circle) {
	ctx.beginPath();
	var radius = circle.r;
	ctx.lineWidth=1;
	ctx.strokeStyle = "rgba(255, 0, 0, 1)";
	ctx.fillStyle = "rgba(255, 0, 0, 1)";
	ctx.arc(circle.pos.x - camera.x,circle.pos.y - camera.y,radius,0,2*Math.PI);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}

function drawWorldTile (tile) {
	ctx.beginPath();
	
	if (tile.type === 1){
		ctx.strokeStyle = "rgba(0, 200, 0, 1)";
		ctx.fillStyle = "rgba(0, 255, 0, 1)";
	}
	else if (tile.type === 0){
		ctx.strokeStyle = "rgba(0, 200, 0, 1)";
		ctx.fillStyle = "rgba(100, 100, 100, 1)";
	}
	else{
		ctx.strokeStyle = "red";
		ctx.fillStyle = "red";
	}
	ctx.moveTo(tile.points[0].x - camera.x, tile.points[0].y - camera.y);   
	ctx.lineTo(tile.points[1].x - camera.x, tile.points[1].y - camera.y);   
	ctx.lineTo(tile.points[2].x - camera.x, tile.points[2].y - camera.y);   
	ctx.lineTo(tile.points[3].x - camera.x, tile.points[3].y - camera.y);
	ctx.lineTo(tile.points[0].x - camera.x, tile.points[0].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	
	if (tile.selected){
		ctx.strokeStyle = "rgba(255, 255, 255, 0)";
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	}
	ctx.moveTo(tile.points[0].x - camera.x, tile.points[0].y - camera.y);   
	ctx.lineTo(tile.points[1].x - camera.x, tile.points[1].y - camera.y);   
	ctx.lineTo(tile.points[2].x - camera.x, tile.points[2].y - camera.y);   
	ctx.lineTo(tile.points[3].x - camera.x, tile.points[3].y - camera.y);
	ctx.lineTo(tile.points[0].x - camera.x, tile.points[0].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}


function drawScreenTile (tile) {
	var screenTile = {}
	screenTile.points = [];
	for (var i = 0; i < tile.points.length; i++){
		screenTile.points[i] = worldToScreen(tile.points[i]);
	}
	ctx.beginPath();
	
	if (tile.type === 1){
		ctx.strokeStyle = "rgba(0, 200, 0, 1)";
		ctx.fillStyle = "rgba(0, 255, 0, 1)";
	}
	else if (tile.type === 0){
		ctx.strokeStyle = "rgba(0, 200, 0, 1)";
		ctx.fillStyle = "rgba(100, 100, 100, 1)";
	}
	else{
		ctx.strokeStyle = "red";
		ctx.fillStyle = "red";
	}
	ctx.moveTo(screenTile.points[0].x - camera.x, screenTile.points[0].y - camera.y);   
	ctx.lineTo(screenTile.points[1].x - camera.x, screenTile.points[1].y - camera.y);   
	ctx.lineTo(screenTile.points[2].x - camera.x, screenTile.points[2].y - camera.y);   
	ctx.lineTo(screenTile.points[3].x - camera.x, screenTile.points[3].y - camera.y);
	ctx.lineTo(screenTile.points[0].x - camera.x, screenTile.points[0].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	
	if (tile.selected){
		ctx.strokeStyle = "rgba(255, 255, 255, 0)";
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
	}
	ctx.moveTo(screenTile.points[0].x - camera.x, screenTile.points[0].y - camera.y);   
	ctx.lineTo(screenTile.points[1].x - camera.x, screenTile.points[1].y - camera.y);   
	ctx.lineTo(screenTile.points[2].x - camera.x, screenTile.points[2].y - camera.y);   
	ctx.lineTo(screenTile.points[3].x - camera.x, screenTile.points[3].y - camera.y);
	ctx.lineTo(screenTile.points[0].x - camera.x, screenTile.points[0].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}

function drawScreenEnemy (enemy) {
	var screenPos = worldToScreen(enemy.pos); 
	var height = (enemy.r) * 0.7*2;
	var width = (enemy.r) * 2*0.7*2;
	drawEllipseByCenter(screenPos.x - camera.x, screenPos.y-camera.y, width, height);
}

function drawEllipseByCenter(cx, cy, w, h) {
  drawEllipse(cx - w/2.0, cy - h/2.0, w, h);
}

function drawEllipse(x, y, w, h) {
	var kappa = .5522848;
	var ox = (w / 2) * kappa; // control point offset horizontal
	var oy = (h / 2) * kappa; // control point offset vertical
	var xe = x + w;          // x-end
	var ye = y + h;           // y-end
	var xm = x + w / 2;       // x-middle
	var ym = y + h / 2;       // y-middle

	ctx.beginPath();
	ctx.moveTo(x, ym);
	ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	ctx.strokeStyle = "rgba(255, 0, 0, 1)";
	ctx.fillStyle = "rgba(255, 0, 0, 1)";
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}