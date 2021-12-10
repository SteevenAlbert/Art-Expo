import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from "https://threejs.org/examples/jsm/controls/PointerLockControls.js";
import { addModels } from './models.js';
import { addLights } from './lights.js';
import { loadMainTheme } from './audio.js';
import { checkCollision, processKeyboard } from './movement.js';
import {createWorld, LoadTextures, drawCrosshair} from './world.js';
import { addText } from './text.js';
import {interact} from './interaction.js';


var controls, raycaster, raycaster2;
var objects = [];
var interactables = [];
const player = { height: 1.7, speed: 0.2, turnSpeed: Math.PI * 0.009 };
var scene, camera, renderer;
var color= "0xff0000";
var moveToObject=false;
var intersectedPoint;

var loadingManager;


init();
LoadTextures(loadingManager);
addLights(scene);
addModels(scene, interactables, objects, loadingManager);
addText(scene);
createWorld(scene, objects, loadingManager);

onWindowResize();
animate();




/*---------------------------------FUNCTIONS----------------------------------*/
/*Initalize Scene*/
function init() {
  
  //Standard Initalization
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x11111f, 0.013);
  camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
  camera.position.set(-70, player.height, 0);
  //camera.lookAt(new THREE.Vector3(0,player.height,0));
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  camera.lookAt(new THREE.Vector3(0,player.height,0));
  scene.add(camera);
  drawCrosshair(camera);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  //renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  //Set Controls
  //let controls2 = new OrbitControls(camera, renderer.domElement);
  controls = new PointerLockControls(camera, renderer.domElement);
  

  //menu
  var menu = document.getElementById("menu");
  document.getElementById("menu").addEventListener("click",function(e) {
    if(e.target && e.target.nodeName == "LI") {
      if(e.target.id=="1"){
          menu.style.visibility  = "hidden";
          controls.lock();
          
        //loadMainTheme();
      }else
        alert(e.target.id + " was clicked");
    }
});

  raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);
  raycaster2 = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 40);

  loadingManager = new THREE.LoadingManager( () => {
	
		const loadingScreen = document.getElementById( 'loading-screen' );
		loadingScreen.classList.add( 'fade-out' );
		
		// optional: remove loader from DOM via event listener
		loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
		
	} );
  
}

//Updates the scene
function animate() {
  requestAnimationFrame(animate);

  if (controls.isLocked === false) {
    menu.style.visibility = "visible";
   }

  let vec = new THREE.Vector3();
  camera.getWorldDirection(vec);
  
  let angle = Math.atan2(vec.x, vec.z);
 
  // if (controls.isLocked === true) {
  //   checkCollision(objects, camera);
   
  // }
  processKeyboard(angle, camera, player, objects);
  if (controls.isLocked === true){
  if(moveToObject){
  let newVec= intersectedPoint;
  camera.position.lerp(newVec,0.1);
  camera.position.y= player.height;
 
   if(Math.ceil(newVec.x) == Math.ceil(camera.position.x)){
     moveToObject=false;
   }
 }
}
  //spotLightHelper.update();
  renderer.render(scene, camera);
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.setPixelRatio(window.devicePixelRatio);
}


function onMouseDown(e){
  intersectedPoint = interact(e, raycaster2, interactables, camera);
  intersectedPoint.x-=5;
  intersectedPoint.z-=5;
  moveToObject=true;
}


function onTransitionEnd( event ) {

	event.target.remove();
	
}

window.addEventListener('resize', onWindowResize);
document.addEventListener('mousedown', onMouseDown, false);