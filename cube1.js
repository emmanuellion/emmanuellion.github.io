// Instanciation d'une nouvelle scene
// https://threejs.org/docs/#api/en/scenes/Scene
const visualisation = new THREE.Scene();

// Initialisation de la caméra
// plus la valeur du premier paramètre est élevée plus la forme nous apparait proche.
// TODO voir la doc pour comprendre les autres paramètres.
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Instanciation du moteur de rendu
const rendu = new THREE.WebGLRenderer();
rendu.setSize( window.innerWidth, window.innerHeight );
// La Ligne suivante placera le visualisateur dans le body
//document.body.appendChild( renderer.domElement );

// Nous on veut que le visualiseur soit intégré à une balise div.
// Dans le html, il y a donc une balise div portant un id="visu"
document.getElementById('visu').appendChild(rendu.domElement);
			
// création d'une instance de forme géométrique je lui ai mis en paramètre 3 valeurs : La largeur, la hauteur et la profondeur
// On peut également régler d'autres paramètres optionnels.
// je vous conseille d'éplucher la doc, car une fois qu'on connait les fonctions existantes, tout devient plus clair
// Ci joint le lien vers la "classe" (ou plutôt l'objet ?) BoxGeometry
// https://threejs.org/docs/#api/en/geometries/BoxGeometry
const forme = new THREE.BoxGeometry( 1, 1, 1);

// Définition de son apparence, ici on choisit une forme de texture lisse, de couleur unie verte
// par défaut wireframe est initialisé à false, si on ne précise rien de plus que la couleur on obtient donc une forme pleine
// on peut préciser en paramètre wireframe: true , ce qui affichera uniquement les arêtes de la forme
// https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
const texture = new THREE.MeshBasicMaterial( { color: 0x13d376 } );

// Instanciation d'une forme cubique
// https://threejs.org/docs/#api/en/objects/Mesh
const cube = new THREE.Mesh( forme, texture );

// Ajout de notre forme à la scene.
visualisation.add( cube );

// Positionnement de l'angle de la caméra sur l'axe de la profondeur
// plus la valeur est élevée plus la forme nous apparait loin
camera.position.z = 5;
			
// Pour animer la forme automatiquement avec une rotation.
// Il doit donc être possible de définir des rotation à la souris
function animation() 
{
	var x = window.clientX, y = window.clientY;
	console.log(x,y);
	requestAnimationFrame( animation );
	cube.rotation.x += x%0.001;
	cube.rotation.y += y%0.001;
	rendu.render( visualisation, camera );
}

animation();

