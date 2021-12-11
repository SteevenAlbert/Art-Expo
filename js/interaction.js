import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

let object, intersects;

function interact(e, raycaster2, interactables, camera){
  var cursor = new THREE.Vector2(0,0);  
  console.log(cursor);
  raycaster2.setFromCamera(cursor, camera);
  intersects = raycaster2.intersectObjects(interactables, true);
  if(intersects.length>0){
  intersects[0].object.material.color.set(Math.random() * 0xffffff);
}
  console.log(intersects[0]);
  return intersects[0].point;
}


export {interact};