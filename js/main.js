var grassColor = 0x77DD77;
var dirtColor = 0xA87B5A;
var rockColor = 0xC6CBC7;
var waterColor = 0x7777DD;

var test = false;
var meshAnim;
var animLabels;
// Walking: 1-41
var walking = true;
var startFrame      = 1,   // starting frame of animation
	endFrame		= 41,
	keyframes       = endFrame - startFrame,   // total number of animation frames
	duration        = 1000, // milliseconds to complete animation
	interpolation   = duration / keyframes, // milliseconds per frame
	lastKeyframe    = 0,    // previous keyframe
	currentKeyframe = 0;

var mat;

function walk(){
	walking = true;
	startFrame      = 1;
	endFrame		= 41;
	keyframes       = endFrame - startFrame;
	duration        = 1000;
	interpolation   = duration / keyframes;

}
function stop(){
	walking = false;
	startFrame      = 0;
	endFrame		= 0;
	keyframes       = endFrame - startFrame;
	duration        = 1000;
	interpolation   = duration / keyframes;
	meshAnim.morphTargetInfluences[ lastKeyframe ] = 0;
	meshAnim.morphTargetInfluences[ currentKeyframe ] = 0;
}
	
$(function () {

	var stats = initStats();

	// SCENE
	var scene = new THREE.Scene();

	

	// CAMERA
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	//camera = new THREE.OrthographicCamera( window.innerWidth / - cameraDistance, window.innerWidth / cameraDistance, window.innerHeight / cameraDistance, window.innerHeight / - cameraDistance, -200, 500 );
	// position and point the camera
	var cameraDistance = 40;
	var cameraAngle = 35.264;
	var cameraAngle = 45;
	var cameraY = Math.abs(Math.sin(cameraAngle) * cameraDistance);
	var flatDistance = Math.sqrt(cameraDistance * cameraDistance - cameraY*cameraY);
	var cameraX = Math.sqrt((flatDistance*flatDistance)/2);
	camera.position.x = -cameraX;
	camera.position.y = cameraY;
	camera.position.z = -cameraX;
	camera.lookAt(new THREE.Vector3(0,0,0));
	
	controls = new THREE.OrbitControls( camera );

	// RENDERER
	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;
	$("#WebGL-output").append(renderer.domElement);
	
	//LIGHTS
	/*
	ambientLight = new THREE.AmbientLight(0x505050);
	scene.add(ambientLight);
	*/
	/*
	var ambiColor = "#0c0c0c";
	var ambientLight = new THREE.AmbientLight(ambiColor);
	scene.add(ambientLight);*/
	ambiLight = new THREE.AmbientLight(0x505050);
	scene.add(ambiLight);
	light = new THREE.SpotLight(0xaaaaaa);
	light.position.set(120, 100, 120);

	light.shadowCameraNear = 1; 
	light.shadowCameraFar = 200;
	light.shadowCameraFov = 70;

	light.shadowCameraVisible = false;
	light.castShadow = true;
	renderer.shadowMapSoft = true;
	scene.add(light);
	
	//TODO testa skapa mina egna kuber, kolla om det funkar bättre med skuggorna
	// MAP
	var grass = new THREE.MeshLambertMaterial( {color: grassColor} );
	grass.ambient.set(grassColor);
	
	var dirt = new THREE.MeshLambertMaterial( {color: dirtColor } );
	dirt.ambient.set(dirtColor);
	var rock = new THREE.MeshLambertMaterial( {color: rockColor } );
	rock.ambient.set(rockColor);
	var water = new THREE.MeshLambertMaterial( {color: waterColor } );
	water.ambient.set(waterColor);
	var geom = new THREE.CubeGeometry(1,1,1);
	
	
	var mapRandom = generateHeight( 100, 100 );
	map = new THREE.Object3D();
	var count = 0;
	for (var i = 0; i < 100; i++){
		for (var j = 0; j < 100; j++){
			var height = Math.round((mapRandom[count]/10));
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
	

	var clock = new THREE.Clock();
	
	var loader = new THREE.JSONLoader();
	loader.load('/models/villager.js', function (geometry, mat) {
		var testMat = new THREE.MeshFaceMaterial(mat);
		for (i = 0; i < testMat.materials.length; i++){
			testMat.materials[i].morphTargets = true;
			testMat.materials[i].vertexColors = THREE.FaceColors;
		
		}
		console.log(testMat.materials[0].ambient);
		var mat = new THREE.MeshLambertMaterial(
				{color: 0xffffff, morphNormals: false,
					morphTargets: true,
					vertexColors: THREE.FaceColors});
					
		geometry.computeVertexNormals();
		geometry.computeFaceNormals();
		geometry.computeMorphNormals();

		meshAnim = new THREE.MorphAnimMesh(geometry, testMat);
		meshAnim.position.x = 5;
		meshAnim.position.z = 5;

		scene.add(meshAnim);

	}, '../assets/models');
	
	// meshAnim.material.materials[0].color.setRGB(0.5,0,1) ändrar tröjfärg
	render();
	update();
	
	function update(){
		if (test){
			meshAnim.position.x += 0.1;
		}
		setTimeout(update, 1000 / 60 );
	}

	function render() {
		stats.update();
		
		if ( meshAnim && walking){
			
			// Alternate morph targets
			time = new Date().getTime() % duration;
			keyframe = Math.floor( time / interpolation ) + startFrame;
			if ( keyframe != currentKeyframe ) 
			{
				meshAnim.morphTargetInfluences[ lastKeyframe ] = 0;
				meshAnim.morphTargetInfluences[ currentKeyframe ] = 1;
				meshAnim.morphTargetInfluences[ keyframe ] = 0;
				lastKeyframe = currentKeyframe;
				currentKeyframe = keyframe;
			}
			meshAnim.morphTargetInfluences[ keyframe ] = 
				( time % interpolation ) / interpolation;
			meshAnim.morphTargetInfluences[ lastKeyframe ] = 
				1 - meshAnim.morphTargetInfluences[ keyframe ];
		}
		
		
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function initStats() {

		var stats = new Stats();
		stats.setMode(0); // 0: fps, 1: ms

		// Align top-left
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';

		$("#Stats-output").append(stats.domElement);

		return stats;
	}
});