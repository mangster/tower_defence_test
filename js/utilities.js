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

function screenToTile(xIn, yIn){

	//var xCart = -(xIn - canvas.width/2); 
	//var yCart = yIn - canvas.height/2;
	var xCart = -(xIn); 
	var yCart = yIn;
	
	
	var posZ = ((yCart * 2) - xCart)/2
	//steg 1var posZ = (yCart * 2) - posX;
	//steg 2var posZ = (yCart * 2) - xCart -posZ;
	var posX = xCart + posZ;
	
	var rX = posX / cellWidth;
	var rY = posZ / cellHeight;
	
	x = Math.round(rX);
	y = Math.round(rY);
	if (x >= 0&& x < mapWidth/blockSize&& y >= 0&& y < mapHeight/blockSize){
		return map.nodes[x][y];
	}
	else{
		return null;
	}
	//var tile = map.nodes[Math.round(rX)][Math.round(rY)];
	//return [Math.floor(rX), Math.floor(rY)];
	//return tile;
}

function tileToScreen(tile){
	var posX = tile.x * cellWidth
	var posZ = tile.y * cellHeight

	var xCart = (posX - posZ)
	var yCart = (posX + posZ) / 2;

	//var rX = -xCart + canvas.width/2;
	//var rY = +yCart + canvas.height/2;
	var rX = -xCart;
	var rY = +yCart;

	//return [Math.floor(rX), Math.floor(rY)];
	return { "x": Math.floor(rX), "y": Math.floor(rY) };
}
	

function getCellBoundaries(theCellX, theCellY) {

	//right
	var aOffset = { "offsetX": (cellWidth * -1) / 2, "offsetY": (cellHeight * -1) / 2 };
	var aCell = { "x": theCellX, "y": theCellY };
	var p1 = getScreenCoords(aCell, aOffset);

	//bottom
	aOffset = { "offsetX": (cellWidth) / 2, "offsetY": (cellHeight * -1) / 2 };
	var p2 = getScreenCoords(aCell, aOffset);

	//left
	aOffset = { "offsetX": (cellWidth) / 2, "offsetY": (cellHeight) / 2 };
	var p3 = getScreenCoords(aCell, aOffset);

	//top
	aOffset = { "offsetX": (cellWidth * -1) / 2, "offsetY": (cellHeight) / 2 };
	var p4 = getScreenCoords(aCell, aOffset);

	return { "point1": p1, "point2": p2, "point3": p3, "point4": p4 };
}

function getScreenCoords(Cell, offset) {

	var posX = Cell.x * cellWidth + offset.offsetX;
	var posZ = Cell.y * cellHeight - offset.offsetY;

	var xCart = (posX - posZ)
	var yCart = (posX + posZ) / 2;

	//var rX = -xCart + canvas.width/2;
	//var rY = +yCart + canvas.height/2;
	var rX = -xCart;
	var rY = +yCart;

	return { "x": Math.floor(rX), "y": Math.floor(rY) };
}

function drawTile (tile) {

	var cellPoints = getCellBoundaries(tile.x, tile.y);
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
	
	ctx.moveTo(cellPoints.point1.x - camera.x, cellPoints.point1.y - camera.y);   
	ctx.lineTo(cellPoints.point2.x - camera.x, cellPoints.point2.y - camera.y);   
	ctx.lineTo(cellPoints.point3.x - camera.x, cellPoints.point3.y - camera.y);   
	ctx.lineTo(cellPoints.point4.x - camera.x, cellPoints.point4.y - camera.y);
	ctx.lineTo(cellPoints.point1.x - camera.x, cellPoints.point1.y - camera.y);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
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
	
	ctx.lineWidth=1;
	ctx.strokeStyle = "rgba(255, 0, 0, 1)";
	ctx.fillStyle = "rgba(255, 0, 0, 1)";
	ctx.arc(enemy.pos.x - camera.x,enemy.pos.y - camera.y,enemy.r,0,2*Math.PI);

	ctx.stroke();
	ctx.fill();
	ctx.closePath();
}

function mapToTwoD(Cell, offset) {

	var posX = Cell.x * cellWidth + offset.offsetX;
	var posZ = Cell.y * cellHeight - offset.offsetY;

	//var xCart = (posX - posZ)
	//var yCart = (posX + posZ) / 2;

	var rX = -posX;
	var rY = +posZ;

	return { "x": Math.floor(rX), "y": Math.floor(rY) };
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

	return { "point1": p1, "point2": p2, "point3": p3, "point4": p4 };
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


function twoDToIso(point) {
	var posX = point.x
	var posZ = point.y
	//Det är nog här hela kartan blir spegelvänd när jag går från 2d till iso. Fixa om det visar sig vara ett problem
	var xCart = (posX - posZ)
	var yCart = (posX + posZ) / 2;

	//var rX = -xCart + canvas.width/2;
	//var rY = +yCart + canvas.height/2;
	var rX = -xCart;
	var rY = +yCart;

	return { "x": Math.floor(rX), "y": Math.floor(rY) };
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

