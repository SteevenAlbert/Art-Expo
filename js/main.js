import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { PointerLockControls } from "https://threejs.org/examples/jsm/controls/PointerLockControls.js";
import { PositionalAudioHelper } from "https://threejs.org/examples/jsm/helpers/PositionalAudioHelper.js";
import { addModels } from './models.js';
import { addLights, turnLightOn, turnLightOff } from './lights.js';
import { playEgyptianSong, stopEgyptianSong, playProjectionTrack, stopProjectionTrack } from './audio.js';
import { DRACOLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/DRACOLoader';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FBXLoader.js';
import { interact } from './interaction.js';
import { processKeyboard } from './movement.js';
import { cameraOnSpline } from './spline.js';
import { addText } from './text.js';
import { controlAudio} from "./audio.js";
import { setModalText} from "./modalText.js";
import {drawVisualizer, distortSphere, distortPlane, modulate, avg, max} from './audiovisualizer.js';
import { createWorld, LoadTextures, drawCrosshair, projection_animation } from './world.js';


var scene, camera, renderer, light, cameraAndLight;
var controls, raycaster;
var objects = [];
var interactables = [];
const player = { height: 2.9, speed: 0.3, turnSpeed: Math.PI * 0.009 };
var moveToObject=false;
var targetPoint, objectDirection;
var loadingManager;
var modal, btn, showModal=false;
var audio, audio2, sphere, topMesh, analyser, dataArray, listener, src, positionalAudio; //Audio Variables
var rectLight1,rectLight2;
var prevTime = Date.now();

var mode;
let clock = new THREE.Clock(); 

init();

addLights(scene);

addModels(scene, interactables, objects, loadingManager);

addText(scene);

LoadTextures(loadingManager);
createWorld(scene, objects, loadingManager);
animate();


/*--------------------------------- INITILIZATION ----------------------------------*/
/*Initalize Scene*/
function init() {
  //*****SCENE & CAMERA*****//
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x11111f, 0.013);
  camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000);
  scene.add(camera);
  
  //*****RENDERER*****//
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  light = new THREE.PointLight(0xffffff, 0, 20);
  light.castShadow = true;
  
  cameraAndLight = new THREE.Object3D();
  cameraAndLight.add(camera);
  cameraAndLight.add(light);
  scene.add(cameraAndLight);
  
  cameraAndLight.position.set(-115, player.height, 0);
  cameraAndLight.children[0].lookAt(new THREE.Vector3(0,player.height,0));

  //***Draw Crosshair****//
  drawCrosshair(camera);

  //*****CONTROLS*****/
  controls = new PointerLockControls(camera, renderer.domElement);


  //******ROOM D - Audio Visualizer********/
  //DRAW
  var audioMeshes = drawVisualizer(scene, topMesh, sphere,rectLight1,rectLight2 );
  sphere = audioMeshes[0];
  topMesh = audioMeshes[1];
  rectLight1 = audioMeshes[2];
  rectLight2 = audioMeshes[3];

  //Initialize Audio Analyser from Audio1 (used only for visualization)
  audio = new Audio();
  var context = new AudioContext();
  var gainNode = context.createGain();
  src = context.createMediaElementSource(audio); //Get Audio Context
  analyser = context.createAnalyser(); //Create Analyser object from the context
  src.connect(analyser); // connect the analyser to the audio src
  analyser.connect(gainNode);
  gainNode.connect(context.destination);
  gainNode.gain.setValueAtTime(0, context.currentTime);
  analyser.fftSize = 512; //Set Fast Fourier Transform Size
  var bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength); // Uint8Array should be the same length as the frequencyBinCount
  listener = new THREE.AudioListener();
  camera.add( listener );

  //Initialize PositionalAudio from Audio2
  audio2 = new Audio();
  positionalAudio = new THREE.PositionalAudio( listener );
  positionalAudio.setMediaElementSource( audio2 );
  positionalAudio.setRefDistance( 20 );
  positionalAudio.setDirectionalCone( 360, 360, 0.05 );
  sphere.add( positionalAudio);
  //var helper = new PositionalAudioHelper( positionalAudio, 30 );
  //positionalAudio.add( helper );


  //******RAYCASTER*****/
  raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 40);

  
  //*****MENU*****/
  var menu = document.getElementById("menu");
  document.getElementById("menu").addEventListener("click",function(e) {
    if(e.target && e.target.nodeName == "LI") {
      if(e.target.id=="1"){
          mode= '1';
          menu.style.visibility = "hidden";
          controls.lock();
          clock.start();
      }
      else if(e.target.id=="2"){
        mode= '2';
        menu.style.visibility = "hidden";
        controls.lock();
        clock.start();
      }
      else
        alert(e.target.id + " was clicked");
    }
  });


  //*****MODAL POPUP*****/
  modal = document.getElementById("open-modal");
  btn = document.getElementById("closebtn");

  //*****LOADING SCREEN*****/
  loadingManager = new THREE.LoadingManager( () => {
	
		const loadingScreen = document.getElementById( 'loading-screen' );
		loadingScreen.classList.add( 'fade-out' );
		
		// optional: remove loader from DOM via event listener
		loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
	});
  onWindowResize();

  loadAnimatedModel(scene, loadingManager);
}

//*--------------------------------- LOAD ANIMATED MODEL ----------------------------------*/
var mixer;
function loadAnimatedModel(scene, loadingManager){
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


//*--------------------------------- UPDATE SCENE ----------------------------------*/
function animate(){
  requestAnimationFrame(animate);
  projection_animation(clock);

  if(mode=='1'){

    //FOR DEBUGGING SPLINE CURVE PATH
    /*
    console.log("camera's x");console.log(cameraAndLight.position.x);
    console.log("camera's z");console.log(cameraAndLight.position.z);
    console.log("camera's x look at");console.log(cameraAndLight.lookAt.x);
    console.log("camera's z look at");console.log(cameraAndLight.lookAt.z);
    */


    var worldDirectionVec = new THREE.Vector3();
    camera.getWorldDirection(worldDirectionVec);
  
    var angle = Math.atan2(worldDirectionVec.x, worldDirectionVec.z);

    if (controls.isLocked == true){

      processKeyboard(angle, cameraAndLight, player, objects); 

      /******SHOW MODAL POPUP*******/
      if(showModal==true){
        showPopup();
        controls.unlock();
      }
	    /*******MOVE TO OBJECT ON CLICK*******/
      /*if(moveToObject && intersectedPoint!=null){
        var positionVec= targetPoint.clone();
        camera.position.lerp(newVec,0.1);
        camera.position.y= player.height;
    
        if(Math.ceil(positionVec.x) == Math.ceil(camera.position.x)){
          moveToObject=false;
        }
      }*/
    }
  }else if(mode=='2'){
    if(cameraOnSpline(camera, cameraAndLight, clock)!=false && controls.isLocked == true){
      cameraOnSpline(camera, cameraAndLight, clock); 
    }
    else{                                 //&& modalShown==false
      menu.style.visibility = "visible";  
      clock.stop();
      controls.unlock();
    }
  }

  /***** TURN LIGHTS OFF WHEN IN CERTAIN ROOMS ******/
  if (cameraAndLight.position.x < 50 && cameraAndLight.position.x> 10 && 
    cameraAndLight.position.z < 15 && cameraAndLight.position.z > -15)
  {  // Check if the user is in the Egypt room
    playEgyptianSong();
    turnLightOff();
    cameraAndLight.children[1].intensity = 1;
  } 
  else if (cameraAndLight.position.x < 115 && cameraAndLight.position.x> 50 && 
    cameraAndLight.position.z < 15 && cameraAndLight.position.z > -15)
  {  // Check if the user is in the Projector room
    turnLightOff();
    setTimeout(function(){objects[33].visible = true;}, 2500 );
    setTimeout(function(){playProjectionTrack();}, 2250 );
    cameraAndLight.children[1].intensity = 0.25;
  }
  else if(cameraAndLight.position.x < 5 && cameraAndLight.position.x >- 27 &&
      cameraAndLight.position.z < 30 && cameraAndLight.position.z> - 15){

  }
  else
  {
    stopEgyptianSong();
    stopProjectionTrack();
    turnLightOn();
    cameraAndLight.children[1].intensity = 0;
    objects[33].visible = false;
  }


  /***** ANIMATED MODEL ANIMATION******/
  if(mixer){
    var time = Date.now();
    mixer.update((time - prevTime)*0.001);
    prevTime = time;
  }

  /*****AUDIO VISUALIZER ANIMATION******/
  analyser.getByteFrequencyData(dataArray); //fetch Byte

  var lowerHalfArray = dataArray.slice(0, (dataArray.length/2) - 1);
  var upperHalfArray = dataArray.slice((dataArray.length/2) - 1, dataArray.length - 1);

  var lowerMax = max(lowerHalfArray);
  var upperAvg = avg(upperHalfArray);
  var lowerMaxFr = lowerMax / lowerHalfArray.length;
  var upperAvgFr = upperAvg / upperHalfArray.length;

  distortPlane(topMesh, modulate(upperAvgFr, 0, 1, 0.5, 4), rectLight1,rectLight2);
  distortSphere(sphere, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8), modulate(upperAvgFr, 0, 1, 0, 4), rectLight1,rectLight2);
  if(!audio.paused){
    turnLightOff();
  }
  sphere.rotation.y += 0.005;
  renderer.render(scene, camera);
}



/*--------------------------------- Input Functions --------------------------------*/
function onMouseDown(e){
  if(showModal==true){return};

  var playerPosition = controls.getObject().position;
  var clickedObj = interact(e, raycaster, interactables, camera);
  console.log(clickedObj);
  if(clickedObj!=null){
    if (clickedObj.name == "Audio1" || clickedObj.name == "Audio2" || clickedObj.name == "Audio3")
    {
      controlAudio(audio, audio2, clickedObj.name);
    }else{
      showModal = setModalText(clickedObj.name, showModal);
      /*
      targetPoint = viewPosition[intersectedObjectID];
      objectDirection = targetPoint.clone().sub(playerPosition).normalize();
      console.log(objectDirection);
      moveToObject=true;*/
    }
  }
}

controls.addEventListener( 'lock', function () {
  menu.style.visibility = "hidden";
});

controls.addEventListener( 'unlock', function () {
  if(showModal==false){
    menu.style.visibility = "visible";
  }
});

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.setPixelRatio(window.devicePixelRatio);
}

/*---------MODAL FUNCTIONS---------*/
function showPopup() {
  modal.style.visibility = "visible";
}

btn.onclick = function () {
  modal.style.visibility = "hidden";
  showModal=false;
  controls.lock();
}

function onTransitionEnd( event ) {
  event.target.remove();
}  


window.addEventListener('resize', onWindowResize);
document.addEventListener('mousedown', onMouseDown, false);