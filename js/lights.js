import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { RectAreaLightUniformsLib } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper  } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/helpers/RectAreaLightHelper.js';


var hemiLight, sunLight;

/*Adds Different Types of Light*/
function addLights(scene) {

  //------------------------ MAIN LIGHTS ------------------------//
  hemiLight = new THREE.HemisphereLight(0xFCFBE6, 0xFCFCF7, 1);
  scene.add(hemiLight);

  sunLight = addSpotlight(20, 200, -500, 20, 0, 0, scene, 1, 1000, Math.PI/10);

  //------------------------ ROOM LIGHTS AND SPOTLIGHTS ------------------------//
  // First room left wall
  for (let i = -60; i <= -40; i+=10){
    addSpotlight(i, 8, 8, i, 3, 14.5, scene);
  }

  // First room front wall
  for (let i = -12; i <= 12; i+=24){
    addSpotlight(-35, 8, i, -30, 4, i*0.6, scene,1, 16, 0.7);
  }

  /*
  // Left hallway
  for (let j = -27; j <= -17; j+=10){
    for (let i = -75; i < 125; i+=20){
      addLight(i, 9, j, scene);
    }
  }

  // Right hallway
  for (let j = 17; j <= 27; j+=10){
    for (let i = -75; i < 125; i+=20){
      addLight(i, 9, j, scene);
    }
  }*/

  addRectAreaLight(40, 0.1,0, 8, 15,  40, 10, 0, scene, true, -Math.PI/2,0, 0 );
  addRectAreaLight(20, 2.01, -5,  3, 3,  20, 0, -5, scene, true,  Math.PI/2,0, 0 );
  addRectAreaLight(20, 2.01, 5,  3, 5,  20, 0, -5, scene, true,  Math.PI/2,0, 0 );



  
}
  
// Adding a spotlight from a point to a target point 
function addSpotlight(x, y, z, targetX, targetY, targetZ, scene, intensity, distance, angle)
{
  var color =0xFFFFFF, intensity = intensity || 0.7, distance = distance ||10, angle = angle||0.55, penumbra = penumbra ||  0.2; 
  let spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra);
  spotLight.position.set(x, y, z);
  spotLight.target.position.set(targetX, targetY, targetZ);
  spotLight.castShadow = true;

  scene.add(spotLight.target);
  scene.add( spotLight );

  return spotLight;
}

function turnLightOff()
{
    hemiLight.intensity = 0;
    sunLight.intensity = 0;
}

function turnLightOn()
{
  hemiLight.intensity = 1.2;
  sunLight.intensity = 1;
}

// Adding a main spotlight from a point to a target point 
function addLight(x, y, z, scene)
{
  var color =0xFFFFFF, intensity = 4, distance = 10, angle = 0.7, penumbra =  1; 
  let spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra);
  spotLight.position.set(x, y, z);
  spotLight.target.position.set(x, 0, z);
  spotLight.castShadow = true;
  
  scene.add(spotLight.target);
  scene.add( spotLight );

  
}

function addRectAreaLight(x, y, z, w, h,lookatx, lookaty, lookatz, scene, helper, rotatex, rotatey, rotatez)
{
  RectAreaLightUniformsLib.init();

  rotatex = rotatex || 0;
  rotatey = rotatey || 0;
  rotatez = rotatez || 0;

  const intensity = 0.8;
  var rectLight = new THREE.RectAreaLight( 0xF8F6AF, intensity,  w, h);
  rectLight.position.set( x, y, z);
  rectLight.lookAt(lookatx, lookaty, lookatz);
  rectLight.rotation.set(rotatex, rotatey, rotatez)
  scene.add( rectLight );
  
  if (helper)
    scene.add( new RectAreaLightHelper( rectLight ) );
}

export {addLights, turnLightOff, turnLightOn};