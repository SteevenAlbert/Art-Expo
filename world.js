import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports/optimized/three.js';
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { PointerLockControls } from "https://threejs.org/examples/jsm/controls/PointerLockControls.js"
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';

var keyboard = [];
var objects = [];
const player = { height: 1.7, speed: 0.2, turnSpeed: Math.PI * 0.003 };
var scene, camera, renderer;
let raycaster, controls, collided, collisionDirection, Dlight;
let groundMat, wallMat, boxMat; //Textures

LoadTextures();
init();
addLight();


//scene.add(new THREE.GridHelper(250,50));
/*creating walls*/
//W, H, X, Y, Z , -rot-, -thickness-, -material- 
/*Outer Walls*/
createObject(250, 10, 0, 5, 30);
createObject(250, 10, 0, 5, -30);
createObject(60, 10, 125, 5, 0, 1);
createObject(60, 10, -80, 5, 0, 1);
createObject(60, 10, -125, 5, 0, 1);

//wall1
createObject(40, 10, -50, 5, 17, 0, 1);
//wall2
createObject(34, 10, -30, 5, 0.5, 1, 1);
//wall3
createObject(40, 10, -9.5, 5, -16, 0, 1);
//wall4
createObject(34, 10, 10, 5, 0.5, 1, 1, wallMat);
//wall5
createObject(40, 10, 30, 5, 17, 0, 1, wallMat);
//wall6
createObject(34, 10, 50, 5, 0.5, 1, 1, wallMat);
//wall7
createObject(60, 10, 80, 5, -16, 0, 1, wallMat);

createObject(5, 5, -50, 2, 0, 0, 5, groundMat);


/*
const loader = new GLTFLoader();
loader.load( './resources/DamagedHelmet.gltf', function ( gltf ) {

  scene.add( gltf.scene );
  console.log(gltf);
}, undefined, function ( error ) {
  console.log(gltf);
  console.error( error );

} );
*/

onWindowResize();
animate();







/*---------------------------------FUNCTIONS----------------------------------*/
/*Initalize Scene*/
function init() {
  //Standard Initalization
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
  camera.position.set(-70, player.height, 0);
  //camera.lookAt(new THREE.Vector3(0,player.height,0));
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  //Set Controls
  let controls2 = new OrbitControls(camera, renderer.domElement);
  controls = new PointerLockControls(camera, renderer.domElement);
  let btn1 = document.querySelector('#button1');
  btn1.addEventListener('click', () => {
    controls.lock();
  });

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
  let plane2 = new THREE.Mesh(planeGeom, boxMat);
  plane2.position.copy(center2);
  plane2.rotation.x = Math.PI / 2;

  scene.add(plane2);
  raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);
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
    color: "white",
    wireframe: false,
    shininess: 30,
  });
}

/*Adds Different Types of Light*/
function addLight() {
  Dlight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
  Dlight.position.set(-70, 5, 0);
  Dlight.target.position.set(0, 0, 0);
  Dlight.castShadow = true;
  scene.add(Dlight);

  let Dlight2 = new THREE.DirectionalLight(0xFFFFFF, 0.5);
  Dlight2.position.set(70, 5, 0);
  Dlight2.target.position.set(0, 0, 0);
  Dlight2.castShadow = true;
  scene.add(Dlight2);

  let Dlight3 = new THREE.DirectionalLight(0xFFFFFF, 0.3);
  Dlight3.position.set(0, 3, 0);
  Dlight3.target.position.set(0, 0, 0);
  Dlight3.castShadow = true;
  scene.add(Dlight3);


  let light2 = new THREE.AmbientLight(0xFFFFFF, 0.4);
  scene.add(light2);
}


/*Create a wall/box object
//Takes Width, Height, Cartesian Coordinates and rotated bool and depth (optional)*/
function createObject(w, h, x, y, z, rot, d, Material) {
  d = d || 0.75;
  Material = Material || wallMat;
  rot = rot || 0;

  var wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), Material);
  if (rot > 0) {
    wall.rotation.y = -Math.PI / 2;
  }
  wall.position.copy(new THREE.Vector3(x, y, z));
  scene.add(wall);
  objects.push(wall);
}

//Updates the scene
function animate() {
  requestAnimationFrame(animate);

  let vec = new THREE.Vector3();

  camera.getWorldDirection(vec);
  let angle = Math.atan2(vec.x, vec.z);
//  Dlight.position.set(angle, 8, angle);
//  Dlight.target.position.set(angle, 8, angle);
  console.log(angle);
  if (controls.isLocked === true) {
    checkCollision();
  }
  processKeyboard(angle);
  renderer.render(scene, camera);
}


function checkCollision() {
  raycaster.ray.origin.copy(controls.getObject().position);

  let collisionRange = 4; //if the mesh gets too close, the camera clips though the object
  let nextPosition = controls.getObject().position.clone()
  if (collided == false) {
    collisionDirection = controls.getObject().rotation.x;
  }
  collided = false;
  let playerPosition = controls.getObject().position;
  let playerPOV = controls.getObject().rotation.x;

  for (let i = 0; i < objects.length; i++) {
    let object = objects[i];
    let objectDirection = object.position.clone().sub(playerPosition).normalize();
    
    raycaster.set(nextPosition, objectDirection) //set the position and direction
    let directionIntersects = raycaster.intersectObject(object);

    if (directionIntersects.length > 0 && directionIntersects[0].distance < collisionRange) {
      collided = true;
      console.log(directionIntersects[0]);
      break;
    }
  }
}


/*Process Keyboard Input and apply changes accordingly*/
function processKeyboard(angle) {
  if (keyboard[87] && collided == false) { // W key
    camera.position.x += Math.sin(angle) * player.speed;
    camera.position.z += Math.cos(angle) * player.speed;
    //camera.position.z -= Math.cos(camera.rotation.y) * player.speed;
   // console.log(controls.position.z);
  }
  if (keyboard[83] && collided == false) { // S key
    camera.position.x -= Math.sin(angle) * player.speed;
    camera.position.z -= Math.cos(angle) * player.speed;
    //console.log(camera.rotation.y);
  }
  if (keyboard[65]) { // A key
    camera.position.x += Math.cos(angle) * player.speed;
    camera.position.z += -Math.sin(angle) * player.speed;
  }
  if (keyboard[68]) { // D key
    camera.position.x -= Math.sin(angle + Math.PI / 2) * player.speed;
    camera.position.z += -Math.cos(angle + Math.PI / 2) * player.speed;
  }


  function keyDown(event) {
    keyboard[event.keyCode] = true;
  }
  function keyUp(event) {
    keyboard[event.keyCode] = false;
  }
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);

  /*if(keyboard[37]){ // left arrow key
    camera.rotation.y += player.turnSpeed;
  }
  if(keyboard[39]){ // right arrow key
    camera.rotation.y -= player.turnSpeed;
  }*/
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);