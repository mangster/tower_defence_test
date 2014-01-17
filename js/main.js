// THREE.js TEST
var cameraDistance = 40;
var cameraAngle = 35.264;
var cameraAngle = 45;
var stats = initStats();

// create a scene, that will hold all our elements such as objects, cameras and lights.
var scene = new THREE.Scene();

// create a camera, which defines where we're looking at.
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
//camera = new THREE.OrthographicCamera( window.innerWidth / - cameraDistance, window.innerWidth / cameraDistance, window.innerHeight / cameraDistance, window.innerHeight / - cameraDistance, -200, 500 );

// create a render and set the size
var renderer = new THREE.WebGLRenderer({});

renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;


/*
plane = new THREE.Mesh( new THREE.PlaneGeometry(60,60,1,1), new THREE.MeshBasicMaterial({color: 0xffffff}) );
plane.rotation.x = - Math.PI / 2;
plane.visible = false;
scene.add( plane );
*/

var lookAtGeom = new THREE.CubeGeometry(1,1,1);
var focus = new THREE.Mesh(lookAtGeom,new THREE.MeshLambertMaterial({color: 0xff0000}));
focus.visible = false;
focus.position.y = 1;
focus.position.x = 0;
focus.position.z = 0;


// position and point the camera to the center of the scene



var cameraY = Math.abs(Math.sin(cameraAngle) * cameraDistance);
var flatDistance = Math.sqrt(cameraDistance * cameraDistance - cameraY*cameraY);
var cameraX = Math.sqrt((flatDistance*flatDistance)/2);

camera.position.x = -cameraX;
camera.position.y = cameraY;
camera.position.z = -cameraX;
camera.lookAt(focus.position);
focus.rotation.x = 0;
focus.rotation.y = 0;
focus.rotation.z = 0;
focus.add(camera);
scene.add(focus);

//var grass = new THREE.MeshLambertMaterial( {color: 0x44ff44 } );
//var water = new THREE.MeshLambertMaterial( {color: 0x4444ff } );
var grass = new THREE.MeshLambertMaterial( {color: 0x77DD77 } );
var dirt = new THREE.MeshLambertMaterial( {color: 0xA87B5A } );
var rock = new THREE.MeshLambertMaterial( {color: 0xC6CBC7 } );
var water = new THREE.MeshLambertMaterial( {color: 0x7777DD } );
var geom = new THREE.CubeGeometry(1,1,1);

var map = generateHeight( 100, 100 );
var count = 0;
for (var i = 0; i < 100; i++){
	for (var j = 0; j < 100; j++){
		var height = (map[count]/10);
		if (height < 1){
			var cube = new THREE.Mesh(geom,water);
		}
		else if (height < 7){
			var cube = new THREE.Mesh(geom,grass);
		}
		else if (height < 9){
			var cube = new THREE.Mesh(geom,dirt);
		}
		else{
			var cube = new THREE.Mesh(geom,rock);
		}
		cube.position.x = i;
		cube.receiveShadow = true;
		cube.castShadow = true;
		cube.position.y = height;
		/*if (height > 0.8){
			cube.position.y = 1;
		}
		else{
			cube.position.y = 0;
		}*/
		cube.position.z = j;
		count++;
scene.add(cube);
	}
}


var ambientLight = new THREE.AmbientLight(0x505050);
scene.add(ambientLight);

/*
light = new THREE.DirectionalLight(0xa0a0a0);
light.position.set(100, 15, 100);
*/
light = new THREE.SpotLight(0xaaaaaa);
light.position.set(120, 100, 120);

light.shadowCameraNear = 1; // keep near and far planes as tight as possible
light.shadowCameraFar = 200; // shadows not cast past the far plane
light.shadowCameraFov = 70;

light.shadowCameraVisible = false;

light.castShadow = true;

renderer.shadowMapSoft = true;
scene.add(light);

// add the output of the renderer to the html element
$("#WebGL-output").append(renderer.domElement);

// call the render function
var step=0;


focus.vx = 0;
focus.vz = 0;
focus.update = function() {
	focus.position.x += this.vx;
	focus.position.z += this.vz;
}
focus.position.x = 40;
focus.position.z = 40;
render();

function render() {
	stats.update();
	// render using requestAnimationFrame
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	focus.update();
	//focus.position.x += 0.03;
	//focus.position.y += 0.1;
	//focus.position.z += 0.03;
}

function initStats() {

	var stats = new Stats();

	stats.setMode(0); // 0: fps, 1: ms

	// Align top-left
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';

	$("#Stats-output").append( stats.domElement );

	return stats;
}
