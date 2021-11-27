import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

function addModels(scene){
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
    mesh.position.set(-60, 4, 11.5);
    mesh.rotation.set(1.5*Math.PI, 0, 0);
    mesh.scale.set(3,3,3);

        scene.add( gltf.scene );

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

    }
);

// SPOTLIGHT
gltfLoader.load(
    // resource URL
    './resources/3Dmodels/spotlight/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {

    mesh = gltf.scene.children[0];
    mesh.position.set(-60, 10, 11);
    mesh.scale.set(0.005,0.005,0.005);
    //mesh.rotation.set(-Math.PI/2+0.2, 0, Math.PI/2);

        scene.add( gltf.scene );

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

    }
);

// SPOTLIGHT
gltfLoader.load(
    // resource URL
    './resources/3Dmodels/spotlight/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {

    mesh = gltf.scene.children[0];
    mesh.position.set(-50, 10, 11);
    mesh.scale.set(0.005,0.005,0.005);
    //mesh.rotation.set(-Math.PI/2+0.2, 0, Math.PI/2);

        scene.add( gltf.scene );

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

    }
);


// SPOTLIGHT
gltfLoader.load(
    // resource URL
    './resources/3Dmodels/spotlight/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {

    mesh = gltf.scene.children[0];
    mesh.position.set(-40, 10, 11);
    mesh.scale.set(0.005,0.005,0.005);
    //mesh.rotation.set(-Math.PI/2+0.2, 0, Math.PI/2);

        scene.add( gltf.scene );

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object

    }
);

}

export {addModels};