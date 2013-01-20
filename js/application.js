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
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
view_angle, aspect, near, far);

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
    renderer.setSize(viewportWidth, viewportHeight);
    viewport = document.getElementById('viewport');
    viewport.appendChild(renderer.domElement);

    
    

    //attaches fly controls to the camera
    controls = new THREE.FlyControls(camera);
    //camera control properties
    controls.movementSpeed = 1;
    controls.domElement = viewport;
    controls.rollSpeed = 0.01;
    controls.autoForward = false;
    controls.dragToLook = true;


    //pointLight.position.set(10, 50, 150);

    //add the objects to the scene
    scene.add(camera);
    scene.add(pointLight);

    camera.position.set(428,428,428);

    var loader = new THREE.ColladaLoader();
    loader.load('tardis.dae', function(result) {
        tardis = result.scene;
        scene.add(tardis);
        update();

        window.setTimeout(firstChange,5000);
        window.setTimeout(secondChange,10000);
    });

    
    
}

function firstChange() {

    rotationSpeed = -0.05;

}

function secondChange() {

    rotationSpeed = 0.07;

}



//----Update----//

function update() {
    //requests the browser to call update at it's own pace
    requestAnimFrame(update);

    //update controls
    controls.update(1);

    // Lets try moving the camera
    tardis.rotation.x = rotation;
    tardis.rotation.y = rotation;
    tardis.rotation.z = rotation;

    rotation = rotation + rotationSpeed;

    console.log(camera.position);

    camera.lookAt(scene.position);

    //call draw
    draw();
}



//----Draw----//

function draw() {
    renderer.render(scene, camera);
}