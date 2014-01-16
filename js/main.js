// THREE.js TEST
var cameraDistance = 80;
var cameraAngle = 35.264;
var stats = initStats();

// create a scene, that will hold all our elements such as objects, cameras and lights.
var scene = new THREE.Scene();

// create a camera, which defines where we're looking at.
//var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera = new THREE.OrthographicCamera( window.innerWidth / - cameraDistance, window.innerWidth / cameraDistance, window.innerHeight / cameraDistance, window.innerHeight / - cameraDistance, -200, 500 );

// create a render and set the size
var renderer = new THREE.WebGLRenderer({});

renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;

plane = new THREE.Mesh( new THREE.PlaneGeometry(60,60,1,1), new THREE.MeshBasicMaterial({color: 0xffffff}) );
plane.rotation.x = - Math.PI / 2;
plane.visible = false;
scene.add( plane );

var lookAtGeom = new THREE.CubeGeometry(1,1,1);
var focus = new THREE.Mesh(lookAtGeom,new THREE.MeshLambertMaterial({color: 0xff0000}));
focus.visible = false;
focus.position.y = 1;
focus.position.x = 0;
focus.position.z = 0;


// position and point the camera to the center of the scene


//var cameraAngle = 30;


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

 var material = new THREE.MeshLambertMaterial( {color: 0x44ff44 } );
var geom = new THREE.CubeGeometry(1,1,1);
var cube = new THREE.Mesh(geom,material);



for (var i = 0; i < 100; i++){
	for (var j = 0; j < 100; j++){
		var height = Math.random();
		var cube = new THREE.Mesh(geom,material);
		cube.position.x = i;
		if (height > 0.8){
			cube.position.y = 1;
		}
		else{
			cube.position.y = 0;
		}
		cube.position.z = j;
scene.add(cube);
	}
}



// add subtle ambient lighting
/*
var ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

  var directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);


var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 0, 1, 0 );
scene.add( directionalLight );
*/

// add spotlight for the shadows
/*
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( -40, 60, -10 );
spotLight.castShadow = true;
scene.add( spotLight );
*/
/*
var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
hemiLight.position.set(0, 500, 0);
hemiLight.visible = true;
scene.add(hemiLight);
*/

var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 0.75, 0.5 );
hemiLight.groundColor.setHSL( 0.095, 0.5, 0.5 );
hemiLight.position.set( 0, 500, 0 );
scene.add( hemiLight );

var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.position.set( -1, 0.75, 1 );
dirLight.position.multiplyScalar( 50);
dirLight.name = "dirlight";
//dirLight.shadowCameraVisible = true;

scene.add( dirLight );

dirLight.castShadow = true;
dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024*2;

var d = 300;

dirLight.shadowCameraLeft = -d;
dirLight.shadowCameraRight = d;
dirLight.shadowCameraTop = d;
dirLight.shadowCameraBottom = -d;

dirLight.shadowCameraFar = 3500;
dirLight.shadowBias = -0.0001;
dirLight.shadowDarkness = 0.35;



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
