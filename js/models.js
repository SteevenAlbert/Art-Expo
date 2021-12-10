import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

function addModels(scene, interactive, objects, loadingManager){
var mesh;

// Instantiate a loader
const gltfLoader = new GLTFLoader(loadingManager);

//------------------------ PAINTINGS ------------------------//
// Load a glTF resource
gltfLoader.load(
    // resource URL
    './resources/3Dmodels/painting/painting/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {
    mesh = gltf.scene.children[0];
    mesh.position.set(-40, 4, 15.5);
    mesh.rotation.set(-1.5*Math.PI, 0, 0);
    mesh.scale.set(0.015,0.015,0.015);
    scene.add( gltf.scene );
    interactive.push(gltf.scene);
    }
);

gltfLoader.load(
    './resources/3Dmodels/painting/abstractPainting.gltf',
    function ( gltf ) {
    mesh = gltf.scene.children[0];
    mesh.position.set(-50, 4, 15.5);
    mesh.rotation.set(1.5*Math.PI, 0, 0);
    mesh.scale.set(3,3,3);
    scene.add( gltf.scene );
    interactive.push(gltf.scene);
    }
);

gltfLoader.load(
    './resources/3Dmodels/painting/jacket_gray_painting/scene.gltf',
    //'./resources/3Dmodels/painting/scanned_oil_painting/scene.gltf',
    function ( gltf ) {
    mesh = gltf.scene.children[0];
    mesh.position.set(-60, 4, 15.5);
    mesh.rotation.set(0, 0, 0);
    mesh.scale.set(100,100,100);
    scene.add( gltf.scene );
    interactive.push(gltf.scene);
    }
);

/*
gltfLoader.load(
    './resources/3Dmodels/painting/field_painting_by_jasper_johns/scene.gltf',
    function ( gltf ) {
    mesh = gltf.scene.children[0];
    mesh.position.set(-60.5, 4, 15.5);
    mesh.rotation.set(0, -1.5*Math.PI, 0);
    mesh.scale.set(2,2,2);
    scene.add( gltf.scene );
    interactive.push(gltf.scene);
    }
);
*/

/*
gltfLoader.load(
    './resources/3Dmodels/painting/painting_2_daea2c/scene.gltf',
    function ( gltf ) {
    mesh = gltf.scene.children[0];
    mesh.position.set(-58.3, 4, 14.5);
    mesh.rotation.set(-Math.PI/10, 0, -Math.PI/6);
    mesh.scale.set(0.1,0.1,0.1);
    scene.add( gltf.scene );
    interactive.push(gltf.scene);
    }
);
*/


//------------------------ STATUE ------------------------//
gltfLoader.load(
    './resources/3Dmodels/statues/Marblebust/marble_bust_01_2k.gltf',
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

/*
gltfLoader.load(
    './resources/3Dmodels/statues/octo_splat_face/scene.gltf',
    function ( gltf ) {
    mesh = gltf.scene.children[0];
    mesh.position.set(-10, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.scale.set(10,10,10);
    scene.add( gltf.scene );
    interactive.push(gltf.scene);
    objects.push(gltf.scene);
    }
);
*/

//------------------------ SPOTLIGHTs ------------------------//
// First room right SPOTLIGHTs
for (let i = -60; i <= -40; i+=10){
    gltfLoader.load(
        './resources/3Dmodels/spotlights/spotlight/scene.gltf',
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
        './resources/3Dmodels/spotlights/spotlight/scene.gltf',
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
            './resources/3Dmodels/spotlights/light/scene.gltf',
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
            './resources/3Dmodels/spotlights/light/scene.gltf',
            function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.position.set(i, 9.3, j);
            mesh.scale.set(0.05,0.05,0.05);
            scene.add( gltf.scene );
            }
        );
    }
}

//------------------------ WINDOWS ------------------------//
///*
//ON LEFT SIDE
gltfLoader.load(
    './resources/3Dmodels/window/blinds1/scene.gltf',
    function ( gltf ) {
        mesh = gltf.scene.children[0];
        mesh.position.set(-78.5, 1, -35);
        mesh.rotation.set(-Math.PI/2, 0, 0);
        mesh.scale.set(0.1,0.1,0.1);
        scene.add( gltf.scene );
        objects.push(gltf.scene);
    }
);

gltfLoader.load(
    './resources/3Dmodels/window/blinds1/scene.gltf',
    function ( gltf ) {
        mesh = gltf.scene.children[0];
        mesh.position.set(-33.5, 1, -35);
        mesh.rotation.set(-Math.PI/2, 0, 0);
        mesh.scale.set(0.1,0.1,0.1);
        scene.add( gltf.scene );
        objects.push(gltf.scene);
    }
);

gltfLoader.load(
    './resources/3Dmodels/window/blinds1/scene.gltf',
    function ( gltf ) {
        mesh = gltf.scene.children[0];
        mesh.position.set(11.5, 1, -35);
        mesh.rotation.set(-Math.PI/2, 0, 0);
        mesh.scale.set(0.1,0.1,0.1);
        scene.add( gltf.scene );
        objects.push(gltf.scene);
    }
);

gltfLoader.load(
    './resources/3Dmodels/window/blinds1/scene.gltf',
    function ( gltf ) {
        mesh = gltf.scene.children[0];
        mesh.position.set(56.5, 1, -35);
        mesh.rotation.set(-Math.PI/2, 0, 0);
        mesh.scale.set(0.1,0.1,0.1);
        scene.add( gltf.scene );
        objects.push(gltf.scene);
    }
);

gltfLoader.load(
    './resources/3Dmodels/window/blinds1/scene.gltf',
    function ( gltf ) {
        mesh = gltf.scene.children[0];
        mesh.position.set(101.5, 1, -35);
        mesh.rotation.set(-Math.PI/2, 0, 0);
        mesh.scale.set(0.1,0.1,0.1);
        scene.add( gltf.scene );
        objects.push(gltf.scene);
    }
);

//ON RIGHT SIDE
gltfLoader.load(
    './resources/3Dmodels/window/blinds1/scene.gltf',
    function ( gltf ) {
        mesh = gltf.scene.children[0];
        mesh.position.set(-78.5, 1, 24);
        mesh.rotation.set(-Math.PI/2, 0, 0);
        mesh.scale.set(0.1,0.1,0.1);
        scene.add( gltf.scene );
        objects.push(gltf.scene);
    }
);

gltfLoader.load(
    './resources/3Dmodels/window/blinds1/scene.gltf',
    function ( gltf ) {
        mesh = gltf.scene.children[0];
        mesh.position.set(-33.5, 1, 24);
        mesh.rotation.set(-Math.PI/2, 0, 0);
        mesh.scale.set(0.1,0.1,0.1);
        scene.add( gltf.scene );
        objects.push(gltf.scene);
    }
);

gltfLoader.load(
    './resources/3Dmodels/window/blinds1/scene.gltf',
    function ( gltf ) {
        mesh = gltf.scene.children[0];
        mesh.position.set(11.5, 1, 24);
        mesh.rotation.set(-Math.PI/2, 0, 0);
        mesh.scale.set(0.1,0.1,0.1);
        scene.add( gltf.scene );
        objects.push(gltf.scene);
    }
);

gltfLoader.load(
    './resources/3Dmodels/window/blinds1/scene.gltf',
    function ( gltf ) {
        mesh = gltf.scene.children[0];
        mesh.position.set(56.5, 1, 24);
        mesh.rotation.set(-Math.PI/2, 0, 0);
        mesh.scale.set(0.1,0.1,0.1);
        scene.add( gltf.scene );
        objects.push(gltf.scene);
    }
);

gltfLoader.load(
    './resources/3Dmodels/window/blinds1/scene.gltf',
    function ( gltf ) {
        mesh = gltf.scene.children[0];
        mesh.position.set(101.5, 1, 24);
        mesh.rotation.set(-Math.PI/2, 0, 0);
        mesh.scale.set(0.1,0.1,0.1);
        scene.add( gltf.scene );
        objects.push(gltf.scene);
    }
);
//*/



//------------------------ TEST ------------------------//

/*
gltfLoader.load(
    './resources/3Dmodels/window/window_mat_test_v001/scene.gltf',
    function ( gltf ) {
        mesh = gltf.scene.children[0];
        mesh.position.set(-68, 2, -30);
        mesh.rotation.set(-Math.PI/2, 0, 0);
        mesh.scale.set(0.065,0.001,0.041);
        scene.add( gltf.scene );
        objects.push(gltf.scene);
    }
);
//*/

/*
gltfLoader.load(
    './resources/3Dmodels/window/window/scene.gltf',
    function ( gltf ) {
        mesh = gltf.scene.children[0];
        mesh.position.set(-70, 0, -30);
        mesh.rotation.set(-Math.PI/2, 0, -Math.PI/1.9);         //...
        mesh.scale.set(0.2,0.3,0.1);
        scene.add( gltf.scene );
        objects.push(gltf.scene);
    }
);
*/

}

export{addModels};