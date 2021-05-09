var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

var container;
var camera, renderer;

init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// scene

	initThree();

	// camera

	camera = new THREE.PerspectiveCamera( 60, aspect, 1, 5000 );
	camera.position.set( 200, 400, 500 );

	// renderer

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	renderer.setClearColor( 0xcce0ff );

	container.appendChild( renderer.domElement );

	// controls

	let controls = new THREE.OrbitControls(camera, renderer.domElement);

	// grid

	let gridXZ = new THREE.GridHelper(800, 20, 'red', 'black');
	scene.add(gridXZ);

	// in scene.js
	sceneFromJSON();  // using LevelDesigner

	let size = 10; // halfsize of agent
	agent = new Agent( new THREE.Vector3(50, 0, -50), size );

	// resize

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;

	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();

	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

}

function animate() {

	agent.update(0.01);
	// check agent crossing obstacles ...
	scene.obstacles.forEach (
		function (obs) {
			obs.checkCollision (agent)
		}
	);

	if (scene.targets.length > 0)
		requestAnimationFrame(animate);
	else
		alert ('game over');
	
	render();

}

function render() {

	renderer.render( scene, camera );

}