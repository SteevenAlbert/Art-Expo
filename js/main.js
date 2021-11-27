import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from "https://threejs.org/examples/jsm/controls/PointerLockControls.js";
//import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';

import { addModels } from './models.js';
import { addLights } from './lights.js';
import { checkCollision, processKeyboard } from './movement.js';
import {createWorld, LoadTextures} from './world.js';


var controls, raycaster;
var objects = [];
const player = { height: 1.7, speed: 0.2, turnSpeed: Math.PI * 0.009 };
var scene, camera, renderer;



LoadTextures();
init();
addLights(scene);
addModels(scene);
createWorld(scene, objects);
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

  
  raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);
}




//Updates the scene
function animate() {
  requestAnimationFrame(animate);

  let vec = new THREE.Vector3();

  camera.getWorldDirection(vec);
  let angle = Math.atan2(vec.x, vec.z);
 
  if (controls.isLocked === true) {
    checkCollision(angle, raycaster, objects, controls);
  }
  processKeyboard(angle, camera, player);

  //spotLightHelper.update();
  renderer.render(scene, camera);
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);