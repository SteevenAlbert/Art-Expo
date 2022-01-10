import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { RectAreaLightUniformsLib } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper  } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/helpers/RectAreaLightHelper.js';
var hemiLight, sunLight, sunLight2;
var floorLight, floorLight2, floorLight3;

/*Adds Different Types of Light*/
function addLights(scene) {
  //-------------------------------- MAIN LIGHTS -------------------------------//
  hemiLight = new THREE.HemisphereLight(0xFCFBE6, 0xFCFCF7, 0.8);
  scene.add(hemiLight);

  sunLight = addSpotlight(-50, 150, -400, 40, 0, 0, scene, 1.5, 1000, Math.PI/10);
  sunLight2 = addSpotlight(-200, 20, -80, -120, 10, 20, scene, 1, 1000, Math.PI/10);

  //------------------------ ROOM LIGHTS AND SPOTLIGHTS ------------------------//
  /*Egypt Room*/
  addRectAreaLight(40, 0.1,0.1, 8, 15,  40, 10, 0, scene, true, -Math.PI/2,0, 0 );
  addRectAreaLight(20, 2.01, -5,  3, 3,  20, 0, -5, scene, true,  Math.PI/2,0, 0 );
  addRectAreaLight(20, 2.01, 5,  3, 5,  20, 0, -5, scene, true,  Math.PI/2,0, 0 );

  /*ROOM D*/
  floorLight = new THREE.RectAreaLight( 0xffffff, 5,  1, 25 );
  floorLight.position.set(-29, 0.01, 4 );
  floorLight.lookAt(-29,10,4);
  var helper = new RectAreaLightHelper( floorLight ); 
  floorLight.add( helper );
  scene.add( floorLight );

  floorLight2 = new THREE.RectAreaLight( 0xffffff, 5,  1, 25 );
  floorLight2.position.set(8.5, 0.01, 4 );
  floorLight2.lookAt(8.5,10,4);
  var helper = new RectAreaLightHelper( floorLight2 ); 
  floorLight2.add( helper );
  scene.add( floorLight2 );

  floorLight3 = new THREE.RectAreaLight( 0xffffff, 5,  29, 1 );
  floorLight3.position.set(-10, 0.01, -13 );
  floorLight3.lookAt(-10,10,-10);
  var helper = new RectAreaLightHelper( floorLight3 ); 
  floorLight3.add( helper );
  scene.add( floorLight3 );

  //projector light
  addSpotlight(80, 5, 15,   80, 5, -15, scene, 2, 30, 1, 0xFFFFFF);

}
  
//-------------------------------- ADDING A SPOTLIGHT (with target) -------------------------------//
function addSpotlight(x, y, z, targetX, targetY, targetZ, scene, intensity, distance, angle, color)
{
  var color =color || 0xF1CD6C, intensity = intensity || 0.7, distance = distance ||10, angle = angle||0.55, penumbra = penumbra ||  0.2; 
  let spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra);
  spotLight.position.set(x, y, z);
  spotLight.target.position.set(targetX, targetY, targetZ);
  spotLight.castShadow = true;

  scene.add(spotLight.target);
  scene.add( spotLight );

  return spotLight;
}

//-------------------------------- ADDING RECTANGLE AREA LIGHT (with helper) -------------------------------//
function addRectAreaLight(x, y, z, w, h,lookatx, lookaty, lookatz, scene, helper, rotatex, rotatey, rotatez)
{
  RectAreaLightUniformsLib.init();

  rotatex = rotatex || 0;
  rotatey = rotatey || 0;
  rotatez = rotatez || 0;

  const intensity = 1;
  var rectLight = new THREE.RectAreaLight( 0xF8F6AF, intensity,  w, h);
  rectLight.position.set( x, y, z);
  rectLight.lookAt(lookatx, lookaty, lookatz);
  rectLight.rotation.set(rotatex, rotatey, rotatez)
  scene.add( rectLight );
  
  if (helper)
    scene.add( new RectAreaLightHelper( rectLight ) );
}

//-------------------------------- TURN LIGHTS OFF AND ON -------------------------------//
function turnLightOff()
{
   if(hemiLight.intensity>=0.02){
    hemiLight.intensity -= 0.04;
    sunLight.intensity -= 0.04;
  }

  if(floorLight.intensity<5){
    floorLight.intensity+=0.05;
    floorLight2.intensity+=0.05;
    floorLight3.intensity+=0.05;
  }
}

function turnLightOn()
{
    hemiLight.intensity = 0.8;
    sunLight.intensity = 1;
    floorLight.intensity=0;
    floorLight2.intensity=0;
    floorLight3.intensity=0;
}

export {addLights, turnLightOff, turnLightOn};