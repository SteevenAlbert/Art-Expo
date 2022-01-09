import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

function addText(scene)
{
    const loader = new THREE.FontLoader();

    //-------------------------------------- EGYPT ROOM --------------------------------------//
    loader.load('./resources/Fonts/Open Sans_Bold.json',
    function (font){

        // Set geometry
        const geometry = new THREE.TextGeometry ('EGYPT 3150 BC', {
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
        mesh.position.x = 49.5
        mesh.position.y = 6
        mesh.position.z = -10
        mesh.rotation.y = - Math.PI/2

        scene.add(mesh);
    });

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
        mesh.position.x = 49.5
        mesh.position.y = 5
        mesh.position.z = -10
        mesh.rotation.y = - Math.PI/2

        scene.add(mesh);
    });

    //-------------------------------------- THE ART OF SOUND ROOM --------------------------------------//


    loader.load('./resources/Fonts/Open Sans_Bold.json',
    function (font){

        // Set geometry
        const geometry = new THREE.TextGeometry ('THE ART OF SOUND', {
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
        mesh.position.x = -29.5
        mesh.position.y = 6
        mesh.position.z = 14
        mesh.rotation.y =  Math.PI/2

        scene.add(mesh);
    });

    
    loader.load('./resources/Fonts/Open Sans_Regular.json',
    function (font){   
        // Set geometry
        const geometry = new THREE.TextGeometry ("Music is physical, and this room is all about visualizing the liveness of music.  \n Click on a canvas to start/stop playing. Make sure to try the Positional Audio too! \n ",
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
        mesh.position.x = -29.5
        mesh.position.y = 5
        mesh.position.z = 14
        mesh.rotation.y = Math.PI/2

        scene.add(mesh);
    });

    loader.load('./resources/Fonts/Open Sans_Bold.json',
    function (font){

        // Set geometry
        const geometry = new THREE.TextGeometry ('Wolfgang\nAmadeus Mozart', {
            font: font,
            size: 0.3,
            height: 0.001,
            width: 1
        })

        // Set front and side colors
        const mesh = new THREE.Mesh(geometry,[
            new THREE.MeshPhongMaterial({color: 0x000000}),
            new THREE.MeshPhongMaterial({color: 0x000000}) ])
         
        mesh.castShadow = true
        mesh.position.x = -23.5
        mesh.position.y = 4.4
        mesh.position.z = -14.4
       

        scene.add(mesh);
    });
    loader.load('./resources/Fonts/Open Sans_Bold.json',
    function (font){

        // Set geometry
        const geometry = new THREE.TextGeometry ('Italian Resistance', {
            font: font,
            size: 0.3,
            height: 0.001,
            width: 1
        })

        // Set front and side colors
        const mesh = new THREE.Mesh(geometry,[
            new THREE.MeshPhongMaterial({color: 0x000000}),
            new THREE.MeshPhongMaterial({color: 0x000000}) ])
         
        mesh.castShadow = true
        mesh.position.x = 0.5
        mesh.position.y = 4.4
        mesh.position.z = -14.4
       

        scene.add(mesh);
    });

    loader.load('./resources/Fonts/Open Sans_Bold.json',
    function (font){

        // Set geometry
        const geometry = new THREE.TextGeometry ('8-Bit Music', {
            font: font,
            size: 0.3,
            height: 0.001,
            width: 1
        })

        // Set front and side colors
        const mesh = new THREE.Mesh(geometry,[
            new THREE.MeshPhongMaterial({color: 0x000000}),
            new THREE.MeshPhongMaterial({color: 0x000000}) ])
         
        mesh.castShadow = true
        mesh.position.x = -12
        mesh.position.y = 2.6
        mesh.position.z = -14.5
       

        scene.add(mesh);
    });

    loader.load('./resources/Fonts/Open Sans_Regular.json',
    function (font){   
        // Set geometry
        const geometry = new THREE.TextGeometry ("Symphony No.40 in Gminor,\nK.550 IV. Finale (Allegro assai).",
        {
            font: font,
            size: 0.2,
            height: 0.001,
            width: 1

        })

        // Set front and side colors
        const mesh = new THREE.Mesh(geometry, [
            new THREE.MeshPhongMaterial({color: 0x000000}),
            new THREE.MeshPhongMaterial({color: 0x000000})])

        mesh.castShadow = true
        mesh.position.x = -23.5
        mesh.position.y = 3.4
        mesh.position.z = -14.4


        scene.add(mesh);
    });

    loader.load('./resources/Fonts/Open Sans_Regular.json',
    function (font){   
        // Set geometry
        const geometry = new THREE.TextGeometry ("Bella ciao - An Italian protest\n folk song from the late 19th century,\noriginally sung by the mondina workers\n in protest to the harsh working \nconditions in the paddy fields of\n northern Italy. (EDM Remix)",
        {
            font: font,
            size: 0.2,
            height: 0.001,
            width: 1

        })

        // Set front and side colors
        const mesh = new THREE.Mesh(geometry, [
            new THREE.MeshPhongMaterial({color: 0x000000}),
            new THREE.MeshPhongMaterial({color: 0x000000})])

        mesh.castShadow = true
        mesh.position.x = 0.5
        mesh.position.y = 3.8
        mesh.position.z = -14.4


        scene.add(mesh);
    });

    //---------------------------------------------------PROJECTION ROOM--------------------------------------------------//
    
    loader.load('./resources/Fonts/Open Sans_Bold.json',
    function (font){

        const geometry = new THREE.TextGeometry ('THE SHADERS SHOW', {
            font: font,
            size: 1,
            height: 0.001,
            width: 1
        })

        const mesh = new THREE.Mesh(geometry,[
            new THREE.MeshPhongMaterial({color: 0x000000}),
            new THREE.MeshPhongMaterial({color: 0x000000}) ])

        mesh.castShadow = true
        mesh.position.x = 50.5
        mesh.position.y = 6
        mesh.position.z = 10
        mesh.rotation.y =  Math.PI/2

        scene.add(mesh);
    });
  
    loader.load('./resources/Fonts/Open Sans_Regular.json',
    function (font){   
        const geometry = new THREE.TextGeometry ("Where art is known to be moving- quite literally.",
        {
            font: font,
            size: 0.5,
            height: 0.001,
            width: 1

        })

        const mesh = new THREE.Mesh(geometry, [
            new THREE.MeshPhongMaterial({color: 0x000000}),
            new THREE.MeshPhongMaterial({color: 0x000000})])

        mesh.castShadow = true
        mesh.position.x = 50.5
        mesh.position.y = 5
        mesh.position.z = 10
        mesh.rotation.y = Math.PI/2

        scene.add(mesh);
    });
}

export {addText};