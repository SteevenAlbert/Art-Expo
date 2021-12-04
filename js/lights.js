import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
// var spotLightHelper;
/*Adds Different Types of Light*/
function addLights(scene, flash) {
  
    addSpotlight(-60, 8, 8, -60, 3, 14.5, scene);
    addSpotlight(-50, 8, 8, -50, 3, 14.5, scene);
    addSpotlight(-40, 8, 8, -40, 3, 14.5, scene);
    
    let ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.9);
    scene.add(ambientLight);

  }
  
  
  function addSpotlight(x, y, z, targetX, targetY, targetZ, scene)
  {
    var color =0xFFFFFF, intensity =  1, distance = 10, angle = 0.55, penumbra =  0.2; 
    let spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra);
    spotLight.position.set(x, y, z);
    spotLight.target.position.set(targetX, targetY, targetZ);
    spotLight.castShadow = true;
    
    scene.add(spotLight.target);
    // spotLightHelper = new THREE.SpotLightHelper( Slight );
    // scene.add( spotLightHelper );
    scene.add( spotLight );
  }

  export {addLights};