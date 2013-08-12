//create terrain
var map = [];

//create map
for (var i = 0; i < canvas.width; i += blockSize ) {
	for (var j = 0; j < canvas.height; j += blockSize) {
		map.push({
			x: i,
			y: j,
			xCenter: i + (blockSize/2),
			yCenter: j + (blockSize/2),
			radius: blockSize,
			passability: 1,
			color: "rgba(0, 255, 0, 1)",
			borderColor: "rgba(0, 200, 0, 1)",
			selectedColor: "rgba(0, 100, 0, 1)",
			highlightedColor: "rgba(255, 255, 0, 1)",
			selected: false,
			highlighted: false,
			update: function() {
				this.x += this.vx / FPS;
				this.y += this.vy / FPS;
			}
		});
	}
}


map[360].color = "rgba(100,100,100,1)";
map[361].color = "rgba(100,100,100,1)";
map[362].color = "rgba(100,100,100,1)";
map[363].color = "rgba(100,100,100,1)";
map[364].color = "rgba(100,100,100,1)";
map[365].color = "rgba(100,100,100,1)";
map[366].color = "rgba(100,100,100,1)";
map[367].color = "rgba(100,100,100,1)";
map[368].color = "rgba(100,100,100,1)";
map[369].color = "rgba(100,100,100,1)";
map[377].color = "rgba(100,100,100,1)";
map[394].color = "rgba(100,100,100,1)";
map[411].color = "rgba(100,100,100,1)";
map[428].color = "rgba(100,100,100,1)";
map[445].color = "rgba(100,100,100,1)";
map[462].color = "rgba(100,100,100,1)";
map[370].color = "rgba(100,100,100,1)";
map[387].color = "rgba(100,100,100,1)";
map[404].color = "rgba(100,100,100,1)";
map[421].color = "rgba(100,100,100,1)";
map[438].color = "rgba(100,100,100,1)";
map[472].color = "rgba(100,100,100,1)";
map[455].color = "rgba(100,100,100,1)";
map[357].color = "rgba(100,100,100,1)";
map[358].color = "rgba(100,100,100,1)";
map[393].color = "rgba(100,100,100,1)";
map[392].color = "rgba(100,100,100,1)";
map[425].color = "rgba(100,100,100,1)";
map[426].color = "rgba(100,100,100,1)";
map[343].color = "rgba(100,100,100,1)";

map[343].passability = 0;
map[360].passability = 0;
map[361].passability = 0;
map[362].passability = 0;
map[363].passability = 0;
map[364].passability = 0;
map[365].passability = 0;
map[366].passability = 0;
map[367].passability = 0;
map[368].passability = 0;
map[369].passability = 0;
map[377].passability = 0;
map[394].passability = 0;
map[411].passability = 0;
map[428].passability = 0;
map[445].passability = 0;
map[462].passability = 0;
map[370].passability = 0;
map[387].passability = 0;
map[404].passability = 0;
map[421].passability = 0;
map[438].passability = 0;
map[472].passability = 0;
map[455].passability = 0;
map[357].passability = 0;
map[358].passability = 0;
map[393].passability = 0;
map[392].passability = 0;
map[425].passability = 0;
map[426].passability = 0;

function updateMap(){
	for ( var i = 0; i < map.length; i++ ) {
    }
}

function drawMap(){
	for ( var i = 0; i < map.length; i++ ) {
        var p = map[i];
		if (p.highlighted && p.selected){
			ctx.fillStyle = p.highlightedColor;
			ctx.fillRect (p.x, p.y, blockSize, blockSize);
			ctx.fillStyle = p.selectedColor;
			ctx.fillRect (p.x+2, p.y+2, blockSize-4, blockSize-4);
		}
		else if (p.selected){
			ctx.fillStyle = p.borderColor;
			ctx.fillRect (p.x, p.y, blockSize, blockSize);
			ctx.fillStyle = p.selectedColor;
			ctx.fillRect (p.x+1, p.y+1, blockSize-2, blockSize-2);
		}
		else if (p.highlighted){
			ctx.fillStyle = p.highlightedColor;
			ctx.fillRect (p.x, p.y, blockSize, blockSize);
			ctx.fillStyle = p.color;
			ctx.fillRect (p.x+2, p.y+2, blockSize-4, blockSize-4);
			
		}
		else {
			ctx.fillStyle = p.borderColor;
			ctx.fillRect (p.x, p.y, blockSize, blockSize);
			ctx.fillStyle = p.color;
			ctx.fillRect (p.x+1, p.y+1, blockSize-2, blockSize-2);
		}
    }
}