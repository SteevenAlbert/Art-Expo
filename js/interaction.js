import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

let object,intersects;

function interact(e, raycaster2, interactables, camera){
  var mouse = new THREE.Vector2();  
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  
  raycaster2.setFromCamera(mouse, camera);
  intersects = raycaster2.intersectObjects(interactables, true);
  if(intersects.length>0){
  intersects[0].object.material.color.set(Math.random() * 0xffffff);
}
  console.log(intersects[0]);
  return intersects[0].point;
}


export {interact};