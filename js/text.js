import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

function addText(scene)
{
    const loader = new THREE.FontLoader();

    //-------------------------------------- CREATE TITLE --------------------------------------//
    loader.load('./resources/Fonts/Open Sans_Bold.json',
    function (font){

        // Set geometry
        const geometry = new THREE.TextGeometry ('2021 ART EXPO', {
            font: font,
            size: 0.6,
            height: 0.001,
            width: 1
        })

        // Set front and side colors
        const mesh = new THREE.Mesh(geometry,[
            new THREE.MeshPhongMaterial({color: 0x000000}),
            new THREE.MeshPhongMaterial({color: 0x000000}) ])

        mesh.castShadow = true
        mesh.position.x = -30.5
        mesh.position.y = 6
        mesh.position.z = -10
        mesh.rotation.y = - Math.PI/2

        scene.add(mesh);
    });

    //-------------------------------------- CREATE PARAGRAPH --------------------------------------//
    loader.load('./resources/Fonts/Open Sans_Regular.json',
    function (font){
        
        // Set geometry
        const geometry = new THREE.TextGeometry ("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been \n the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of \n type and scrambled it to make a type specimen book. It has survived not only five centuries,\n but also the leap into electronic typesetting, remaining essentially unchanged.",
        {
            font: font,
            size: 0.3,
            height: 0.001,
            width: 1

        })

        // Set front and side colors
        const mesh = new THREE.Mesh(geometry, [
            new THREE.MeshPhongMaterial({color: 0x000000}),
            new THREE.MeshPhongMaterial({color: 0x000000})])

        mesh.castShadow = true
        mesh.position.x = -30.5
        mesh.position.y = 5
        mesh.position.z = -10
        mesh.rotation.y = - Math.PI/2

        scene.add(mesh);
    });
}

export {addText};