import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { PointerLockControls } from "https://threejs.org/examples/jsm/controls/PointerLockControls.js"

var keyboard = [];
var objects = [];
var player = { height:1.7, speed:0.2, turnSpeed:Math.PI*0.003 };
var scene, camera, renderer;
let raycaster, controls, collided, collisionDirection;


init();
addLight();
//scene.add(new THREE.GridHelper(250,50));

var wallMat = new THREE.MeshLambertMaterial({
  color: "white",
  wireframe: false
});

var boxMat = new THREE.MeshLambertMaterial({
  color: "blue",
  wireframe: false
});

/*creating walls*/
//W, H, X, Y, Z , -rot-, -thickness-, -material- 
createObject(250,10,0,5,30);
createObject(250,10,0,5,-30);
createObject(60,10,125,5,0,1);
createObject(60,10,-80,5,0,1);
createObject(60,10,-125,5,0,1);

//wall1
createObject(40,10, -50,5,17,  0,1, boxMat);
//wall2
createObject(34,10,  -30,5,0.5,  1,1, boxMat);
//wall3
createObject(40,10, -9.5,5,-16,  0,1, boxMat);
//wall4
createObject(34,10,  10,5,0.5,  1,1, boxMat);
//wall5
createObject(40,10, 30,5,17,  0,1, boxMat);
//wall6
createObject(34,10,  50,5,0.5,  1,1, boxMat);
//wall7
createObject(60,10, 80,5,-16,  0,1, boxMat);

const textureLoader = new THREE.TextureLoader();
const marbleBaseColor = textureLoader.load("./resources/Textures/marble_0012_base_color_8k.jpg");
const marbleNormalMap = textureLoader.load("./resources/Textures/marble_0012_normal_8k.jpg");
const marbleRoughnessMap = textureLoader.load("./resources/Textures/marble_0012_roughness_8k.jpg");
const marbleAmbientOcculsionMap = textureLoader.load("./resources/Textures/marble_0012_ao_8k.jpg");
const marbleMetallicMap = textureLoader.load("./resources/Textures/gray-granite-flecks-Metallic.png");

let groundMat = new THREE.MeshStandardMaterial(
  {
    map: marbleBaseColor,
    normalMap: marbleNormalMap,
   // displacementMap: disMap,
   // displacementScale: 0.1,
    roughnessMap: marbleRoughnessMap,
    roughness: 0.5,
    aoMap: marbleAmbientOcculsionMap,
    metalnessMap: marbleMetallicMap,
    metalness: 0.5
});

createObject(5,5, -50,2,0,  0,5, groundMat);


onWindowResize();
animate();

/*--------------FUNCTIONS---------------*/
/*Initalize Scene*/
function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
  camera.position.set(-70, player.height, 0);
  //camera.lookAt(new THREE.Vector3(0,player.height,0));
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);
  
  let controls2 = new OrbitControls(camera, renderer.domElement);
  controls = new PointerLockControls(camera, renderer.domElement);
  let btn1 = document.querySelector('#button1');
  btn1.addEventListener('click',()=>{
    controls.lock();
  });



  
  //Create Plane
  let position = new THREE.Vector3(0,0.0,0);
  let planeGeom = new THREE.PlaneBufferGeometry(250, 60);


  let rawMat = new THREE.MeshBasicMaterial({color: "white", wireframe: false});

  let groundMesh = new THREE.Mesh(planeGeom, rawMat);
  groundMesh.geometry.attributes.uv2 = groundMesh.geometry.attributes.uv;
  groundMesh.position.copy(position);
  groundMesh.rotation.x=-Math.PI/2;
  scene.add(groundMesh);
/*
  let center2 = new THREE.Vector3(0,10,0);
  let plane2 = new THREE.Mesh(planeGeom, planeMat);
  plane2.position.copy(center2);
  plane2.rotation.x=-Math.PI/2;
  scene.add(plane2);
*/
  raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
  }


  /*Adds Different Types of Light*/
  function addLight(){
    let light = new THREE.DirectionalLight(0xFFFFFF, 0.5);
      light.position.set(-70, 5, 0);
      light.target.position.set(0, 0, 0);
      light.castShadow = true;
      scene.add(light);
    
      light = new THREE.AmbientLight(0xFFFFFF, 0.5);
      scene.add(light);
    }



/*Create a wall/box object
//Takes Width, Height, Cartesian Coordinates and rotated bool and depth (optional)*/
function createObject(w,h,x,y,z, rot, d, Material){
  d = d ||0.75;
  Material = Material || wallMat;
  rot = rot || 0;
  var wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), Material);
  wall.userData.size = {
    width: wall.geometry.parameters.width,
    height: wall.geometry.parameters.height,
    depth: wall.geometry.parameters.depth
  };
  if(rot>0){
    wall.rotation.y=-Math.PI/2;
  }
  wall.position.copy(new THREE.Vector3(x,y,z));
  scene.add(wall);
  objects.push(wall);
}


function animate(){
	requestAnimationFrame(animate);

  let vec = new THREE.Vector3();
  camera.getWorldDirection(vec);
  let angle = Math.atan2(vec.x, vec.z);

  if(controls.isLocked === true){
  checkCollision();
  }
  processKeyboard(angle);

	renderer.render(scene, camera);
}



function checkCollision(){
    raycaster.ray.origin.copy( controls.getObject().position );
 
    let collisionRange = 4; //if the mesh gets too close, the camera clips though the object
    let nextPosition = controls.getObject().position.clone()
    if(collided==false){
    collisionDirection= controls.getObject().rotation.x;
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
  
        break;
      }
    }
  }



/*Process Keyboard Input and apply changes accordingly*/
function processKeyboard(angle){
  if(keyboard[87] && collided==false){ // W key
    camera.position.x += Math.sin(angle) * player.speed;
    camera.position.z += Math.cos(angle) * player.speed;
    //camera.position.z -= Math.cos(camera.rotation.y) * player.speed;
   // console.log(camera.rotation.y);
  }
  if(keyboard[83]){ // S key
    camera.position.x -= Math.sin(angle) * player.speed;
    camera.position.z -= Math.cos(angle) * player.speed;
    //console.log(camera.rotation.y);
  }
  if(keyboard[65]){ // A key
    camera.position.x += Math.cos(angle) * player.speed;
    camera.position.z += -Math.sin(angle) * player.speed;
  }
  if(keyboard[68]){ // D key
    camera.position.x -= Math.sin(angle + Math.PI/2) * player.speed;
    camera.position.z += -Math.cos(angle + Math.PI/2) * player.speed;
  }
  

  function keyDown(event){
    keyboard[event.keyCode] = true;
  }
  function keyUp(event){
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