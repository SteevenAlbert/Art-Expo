import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import CSG from './THREE-CSGMesh-master/three-csg.js';

var worldScene, worldObjects;
let groundMat, wallMat, ceilingMat1, ceilingMat2, boxMat; //Textures


function createWorld(scene, objects, loadingManager){
  worldScene = scene;
  worldObjects = objects;

  // Skybox
  createEnvironment(loadingManager);
  
  //scene.add(new THREE.GridHelper(250,50));

//Create Walls
  /*Outer Walls*/
  //wall 0
  createBox(250, 10, 1,      0 , 5, 30 );
  //wall 1
  createBox(250, 10, 1,      0 , 5,-30 );
  //wall 2
  createBox( 60, 10, 1 ,     124, 5, 0 ,      0, -Math.PI / 2);
  //wall 3
  createBox( 60, 2 , 1 ,    -124, 1, 0 ,      0, -Math.PI / 2);


  /*Inner Walls*/
  //wall 4
  createBox( 60, 10, 1 ,     -80, 5, 0,      0, -Math.PI/2);
      //Creating door in wall 4
      makeAHole(4,    5, 8, 1,    0,-2, -15);
  //wall 5
  createBox(41, 10, 1,   -50, 5, 16);
  //wall 6
  createBox(32, 10, 1,   -30, 5, 0.5,   0, -Math.PI/2);
  //wall 7
  createBox(41, 10, 1,   -9.5, 5, -15);
  //wall 8
  createBox(32, 10, 1,    10, 5, 0.5,     0, -Math.PI/2,      wallMat);
  //wall 9
  createBox(41, 10, 1,   30, 5, 16,         0, 0,            wallMat);
  //wall 10
  createBox(32, 10, 1,   50, 5, 0.5,     0, -Math.PI/2,      wallMat);
  //wall 11
  createBox(61, 10, 1,   80, 5, -15,         0, 0,            wallMat);



//Create Ground
  let center1 = new THREE.Vector3(0, 0, 0);
  createPlane(250, 60, 1, 1, center1.x, center1.y, center1.z, -Math.PI / 2, 0, groundMat);
  //groundMesh.geometry.attributes.uv2 = groundMesh.geometry.attributes.uv;



//Create Ceiling
  let center2 = new THREE.Vector3(0, 10, 0);
  createBox(250, 60, 1, center2.x, center2.y, center2.z, Math.PI / 2, 0, wallMat);

  /*Glass Roof Parts*/ 
    //glass in Room A
    makeAHole(12,     28, 22, 1,     -51,0,0);
    createPlane(28, 22,     1, 1,     center2.x-51, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat1);
    createPlane(28, 22,     3, 3,    center2.x-51, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat2);

    //glass in Room B
    makeAHole(12,     28, 22, 1,     31,0,0);
    createPlane(28, 22,     1, 1,     center2.x+31, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat1);
    createPlane(28, 22,     3, 3,    center2.x+31, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat2);

    //glass in Room C
    makeAHole(12,     28, 22, 1,     -10,0,0);
    createPlane(28, 22,     1, 1,     center2.x-10, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat1);
    createPlane(28, 22,     3, 3,    center2.x-10, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat2);

    //glass in Room D
    makeAHole(12,     52, 22, 1,    80,0,0);
    createPlane(52, 22,    1, 1,     center2.x+80, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat1);
    createPlane(52, 22,     6, 3,    center2.x+80, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat2);

    //glass in Right Pathaways
    makeAHole(12,     172, 8, 1,     19,0,23);
    createPlane(172, 8,     1, 1,     center2.x+19, center2.y+0.5, center2.z+23,     Math.PI/2, 0,      ceilingMat1);
    createPlane(172, 8,     21, 1,    center2.x+19, center2.y+0.5, center2.z+23,     Math.PI/2, 0,      ceilingMat2);

    //glass in Left Pathaways
    makeAHole(12,     172, 8, 1,     19,0,-23);
    createPlane(172, 8,     1, 1,     center2.x+19, center2.y+0.5, center2.z-23,     Math.PI/2, 0,      ceilingMat1);
    createPlane(172, 8,     21, 1,    center2.x+19, center2.y+0.5, center2.z-23,     Math.PI/2, 0,      ceilingMat2);

    /*
    //glass on wall 3
    createPlane(60, 8,    1, 1,    -125, 5.5, 0,    0, -Math.PI / 2,    ceilingMat1);
    createPlane(60, 8,    7, 1,   -125, 5.5, 0,    0, -Math.PI / 2,     ceilingMat2);
    */

//Creating Windows 
    makeAHole(0,    7, 7, 1,    -70, 0, 0);
    makeAHole(0,    7, 7, 1,    -50, 0, 0);
    makeAHole(0,    7, 7, 1,    -30, 0, 0);
    makeAHole(0,    7, 7, 1,    -10, 0, 0);
    makeAHole(0,    7, 7, 1,    10, 0, 0);
    makeAHole(0,    7, 7, 1,    30, 0, 0);
    makeAHole(0,    7, 7, 1,    50, 0, 0);
    makeAHole(0,    7, 7, 1,    70, 0, 0);
    makeAHole(0,    7, 7, 1,    90, 0, 0);
    makeAHole(0,    7, 7, 1,    110, 0, 0);

    makeAHole(1,    7, 7, 1,    -70, 0, 0);
    makeAHole(1,    7, 7, 1,    -50, 0, 0);
    makeAHole(1,    7, 7, 1,    -30, 0, 0);
    makeAHole(1,    7, 7, 1,    -10, 0, 0);
    makeAHole(1,    7, 7, 1,    10, 0, 0);
    makeAHole(1,    7, 7, 1,    30, 0, 0);
    makeAHole(1,    7, 7, 1,    50, 0, 0);
    makeAHole(1,    7, 7, 1,    70, 0, 0);
    makeAHole(1,    7, 7, 1,    90, 0, 0);
    makeAHole(1,    7, 7, 1,    110, 0, 0);
}


function createEnvironment(loadingManager)
{
  // METHOD 1
  worldScene.background = new THREE.CubeTextureLoader(loadingManager)
  .setPath('./resources/Environment/')
  .load(
    ['px.png',
    'nx.png',
    'py.png',
    'ny.png',
    'pz.png',
    'nz.png',
  ]);

}


function LoadTextures(loadingManager) {
    const textureLoader = new THREE.TextureLoader(loadingManager);
    textureLoader.wrapS = textureLoader.wrapT = THREE.RepeatWrapping;
    //textureLoader.repeat.set( 10, 10 );
 
    //const floorBaseColor = textureLoader.load("./resources/Textures/marble_0012_base_color_8k.jpg", function(floorBaseColor){
    const floorBaseColor = textureLoader.load("./resources/Textures/wood_0018_8k_v2Pscx/wood_0018_base_color_8k.jpg", function(floorBaseColor){
      floorBaseColor.wrapS = floorBaseColor.wrapT = THREE.RepeatWrapping;
      floorBaseColor.offset.set( 0, 0 );
      floorBaseColor.repeat.set( 20, 5 );
    });
    //const floorNormalMap = textureLoader.load("./resources/Textures/marble_0012_normal_8k.jpg", function(floorBaseColor){
    const floorNormalMap = textureLoader.load("./resources/Textures/wood_0018_8k_v2Pscx/wood_0018_normal_8k.jpg", function(floorBaseColor){
      floorNormalMap.wrapS = floorBaseColor.wrapT = THREE.RepeatWrapping;
      floorNormalMap.offset.set( 0, 0 );
      floorNormalMap.repeat.set( 20, 5 );
    });
    //const floorRoughnessMap = textureLoader.load("./resources/Textures/marble_0012_roughness_8k.jpg", function(floorBaseColor){
    const floorRoughnessMap = textureLoader.load("./resources/Textures/wood_0018_8k_v2Pscx/wood_0018_roughness_8k.jpg", function(floorBaseColor){
      floorRoughnessMap.wrapS = floorRoughnessMap.wrapT = THREE.RepeatWrapping;
      floorRoughnessMap.offset.set( 0, 0 );
      floorRoughnessMap.repeat.set( 20, 5 );
    });
    //const floorAmbientOcculsionMap = textureLoader.load("./resources/Textures/marble_0012_ao_8k.jpg", function(floorBaseColor){
    const floorAmbientOcculsionMap = textureLoader.load("./resources/Textures/wood_0018_8k_v2Pscx/wood_0018_ao_8k.jpg", function(floorBaseColor){
      floorAmbientOcculsionMap.wrapS = floorAmbientOcculsionMap.wrapT = THREE.RepeatWrapping;
      floorAmbientOcculsionMap.offset.set( 0, 0 );
      floorAmbientOcculsionMap.repeat.set( 20, 5 );
    });
    //const floorMetallicMap = textureLoader.load("./resources/Textures/gray-granite-flecks-Metallic.png", function(floorBaseColor){
    const floorMetallicMap = textureLoader.load("./resources/Textures/gray-granite-flecks-Metallic.png", function(floorBaseColor){
      floorMetallicMap.wrapS = floorMetallicMap.wrapT = THREE.RepeatWrapping;
      floorMetallicMap.offset.set( 0, 0 );
      floorMetallicMap.repeat.set( 20, 5 );
    });
  
    groundMat = new THREE.MeshStandardMaterial(
      {
        map: floorBaseColor,
        normalMap: floorNormalMap,
        // displacementMap: disMap,
        // displacementScale: 0.1,
        roughnessMap: floorRoughnessMap,
        roughness: 0.5,
        aoMap: floorAmbientOcculsionMap,
        metalnessMap: floorMetallicMap,
        metalness: 0.5,
        emissive: 0xffffff,
        emissiveIntensity: 0.25,
        refractionRatio: 1,
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

    ceilingMat1 = new THREE.MeshPhysicalMaterial( {
      color: 0xffffff,
      transmission: 1,  
      roughness: 0.1,
      ior: 1.5,
      opacity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0,
      side: THREE.DoubleSide,
      transparent: true,
      reflectivity: 0.5,
    });
  
    ceilingMat2 = new THREE.MeshStandardMaterial({
      color: 'black',
      wireframe: true,
      wireframeLinewidth: 5,  //Any value beyond 1 is ignored by WebGL renderer
      wireframeLinejoin: 'round',
      wireframeLinecap: 'round',
    });

    let boxMat = new THREE.MeshPhongMaterial({
      color: "black",
      wireframe: false,
      shininess: 30,
    });

  }

// Takes: Width, Height, Depth, Cartesian-Coordinates(x,y,z), Rotation-Angle-Round-x-Axis, Rotation-Angle-Round-y-Axis, Material
  function createBox(w, h, d, x, y, z, xRot, yRot, Material) {
    d = d || 0.75;
    Material = Material || wallMat;
    xRot = xRot || 0;
    yRot = yRot || 0;
    
    var wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), Material);

    wall.rotation.y =yRot;
    wall.rotation.x =xRot;    
    wall.position.copy(new THREE.Vector3(x, y, z));
    worldScene.add(wall);
    worldObjects.push(wall);
  }

  function createPlane(w, h, xSeg, ySeg, x, y, z, xRot, yRot, Material) {
    Material = Material || wallMat;
    xRot = xRot || 0;
    yRot = yRot || 0;

    var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(w, h, xSeg, ySeg), Material);
    plane.rotation.x =xRot;
    plane.rotation.y = yRot;
    plane.position.copy(new THREE.Vector3(x, y, z));
    worldScene.add(plane);
  }

// Takes: Index of mesh in "worldObjects[]" Array, Width, Height, Depth, Cartesian-Coordinates(x,y,z) relative to the origin of geometry cut from
  function makeAHole(index, width, height, depth, x, y, z) {
      width = width || mesh.width/2;
      height = height || mesh.height/2;
      depth = depth || mesh.depth/2;
      x = x || 0;
      y = y || 0;
      z = z || 0;

      var oldMesh = worldObjects[index];
      oldMesh.updateMatrix();

      var hole = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), ceilingMat2);
      hole.position.copy(new THREE.Vector3(worldObjects[index].position.x + x, worldObjects[index].position.y + y, worldObjects[index].position.z + z));
      hole.rotation.copy(worldObjects[index].rotation);
      hole.updateMatrix();
      
      var csgMesh = CSG.fromMesh(oldMesh);
      var csgHole = CSG.fromMesh(hole);
      var csgKept = csgMesh.subtract(csgHole);
      
      var kept = CSG.toMesh(csgKept, worldObjects[index].matrix, worldObjects[index].material);
      kept.position.copy(new THREE.Vector3(worldObjects[index].position.x, worldObjects[index].position.y, worldObjects[index].position.z));
      kept.rotation.copy(worldObjects[index].rotation);
      kept.updateMatrix();

      worldScene.remove(worldObjects[index]);
      worldObjects[index] = kept;
      worldObjects[index].updateMatrix();
      worldScene.add(worldObjects[index]);
    }


  function drawCrosshair(camera){
    var x = 0.003, y = 0.003;
    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 100,
      linecap: 'round',
      linejoin:  'round'
    });
    
    const points=[];
    points.push(new THREE.Vector3(0, y, 0));
    points.push(new THREE.Vector3(0, -y, 0));
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(x, 0, 0));    
    points.push(new THREE.Vector3(-x, 0, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    
    const crosshair = new THREE.Line( geometry, material );
    var crosshairPercentX = 50;
    var crosshairPercentY = 50;
    var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
    var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;
    
    crosshair.position.x = crosshairPositionX * camera.aspect;
    crosshair.position.y = crosshairPositionY;
    crosshair.position.z = -0.3;
    camera.add( crosshair );
  }
  export {createWorld, LoadTextures, drawCrosshair};
