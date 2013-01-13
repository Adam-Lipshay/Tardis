var camera, scene, renderer, geometry, material, mesh;



init();
animate();

function init() {

    // var loader = new THREE.ColladaLoader();
    // loader.load('tardis.dae', function (result) {
    //   scene.add(result.scene);
    // });

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 500;
    scene.add(camera);

    geometry = new THREE.CubeGeometry(200, 200, 200);
    material = new THREE.MeshLambertMaterial(
    {
      color: 0x102372
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function animate() {

    requestAnimationFrame(animate);
    render();

}

function render() {

    mesh.rotation.x += 0.00;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);

}