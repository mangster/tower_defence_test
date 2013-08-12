
var bullets = [];
var towers = [];
function createTower(xIn, yIn){
	towers.push({
		// create tower
		radius : blockSize*4,
		//radius : blockSize/2,
		x : xIn + blockSize/2,
		y : yIn + blockSize/2,
		coolDown :  50,
		coolDownTimer : 0,
		target: null,
		shoot: function(target){
			bullets.push({
				x: this.x,
				y: this.y,
				vx: 0,
				vy: 0,
				target: target,
				speed: 20,
				radius: 3,
				color: "rgba(0, 0, 0, 1)"
			});
		},
		color : "rgba(0, 0, 255, .5)"
	});
}
function updateTowers (){
	for (var j = 0; j < towers.length; j++){
		var tower = towers[j];
		//if towers current target is dead, set it to null
		if (tower.target != null){
			if (tower.target.health <= 0){
				tower.target = null;
			}
		}
		if (tower.coolDownTimer > 0){
			towers[j].coolDownTimer -= 1;
		}
		else{
			//if tower doesnt have a target, see if we can find one
			if (tower.target === null){
				for (var i = 0; i < enemies.length; i++){
					var enemy = enemies[i];
					if (detectCollision(enemy, tower)){
						tower.target = enemy;
						tower.shoot(enemy);
						tower.coolDownTimer = tower.coolDown;
						i = enemies.length;
					}
				}
			}
			//if tower has a target, see if its still in range
			else {
				if (detectCollision(tower.target, tower)){
					tower.shoot(tower.target);
					tower.coolDownTimer = tower.coolDown;
					i = enemies.length;
				}
				//if its not in range, try to find a new target
				else {
					tower.target = null;
					for (var i = 0; i < enemies.length; i++){
						var enemy = enemies[i];
						if (detectCollision(enemy, tower)){
							tower.target = enemy;
							tower.shoot(enemy);
							tower.coolDownTimer = tower.coolDown;
							i = enemies.length;
						} 
					}
				}
			}
		}
	}
}
function updateBullets(){
	for ( var i = 0; i < bullets.length; i++ ) {
        var p = bullets[i];
		var target = p.target;
		flyTo(p, target);
		if (detectCollision(p, p.target)){
			p.target.health -=10;
			bullets.splice(i, 1);
		}
	}
}
function drawBullets(){
	for ( var i = 0; i < bullets.length; i++ ) {
        var p = bullets[i];
        ctx.beginPath();
        ctx.arc( p.x, p.y, p.radius, 0, 2 * Math.PI );
        ctx.fillStyle = p.color;
        ctx.fill();

    }
}

function drawTowers(){
	for ( var i = 0; i < towers.length; i++ ) {
        var p = towers[i];
		ctx.drawImage(tower,p.x - blockSize/2,p.y - blockSize/2);
        /*ctx.beginPath();
        ctx.arc( p.x, p.y, p.radius, 0, 2 * Math.PI );
        ctx.fillStyle = p.color;
        ctx.fill();*/
    }
}

/*
function updateTowers (){
	for (var j = 0; j < towers.length; j++){
		var tower = towers[j];
		if (tower.coolDownTimer > 0){
			towers[j].coolDownTimer -= 1;
			console.log(tower.coolDownTimer);
		}
		else{
			for (var i = 0; i < enemies.length; i++){
				var enemy = enemies[i];
				if (detectCollision(enemy, tower)){
					tower.shoot(enemy);
					tower.coolDownTimer = tower.coolDown;
					i = enemies.length;
				}
			}
		}

	}
}*/