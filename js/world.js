import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import CSG from './THREE-CSGMesh-master/three-csg.js';

var worldScene, worldObjects; //scene children array, collidable objects array
let groundMat, wallMat, ceilingMat1, ceilingMat2,cylinderMat, cylinderMat2, glassMat, lineMat, shaderMat; //Textures
var vertexShader, fragmentShader; //shader codes
var uniforms, time; //for animating shader material

//-------------------------------- CREATING WORLD --------------------------------//
function createWorld(scene, objects, loadingManager){
  worldScene = scene;
  worldObjects = objects;

  // Skybox --------------------------------------------------------------------------
  createEnvironment(loadingManager);
  
  // Walls --------------------------------------------------------------------------
  /*****Outer Walls*****/
  //wall 0
  createBox(250, 10, 1,      0 , 5, 30 );
  //wall 1
  createBox(250, 10, 1,      0 , 5,-30 );
  //wall 2
  createBox( 60, 10, 1 ,     124, 5, 0 ,      0, -Math.PI / 2);
  //wall 3
  createBox( 60, 2 , 1 ,    -124, 1, 0 ,      0, -Math.PI / 2);


  /*****Inner Walls*****/
  //wall 4
  createBox( 32, 10, 1 ,  -80, 5, 0,      0, -Math.PI/2);
  //wall 5
  createBox(51, 10, 1,   -55, 5, 16);
  //wall 6
  createBox(32, 10, 1,   -30, 5, 0.5,   0, -Math.PI/2);
 
  //wall 7
  createBox(41, 10, 1,   -10, 5, -15);
  //wall 8
  createBox(32, 10, 1,    10, 5, 0.5,     0, -Math.PI/2,      wallMat);
  //wall 9
  createBox(41, 10, 1,   30, 5, 16,         0, 0,            wallMat);
  //wall 10
  createBox(32, 10, 1,   50, 5, 0.5,     0, -Math.PI/2,      wallMat);
  //wall 11
  createBox(61, 10, 1,   80, 5, -15,         0, 0,            wallMat);
  //wall 12
  createBox( 5, 10, 1 ,  -80, 5, -27.5,      0, -Math.PI/2);
  //wall 13
  createBox( 10, 3, 1 ,  -80, 8.5, -20,      0, -Math.PI/2);
  //wall 14
  createBox( 5, 10, 1 ,  -80, 5, 27.5,      0, -Math.PI/2);
  //wall 15
  createBox( 10, 3, 1 ,  -80, 8.5, 20,      0, -Math.PI/2);

  // Create Ceiling -------------------------------------------------------------------
  let center2 = new THREE.Vector3(0, 10, 0);
  createBox(250, 60, 1, center2.x, center2.y, center2.z, Math.PI / 2, 0, wallMat);

  // Ground --------------------------------------------------------------------------
  let center1 = new THREE.Vector3(0, 0, 0);
  createBox(250, 60, 1, center1.x, center1.y-0.5, center1.z, -Math.PI / 2, 0, groundMat);


  /******Glass Part in Roof******/ 
  // glass in Room A
  makeAHole(16,           28, 22, 1,     -51,0,0);
  createPlane(28, 22,     1, 1,     center2.x-51, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat1);
  createPlane(28, 22,     3, 3,    center2.x-51, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat2);
  
/*
  //glass in Room B
  makeAHole(16,           28, 22, 1,      31,0,0);
  createPlane(28, 22,     1, 1,    center2.x+31, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat1);
  createPlane(28, 22,     3, 3,    center2.x+31, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat2);
*/


/*
  //glass in Room C
  makeAHole(16,           52, 22, 1,      80,0,0);

  createPlane(28, 22,     1, 1,     center2.x-10, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat1);
  createPlane(28, 22,     3, 3,    center2.x-10, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat2);
*/

  //glass in Room D
  makeAHole(16,           28, 22, 1,      -10,0,0);
/*
  createPlane(52, 22,     1, 1,     center2.x+80, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat1);
  createPlane(52, 22,     6, 3,    center2.x+80, center2.y+0.5, center2.z,     Math.PI/2, 0,      ceilingMat2);
*/

  //Cylinders in RoomD
  var geometry = new THREE.CylinderGeometry( 5, 5, 12, 32 );
  var cylinder = new THREE.Mesh( geometry, cylinderMat );
  cylinder.position.set(-10,5,0);
  scene.add( cylinder );
  cylinder.material.opacity =0.2;
  worldObjects.push(cylinder);

  var geometry2 = new THREE.CylinderGeometry( 4.9, 4.9, 0.1, 32 );
  var cylinder2 = new THREE.Mesh( geometry2, cylinderMat2 );
  cylinder2.position.set(-10,0.03,0);
  scene.add( cylinder2 );

  //glass in Right Pathaways
  makeAHole(16,           172, 8, 1,      19,0,23);
  createPlane(172, 8,     1, 1,     center2.x+19, center2.y+0.5, center2.z+23,     Math.PI/2, 0,      ceilingMat1);
  createPlane(172, 8,     21, 1,    center2.x+19, center2.y+0.5, center2.z+23,     Math.PI/2, 0,      ceilingMat2);

  //glass in Left Pathaways
  makeAHole(16,           172, 8, 1,      19,0,-23);
  createPlane(172, 8,     1, 1,     center2.x+19, center2.y+0.5, center2.z-23,     Math.PI/2, 0,      ceilingMat1);
  createPlane(172, 8,     21, 1,    center2.x+19, center2.y+0.5, center2.z-23,     Math.PI/2, 0,      ceilingMat2);

  // Coffin Hole in Egypt Room
  makeAHole(17,           8, 15, 10,     40,0,0);
  var holeMat = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load("./resources/Textures/grayMat.jpg") });
  // Black cover
  createPlane(8, 15, 1, 1,  40, -4, 0, -Math.PI / 2, 0,  holeMat);
  createBox( 8, 4, 0.05 ,   40, -2,  7.5, 0, 0, holeMat);
  createBox( 8, 4, 0.05 ,   40, -2, -7.5,0, 0, holeMat);
  createBox( 15, 4, 0.05 ,  44, -2, 0, 0, -Math.PI/2, holeMat);
  createBox( 15, 4, 0.05 ,  36, -2, 0, 0, -Math.PI/2, holeMat);
  // Glass box
  createPlane(8, 15, 1, 1,  40, 1, 0, -Math.PI / 2, 0,  glassMat);
  createBox( 8, 1, 0.2 ,   40, 0.5, 7.5, 0, 0, glassMat);
  createBox( 8, 1, 0.2 ,   40, 0.5, -7.5,0, 0, glassMat);
  createBox( 15, 1, 0.2 ,  44, 0.5, 0, 0, -Math.PI/2, glassMat);
  createBox( 15, 1, 0.2 ,  36, 0.5, 0, 0, -Math.PI/2, glassMat);

  // Writing man Stand
  createBox(3, 2, 3,   20, 1, -5);
  // Glass box
  createBox(3, 3, 3,   20, 3, -5, 0,0, glassMat);


  // Boat Stand
  createBox(3, 2, 5,   20, 1, 5);
  // Glass box
  createBox(3, 3, 5,   20, 3, 5, 0,0, glassMat);

  // Egypt room wall
  createBox(25, 10, 1,   30, 5, -15,         0, 0,            wallMat);
  createBox(41, 4, 1,   30, 8, -15,         0, 0,            wallMat);

  
  // Create Windows -------------------------------------------------------------------
  for (let j = 0; j<=1; j++)
    for (let i = -70; i <= 110; i+=45){
      makeAHole(j, 12, 6, 1, i, 0, 0);
      /*
      if(j==0)
        createPlane(12, 6,     1, 1,    i, 5, 30.5,     0, 0,      ceilingMat1);
      else
      createPlane(12, 6,     1, 1,    i, 5, -30.5,     0, 0,      ceilingMat1);
      */
    }

//Shader Projection Walls
createBox(30, 10, 0.1,   79, 5, -14.5,    0, 0,     shaderMat);
//console.log(objects.length);  //-> would be worldObjects[41] with plane collission, [33] without

createBox(53, 6, 1,   83.5, 3, 16,         0, 0,            wallMat);
createBox(60, 4, 1,   80, 8, 16,         0, 0,            wallMat);

createBox(24, 6, 1,   109.5, 3, 3.5,         0, -Math.PI/2,            wallMat);
createBox(31, 4, 1,   109.5, 8, 0,         0, -Math.PI/2,            wallMat);

const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 3), wallMat);
pole.position.set(80,8.5,11);
worldScene.add(pole);

}

//---------------------------------------- LOADING TEXTURES ----------------------------------------//
function LoadTextures(loadingManager) {
  const textureLoader = new THREE.TextureLoader(loadingManager);
  textureLoader.wrapS = textureLoader.wrapT = THREE.RepeatWrapping;
  
  /****FLOOR****/
  const floorBaseColor = textureLoader.load("./resources/Textures/wood_0018_2k_dNBL2j/wood_0018_base_color_2k.jpg", function(floorBaseColor){
    floorBaseColor.wrapS = floorBaseColor.wrapT = THREE.RepeatWrapping;
    floorBaseColor.offset.set( 0, 0 );
    floorBaseColor.repeat.set( 20, 5 );
  });
  
  const floorNormalMap = textureLoader.load("./resources/Textures/wood_0018_2k_dNBL2j/wood_0018_normal_2k.jpg", function(floorBaseColor){
    floorNormalMap.wrapS = floorBaseColor.wrapT = THREE.RepeatWrapping;
    floorNormalMap.offset.set( 0, 0 );
    floorNormalMap.repeat.set( 20, 5 );
  });
  
  const floorRoughnessMap = textureLoader.load("./resources/Textures/wood_0018_2k_dNBL2j/wood_0018_roughness_2k.jpg", function(floorBaseColor){
    floorRoughnessMap.wrapS = floorRoughnessMap.wrapT = THREE.RepeatWrapping;
    floorRoughnessMap.offset.set( 0, 0 );
    floorRoughnessMap.repeat.set( 20, 5 );
  });
  
  const floorAmbientOcculsionMap = textureLoader.load("./resources/Textures/wood_0018_2k_dNBL2j/wood_0018_ao_2k.jpg", function(floorBaseColor){
    floorAmbientOcculsionMap.wrapS = floorAmbientOcculsionMap.wrapT = THREE.RepeatWrapping;
    floorAmbientOcculsionMap.offset.set( 0, 0 );
    floorAmbientOcculsionMap.repeat.set( 20, 5 );
  });
  
  const floorMetallicMap = textureLoader.load("./resources/Textures/gray-granite-flecks-Metallic.png", function(floorBaseColor){
    floorMetallicMap.wrapS = floorMetallicMap.wrapT = THREE.RepeatWrapping;
    floorMetallicMap.offset.set( 0, 0 );
    floorMetallicMap.repeat.set( 20, 5 );
  });

  // Create ground material
  groundMat = new THREE.MeshStandardMaterial(
    {
      map: floorBaseColor,
      normalMap: floorNormalMap,
      roughnessMap: floorRoughnessMap,
      roughness: 0.5,
      aoMap: floorAmbientOcculsionMap,
      metalnessMap: floorMetallicMap,
      metalness: 0.5,
      // emissive: 0xffffff,
      // emissiveIntensity: 0.25,
      // refractionRatio: 1,
    });
  
  /****WALL****/
  const wallBaseColor = textureLoader.load("./resources/Textures/PaintedPlaster017_4K_Color.jpg", function(wallBaseColor){
    wallBaseColor.wrapS = wallBaseColor.wrapT = THREE.RepeatWrapping;
    wallBaseColor.offset.set( 0, 0 );
    wallBaseColor.repeat.set( 20, 10 );
  });
  const wallRoughness = textureLoader.load("./resources/Textures/PaintedPlaster017_4K_Roughness.jpg", function(wallRoughness){
    wallRoughness.wrapS = wallRoughness.wrapT = THREE.RepeatWrapping;
    wallRoughness.offset.set( 0, 0 );
    wallRoughness.repeat.set( 20, 10 );
  });
  const wallNormal = textureLoader.load("./resources/Textures/PaintedPlaster017_4K_NormalGL.jpg", function(wallNormal){
    wallNormal.wrapS = wallNormal.wrapT = THREE.RepeatWrapping;
    wallNormal.offset.set( 0, 0 );
    wallNormal.repeat.set( 20, 10 );
  });
  const wallDisplacement = textureLoader.load("./resources/Textures/PaintedPlaster017_4K_Displacement.jpg", function(wallDisplacement){
    wallDisplacement.wrapS = wallDisplacement.wrapT = THREE.RepeatWrapping;
    wallDisplacement.offset.set( 0, 0 );
    wallDisplacement.repeat.set( 20, 10 );
  });

  // Create wall material
  wallMat = new THREE.MeshStandardMaterial({
    map: wallBaseColor,
    normalMap: wallNormal,
    displacementMap: wallDisplacement,
    displacementScale: 0,
    roughnessMap: wallRoughness,
    roughness: 0.1,
  });

  // Create ceiling hole glass material
  ceilingMat1 = new THREE.MeshPhysicalMaterial( {
    color: 0xffffff,
    transmission: 0.8,  
    roughness: 0.1,
    opacity: 0.3,
    clearcoat: 0.3,
    clearcoatRoughness: 0,
    side: THREE.DoubleSide,
    reflectivity: 0.5,
  });
  

  cylinderMat = new THREE.MeshPhysicalMaterial( {
    color: 0xffffff,
    transmission: 1,  
    roughness: 0.1,
    opacity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0,
    side: THREE.BackSide,
    reflectivity: 0.5,
  });

  // Create RoomD cylinder material
  cylinderMat2 = new THREE.MeshLambertMaterial ( {
    color: 0x000000
  });

  // Create hole wireframe material
  ceilingMat2 = new THREE.MeshLambertMaterial({
    color: 'black',
    wireframe: true,
    wireframeLinewidth: 5,  //Any value beyond 1 is ignored by WebGL renderer
    wireframeLinejoin: 'round',
    wireframeLinecap: 'round',
  });

  // Create glass boxes material
  glassMat = new THREE.MeshPhysicalMaterial( {
    metalness: .9,
    roughness: .05,
    envMapIntensity: 0.9,
    clearcoat: 1,
    transparent: true,
    // transmission: .95,
    opacity: 0.2,
    reflectivity: 0.2,
    refractionRatio: 0.985,
    ior: 0.9,
    side: THREE.BackSide,
  });

  lineMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 100,
    linecap: 'round',
    linejoin:  'round'
  });

  //Shaders

 vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

fragmentShader = `
  #include <common>

  #define TIMESCALE 0.25 
  #define TILES 8
  #define COLOR 0.7, 1.6, 2.8 

  uniform vec3 iResolution;
  uniform float iTime;
  uniform sampler2D iChannel0;
  varying vec2 vUv;


  
  vec2 rotate(vec2 p, float a)
{
    float co = cos(a), si = sin(a);
    return p * mat2(co, si, -si, co);
}

vec2 scene(vec3 p, bool details)
{
    float v = 1e38;
    
    float wall = 3. - dot(vec2(abs(p.x), p.y), normalize(vec2(1., .3)));
    float floorr = p.y;
    v = min(v, wall);
    float srs = .8;
    float strut = max(wall - .5, abs(fract(p.z * srs) - .5) / srs - .1);
    v = min(v, strut);
    v = min(v, max(strut, floorr) - .1);
    
    v = min(v, max(strut - .1, abs(floorr - 2.) - .5));
    
    float hole = 1.2 - length(p.xz);
    v = min(v, max(floorr, hole));
    v = min(v, max(abs(floorr), abs(hole)) - .2);
    
    vec3 q = p + vec3(0., sin(iTime) * .1 - 1., 0.);
    float sphere = length(q) - .4;
    
    v = min(v, sphere);
    
    return vec2(v, step(sphere, v));
}

vec3 normal(vec3 p)
{
    float c = scene(p, true).x;
    vec2 h = vec2(.005, 0.);
    return normalize(vec3(scene(p + h.xyy, true).x - c, scene(p + h.yxy, true).x - c, scene(p + h.yyx, true).x - c));
}

vec4 trip(sampler2D sampler, vec3 nml, vec3 pos)
{
    vec3 b = abs(nml);
    b = pow(b, vec3(50.));
    b /= dot(b, vec3(1.));
    return texture(iChannel0, pos.yz) * b.x + texture(iChannel0, pos.xz) * b.y + texture(iChannel0, pos.xy) * b.z;
}

float softshadow( in vec3 ro, in vec3 rd, float mint, float k )
{
	float res = 1.0;
    float t = mint;
	for(int i = 0; i < 32; ++i)
	{
		float h = scene(ro + rd * t, false).x;
		if(h < 0.001)
			return 0.0;
		res = min(res, k * h / t);
		t += h;
	}
	return res;
}

float amb_occ(vec3 p, float h)
{
	float acc = 0.0;
	acc += scene(p + vec3(-h, -h, -h), false).x;
	acc += scene(p + vec3(-h, -h, +h), false).x;
	acc += scene(p + vec3(-h, +h, -h), false).x;
	acc += scene(p + vec3(-h, +h, +h), false).x;
	acc += scene(p + vec3(+h, -h, -h), false).x;
	acc += scene(p + vec3(+h, -h, +h), false).x;
	acc += scene(p + vec3(+h, +h, -h), false).x;
	acc += scene(p + vec3(+h ,+h, +h), false).x;
	return acc / h;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution.xy;
    uv = uv * 2. - 1.;
    uv.x *= iResolution.x / iResolution.y;

    vec3 rd = normalize(vec3(uv, 1.66));
    vec3 ro = vec3(0., 1., -2.);
    float tilt = sin(iTime * .1 + 1.5) * .2 + .2;
    ro.yz = rotate(ro.yz, tilt);
    rd.yz = rotate(rd.yz, tilt);
    
    ro.xz = rotate(ro.xz, sin(iTime * .1) * .5);
    rd.xz = rotate(rd.xz, sin(iTime * .1) * .5);
    
    float d = 0.;
    for(int i = 0; i < 60; ++i)
    {
        d += scene(ro + rd * d, false).x;
    }
    
    vec3 hit = ro + rd * d;
    vec3 nml = normal(hit);
    
    vec3 lpos1 = vec3(0.5, 2., 4.);
    
    float mtl = scene(hit, false).y;
    vec3 diffMap = vec3(0.);
    if(mtl < .5)
    {
        float k = .001;
        diffMap = trip(iChannel0, nml, hit * 1.111).xyz;
        vec3 diffMap2 = trip(iChannel0, nml, hit * 1.111 + vec3(.005)).xyz;
        nml = normalize(nml + (diffMap.x - diffMap2.x) * .7);
    }
    else
    {
        vec3 mov = hit + vec3(0., sin(iTime) * .1 - 1., 0.);
        //nml = normalize(nml + sin(hit * 200.) * .03);
        
        float k = .001;
        diffMap = trip(iChannel0, nml, mov * 1.111).xyz;
        vec3 diffMap2 = trip(iChannel0, nml, mov * 1.111 + vec3(.005)).xyz;
        nml = normalize(nml + (diffMap.x - diffMap2.x) * .7);
    }
    
	vec3 col = vec3(0.);// * exp(length(hit.xy - vec2(0., 1.)) * -1.) * exp(d * -.3);
    
    for(int i = 0; i < 2; ++i)
    {
        vec3 light = i == 1 ? lpos1 : vec3(cos(iTime * .4), 2., sin(iTime) + 1.);
        vec3 vLight = light - hit;
        vec3 lcol = i == 1 ? vec3(1, 1., .7) : vec3(.3, .7, 1.);
        float lfade = exp(length(vLight) * -1.3);
        vec3 diff = max(dot(nml, normalize(vLight)), 0.) * lfade * lcol;
        vec3 ref = reflect(rd, nml);
        float spec = pow(max(0., dot(normalize(vLight), ref)), 32.);

        vec3 ccol = vec3(1.);
        ccol *= pow(diffMap, vec3(2.));

        ccol *= diff;
        ccol += vec3(.4) * spec * lfade;
        
        col += ccol;
    }
    
    col *= smoothstep(-5., 1., amb_occ(hit, .15));
    
    //col = nml * .5 + .5;
    
    col += exp((7. - dot(rd, lpos1 - ro)) * -6.);// * softshadow(ro, normalize(lpos1 - ro), .1, 128.);
    
    float pt = iTime * .2;
    for(int i = 0; i < 20; ++i)
    {
        float pd = 2.;
        hit = ro + rd * pd;
        float h = float(i);
        if(d > pd)
        {
            col += exp(length(hit.xy - vec2(sin(h) * .4 + sin(pt + h) * .1, cos(pt + h) * .1 + fract(pt * .1 + cos(h)))) * -400.) * .05 * (1.1 + sin(h * 10.));
        }
    }
    
    col = sqrt(col);
    col *= 2.9;
    
    fragColor = vec4(col,1.0);
}


  void main() {
    mainImage(gl_FragColor, vUv * iResolution.xy);
  }
  `;

  uniforms = {
    iTime: { value: 0 },
    iResolution:  { value: new THREE.Vector3(1, 1, 1) },
  };

  shaderMat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
  });

}

function projection_animation(clock){
  time = clock.getElapsedTime();
  uniforms.iTime.value = time;
}

//---------------------------------------------------- CREATE OBJECTS FUNCTIONS -----------------------------------------------------//

//--------------------------- FOR CREATING WALLS ---------------------------//
/* Parameters: Width, Height, Depth, 
               Cartesian-Coordinates[x,y,z], 
               Rotation-Angle-Round-x-Axis, Rotation-Angle-Round-y-Axis, 
               Material */
function createBox(w, h, d, x, y, z, xRot, yRot, Material) {
  d = d || 0.75;
  Material = Material || wallMat;
  xRot = xRot || 0;
  yRot = yRot || 0;
  
  var wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), Material);

  wall.rotation.y =yRot;
  wall.rotation.x =xRot;    
  wall.position.copy(new THREE.Vector3(x, y, z));
  wall.castShadow = true;
  worldScene.add(wall);
  worldObjects.push(wall);
}

//--------------------- FOR CREATING GROUND OR CEILING ---------------------//
/* Parameters: ..... */
function createPlane(w, h, xSeg, ySeg, x, y, z, xRot, yRot, Material) {
  Material = Material || wallMat;
  xRot = xRot || 0;
  yRot = yRot || 0;

  var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(w, h, xSeg, ySeg), Material);
  plane.rotation.x =xRot;
  plane.rotation.y = yRot;
  plane.position.copy(new THREE.Vector3(x, y, z));
  plane.receiveShadow = true;
  worldScene.add(plane);
  //worldObjects.push(plane);
}

//---------------------- FOR CREATE WINDOWS AND HOLES ----------------------//
/* Parameters: Index of mesh in "worldObjects[]" Array, 
               Width, Height, Depth, 
               Cartesian-Coordinates[x,y,z] relative to the origin of geometry cut from */
function makeAHole(index, width, height, depth, x, y, z) {
  width = width || mesh.width/2;
  height = height || mesh.height/2;
  depth = depth || mesh.depth/2;
  x = x || 0;
  y = y || 0;
  z = z || 0;

  var oldMesh = worldObjects[index];
  oldMesh.updateMatrix();

  var hole = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), ceilingMat2);
  hole.position.copy(new THREE.Vector3(worldObjects[index].position.x + x, worldObjects[index].position.y + y, worldObjects[index].position.z + z));
  hole.rotation.copy(worldObjects[index].rotation);
  hole.updateMatrix();
  
  var csgMesh = CSG.fromMesh(oldMesh);
  var csgHole = CSG.fromMesh(hole);
  var csgKept = csgMesh.subtract(csgHole);
  
  var kept = CSG.toMesh(csgKept, worldObjects[index].matrix, worldObjects[index].material);
  kept.position.copy(new THREE.Vector3(worldObjects[index].position.x, worldObjects[index].position.y, worldObjects[index].position.z));
  kept.rotation.copy(worldObjects[index].rotation);
  kept.castShadow = true;
  kept.updateMatrix();

  worldScene.remove(worldObjects[index]);
  worldObjects[index] = kept;
  worldObjects[index].updateMatrix();
  worldScene.add(worldObjects[index]);
}

//---------------------- FOR CREATING SKYBOX ----------------------//
function createEnvironment(loadingManager)
{
  // Load the six sides of the skybox 
  worldScene.background = new THREE.CubeTextureLoader(loadingManager)
  .setPath('./resources/Environment/')
  .load(
    ['px.png',
    'nx.png',
    'py.png',
    'ny.png',
    'pz.png',
    'nz.png',
  ]);
}

//-------------------------------------------------------- DRAW CORSSHAIR --------------------------------------------------------//

function drawCrosshair(camera){
  var x = 0.003, y = 0.003;
  
  const points=[];
  points.push(new THREE.Vector3(0, y, 0));
  points.push(new THREE.Vector3(0, -y, 0));
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(x, 0, 0));    
  points.push(new THREE.Vector3(-x, 0, 0));

  const lineGeo = new THREE.BufferGeometry().setFromPoints( points );
  const crosshair = new THREE.Line( lineGeo, lineMat );
  crosshair.position.z = -0.3;

  camera.add( crosshair );
}

export {createWorld, LoadTextures, drawCrosshair, projection_animation};
