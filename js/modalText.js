//--------------------------------- UPDATE TEXT IN THE HTML/CSS POPUP ---------------------------------
function setModalText(objName){
    var showModal=false;

    switch(objName) {
        case "boat":
            document.getElementById("title").innerHTML = "Khufu Ship"; 
            document.getElementById("description").innerHTML = "The Khufu ship is an intact full-size solar barque from ancient Egypt that was sealed into a pit around 2500 BC during the Fourth Dynasty of the Old Kingdom of Egypt at the foot of the Great Pyramid of pharaoh Khufu in the Giza pyramid complex." ; 
            document.getElementById("link").href = "https://en.wikipedia.org/wiki/Khufu_ship"; 
            showModal=true;
            break;
        case "WritingMan":
            document.getElementById("title").innerHTML = "The Seated Scribe"; 
            document.getElementById("description").innerHTML = "The sculpture of the Seated Scribe is a famous work of ancient Egyptian art. It represents a figure of a seated scribe at work. The sculpture was discovered at Saqqara, north of the alley of sphinxes leading to the Serapeum of Saqqara, and dated to the period of the Old Kingdom, from around the 5th Dynasty. It is now in the Louvre Museum in Paris." ; 
            document.getElementById("link").href = "https://en.wikipedia.org/wiki/The_Seated_Scribe"; 
            showModal=true;  
            break;
        case "coffin":
            document.getElementById("title").innerHTML = "Coffin of King Tutankhamun"; 
            document.getElementById("description").innerHTML = "Tutankhamun, also known worldwide as the Golden Pharaoh, was an 18th Dynasty king of the New Kingdom. He is best known for his intact tomb and treasured funerary collection. The King's mysterious death at a very young age has continued through the years to fascinate millions throughout the years." ; 
            document.getElementById("link").href = "https://egymonuments.gov.eg/news/gilded-coffin-of-king-tutankhamun/"; 
            showModal=true;  
            break;     
        case "wall":
            document.getElementById("title").innerHTML = "Hieroglyphs"; 
            document.getElementById("description").innerHTML = "The word hieroglyph literally means \"sacred carvings\". The Egyptians first used hieroglyphs exclusively for inscriptions carved or painted on temple walls. This form of pictorial writing was also used on tombs, sheets of papyrus, wooden boards covered with a stucco wash, potsherds and fragments of limestone." ; 
            document.getElementById("link").href = "https://en.wikipedia.org/wiki/Heliography"; 
            showModal=true;  
            break;     
        default:
            showModal=false;  
      }

    return showModal;
}

export {setModalText};