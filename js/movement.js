import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
var keyboard = [];
let  object;
let player;
let runFactor;

function checkCollision(objects, camera) {
  var firstBox, secondBox;
    for (let i = 0; i < objects.length; i++) {
      object = objects[i];

      firstBox = new THREE.Box3().setFromObject(object).expandByScalar(1.05);
      secondBox = new THREE.Box3().setFromObject(camera).expandByScalar(1.05);

      if (firstBox.intersectsBox(secondBox))
      {
        return true;
      }
    }
    return false;
  }
  
  
  /*Process Keyboard Input and apply changes accordingly*/
  function processKeyboard(angle, camera, playerAtt, objects) {
    runFactor=1;
    player = playerAtt;
    if(keyboard[16]){
      runFactor=1.7;
    }
    var collided= false;

    moveCameraW(camera, angle, 5);
    collided = checkCollision(objects, camera);
    moveCameraS(camera, angle, 5);
    if (!collided){
      if (keyboard[87]) { // W key
        moveCameraW(camera, angle);
      }
    }

    moveCameraS(camera, angle, 5);
    collided = checkCollision(objects, camera);
    moveCameraW(camera, angle, 5);
    if (!collided){
      if (keyboard[83]) { // S key
        moveCameraS(camera, angle);
      }
    }

    moveCameraA(camera, angle, 5);
    collided = checkCollision(objects, camera);
    moveCameraD(camera, angle, 5);
    if (!collided){
      if (keyboard[65]) { // A key
        moveCameraA(camera, angle);
      }
    }
    
    moveCameraD(camera, angle, 5);
    collided = checkCollision(objects, camera);
    moveCameraA(camera, angle, 5);
    if (!collided){
      if (keyboard[68]) { // D key
        moveCameraD(camera, angle);
      }
    }
    

    if(keyboard[37]){ // left arrow key
      camera.rotation.x += player.turnSpeed;
    }
    if(keyboard[39]){ // right arrow key
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