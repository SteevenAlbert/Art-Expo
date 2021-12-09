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
    mesh.position.set(-60, 4, 15.5);
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


// First room right SPOTLIGHTs
for (let i = -60; i <= -40; i+=10){
    gltfLoader.load(
        // resource URL
        './resources/3Dmodels/spotlight/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {

        mesh = gltf.scene.children[0];
        mesh.position.set(i, 10, 12);
        mesh.scale.set(0.005,0.005,0.005);
        scene.add( gltf.scene );
        }
    );
}

// First room front SPOTLIGHTs
for (let i = -10; i <= 10; i+=20){
    gltfLoader.load(
        // resource URL
        './resources/3Dmodels/spotlight/scene.gltf',
        // called when the resource is loaded
        function ( gltf ) {

        mesh = gltf.scene.children[0];
        mesh.position.set(-35, 10, i);
        mesh.scale.set(0.005,0.005,0.005);
        scene.add( gltf.scene );
        }
    );
}



// Left hallway LIGHT
for (let j = -28; j <= -17; j+=11){
    for (let i = -75; i < 125; i+=20){
        gltfLoader.load(
            // resource URL
            './resources/3Dmodels/light/scene.gltf',
            // called when the resource is loaded
            function ( gltf ) {

            mesh = gltf.scene.children[0];
            mesh.position.set(i, 9.3, j);
            mesh.scale.set(0.05,0.05,0.05);
            scene.add( gltf.scene );
            }
        );
    }
}

// Right hallway LIGHT
for (let j = 18; j <= 28; j+=10){
    for (let i = -75; i < 125; i+=20){
        gltfLoader.load(
            // resource URL
            './resources/3Dmodels/light/scene.gltf',
            // called when the resource is loaded
            function ( gltf ) {

            mesh = gltf.scene.children[0];
            mesh.position.set(i, 9.3, j);
            mesh.scale.set(0.05,0.05,0.05);
            scene.add( gltf.scene );
            }
        );
    }
}

}

export {addModels};