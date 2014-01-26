// THREE.js TEST
var cameraDistance = 40;
var cameraAngle = 35.264;
var cameraAngle = 45;

// Creating the scene
var scene = new THREE.Scene();

// create a render and set the size
var renderer = new THREE.WebGLRenderer({});
renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;

// Creating the camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
//camera = new THREE.OrthographicCamera( window.innerWidth / - cameraDistance, window.innerWidth / cameraDistance, window.innerHeight / cameraDistance, window.innerHeight / - cameraDistance, -200, 500 );

// position and point the camera
var cameraY = Math.abs(Math.sin(cameraAngle) * cameraDistance);
var flatDistance = Math.sqrt(cameraDistance * cameraDistance - cameraY*cameraY);
var cameraX = Math.sqrt((flatDistance*flatDistance)/2);
camera.position.x = -cameraX;
camera.position.y = cameraY;
camera.position.z = -cameraX;
camera.lookAt(new THREE.Vector3(0,0,0));

// Camera controls
controls = new THREE.OrbitControls( camera );


// Creating the map
var grass = new THREE.MeshLambertMaterial( {color: 0x77DD77 } );
var dirt = new THREE.MeshLambertMaterial( {color: 0xA87B5A } );
var rock = new THREE.MeshLambertMaterial( {color: 0xC6CBC7 } );
var water = new THREE.MeshLambertMaterial( {color: 0x7777DD } );
var geom = new THREE.CubeGeometry(1,1,1);

var mapRandom = generateHeight( 100, 100 );
var map = new THREE.Object3D();
var count = 0;
for (var i = 0; i < 100; i++){
	for (var j = 0; j < 100; j++){
		var height = (mapRandom[count]/10);
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

		cube.position.z = j;
		count++;
		map.add(cube);
		//scene.add(cube);
	}
}
scene.add(map);

loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;
loader.load("/models/villager_anim.dae",function colladaReady( collada ){
	villager = collada.scene;
	villager.scale.x = villager.scale.y = villager.scale.z = 0.5;
	//villager.getObjectByName("body");
	skin = collada.skins [ 0 ];
	scene.add( villager );
});
var clock = new THREE.Clock();
var t = 0;



var ambientLight = new THREE.AmbientLight(0x505050);
scene.add(ambientLight);

light = new THREE.SpotLight(0xaaaaaa);
light.position.set(120, 100, 120);

light.shadowCameraNear = 1; 
light.shadowCameraFar = 200;
light.shadowCameraFov = 70;

light.shadowCameraVisible = false;
light.castShadow = true;
renderer.shadowMapSoft = true;
scene.add(light);

// add the output of the renderer to the html element
$("#WebGL-output").append(renderer.domElement);


// Rendering
render();
function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}


