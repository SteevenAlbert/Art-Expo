import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FBXLoader.js';

function addModels(scene, interactive, objects, loadingManager){
    var mesh;

    // Instantiate a loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    dracoLoader.preload();

    const gltfLoader = new GLTFLoader(loadingManager);
    //gltfLoader.setDRACOLoader(dracoLoader);

    
/*
    //-------------------------------------- PAINTINGS --------------------------------------//
    // Load a glTF resource
 
    gltfLoader.load(
        './resources/3Dmodels/painting/abstractPainting.gltf',
        function ( gltf ) {
        mesh = gltf.scene.children[0];
        mesh.position.set(-60, 4, 15.5);
        mesh.rotation.set(1.5*Math.PI, 0, 0);
        mesh.scale.set(4,3,4);
        scene.add( gltf.scene );
        interactive.push(gltf.scene);
        }
    );

    var selfPortraitGeo = new THREE.BoxBufferGeometry( 3.4, 4.6, 0.2 );
    var selfPortraitMat = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load("./resources/paintings/self_portrait.jpg") });
    var selfPortrait = new THREE.Mesh(selfPortraitGeo, selfPortraitMat);
    selfPortrait.position.set(-50, 4, 15.5);
    scene.add( selfPortrait );
    interactive.push(selfPortrait);

    var pearlPaintingGeo = new THREE.BoxBufferGeometry( 3.4, 4.6, 0.2 );
    var pearlPaintingMat = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load("./resources/paintings/pearl.jpg") });
    var pearlPainting = new THREE.Mesh( pearlPaintingGeo, pearlPaintingMat );
    pearlPainting.position.set(-40, 4, 15.5);
    scene.add( pearlPainting );
    interactive.push(pearlPainting);
*/
/*
    //-------------------------------------- STATUE --------------------------------------//
    gltfLoader.load(
        './resources/3Dmodels/statues/Marblebust/marble_bust_01_2k.gltf',
        function ( gltf ) {
        mesh = gltf.scene.children[0];
        mesh.position.set(0, 0, 0);
        mesh.rotation.set(0, 0, 0);
        mesh.scale.set(10,10,10);
        scene.add( gltf.scene );
        interactive.push(gltf.scene);
        objects.push(gltf.scene);
        }
    );
*/


    //-------------------------------------- SPOTLIGHTs --------------------------------------//
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

   //-------------------------------------- WINDOWS --------------------------------------//
    //ON LEFT SIDE
    for (let i = -71.5; i<=146.5; i+=45)
    {
        gltfLoader.load(
            './resources/3Dmodels/window/window/scene.gltf',
            function ( gltf ) {

                // gltf.scene.traverse( function ( node ) {
                //     if ( node.isMesh) node.castShadow = true;
                // } );

                mesh = gltf.scene.children[0];
                gltf.castShadow = true;
                gltf.receiveShadow = true;
                mesh.position.set(i, -1, -28.2);
                mesh.rotation.set(-Math.PI/2, 0, Math.PI/4.3);
                mesh.scale.set(0.4,0.2,0.2);
                //mesh.castShadow = true;
                scene.add( gltf.scene );
                objects.push(gltf.scene);

            }
        );
    }

    //ON RIGHT SIDE
    for (let i = -71.5; i<=146.5; i+=45)
    {
        gltfLoader.load(
            './resources/3Dmodels/window/window/scene.gltf',
            function ( gltf ) {

                // gltf.scene.traverse( function ( node ) {
                //     if ( node.isMesh) node.castShadow = true;
                // } );

                mesh = gltf.scene.children[0];
                mesh.position.set(i, -1, 31.8);
                mesh.rotation.set(-Math.PI/2, 0, Math.PI/4.3);
                mesh.scale.set(0.4,0.2,0.2);
                //mesh.castShadow = true;
                scene.add( gltf.scene );
                objects.push(gltf.scene);
            }
        );
    }

    //-------------------------------------- RECEPTION --------------------------------------//
    //LOGO
    gltfLoader.load(
        './resources/3Dmodels/reception/LOGO.gltf',
        function ( gltf ) {
            gltf.castShadow = true;
            gltf.receiveShadow = true;
            mesh = gltf.scene.children[1];
            mesh.position.set(-80.8, 5.5, 0);
            mesh.rotation.set(Math.PI/2, 0, Math.PI/2);
            scene.add( gltf.scene );
        }
    );

    // Desk
    gltfLoader.load(
        './resources/3Dmodels/reception/desk/reception_desk_proposal/scene.gltf',
        function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.position.set(-90, 0, 0);
            mesh.scale.set(0.003,0.003,0.003);
            mesh.rotation.z=0.5;
            scene.add( gltf.scene );
            objects.push(gltf.scene);
        }
    );
    
    // PC Screen
    gltfLoader.load(
        './resources/3Dmodels/reception/pc/scene.gltf',
        function ( gltf ) {                            
            mesh = gltf.scene.children[0];
            mesh.position.set(-92, 2.3, 0.5);
            mesh.scale.set(0.5,0.5,0.5);
            mesh.rotation.z=Math.PI/2;
            scene.add( gltf.scene );
            objects.push(gltf.scene);
        }
    );

    // Chair
    gltfLoader.load(
        './resources/3Dmodels/reception/office_chair/scene.gltf',
        function ( gltf ) {                            
            mesh = gltf.scene.children[0];
            mesh.position.set(-91, 0, 0);
            mesh.scale.set(3,3,3);
            mesh.rotation.z=Math.PI/2;
            scene.add( gltf.scene );
            objects.push(gltf.scene);
        }
    );

    // Left sofa
    gltfLoader.load(
        './resources/3Dmodels/reception/sofa/sofa/scene.gltf',
        function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.position.set(-95, 1.5, -25);
            mesh.rotation.set(-Math.PI/2, 0, 0);
            mesh.scale.set(6,6,6);
            scene.add( gltf.scene );
            objects.push(gltf.scene);
            
        }
    );

    // Right sofa
    gltfLoader.load(
        './resources/3Dmodels/reception/sofa/sofa/scene.gltf',
        function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.position.set(-95, 1.5, 27);
            mesh.rotation.set(-Math.PI/2,0, Math.PI);
            mesh.scale.set(6,6,6);
            scene.add( gltf.scene );
            objects.push(gltf.scene);

        }
    );

    // Left Plants
    for (let i = -105; i <= -85; i+=20)
    gltfLoader.load(
        './resources/3Dmodels/reception/plant/plant/BROARD_LEAF_SUCCULENT_5K.gltf',
        function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.position.set(i, 0, -27);
            mesh.scale.set(10,10,10);
            scene.add( gltf.scene );
            objects.push(gltf.scene);
        }
    );

    // Right Plants
    for (let i = -105; i <= -85; i+=20)
    gltfLoader.load(
        './resources/3Dmodels/reception/plant/plant/BROARD_LEAF_SUCCULENT_5K.gltf',
        function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.position.set(i, 0, 29);
            mesh.scale.set(10,10,10);
            scene.add( gltf.scene );
            objects.push(gltf.scene);
        }
    );

    //Signs
    gltfLoader.load(
        './resources/3Dmodels/signs/ExitSign/scene.gltf',
        function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.position.set(-80, 5, 21);
            mesh.rotation.set(Math.PI/2, Math.PI, Math.PI/2);
            mesh.scale.set(1,1,1);
            scene.add( gltf.scene );
            objects.push(gltf.scene);
        }
    );

    gltfLoader.load(
        './resources/3Dmodels/signs/arrow/scene.gltf',
        function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.position.set(-80, 6.5, -20.5);
            mesh.rotation.set(0, 0, -Math.PI/2);
            mesh.scale.set(10,10,10);
            scene.add(gltf.scene);
            objects.push(gltf.scene);
        }
    );

    //left vending Machine
    gltfLoader.load(
        './resources/3Dmodels/reception/vending_machine/scene.gltf',
        function ( gltf ) {
            mesh = gltf.scene;
            mesh.position.set(-110, 0, -29);
            mesh.rotation.set(0,0, 0);
            mesh.scale.set(0.07,0.07,0.07);
            scene.add( gltf.scene );
            objects.push(gltf.scene);
        }
    );

    //right vending Machine
    gltfLoader.load(
        './resources/3Dmodels/reception/vending_machine/scene.gltf',
        function ( gltf ) {
            mesh = gltf.scene;
            mesh.position.set(-110, 0, 29);
            mesh.rotation.set(0,Math.PI, 0);
            mesh.scale.set(0.07,0.07,0.07);
            scene.add( gltf.scene );                
            objects.push(gltf.scene);
        }
    );
 
    //---------------------- EGYPT ROOM ------------------------//
    // Coffin
    gltfLoader.load(
        './resources/3Dmodels/egypt/coffin1/scene.gltf',
        function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.position.set(35, -6, 3);
            mesh.rotation.set(-Math.PI/2, 0, -Math.PI/2);
            scene.add(gltf.scene);
            objects.push(gltf.scene);
        }
    );
    
    // Wall 
    gltfLoader.load(
        './resources/3Dmodels/egypt/wall/scene.gltf',
        function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.position.set(27.5, 12, 30);
            mesh.scale.set(2.3,2.2,2.2);
            scene.add(gltf.scene);
            objects.push(gltf.scene);
        }
    );

    // Boat
    gltfLoader.load(
        './resources/3Dmodels/egypt/boat/scene.gltf',
        function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.position.set(23, 0.2, 5);
            mesh.scale.set(0.3,0.3,0.3);
            mesh.rotation.set(-Math.PI/2, Math.PI/4, -Math.PI/2);
            scene.add(gltf.scene);
            objects.push(gltf.scene);
        }
    );
    
    // Writing man
    gltfLoader.load(
        './resources/3Dmodels/egypt/writing/scene.gltf',
        function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.position.set(20, 2.8, -5);
            mesh.scale.set(0.1,0.1,0.1);
            mesh.rotation.set(-Math.PI/2, 0,  Math.PI/2);
            scene.add(gltf.scene);
            objects.push(gltf.scene);
        }
    );

/*
    gltfLoader.load(
        './resources/3Dmodels/egypt//Ankhu/scene.gltf',
        function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.position.set(15, 2, 0);
            mesh.rotation.set(-Math.PI/2, 0, Math.PI/2);
            mesh.scale.set(8,10,10);
            scene.add(gltf.scene);
            interactive.push(gltf.scene);
            viewPosition[mesh.id] = new THREE.Vector3(-46,2,-20.5);
            console.log(mesh.id);
        }
    );
*/
     //---------------------- ROOM D ------------------------//
/*      
        gltfLoader.load(
        './resources/3Dmodels/RoomD/Piano/scene.gltf',
        function ( gltf ) {
            mesh = gltf.scene.children[0];
            mesh.position.set(-26.5, 1.2, 6);
            mesh.rotation.set(-Math.PI/2, 0, Math.PI/2);
            mesh.scale.set(0.005,0.005,0.0038);
            scene.add(gltf.scene);
            objects.push(gltf.scene);
        });

        gltfLoader.load(
            './resources/3Dmodels/RoomD/Violin/scene.gltf',
            function ( gltf ) {
                mesh = gltf.scene.children[0];
                mesh.position.set(-28.5, 3, -2);
                mesh.rotation.set(-Math.PI/2, Math.PI/2, Math.PI);
                mesh.scale.set(8,8,8);
                scene.add(gltf.scene);
                objects.push(gltf.scene);
            });
*/

        for(let i=3; i<=7;i+=4){
            gltfLoader.load('./resources/3Dmodels/RoomD/AcousticFoam/scene.gltf',
                    function ( gltf ) {
                        mesh = gltf.scene.children[0];
                        mesh.position.set(-4, i, -14.2);
                        mesh.rotation.set(-Math.PI/2, Math.PI/2, Math.PI);
                        mesh.scale.set(10,10,10);
                        scene.add(gltf.scene);
                        objects.push(gltf.scene);
                    });
            }
             
        for(let i=3; i<=7;i+=4){
            gltfLoader.load('./resources/3Dmodels/RoomD/AcousticFoam/scene.gltf',
                    function ( gltf ) {
                        mesh = gltf.scene.children[0];
                        mesh.position.set(-16, i, -14.2);
                        mesh.rotation.set(-Math.PI/2, Math.PI/2, Math.PI);
                        mesh.scale.set(10,10,10);
                        scene.add(gltf.scene);
                        objects.push(gltf.scene);
                    });
            }  

            gltfLoader.load('./resources/3Dmodels/RoomD/Ceiling/scene.gltf',
            function ( gltf ) {
                mesh = gltf.scene.children[0];
                mesh.position.set(-26.5, 3.2, 11);
                mesh.rotation.set(-Math.PI/2, 0, 0);
                mesh.scale.set(1.5,1.5,1.5);
                scene.add(gltf.scene);
                objects.push(gltf.scene);
            });

            gltfLoader.load('./resources/3Dmodels/RoomD/Ceiling/scene.gltf',
            function ( gltf ) {
                mesh = gltf.scene.children[0];
                mesh.position.set(-26.5, 3.2, -5);
                mesh.rotation.set(-Math.PI/2, 0, 0);
                mesh.scale.set(1.5,1.5,1.5);
                scene.add(gltf.scene);
                objects.push(gltf.scene);
            });


            gltfLoader.load('./resources/3Dmodels/RoomD/Ceiling/scene.gltf',
            function ( gltf ) {
                mesh = gltf.scene.children[0];
                mesh.position.set(6, 3.2, 11);
                mesh.rotation.set(-Math.PI/2, 0, 0);
                mesh.scale.set(1.5,1.5,1.5);
                scene.add(gltf.scene);
                objects.push(gltf.scene);
            });

            gltfLoader.load('./resources/3Dmodels/RoomD/Ceiling/scene.gltf',
            function ( gltf ) {
                mesh = gltf.scene.children[0];
                mesh.position.set(6, 3.2, -5);
                mesh.rotation.set(-Math.PI/2, 0, 0);
                mesh.scale.set(1.5,1.5,1.5);
                scene.add(gltf.scene);
                objects.push(gltf.scene);
            });

            gltfLoader.load('./resources/3Dmodels/RoomD/Speaker/scene.glb',
            function ( gltf ) {
                mesh = gltf.scene.children[0];
                mesh.position.set(-10, -1.5, 0);
                mesh.rotation.set(Math.PI, 0, Math.PI);
                mesh.scale.set(2.7,2,2.7);
                scene.add(gltf.scene);
            });

    //-------------------- ROOM D CANVASES-------------------------//
    var track1Geo = new THREE.BoxBufferGeometry(3, 4, 0.2 );
    var track1Mat = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load("./resources/images/mozart.jpg") });
    var track1 = new THREE.Mesh(track1Geo, track1Mat);
    track1.position.set(-22, 7, -14.5);
    track1.name="Audio1";
    scene.add(track1);
    interactive.push(track1);

    var track2Geo = new THREE.BoxBufferGeometry(4, 5.5, 0.2 );
    var track2Mat = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load("./resources/images/8bit.jpg") });
    var track2 = new THREE.Mesh(track2Geo, track2Mat);
    track2.position.set(-10, 6, -14.5);
    track2.name="Audio2";
    scene.add(track2);
    interactive.push(track2);

    var track3Geo = new THREE.BoxBufferGeometry(3, 4, 0.2 );
    var track3Mat = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load("./resources/images/bella.jpg") });
    var track3 = new THREE.Mesh(track3Geo, track3Mat);
    track3.position.set(2, 7, -14.5);
    track3.name="Audio3";
    scene.add(track3);
    interactive.push(track3);


    //-----------------------------------------------------------------------------------------------
    //projector
    gltfLoader.load(
        './resources/3Dmodels/projector/scene.gltf',
        function ( gltf ) {
            var model = gltf.scene;
            model.position.set(80, 7, 10);
            model.rotation.set(-Math.PI/10,Math.PI/2, 0);
            model.scale.set(3,3,3);
            scene.add( model ); 
        }
    );
}

export{addModels};
