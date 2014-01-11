function randNum( min, max ) {
    return Math.random() * ( max - min ) + min;
};

function detectCollision (obj1, obj2){
	if (obj1.x > obj2.x - obj2.radius -obj1.radius && obj1.x < obj2.x + obj2.radius + obj1.radius && obj1.y > obj2.y - obj2.radius - obj1.radius && obj1.y < obj2.y + obj2.radius + obj1.radius){
		return true;
	}
	else {
		return false;
	}
};

function flyTo (obj1, obj2){
	var dx = obj2.xCenter - obj1.x
	var dy = obj2.yCenter - obj1.y
	if (dx != 0 || dy!= 0){
		vx = obj1.speed * (dx / Math.sqrt(dx*dx + dy*dy))
		vy = obj1.speed * (dy / Math.sqrt(dx*dx + dy*dy))

		obj1.x += vx
		obj1.y += vy
	}
}

//Genererar en random karta
function generateRandom (width, height, wallFrequency) {

	var nodes = [];

    for (var x=0; x < width; x++) {
    	var nodeRow = [];
    	var gridRow = [];

    	for(var y=0; y < height; y++) {

    		var isWall = Math.floor(Math.random()*(1/wallFrequency));
    		if(isWall == 0) {
    			nodeRow.push(GraphNodeType.WALL);
    		}
    		else  {
    			nodeRow.push(GraphNodeType.OPEN);
    		}
    	}
    	nodes.push(nodeRow);
    }


    return new Graph(nodes);
};

function inView(xIn, yIn){
	if (xIn > (camera.x - blockSize) && xIn < (camera.x + canvas.width + blockSize)
		&& yIn > (camera.y - blockSize) && yIn < (camera.y + canvas.height + blockSize)){
		return true;
	}
	else{
		return false;
	}
}
/*
function tileToCoord(node){
	x = (node.x*blockSize) + blockSize/2;
	y = (node.y*blockSize) + blockSize/2;
	return [x,y];
}
*/
function goTo (obj1, obj2){
	if (typeof(obj1.path[0])==="object"){
		//distans till målet
		var dx = obj2.x - obj1.x
		var dy = obj2.y - obj1.y
		

		vx = obj1.speed * (dx / Math.sqrt(dx*dx + dy*dy))
		vy = obj1.speed * (dy / Math.sqrt(dx*dx + dy*dy))

		obj1.x += vx
		obj1.y += vy
		/*if (dx != 0 || dy!= 0){
			vx = obj1.speed * (dx / Math.sqrt(dx*dx + dy*dy))
			vy = obj1.speed * (dy / Math.sqrt(dx*dx + dy*dy))

			obj1.x += vx
			obj1.y += vy
		}
		else {
			obj1.path.splice(0, 1);
		}*/
	}
}
function mapToTwoD(Cell, offset) {

	var rX = Cell.x * cellWidth + offset.offsetX;
	var rY = Cell.y * cellHeight - offset.offsetY;

	return { "x": Math.floor(rX), "y": Math.floor(rY) };
}

function twoDToIso(point) {
	var rX = (point.x - point.y);
	var rY = (point.x + point.y) / 2;

	return { "x": Math.floor(rX), "y": Math.floor(rY) };
}

function isoToTwoD(point) {
	//rX = (point.y + point.x);
	//rY = (point.x - point.y)/2;
	
	rY = ((point.y * 2) - point.x)/2;
	rX = point.x + rY;

	
	

	return { "x": Math.floor(rX), "y": Math.floor(rY) };
}

function getEnemyBoundaries(xIn, yIn) {	
	
	//xIn = xIn + canvas.width - 1680;
	//yIn = yIn + canvas.height - 640;
	//right
	var x = xIn + cellWidth;
	var y = yIn;
	var p1 = {"x": x, "y": y};
	
	//bottom
	x = xIn;
	y = yIn + cellWidth/2;
	var p2 = {"x": x, "y": y};
	
	//left
	x = xIn - cellWidth;
	y = yIn;
	var p3 = {"x": x, "y": y};
	
	//top
	x = xIn;
	y = yIn - cellWidth/2;
	var p4 = {"x": x, "y": y};
	
	

	return { "point1": p1, "point2": p2, "point3": p3, "point4": p4 };

}

function drawEnemy (enemy) {
	ctx.beginPath();
	var radius = enemy.r;
	ctx.lineWidth=1;
	ctx.strokeStyle = "rgba(255, 0, 0, 1)";
	ctx.fillStyle = "rgba(255, 0, 0, 1)";
	ctx.arc(enemy.pos.x - camera.x,enemy.pos.y - camera.y,radius,0,2*Math.PI);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}

function getTwoDTileBoundaries(theCellX, theCellY) {
	//bottom right
	var aOffset = { "offsetX": (cellWidth * -1) / 2, "offsetY": (cellHeight * -1) / 2 };
	var aCell = { "x": theCellX, "y": theCellY };
	var p1 = mapToTwoD(aCell, aOffset);
	
	//bottom left
	aOffset = { "offsetX": (cellWidth) / 2, "offsetY": (cellHeight * -1) / 2 };
	//var p2 = getScreenCoords(aCell, aOffset);
	var p2 = mapToTwoD(aCell, aOffset);
	

	//top left
	aOffset = { "offsetX": (cellWidth) / 2, "offsetY": (cellHeight) / 2 };
	//var p3 = getScreenCoords(aCell, aOffset);
	var p3 = mapToTwoD(aCell, aOffset);

	//top right
	aOffset = { "offsetX": (cellWidth * -1) / 2, "offsetY": (cellHeight) / 2 };
	//var p4 = getScreenCoords(aCell, aOffset);
	var p4 = mapToTwoD(aCell, aOffset);
	
	//center
	aOffset = { "offsetX": 0, "offsetY": 0 };
	var center = mapToTwoD(aCell, aOffset);

	return { "point1": p1, "point2": p2, "point3": p3, "point4": p4, "center": center };
}
function drawTwoDTile (tile) {
	ctx.beginPath();
	
	if (tile.highlighted){
		ctx.strokeStyle = "rgba(255, 255, 0, 1)";
		ctx.fillStyle = "rgba(200, 200, 0, 1)";
	}
	else if (tile.type === 1){
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
}


function drawIsoTile (tile) {
	var isoTile = {}
	isoTile.points = [];
	isoTile.type = tile.type;
	
	for (var i = 0; i < tile.points.length; i++){
		isoTile.points[i] = twoDToIso(tile.points[i]);
	}
	ctx.beginPath();
	if (isoTile.highlighted){
		ctx.strokeStyle = "rgba(255, 255, 0, 1)";
		ctx.fillStyle = "rgba(200, 200, 0, 1)";
	}
	else if (isoTile.type === 1){
		ctx.strokeStyle = "rgba(0, 200, 0, 1)";
		ctx.fillStyle = "rgba(0, 255, 0, 1)";
	}
	else if (isoTile.type === 0){
		ctx.strokeStyle = "rgba(0, 200, 0, 1)";
		ctx.fillStyle = "rgba(100, 100, 100, 1)";
	}
	else{
		ctx.strokeStyle = "red";
		ctx.fillStyle = "red";
	}
	ctx.moveTo(isoTile.points[0].x - camera.x, isoTile.points[0].y - camera.y);   
	ctx.lineTo(isoTile.points[1].x - camera.x, isoTile.points[1].y - camera.y);   
	ctx.lineTo(isoTile.points[2].x - camera.x, isoTile.points[2].y - camera.y);   
	ctx.lineTo(isoTile.points[3].x - camera.x, isoTile.points[3].y - camera.y);
	ctx.lineTo(isoTile.points[0].x - camera.x, isoTile.points[0].y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}

/*function drawIsoEnemy (enemy) {
	var isoPos = twoDToIso(enemy.pos); 
	var height = (enemy.r) * 0.7;
	var width = (enemy.r) * 2*0.7;
	ctx.beginPath();
	for (var i = 0 * Math.PI; i < 2 * Math.PI; i += 0.01 ) {
		xPos = isoPos.x - camera.x -  (height * Math.sin(i)) * Math.sin(0 * Math.PI) + (width * Math.cos(i)) * Math.cos(0 * Math.PI);
		yPos = isoPos.y - camera.y + (width * Math.cos(i)) * Math.sin(0 * Math.PI) + (height * Math.sin(i)) * Math.cos(0 * Math.PI);

		if (i == 0) {
			ctx.moveTo(xPos, yPos);
		} else {
			ctx.lineTo(xPos, yPos);
		}
	}
	ctx.lineWidth=1;
	ctx.strokeStyle = "rgba(255, 0, 0, 1)";
	ctx.fillStyle = "rgba(255, 0, 0, 1)";
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}*/

function drawIsoEnemy (enemy) {
	var isoPos = twoDToIso(enemy.pos); 
	var height = (enemy.r) * 0.7*2;
	var width = (enemy.r) * 2*0.7*2;
	/*
	ctx.beginPath();
	for (var i = 0 * Math.PI; i < 2 * Math.PI; i += 0.01 ) {
		xPos = isoPos.x - camera.x -  (height * Math.sin(i)) * Math.sin(0 * Math.PI) + (width * Math.cos(i)) * Math.cos(0 * Math.PI);
		yPos = isoPos.y - camera.y + (width * Math.cos(i)) * Math.sin(0 * Math.PI) + (height * Math.sin(i)) * Math.cos(0 * Math.PI);

		if (i == 0) {
			ctx.moveTo(xPos, yPos);
		} else {
			ctx.lineTo(xPos, yPos);
		}
	}
	ctx.lineWidth=1;
	ctx.strokeStyle = "rgba(255, 0, 0, 1)";
	ctx.fillStyle = "rgba(255, 0, 0, 1)";
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	*/
	drawEllipseByCenter(isoPos.x - camera.x, isoPos.y-camera.y, width, height);
}

function drawEllipseByCenter(cx, cy, w, h) {
  drawEllipse(cx - w/2.0, cy - h/2.0, w, h);
}

function drawEllipse(x, y, w, h) {
  var kappa = .5522848,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

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
