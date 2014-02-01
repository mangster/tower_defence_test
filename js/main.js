// once everything is loaded, we run our Three.js stuff.
$(function () {

	var stats = initStats();

	// create a scene, that will hold all our elements such as objects, cameras and lights.
	var scene = new THREE.Scene();

	// create a camera, which defines where we're looking at.
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

	// create a render and set the size
	var webGLRenderer = new THREE.WebGLRenderer();
	webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
	webGLRenderer.setSize(window.innerWidth, window.innerHeight);
	webGLRenderer.shadowMapEnabled = true;

	// position and point the camera to the center of the scene
	camera.position.x = 400;
	camera.position.y = 50;
	camera.position.z = 150;
	camera.lookAt(new THREE.Vector3(0, 0, 0));


	// add spotlight for the shadows
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(300, 500, 100);
	spotLight.intensity = 3;
	scene.add(spotLight);

	// add the output of the renderer to the html element
	$("#WebGL-output").append(webGLRenderer.domElement);

	// call the render function
	var step = 0;

	var meshAnim;
	var clock = new THREE.Clock();

	var loader = new THREE.ColladaLoader();
	loader.load('/models/villager.dae', function (collada) {

		var geom = collada.skins[0].geometry;
		var mat = collada.skins[0].material;

		// create a smooth skin
		geom.computeMorphNormals();
		mat.morphNormals = true;

		// create the animation
		meshAnim = new THREE.MorphAnimMesh(geom, mat);

		// position the mesh
		meshAnim.scale.set(15, 15, 15);
		meshAnim.rotation.x = -0.5 * Math.PI;
		meshAnim.position.x = -100;
		meshAnim.position.y = -60;

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

		// render using requestAnimationFrame
		requestAnimationFrame(render);
		webGLRenderer.render(scene, camera);
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