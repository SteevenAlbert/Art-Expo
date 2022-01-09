import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

const player_height = 2.7;
const tour_time = 200;	//in seconds to match clock's elapsed time
var time, curr_time, player_pos, lookAt_pos;

const player_path = new THREE.CatmullRomCurve3( [
	new THREE.Vector3(-120, player_height, 0),
	new THREE.Vector3( -110, player_height, 0),
	new THREE.Vector3( -95, player_height, 0),
	new THREE.Vector3( -95, player_height, -15),
	new THREE.Vector3( -65, player_height, -20),

	new THREE.Vector3( -65, player_height, 5),	
    new THREE.Vector3( -50, player_height, 5),
    new THREE.Vector3( -40, player_height, 5),
    new THREE.Vector3( -40, player_height, -20),

	new THREE.Vector3( 15, player_height, -15),

	new THREE.Vector3( 15, player_height, -10),
	new THREE.Vector3( 15, player_height, 11),
	new THREE.Vector3( 30, player_height, 11),
	new THREE.Vector3( 45, player_height, 11),
	new THREE.Vector3( 45, player_height, -10),
	new THREE.Vector3( 45, player_height, -20),

	new THREE.Vector3( 65, player_height, -20),
	new THREE.Vector3( 85, player_height, -20),
	new THREE.Vector3( 115, player_height, -20),

	new THREE.Vector3( 112, player_height, -12),
	new THREE.Vector3( 90, player_height, 2),
	new THREE.Vector3( 80, player_height, 12),
	new THREE.Vector3( 70, player_height, 12),
	new THREE.Vector3( 60, player_height, 12),
	new THREE.Vector3( 52.5, player_height, 15),

	new THREE.Vector3( 25, player_height, 20),
	new THREE.Vector3( 0, player_height, 20),

	new THREE.Vector3( 0, player_height, 10),
	new THREE.Vector3( -10, player_height, -9.5),
	new THREE.Vector3( -20, player_height, -9.5),
	new THREE.Vector3( -20, player_height, 20),

    new THREE.Vector3( -85, player_height, 20),
	new THREE.Vector3( -100, player_height, 0),
]);

const lookAt_path = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -90, 5, 2.5),
	new THREE.Vector3( -90, 5, 2.5),
	new THREE.Vector3( -70, 5, -15),
	new THREE.Vector3( -60, 5, 5),
	new THREE.Vector3( -60, 5, 25),	

	new THREE.Vector3( -60, 5, 10),	
	new THREE.Vector3( -60, 5, 0),	
	new THREE.Vector3( -40, 5, -15),	
    new THREE.Vector3( -30, 5, 15),

	new THREE.Vector3( 30, 5, -20),

	new THREE.Vector3( 60, 5, 20),
	new THREE.Vector3( 60, 5, -20),
	new THREE.Vector3( 30, 5, 0),
	new THREE.Vector3( 30, 5, -20),
	new THREE.Vector3( 0, -10, 0),
	new THREE.Vector3( 0, -10, -20),
				
	new THREE.Vector3( 45, 5, -20),
	new THREE.Vector3( 65, 5, -20),
	new THREE.Vector3( 85, 5, 0),
	new THREE.Vector3( 120, 5, 20),

	new THREE.Vector3( 110, 5, -10),
	new THREE.Vector3( 80, 5, -20),
	new THREE.Vector3( 80, 5, -30),
	new THREE.Vector3( 80, 5, -40),
	new THREE.Vector3( 80, 5, -50),
	new THREE.Vector3( 60, 5, 15),

	new THREE.Vector3( 10, 5, 20),
	new THREE.Vector3( 10, 5, 20),

	new THREE.Vector3( 10, 20, -70),
	new THREE.Vector3( -10, 20, -80),
	new THREE.Vector3( -30, 20, -90),
	new THREE.Vector3( -30, 20, -35),

    new THREE.Vector3( -115, 5, -15),
	new THREE.Vector3( -90, 5, 2.5),
] );

function cameraOnSpline(camera, cameraAndLight, clock){
    time = clock.getElapsedTime();
	
	if(time.toFixed(1)>=tour_time){
		return false;
	}
		
    curr_time = (time % tour_time)/ tour_time;

    player_pos = player_path.getPointAt(curr_time);
	lookAt_pos = lookAt_path.getPointAt(curr_time);

    cameraAndLight.position.copy(player_pos);
    camera.lookAt(lookAt_pos);
}


export{ cameraOnSpline };