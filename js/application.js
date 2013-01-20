var camera, scene, renderer, cubeMesh, cylinderMesh, material, mesh, controls;



init();
animate();

function init() {

    

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 200;
    camera.position.x = 110;
    camera.position.y = 0;
    scene.add(camera);

    // cubeGeometry = new THREE.CubeGeometry(200, 200, 200);
    // cylinderGeometry = new THREE.CylinderGeometry(50,50,50)

    // material = new THREE.MeshLambertMaterial(
    // {
    //   color: 0x102372
    // });

    // cubeMesh = new THREE.Mesh(cubeGeometry, material);
    // cylinderMesh = new THREE.Mesh(cylinderGeometry,material)
    // cylinderMesh.position.set( 0, 100,0 );
    // scene.add(cubeMesh);
    // scene.add(cylinderMesh);

    // 
    // Adam - once you have a web server running you can use this 
    //
    var loader = new THREE.ColladaLoader();
    loader.load('tardis.dae', function (result) {
      scene.add(result.scene);
    });


    // Adam you need to fix this so you can fly around the tardis 
    //
    // controls = new THREE.FlyControls(new THREE.Object3D());

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function animate() {

    requestAnimationFrame(animate);
    render();

}

function render() {

    // cubeMesh.rotation.x += 0.00;
    // cubeMesh.rotation.y += 0.01;

    // cylinderMesh.rotation.x += 0.00;
    // cylinderMesh.rotation.y += 0.01;

    renderer.render(scene, camera);

}