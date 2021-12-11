import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

/*Adds Different Types of Light*/
function addLights(scene) {

  //------------------------ MAIN LIGHTS ------------------------//
  var hemiLight = new THREE.HemisphereLight(0xFCFBE6, 0xFCFCF7, 1);
  scene.add(hemiLight);

  let directionalLight = new THREE.DirectionalLight(0xF0FBFA, 0.2);
  directionalLight.castShadow = true;
  directionalLight.position.set(-300, 10, -50);
  directionalLight.target.position.set(-200, 0, 50);
  scene.add(directionalLight.target);
  scene.add(directionalLight);

  let directionalLight2 = new THREE.DirectionalLight(0xF0FBFA, 0.2);
  directionalLight2.castShadow = true;
  directionalLight2.position.set(70,40, 50);
  directionalLight2.target.position.set(125, -10, 0);
  scene.add(directionalLight2.target);
  scene.add(directionalLight2);


  //------------------------ ROOM LIGHTS AND SPOTLIGHTS ------------------------//
  // First room left wall
  for (let i = -60; i <= -40; i+=10){
    addSpotlight(i, 8, 8, i, 3, 14.5, scene);
  }

  // First room front wall
  for (let i = -12; i <= 12; i+=24){
    addSpotlight(-35, 8, i, -30, 4, i*0.6, scene, 0.1, 16, 0.7);
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
}
  
// Adding a spotlight from a point to a target point 
function addSpotlight(x, y, z, targetX, targetY, targetZ, scene, intensity, distance, angle)
{
  var color =0xFFFFFF, intensity = intensity || 0.5, distance = distance ||10, angle = angle||0.55, penumbra = penumbra ||  0.2; 
  let spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra);
  spotLight.position.set(x, y, z);
  spotLight.target.position.set(targetX, targetY, targetZ);
  spotLight.castShadow = true;
  
  scene.add(spotLight.target);
  scene.add( spotLight );
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

export {addLights};