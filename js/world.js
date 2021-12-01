import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

var worldScene, worldObjects;
let groundMat, wallMat, boxMat; //Textures

function createWorld(scene, objects){
    worldScene = scene;
    worldObjects = objects;
    //scene.add(new THREE.GridHelper(250,50));
    /*creating walls*/
    //W, H, D,    X, Y, Z ,    -rot-, -material- 
    /*Outer Walls*/
    createObject(250, 10, 10,   0, 5, 30);
    createObject(250, 10, 10,  0, 5, -30);
    createObject(60, 10, 6,   125, 5, 0,-Math.PI / 2 );
    createObject(60, 10, 6,  -80, 5, 0, -Math.PI / 2);
    createObject(60, 10, 6,  -125, 5, 0,  -Math.PI / 2);

    //wall1
    createObject(40, 10,3, -50, 5, 16, 0);
  //  createObject(3, 10,3, -33, 5, 15, 0, -Math.PI / 2);
    //wall2
    createObject(34, 10,3,  -30, 5, 0.5, -Math.PI / 2);
    //wall3
    createObject(40, 10, 3,  -9.5, 5, -15, 0);
    //wall4
    createObject(34, 10,3,  10, 5, 0.5, -Math.PI / 2, wallMat);
    //wall5
    createObject(40, 10,3,  30, 5, 16, 0, wallMat);
    //wall6
    createObject(34, 10,3,  50, 5, 0.5, -Math.PI / 2, wallMat);
    //wall7
    createObject(60, 10,3,  80, 5, -15, 0, wallMat);

    createObject(5, 5,3,    -50, 2, 0, 0, groundMat);


    //Create Ground
    let position = new THREE.Vector3(0, 0.0, 0);
    let planeGeom = new THREE.PlaneBufferGeometry(250, 60);
    let groundMesh = new THREE.Mesh(planeGeom, groundMat);
    groundMesh.geometry.attributes.uv2 = groundMesh.geometry.attributes.uv;
    groundMesh.position.copy(position);
    groundMesh.rotation.x = -Math.PI / 2;
    scene.add(groundMesh);
    //Create Ceiling
    let center2 = new THREE.Vector3(0, 10, 0);
    let plane2 = new THREE.Mesh(planeGeom, wallMat);
    plane2.position.copy(center2);
    plane2.rotation.x = Math.PI / 2;
  

  scene.add(plane2);
}



function LoadTextures() {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.wrapS = textureLoader.wrapT = THREE.RepeatWrapping;
    //textureLoader.repeat.set( 10, 10 );
 
    const marbleBaseColor = textureLoader.load("./resources/Textures/marble_0012_base_color_8k.jpg", function(marbleBaseColor){
      marbleBaseColor.wrapS = marbleBaseColor.wrapT = THREE.RepeatWrapping;
      marbleBaseColor.offset.set( 0, 0 );
      marbleBaseColor.repeat.set( 20, 5 );
    });
    const marbleNormalMap = textureLoader.load("./resources/Textures/marble_0012_normal_8k.jpg", function(marbleBaseColor){
      marbleNormalMap.wrapS = marbleBaseColor.wrapT = THREE.RepeatWrapping;
      marbleNormalMap.offset.set( 0, 0 );
      marbleNormalMap.repeat.set( 20, 5 );
    });
    const marbleRoughnessMap = textureLoader.load("./resources/Textures/marble_0012_roughness_8k.jpg", function(marbleBaseColor){
      marbleRoughnessMap.wrapS = marbleRoughnessMap.wrapT = THREE.RepeatWrapping;
      marbleRoughnessMap.offset.set( 0, 0 );
      marbleRoughnessMap.repeat.set( 20, 5 );
    });
    const marbleAmbientOcculsionMap = textureLoader.load("./resources/Textures/marble_0012_ao_8k.jpg", function(marbleBaseColor){
      marbleAmbientOcculsionMap.wrapS = marbleAmbientOcculsionMap.wrapT = THREE.RepeatWrapping;
      marbleAmbientOcculsionMap.offset.set( 0, 0 );
      marbleAmbientOcculsionMap.repeat.set( 20, 5 );
    });
    const marbleMetallicMap = textureLoader.load("./resources/Textures/gray-granite-flecks-Metallic.png", function(marbleBaseColor){
      marbleMetallicMap.wrapS = marbleMetallicMap.wrapT = THREE.RepeatWrapping;
      marbleMetallicMap.offset.set( 0, 0 );
      marbleMetallicMap.repeat.set( 20, 5 );
    });
  
    groundMat = new THREE.MeshStandardMaterial(
      {
        map: marbleBaseColor,
        normalMap: marbleNormalMap,
        // displacementMap: disMap,
        // displacementScale: 0.1,
        roughnessMap: marbleRoughnessMap,
        roughness: 0.5,
        aoMap: marbleAmbientOcculsionMap,
        metalnessMap: marbleMetallicMap,
        metalness: 0.5,
      });
  
    const wallBaseColor = textureLoader.load("./resources/Textures/PaintedPlaster017_4K_Color.jpg", function(wallBaseColor){
      wallBaseColor.wrapS = wallBaseColor.wrapT = THREE.RepeatWrapping;
      wallBaseColor.offset.set( 0, 0 );
      wallBaseColor.repeat.set( 20, 10 );
    });
    const wallRoughness = textureLoader.load("./resources/Textures/PaintedPlaster017_4K_Roughness.jpg", function(wallRoughness){
      wallRoughness.wrapS = wallRoughness.wrapT = THREE.RepeatWrapping;
      wallRoughness.offset.set( 0, 0 );
      wallRoughness.repeat.set( 20, 10 );
    });
    const wallNormal = textureLoader.load("./resources/Textures/PaintedPlaster017_4K_NormalGL.jpg", function(wallNormal){
      wallNormal.wrapS = wallNormal.wrapT = THREE.RepeatWrapping;
      wallNormal.offset.set( 0, 0 );
      wallNormal.repeat.set( 20, 10 );
    });
    const wallDisplacement = textureLoader.load("./resources/Textures/PaintedPlaster017_4K_Displacement.jpg", function(wallDisplacement){
      wallDisplacement.wrapS = wallDisplacement.wrapT = THREE.RepeatWrapping;
      wallDisplacement.offset.set( 0, 0 );
      wallDisplacement.repeat.set( 20, 10 );
    });
     wallMat = new THREE.MeshStandardMaterial({
       map: wallBaseColor,
       normalMap: wallNormal,
       displacementMap: wallDisplacement,
       displacementScale: 0,
       roughnessMap: wallRoughness,
       roughness: 0.1,
    });
  
    let boxMat = new THREE.MeshPhongMaterial({
      color: "black",
      wireframe: false,
      shininess: 30,
    });
  
  }

  
  /*Create a wall/box object
//Takes Width, Height, depth and Cartesian Coordinates (rotated bool and material optional)*/
function createObject(w, h, d, x, y, z, rot, Material) {
    d = d || 0.75;
    Material = Material || wallMat;
    rot = rot || 0;
  
    var wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), Material);
    
      wall.rotation.y =rot;
    
    wall.position.copy(new THREE.Vector3(x, y, z));
    worldScene.add(wall);
    worldObjects.push(wall);
  }

  export {createWorld, LoadTextures};