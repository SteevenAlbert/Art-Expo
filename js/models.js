import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

function addModels(scene, interactive, objects){
var mesh;

// Instantiate a loader
const gltfLoader = new GLTFLoader();

// PAINTING
// Load a glTF resource
gltfLoader.load(
    // resource URL
    './resources/3Dmodels/abstractPainting.gltf',
    // called when the resource is loaded
    function ( gltf ) {

    mesh = gltf.scene.children[0];
    mesh.position.set(-62, 4, 15.5);
    mesh.rotation.set(1.5*Math.PI, 0, 0);
    mesh.scale.set(3,3,3);
    scene.add( gltf.scene );
    interactive.push(gltf.scene);
    }
);

gltfLoader.load(
    // resource URL
    './resources/3Dmodels/Marblebust/marble_bust_01_2k.gltf',
    // called when the resource is loaded
    function ( gltf ) {
    mesh = gltf.scene.children[0];
    mesh.position.set(-50, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.scale.set(10,10,10);
    scene.add( gltf.scene );
    interactive.push(gltf.scene);
    objects.push(gltf.scene);
    }
);

// SPOTLIGHT
gltfLoader.load(
    // resource URL
    './resources/3Dmodels/spotlight/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {

    mesh = gltf.scene.children[0];
    mesh.position.set(-60, 10, 15.2);
    mesh.scale.set(0.005,0.005,0.005);
    scene.add( gltf.scene );
    interactive.push(gltf.scene);
    }
);

// SPOTLIGHT
gltfLoader.load(
    // resource URL
    './resources/3Dmodels/spotlight/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {

    mesh = gltf.scene.children[0];
    mesh.position.set(-50, 10, 15.2);
    mesh.scale.set(0.005,0.005,0.005);
    scene.add( gltf.scene );
    interactive.push(gltf.scene);
    }
);


// SPOTLIGHT
gltfLoader.load(
    // resource URL
    './resources/3Dmodels/spotlight/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {

    mesh = gltf.scene.children[0];
    mesh.position.set(-40, 10, 15.2);
    mesh.scale.set(0.005,0.005,0.005);
    scene.add( gltf.scene );
    interactive.push(gltf.scene);
    }
);

}

export {addModels};