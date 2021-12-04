var keyboard = [];
let collided;
let  object;
let faceAngle;


function checkCollision(angle, raycaster, objects, controls) {
    collided = false;
    raycaster.ray.origin.copy(controls.getObject().position);
    let collisionRange = 3; //if the mesh gets too close, the camera clips though the object
    //let nextPosition = controls.getObject().position.clone()
    let playerPosition = controls.getObject().position;

    for (let i = 0; i < objects.length-1; i++) {
      object = objects[i];
      let objectDirection = object.position.clone().sub(playerPosition).normalize();
      raycaster.set(playerPosition, objectDirection) //set the position and direction

      let objectsIntersected = raycaster.intersectObject(object);
     
      if (objectsIntersected.length > 0 && objectsIntersected[0].distance < collisionRange) {
        collided = true;
  
        if(objectsIntersected[0].faceIndex == 2 || objectsIntersected[0].faceIndex == 3){
          faceAngle = object.rotation.y;
        }
        if(objectsIntersected[0].faceIndex == 8 || objectsIntersected[0].faceIndex == 9){
          faceAngle = object.rotation.y + Math.PI/2;
        }
        if(objectsIntersected[0].faceIndex == 0 || objectsIntersected[0].faceIndex == 1){
          faceAngle = object.rotation.y + Math.PI;
        }
        if(objectsIntersected[0].faceIndex == 10 || objectsIntersected[0].faceIndex == 11){
          faceAngle = object.rotation.y + 3*Math.PI/2;
        }
       
        if(objectsIntersected.length>1){

        }
        console.log(objectsIntersected);
        break;
      }
    }
  }
  
  
  /*Process Keyboard Input and apply changes accordingly*/
  function processKeyboard(angle, camera, player) {
    var deltaX, deltaZ;
    var runFactor=1;
    if(!collided){
      if(keyboard[16]){
        runFactor=1.7;
      }
    if (keyboard[87]) { // W key
      camera.position.x += Math.sin(angle) * player.speed * runFactor;
      camera.position.z += Math.cos(angle) * player.speed * runFactor;
    }
    if (keyboard[83]) { // S key
      camera.position.x -= Math.sin(angle) * player.speed* runFactor;
      camera.position.z -= Math.cos(angle) * player.speed* runFactor;
    }
    if (keyboard[65]) { // A key
      camera.position.x += Math.cos(angle) * player.speed* runFactor;
      camera.position.z += -Math.sin(angle) * player.speed* runFactor;
    }
    if (keyboard[68]) { // D key
      camera.position.x -= Math.sin(angle + Math.PI / 2) * player.speed* runFactor;
      camera.position.z += -Math.cos(angle + Math.PI / 2) * player.speed* runFactor;
    }
  }
  
    if(collided){
      if(keyboard[87]){
        deltaX = Math.sin(angle) * player.speed;
        deltaZ = Math.cos(angle) * player.speed;
        calcAlphaBeta(deltaX, deltaZ, camera);
       }
      if (keyboard[83]) { // S key
        deltaX = -Math.sin(angle) * player.speed;
        deltaZ = -Math.cos(angle) * player.speed;
        calcAlphaBeta(deltaX,deltaZ, camera);
      }
      if (keyboard[65]) { // A key
        deltaX = Math.cos(angle) * player.speed; 
        deltaZ = -Math.sin(angle) * player.speed;
        calcAlphaBeta(deltaX,deltaZ, camera);
      }
      if (keyboard[68]) { // D key
        deltaX = -Math.sin(angle + Math.PI / 2) * player.speed;
        deltaZ = -Math.cos(angle + Math.PI / 2) * player.speed;
        calcAlphaBeta(deltaX,deltaZ, camera);
      }
    }
    
    function keyDown(event) {
      //console.log(event);
      keyboard[event.keyCode] = true;
    }
    function keyUp(event) {
      keyboard[event.keyCode] = false;
    }
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
  
    if(keyboard[37]){ // left arrow key
      camera.rotation.x += player.turnSpeed;
    }
    if(keyboard[39]){ // right arrow key
      camera.rotation.x -= player.turnSpeed;
    }
  }
  
  
  
  function calcAlphaBeta(deltaX, deltaZ, camera){
    var alpha = deltaZ * Math.cos(faceAngle) + deltaX * Math.sin(faceAngle);
    var beta = deltaX * Math.cos(faceAngle) - deltaZ * Math.sin(faceAngle);
    
    if(beta > 0) //You're moving towards the wall if beta is positive
    {
      beta = 0;
    }
    
    camera.position.x += alpha * Math.sin(faceAngle) + beta * Math.cos(faceAngle);
    camera.position.z += alpha * Math.cos(faceAngle) - beta * Math.sin(faceAngle);
}

  export {checkCollision, processKeyboard};