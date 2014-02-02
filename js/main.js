// once everything is loaded, we run our Three.js stuff.
var meshAnim;
var animLabels;
// Walking: 1-41, 0-40 just nu för att det inte ska bugga ur
var animOffset       = 0,   // starting frame of animation
	walking         = true,
	duration        = 1000, // milliseconds to complete animation
	keyframes       = 40,   // total number of animation frames
	interpolation   = duration / keyframes, // milliseconds per frame
	lastKeyframe    = 0,    // previous keyframe
	currentKeyframe = 0;

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

	 var mesh;
        meshAnim;
        var frames = [];
        var currentMesh;
        var clock = new THREE.Clock();

        var loader = new THREE.JSONLoader();
        loader.load('/models/villager.js', function (geometry, mat) {

            var mat = new THREE.MeshLambertMaterial(
                    {color: 0xffffff, morphNormals: false,
                        morphTargets: true,
                        vertexColors: THREE.FaceColors});


            var mat2 = new THREE.MeshLambertMaterial(
                    {color: 0xffffff, vertexColors: THREE.FaceColors});

            mesh = new THREE.Mesh(geometry, mat);
            mesh.position.x = -100;
            frames.push(mesh);
            currentMesh = mesh;
            //morphColorsToFaceColors(geometry);

            mesh.geometry.morphTargets.forEach(function (e) {
                var geom = new THREE.Geometry();
                geom.vertices = e.vertices;
                geom.faces = geometry.faces;


                var morpMesh = new THREE.Mesh(geom, mat2);
                frames.push(morpMesh);
                morpMesh.position.x = -100;

            });

            geometry.computeVertexNormals();
            geometry.computeFaceNormals();
            geometry.computeMorphNormals();

            console.log(geometry);

            meshAnim = new THREE.MorphAnimMesh(geometry, mat);
            meshAnim.duration = 3000;
            meshAnim.position.x = 0;
            meshAnim.position.z = 0;

            scene.add(meshAnim);

            //showFrame(0);

        }, '../assets/models');

		
        function morphColorsToFaceColors(geometry) {

            if (geometry.morphColors && geometry.morphColors.length) {

                var colorMap = geometry.morphColors[ 0 ];
                for (var i = 0; i < colorMap.colors.length; i++) {
                    geometry.faces[ i ].color = colorMap.colors[ i ];
                    geometry.faces[ i ].color.offsetHSL(0, 0.3, 0);
                }
            }
        }
		


	render();


	function render() {
		stats.update();

		/*
		var delta = clock.getDelta();
            renderer.clear();
            if (meshAnim) {
                meshAnim.updateAnimation(delta * 1000);
                meshAnim.rotation.y += 0.01;
            }
		*/
		/*
		var delta = clock.getDelta();
		
		if (meshAnim) {
			if (meshAnim) {
				meshAnim.updateAnimation(delta * 1000);
			}
		}
		*/
		
		
		if ( meshAnim){
			meshAnim.position.x += 0.1;
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