import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
var keyboard = [];
let  object, player, runFactor;

//-------------------------------- COLLISION DETECTION --------------------------------//
// Check collision between the camera and all objects in the objects array
function checkCollision(objects, camera) {
  var firstBox, secondBox;
    
  for (let i = 0; i < objects.length; i++) {
    object = objects[i];

    // Create bounding boxes for the camera and the current object 
    firstBox = new THREE.Box3().setFromObject(object).expandByScalar(1.05);
    secondBox = new THREE.Box3().setFromObject(camera).expandByScalar(1.05);

    if (firstBox.intersectsBox(secondBox))
      return true;
  }
    return false;
}
  
//-------------------------------- KEYBOARD PROCESSING --------------------------------//
// Process Keyboard Input and apply changes accordingly 
function processKeyboard(angle, camera, playerAtt, objects) {
  runFactor=1;
  player = playerAtt;
  if(keyboard[16]){
    runFactor=1.7;
  }
  var collided= false;

  // Try moving the camera forward, detect collision then move it backward again
  moveCameraW(camera, angle, 5);
  collided = checkCollision(objects, camera);
  moveCameraS(camera, angle, 5);

  // If the camera didn't collide with any object, allow movement forward
  if (!collided){
    if (keyboard[87]) { // W key
      moveCameraW(camera, angle);
    }
  }

  // Try moving the camera backward, detect collision then move it forward again
  moveCameraS(camera, angle, 5);
  collided = checkCollision(objects, camera);
  moveCameraW(camera, angle, 5);

  // If the camera didn't collide with any object, allow movement backward
  if (!collided){
    if (keyboard[83]) { // S key
      moveCameraS(camera, angle);
    }
  }

  // Try moving the camera to the left, detect collision then move it to the right again
  moveCameraA(camera, angle, 5);
  collided = checkCollision(objects, camera);
  moveCameraD(camera, angle, 5);

  // If the camera didn't collide with any object, allow movement to the left
  if (!collided){
    if (keyboard[65]) { // A key
      moveCameraA(camera, angle);
    }
  }
  
  // Try moving the camera to the right, detect collision then move it to the left again
  moveCameraD(camera, angle, 5);
  collided = checkCollision(objects, camera);
  moveCameraA(camera, angle, 5);

  // If the camera didn't collide with any object, allow movement to the right
  if (!collided){
    if (keyboard[68]) { // D key
      moveCameraD(camera, angle);
    }
  }
    
  // Left arrow key rotates the camera
  if(keyboard[37]){ 
    camera.rotation.x += player.turnSpeed;
  }
  
  // Right arrow key rotates the camera
  if(keyboard[39]){ 
    camera.rotation.x -= player.turnSpeed;
  }
}
  

function moveCameraW(camera, angle, factor)
{
  factor = factor || 1;
  camera.position.x += Math.sin(angle) * player.speed * runFactor * factor;
  camera.position.z += Math.cos(angle) * player.speed * runFactor * factor;
}

function moveCameraS(camera, angle, factor)
{
  factor = factor || 1;
  camera.position.x -= Math.sin(angle) * player.speed * runFactor * factor;
  camera.position.z -= Math.cos(angle) * player.speed * runFactor * factor;
}
  
function moveCameraA(camera, angle, factor)
{
  factor = factor || 1;
  camera.position.x += Math.cos(angle) * player.speed* runFactor * factor;
  camera.position.z += -Math.sin(angle) * player.speed* runFactor * factor;
}

function moveCameraD(camera, angle, factor)
{
  factor = factor || 1;
  camera.position.x -= Math.sin(angle + Math.PI / 2) * player.speed* runFactor * factor;
  camera.position.z += -Math.cos(angle + Math.PI / 2) * player.speed* runFactor * factor;
}

function keyDown(event) {
  keyboard[event.keyCode] = true;
}

function keyUp(event) {
  keyboard[event.keyCode] = false;
}
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

export {checkCollision, processKeyboard};