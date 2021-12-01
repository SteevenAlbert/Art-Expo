import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';


const listener = new THREE.AudioListener();
//camera.add( listener );
const sound = new THREE.Audio( listener );
const audioLoader = new THREE.AudioLoader();
function loadMainTheme(){
    audioLoader.load( 'resources/Audio/Hopeful.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
        sound.play();
    });
}




export {loadMainTheme};