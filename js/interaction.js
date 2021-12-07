import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

let object;

function interact(e, raycaster2, interactables, camera){

  var mouse = new THREE.Vector2();  
  mouse.x = (e.clientX / window.innerWidth) * 2 - 0.50;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 0.40;
  
  raycaster2.setFromCamera(mouse, camera);
  var intersects = raycaster2.intersectObjects(interactables, true);

  for ( var i = 0; i < intersects.length; i++ ) {
    //moveCamera(camera, intersects);
    //camera.lookat(intersect[i].object.rotation);
    intersects[i].object.material.color.set(Math.random() * 0xffffff);
    console.log(intersects);
}
}

function moveCamera(camera, intersects){
    var startintVector = camera.position;
    var destVector = intersects[0].point;
    let objectDirection = intersects[0].point.clone().sub(camera.position).normalize();
    camera.position.x = intersects[0].point.x-5;
    camera.position.y = intersects[0].point.y;
    camera.position.z = intersects[0].point.z;
    camera.lookAt(objectDirection);
    
}

export {interact};