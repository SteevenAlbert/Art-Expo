import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/DRACOLoader';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FBXLoader.js';
import { PointerLockControls } from "https://threejs.org/examples/jsm/controls/PointerLockControls.js";
import { addModels} from './models.js';
import { addLights } from './lights.js';
import { loadMainTheme } from './audio.js';
import { checkCollision, processKeyboard } from './movement.js';
import {createWorld, LoadTextures, drawCrosshair} from './world.js';
import { addText } from './text.js';
import {interact} from './interaction.js';


var controls, raycaster, raycaster2;
var objects = [];
var interactables = [];
const player = { height: 2.7, speed: 0.2, turnSpeed: Math.PI * 0.009 };
var scene, camera, renderer,light, cameraAndLight;
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


/*--------------------------------- INITILIZATION ----------------------------------*/
/*Initalize Scene*/
function init() {
  
  //*****CAMERA*****/
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x11111f, 0.013);
  camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
  scene.add(camera);

  light = new THREE.PointLight(0xffffff, 0, 20);
  light.castShadow = true;

  cameraAndLight = new THREE.Object3D();
  cameraAndLight.add(camera);
  cameraAndLight.add(light);
  scene.add(cameraAndLight);
  
  cameraAndLight.position.set(-110, player.height, 0);
  cameraAndLight.children[0].lookAt(new THREE.Vector3(0,player.height,0));

  //*****CROSSHAIR*****/
  drawCrosshair(camera);

  //*****RENDERER*****/
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  //*****CONTROLS*****/
  //let controls2 = new OrbitControls(camera, renderer.domElement);
  controls = new PointerLockControls(camera, renderer.domElement);
  
  //*****MENU*****/
  var menu = document.getElementById("menu");
  document.getElementById("menu").addEventListener("click",function(e) {
    if(e.target && e.target.nodeName == "LI") {
      if(e.target.id=="1"){
          menu.style.visibility  = "hidden";
          controls.lock();
          loadMainTheme();
      }else
        alert(e.target.id + " was clicked");
    }
  });


  //raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);
  raycaster2 = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 40);

  //*****LOADING SCREEN*****/
  loadingManager = new THREE.LoadingManager( () => {
	
		const loadingScreen = document.getElementById( 'loading-screen' );
		loadingScreen.classList.add( 'fade-out' );
		
		// optional: remove loader from DOM via event listener
		loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
		
	} );
  loadAnimatedModel(loadingManager);
}

   
// Animated Receptionist
var mixer;
function loadAnimatedModel(loadingManager){

    const loader = new FBXLoader(loadingManager);

    loader.load('./resources/3Dmodels/reception/animated_model/man.fbx', (fbx) => {
        fbx.scale.set(0.035,0.035,0.035);
        fbx.position.set(-89,0,1);
        fbx.rotation.y=-Math.PI/2;
        fbx.traverse(c => {
            c.castShadow = true;
        });
        const anim = new FBXLoader(loadingManager);
        anim.load('./resources/3Dmodels/reception/animated_model/Typing.fbx', (anim) => {
            mixer = new THREE.AnimationMixer(fbx);
            const idle = mixer.clipAction(anim.animations[0]);
            idle.play();
        });
        scene.add(fbx);
    });
}

var prevTime = Date.now();
//*--------------------------------- UPDATE SCENE ----------------------------------*/
function animate() {
  
  requestAnimationFrame(animate);

  if (controls.isLocked === false) {
    menu.style.visibility = "visible";
  }else{
    menu.style.visibility = "hidden";
  }

  let vec = new THREE.Vector3();
  camera.getWorldDirection(vec);
  
  let angle = Math.atan2(vec.x, vec.z);
  processKeyboard(angle, cameraAndLight, player, objects);
  
  if (controls.isLocked === true){
    if(moveToObject && intersectedPoint!=null){
      let newVec= intersectedPoint;
      camera.position.lerp(newVec,0.1);
      camera.position.y= player.height;
    
      if(Math.ceil(newVec.x) == Math.ceil(camera.position.x)){
        moveToObject=false;
      }
    }
  }

  // For animated model animation

  if(mixer){
    var time = Date.now();
    mixer.update((time - prevTime)*0.001);
    prevTime = time;
  }

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
  if (intersectedPoint != null)
  {
    intersectedPoint.x-=5;
    intersectedPoint.z-=5;
    moveToObject=true;
  }
  
}


function onTransitionEnd( event ) {
	event.target.remove();
}

window.addEventListener('resize', onWindowResize);
document.addEventListener('mousedown', onMouseDown, false);