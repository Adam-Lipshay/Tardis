//----Variables----//
//DOM element to attach the renderer to
var viewport;

//built-in three.js controls will be attached to this
var controls;

//viewport size
var viewportWidth = 800;
var viewportHeight = 600;

//camera attributes
var view_angle = 45,
    aspect = viewportWidth / viewportHeight,
    near = 0.1,
    //near clip-plane
    far = 10000; //far clip-plane
//sphere specifications
var radius = 50,
    segments = 32,
    rings = 32;

var tardis;

var rotation = 0;

var rotationSpeed = 0.01;

//----Constructors----//
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setClearColorHex( 0x000000, 1 );
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
40, window.innerWidth / window.innerHeight, 0.1, 10000 );

//constructs an instance of a white light
var pointLight = new THREE.HemisphereLight();

//a cross-browser method for efficient animation, more info at:
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

//----Initialization----//

function initialize() {
    //Sets up the renderer to the same size as a DOM element
    //and attaches it to that element
    renderer.setSize(window.innerWidth, window.innerHeight);
    viewport = document.getElementById('viewport');
    viewport.appendChild(renderer.domElement);


    //pointLight.position.set(10, 50, 150);

    //add the objects to the scene
    scene.add(camera);
    scene.add(pointLight);

    camera.position.set(0, 0, 700);

	var light	= new THREE.DirectionalLight( 0xff8000, 1.5 );
	light.position.set( 1, 1, 200 ).normalize();
	scene.add( light );
	
	var light	= new THREE.DirectionalLight( 0xff8000, 1.5 );
	light.position.set( -1, 1, 200 ).normalize();
	scene.add( light );
	
	var light	= new THREE.PointLight( 0x44FFAA, 15, 25 );
	light.position.set( 0, -3, 200 );
	scene.add( light );
	
	var light	= new THREE.PointLight( 0xff4400, 20, 30 );
	light.position.set( 3, 3, 200 );
	scene.add( light );
	
	scene.fog	= new THREE.FogExp2( 0x000000, 0.001 );

	// here you add your objects
	// - you will most likely replace this part by your own
	var geometry	= new THREE.CylinderGeometry( 100, 100, 3000, 3200, 100, true );
	texture		= THREE.ImageUtils.loadTexture( "images/water.jpg" );
	texture.wrapT	= THREE.RepeatWrapping;

	var material	= new THREE.MeshLambertMaterial({color : 0xFFFFFF, map : texture});
	var mesh	= new THREE.Mesh( geometry, material );
	mesh.rotation.x	= Math.PI/2;
	scene.add( mesh );
    mesh.flipSided    = true;
    var loader = new THREE.ColladaLoader();
    loader.load('tardis.dae', function(result) {
        tardis = result.scene;
        scene.add(tardis);
        update();

        window.setTimeout(firstChange,10000);
        window.setTimeout(secondChange,10100);
    });

}

function firstChange() {

    rotationSpeed = -0.001;

}

function secondChange() {

    rotationSpeed = 0.07;
    rotation = -1;

}



//----Update----//

function update() {
    //requests the browser to call update at it's own pace
    requestAnimFrame(update);


    // Lets try moving the camera
    tardis.rotation.x = rotation;
    tardis.rotation.y = rotation;
    tardis.rotation.z = rotation;

    rotation = rotation + rotationSpeed;

    console.log(camera.position);

    camera.lookAt(scene.position);
//background

	// move the texture to give the illusion of moving thru the tunnel
	texture.offset.y	+= 0.008;
	texture.offset.y	%= 1;
	texture.needsUpdate	= true;

	// move the camera back and forth
	var seconds		= Date.now() / 1000;
	var radius		= 0.70;
	var angle		= Math.sin(0.75 * seconds * Math.PI) / 4;
	//angle	= (seconds*Math.PI)/4;
	camera.position.x	= Math.cos(angle - Math.PI/2) * radius;
	camera.position.y	= Math.sin(angle - Math.PI/2) * radius;
	camera.rotation.z	= angle;
    //call draw
    draw();
}



//----Draw----//

function draw() {
    renderer.render(scene, camera);
}