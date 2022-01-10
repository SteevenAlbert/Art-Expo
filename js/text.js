import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

function addText(scene)
{
    const loader = new THREE.FontLoader();
    //-------------------------------------- ROOM A --------------------------------------//
    loader.load('./resources/Fonts/Open Sans_Bold.json',
    function (font){
        const geometry = new THREE.TextGeometry ('2022 ART EXPO',
        {
            font: font,
            size: 0.6,
            height: 0.001,
            width: 1

        })

        const mesh = new THREE.Mesh(geometry,
            [
                new THREE.MeshPhongMaterial({color: 0x000000}),
                new THREE.MeshPhongMaterial({color: 0x000000})
            ])

            mesh.castShadow = true
            mesh.position.x = -31.5
            mesh.position.y = 7
            mesh.position.z = -8
            mesh.rotation.y = - Math.PI/2

            scene.add(mesh);
    });

    loader.load('./resources/Fonts/Open Sans_Regular.json',
    function (font){
        const geometry = new THREE.TextGeometry ("Our virtual tour showcases advanced graphical\ntechniques combined with an exceptional audio\nexperience to engage all your senses.\n\nCredits:\nBasma Dessouky    Judy Khairalla\nRana Raafat             Steven Albert",
        {
            font: font,
            size: 0.3,
            height: 0.001,
            width: 1

        })

        const mesh = new THREE.Mesh(geometry,
            [
                new THREE.MeshPhongMaterial({color: 0x000000}),
                new THREE.MeshPhongMaterial({color: 0x000000})
            ])

            mesh.castShadow = true
            mesh.position.x = -31.5
            mesh.position.y = 6
            mesh.position.z = -8
            mesh.rotation.y = - Math.PI/2

            scene.add(mesh);
    });
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
        const geometry = new THREE.TextGeometry ("The pharaohs began ruling Egypt in 3000 B.C., when Upper and Lower Egypt were united. \nDuring the Old Kingdom (2575-2134 B.C.), they considered themselves to be living gods who \nruled with absolute power. They built pyramids as testimony of \ntheir greatness but left no official records of \ntheir achievements.",
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