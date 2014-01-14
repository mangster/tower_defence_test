// THREE.js TEST
var stats = initStats();

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render and set the size
        var renderer = new THREE.WebGLRenderer();

        renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;
		/*
        // create the ground plane
        var planeGeometry = new THREE.PlaneGeometry(60,60,1,1);
        var planeMaterial =    new THREE.MeshLambertMaterial({color: 0xffffff});
        var plane = new THREE.Mesh(planeGeometry,planeMaterial);

        plane.receiveShadow  = true;
        // rotate and position the plane
        
		plane.rotation.x=-0.5*Math.PI;
        plane.position.x=0
        plane.position.y=0
        plane.position.z=0

        // add the plane to the scene
        scene.add(plane);
		
		
		
		var lookAtGeom = new THREE.CubeGeometry(1,1,1);
        var focus = new THREE.Mesh(lookAtGeom,new THREE.MeshLambertMaterial({color: 0xff0000}));
        
        // position and point the camera to the center of the scene
        camera.position.x = -10;
        camera.position.y = 100;
        camera.position.z = -20;
        camera.lookAt(focus.position);
		focus.rotation.x = 0;
		focus.rotation.y = 0;
		focus.rotation.z = 0;
		focus.add(camera);
		scene.add(focus);
		*/
		//försök nr 2
		
		
		/*
		var planeGeometry = new THREE.PlaneGeometry(60,60,1,1);
        var planeMaterial =    new THREE.MeshLambertMaterial({color: 0xffffff});
        var plane = new THREE.Mesh(planeGeometry,planeMaterial);

        plane.receiveShadow  = true;
        // rotate and position the plane
        
		plane.rotation.x=-0.5*Math.PI;
        plane.position.x=0
        plane.position.y=0
        plane.position.z=0

        // add the plane to the scene
        scene.add(plane)
		*/
		
		plane = new THREE.Mesh( new THREE.PlaneGeometry(60,60,1,1), new THREE.MeshBasicMaterial({color: 0xffffff}) );
		plane.rotation.x = - Math.PI / 2;
		plane.visible = true;
		scene.add( plane );
		
		var lookAtGeom = new THREE.CubeGeometry(1,1,1);
        var focus = new THREE.Mesh(lookAtGeom,new THREE.MeshLambertMaterial({color: 0xff0000}));
        
        // position and point the camera to the center of the scene
        camera.position.x = -10;
        camera.position.y = 100;
        camera.position.z = -20;
        camera.lookAt(focus.position);
		focus.rotation.x = 0;
		focus.rotation.y = 0;
		focus.rotation.z = 0;
		focus.add(camera);
		scene.add(focus);
       
		

		

        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x0c0c0c);
        scene.add(ambientLight);

        // add spotlight for the shadows
        var spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set( -40, 60, -10 );
        spotLight.castShadow = true;
        scene.add( spotLight );

        // add the output of the renderer to the html element
        $("#WebGL-output").append(renderer.domElement);

        // call the render function
        var step=0;

        render();
	
        function render() {
            stats.update();
            // render using requestAnimationFrame
            requestAnimationFrame(render);
            renderer.render(scene, camera);
			focus.position.x += 0.1;
			//focus.position.y += 0.1;
			focus.position.z += 0.1;
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

/*
For an Isometric camera: Create an empty GameObject called 'CameraTarget' at (0,0,0). Create a camera at (0,0,-10). 
Parent the Camera to the CameraTarget. Set the rotation of the Camera Target to (30,45,0) then check 'Orthographic' 
under the Camera settings. Adjust the 'Orthographic Size' camera setting to change the amount of zoom. 
Move the CameraTarget around the world to change the focal point on the map.
*/


/*
// Get the canvas element
var canvas = document.getElementById( "canvas" );
// Get our 2D context for drawing
var ctx = canvas.getContext( "2d" );

// Frames-per-second
var FPS = 30;

var blockSize = 80;
var cellWidth = blockSize;
var cellHeight = blockSize;
var mapWidth = 1000;
var mapHeight = 1000;
var isometric = true;

var entities = [];

test = new Image();
test.src= "img/test.png";
tower = new Image();
tower.src= "img/tower.png";




// Game loop draw function
function draw() {
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
	drawMap();
	//drawBullets();
    drawEnemies();
	//drawTowers();
	drawMenu();
	
	
	
}
// Game loop update function
function update() {
	camera.update();
	//updateTowers();
	updateMap();
	//updateBullets();
	updateEnemies();
}



function tick() {
    draw();
    update(); 
	
}

setInterval( tick, 1000 / FPS );
*/