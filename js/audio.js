import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { turnLightOff, turnLightOn } from './lights.js';
var track1Playing = false;
var track2Playing = false;
var track3Playing = false;
var EgyptianSongPlaying = false;
var ProjectionTrackPlaying = false;
var currentSource = "none";
var audio = new Audio();

//--------------------------- ROOM D AUDIO CONTROL ---------------------------
function controlAudio(audio, trackName){
    console.log(trackName);
    if(trackName=="Audio1"){
        turnLightOff();
        if(currentSource!="Audio1"){
            audio.src="./resources/Audio/audio.mp3";
        //    audio2.src="./resources/Audio/audio.mp3";
        }
        if(track1Playing==false){
        //    audio2.play();
            audio.play();
            console.log(audio);
            track1Playing=true;
            track2Playing=false;
            track3Playing=false;
            currentSource=trackName;
        }else{
            turnLightOn();
            audio.pause();
        //    audio2.pause();
            track1Playing=false;
        }
    }

    if(trackName=="Audio2"){
        turnLightOff();
        if(currentSource!="Audio2"){
            audio.src="./resources/Audio/audio2.mp3";
        //  audio2.src="./resources/Audio/audio2.mp3";
        }
        if(track2Playing==false){
            //audio2.play();
            audio.play();
            track2Playing=true;
            track1Playing=false;
            track3Playing=false;
            currentSource=trackName;
        }else{
            turnLightOn();
            audio.pause();
        //  audio2.pause();
            track2Playing=false;
        }
    }

    if(trackName=="Audio3"){
        turnLightOff();
        if(currentSource!="Audio3"){
            audio.src="./resources/Audio/audio3.mp3";
        //  audio2.src="./resources/Audio/audio3.mp3";
        }
        if(track3Playing==false){
            audio.play();
        //  audio2.play();
            
            console.log(audio);
            track3Playing=true;
            track1Playing=false;
            track2Playing=false;
            currentSource=trackName;
        }else{
            turnLightOn();
            audio.pause();
        //    audio2.pause();
            track3Playing=false;
        }
    }
}

//--------------------------- PLAY AND PAUSE EGYPTIAN SONG ---------------------------
function playEgyptianSong(){
    if(currentSource!="EgyptianSong"){
        audio.src="./resources/Audio/EgyptianSong.mp3";   
        currentSource="EgyptianSong";
    }
    if(EgyptianSongPlaying==false){
        audio.play();
        EgyptianSongPlaying=true;
    }
}


function stopEgyptianSong(){
    audio.pause();
    EgyptianSongPlaying=false;
}

//--------------------------- PLAY AND PAUSE SHADERS ROOM SONG ---------------------------
function playProjectionTrack(){
    if(currentSource!="ProjectionTrack"){
        audio.src="./resources/Audio/ProjectionTrack.mp3";   
        currentSource="ProjectionTrack";
    }
    if(ProjectionTrackPlaying==false){
        audio.play();
        ProjectionTrackPlaying=true;
    }
}

function stopProjectionTrack(){
    audio.pause();
    ProjectionTrackPlaying=false;
}


export {controlAudio, playEgyptianSong, stopEgyptianSong, playProjectionTrack, stopProjectionTrack};