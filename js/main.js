// once everything is loaded, we run our Three.js stuff.
var meshAnim;
var animLabels;
/*
var animOffset       = 0,   // starting frame of animation
	walking         = true,
	duration        = 10000, // milliseconds to complete animation
	keyframes       = 41,   // total number of animation frames
	interpolation   = duration / keyframes, // milliseconds per frame
	lastKeyframe    = 0,    // previous keyframe
	currentKeyframe = 0;
*/	
var mat;
	
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
	var ambiColor = "#0c0c0c";
	var ambientLight = new THREE.AmbientLight(ambiColor);
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
	
	
	// MAP
	var grass = new THREE.MeshLambertMaterial( {color: 0x77DD77 } );
	var dirt = new THREE.MeshLambertMaterial( {color: 0xA87B5A } );
	var rock = new THREE.MeshLambertMaterial( {color: 0xC6CBC7 } );
	var water = new THREE.MeshLambertMaterial( {color: 0x7777DD } );
	var geom = new THREE.CubeGeometry(1,1,1);

	var mapRandom = generateHeight( 100, 100 );
	map = new THREE.Object3D();
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

	

	// call the render function
	var step = 0;

	meshAnim;
	var clock = new THREE.Clock();

	var loader = new THREE.ColladaLoader();
	loader.load('/models/villager.dae', function (collada) {

		var geom = collada.skins[0].geometry;
		mat = collada.skins[0].material;

		// create a smooth skin
		geom.computeMorphNormals();
		mat.morphNormals = true;

		// create the animation
		meshAnim = new THREE.MorphAnimMesh(geom, mat);
		// Animation parsing	
		meshAnim.parseAnimations();
            // parse the animations and add them to the control
            animLabels = [];
            for (var key in meshAnim.geometry.animations) {
                if (key === 'length' || !meshAnim.geometry.animations.hasOwnProperty(key)) continue;
                animLabels.push(key);
            }

		// position the mesh
		meshAnim.scale.set(1, 1, 1);
		meshAnim.rotation.x = -0.5 * Math.PI;
		meshAnim.position.x = 0;
		meshAnim.position.y = 0;

		scene.add(meshAnim);
		meshAnim.duration = 1000;

	});


	render();


	function render() {
		stats.update();


		var delta = clock.getDelta();
		
		if (meshAnim) {
			if (meshAnim) {
				meshAnim.updateAnimation(delta * 1000);
			}
		}
		
		/*
		if ( meshAnim && walking ){
			// Alternate morph targets
			time = new Date().getTime() % duration;
			keyframe = Math.floor( time / interpolation ) + animOffset;
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
		*/
		
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