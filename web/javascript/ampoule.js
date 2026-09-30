//
// Nom : ampoule.js
// Date et auteur : Alban G 30/09/2026
//
// Description :
//		Allumer ou éteindre l'ampoule
//		
//


// Fonction OnOffAmpoule :
//		- appelée par un événement javascript depuis une page html (comme "onclick")
//      - alterne l'état de l'ampoule
function OnOffAmpoule()
{
     var image = document.getElementById("myImage");

  if (image.src.search("pic_bulboff") !== -1) {
    image.src = "./images/pic_bulbon.gif";
  } else {
    image.src = "./images/pic_bulboff.gif";
  }
}