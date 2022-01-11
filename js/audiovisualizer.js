import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { RectAreaLightHelper } from './RectAreaLightHelper.js';
import * as Noise from 'https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.3.0/simplex-noise.min.js'


var noise = new SimplexNoise();
//------------------------ CREATING AUDIO VISUALIZER OBJECT ------------------------ 
function drawVisualizer(scene, topMesh, sphere, rectLight1, rectLight2){
    var plane2Geometry = new THREE.PlaneGeometry(30, 25, 20, 20);
    var plane2Material = new THREE.MeshPhysicalMaterial( {
      color: 0xffffff,
      transmission: 1,  
      roughness: 0.1,
      ior: 1.5,
      opacity: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0,
      side: THREE.DoubleSide,
      reflectivity: 0.5,
    });
  
    topMesh = new THREE.Mesh(plane2Geometry, plane2Material);
    topMesh.rotation.x = -0.5 * Math.PI;
    topMesh.position.set(-10, 10, 0);
    scene.add(topMesh);
  
    var icosahedronGeometry = new THREE.IcosahedronGeometry(11, 5);
    var lambertMaterial = new THREE.MeshLambertMaterial({
          color: 0xff00ee,
          wireframe: true,
          emissive: 0xffffff
      });
  
    sphere = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    sphere.position.set(-10, 5, 0);
    scene.add(sphere);
  
    rectLight1 = new THREE.RectAreaLight( 0x00ffff, 1,  0.5, 10 );
    rectLight1.position.set(-15, 5, 0 );
    rectLight1.lookAt(0,5,0);
    var helper = new RectAreaLightHelper( rectLight1 ); 
    rectLight1.add( helper );
    scene.add( rectLight1 );
  
    rectLight2 = new THREE.RectAreaLight( 0xff0000, 1,  0.5, 10 );
    rectLight2.position.set(-5, 5, 0 );
    rectLight2.lookAt(-10,5,0);
    var helper = new RectAreaLightHelper( rectLight2 ); 
    rectLight2.add( helper );
    scene.add( rectLight2 );

    return [sphere, topMesh, rectLight1, rectLight2];
  }
  

//------------------------------- Maniuplate Sphere ------------------------------------
function distortSphere(mesh, bassFr, treFr, rectLight1, rectLight2) {
    //Fetch the geometry position array
    var positionAttribute = mesh.geometry.getAttribute( 'position' );
    var vertex = new THREE.Vector3();

    for ( let vertexIndex = 0; vertexIndex < positionAttribute.count*3; vertexIndex +=3 ) {
        //Store the current Vertex in a Vector3
        vertex.x = positionAttribute.array[vertexIndex];
        vertex.y = positionAttribute.array[vertexIndex+1];
        vertex.z = positionAttribute.array[vertexIndex+2];
        
        //Displacement calculations
        var offset = mesh.geometry.parameters.radius;
        var amp = 7;
        var time = window.performance.now();
        vertex.normalize();
        var rf = 0.0002;
        var displacement = (offset + bassFr ) + noise.noise3D(vertex.x + time *rf*7, vertex.y +  time*rf*8, vertex.z + time*rf*9) * amp * treFr;    
        vertex.multiplyScalar(displacement/8);

        //Store the new vertex back into its index in the Attribute Array
        positionAttribute.array[vertexIndex] = vertex.x;
        positionAttribute.array[vertexIndex+1] = vertex.y;
        positionAttribute.array[vertexIndex+2] = vertex.z;

        //Control Lights
        rectLight1.intensity = Math.pow(displacement,2)/8;
        rectLight2.intensity = Math.pow(displacement,2)/8;
        if(displacement>33.5){
            rectLight1.color.setHex( Math.random() * 0xffffff );
            rectLight2.color.setHex( Math.random() * 0xffffff );
        }
    }
    //Set Flags
    mesh.geometry.getAttribute("position").needsUpdate = true;
    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.normalsNeedUpdate = true;
    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();
}

//------------------------ DISTORT CEILING PLANE ------------------------ 
function distortPlane(mesh, distortionFr, rectLight1,rectLight2) {
    var positionAttribute = mesh.geometry.getAttribute( 'position' );
    var vertex = new THREE.Vector3();

    for ( let vertexIndex = 0; vertexIndex < positionAttribute.count*3; vertexIndex +=3 ) {
        vertex.x = positionAttribute.array[vertexIndex];
        vertex.y = positionAttribute.array[vertexIndex+1];
        vertex.z = positionAttribute.array[vertexIndex+2];
   
        var amp = 2;
        var time = Date.now();
        var distance = (noise.noise2D(vertex.x + time * 0.0003, vertex.y + time * 0.0001) + 0) * distortionFr * amp;
        vertex.z = distance/8;
        positionAttribute.array[vertexIndex] = vertex.x;
        positionAttribute.array[vertexIndex+1] = vertex.y;
        positionAttribute.array[vertexIndex+2] = vertex.z;
      
    }
    mesh.geometry.getAttribute("position").needsUpdate = true;
    mesh.geometry.verticesNeedUpdate = true;
    mesh.geometry.normalsNeedUpdate = true;
    mesh.geometry.computeVertexNormals();
    mesh.geometry.computeFaceNormals();
}


//some helper functions here
function fractionate(val, minVal, maxVal) {
    return (val - minVal)/(maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
    var fr = fractionate(val, minVal, maxVal);
    var delta = outMax - outMin;
    return outMin + (fr * delta);
}

function avg(arr){
    var total = arr.reduce(function(sum, b) { return sum + b; });
    return (total / arr.length);
}

function max(arr){
    return arr.reduce(function(a, b){ return Math.max(a, b); })
}

export {drawVisualizer, distortSphere, distortPlane, modulate, avg, max};