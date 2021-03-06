import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

let object, intersects;

//----------------------- RETURN THE OBJECT THE USER REACTED WITH -------------------------
function interact(e, raycaster, interactables, camera){
  var cursor = new THREE.Vector2(0,0);  
  raycaster.setFromCamera(cursor, camera);
  intersects = raycaster.intersectObjects(interactables, true);
  
  if (intersects.length != 0){
    if (intersects[0].object.name == "Audio1" || intersects[0].object.name == "Audio2" || intersects[0].object.name == "Audio3"){
      return intersects[0].object;
    }else{
      return intersects[0].object.parent;
    }
  }else
    return null;
}


export {interact};