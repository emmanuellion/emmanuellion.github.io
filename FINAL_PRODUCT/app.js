import * as THREE from "https://threejs.org/build/three.module.js";
import {OrbitControls} from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
// var mesh, rendu, visualisation, camera, controls;

// Instanciation du moteur de rendu
const rendu = new THREE.WebGLRenderer();
const visualisation = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const light = new THREE.DirectionalLight(0xffffff, 0.5);
const controls = new OrbitControls(camera, rendu.domElement);
init_THREE();

function init_THREE() {
	const ratio = 2;
	rendu.setSize(window.innerWidth/ratio, window.innerHeight/ratio);
	rendu.setPixelRatio(window.devicePixelRatio);
	// La Ligne suivante placera le visualisateur dans le body
	// document.body.appendChild( rendu.domElement );

	// Nous on veut que le visualiseur soit intégré à une balise div.
	// Dans le html, il y a donc une balise div portant un id="visu2"

	// Instanciation d'une nouvelle scene
	// https://threejs.org/docs/#api/en/scenes/Scene

	visualisation.background = new THREE.Color(0x76B9CE); // changement de couleur de la scene

	// Initialisation de la caméra
	// plus la valeur du premier paramètre est élevée plus la forme nous apparait proche.
	// TODO voir la doc pour comprendre les autres paramètres.

	// position par défaut de la caméra
	let default_pos = 5;
	camera.position.set(default_pos, default_pos, default_pos);

	visualisation.add(ambientLight);

	//ajout d'une lumiere directionnelle a la scene

	light.position.set(default_pos, default_pos, default_pos);
	visualisation.add(light);

	// Pour faire apparaitre les axes
	visualisation.add(new THREE.AxesHelper(20));
}

var input = document.getElementById('formFile');
var ar;
// Ouverture d'un fichier au format .dv via l'api Fetch
input.addEventListener('change', () => {
	var color = Array();
	color[0] = '0x';
	var test = 0;
	fetch("DV/" + input.files[0].name)
		.then(response => response.text()) // On récupère la réponse pour l'interpréter sous format text
		.then(text => {
			// Lecture  du fichier dv
			var ite = 1;
			var boucle = 0;
			var temp = new Array(8); // Tableau contenant les paires alpha - blue - green - red
			var init = ["D", "V", "2", " ", "3", " ", "2", " ", "2", " ", "2", " ", "3", "2", ""]; //en-tête à exclure
			Array.from(text).forEach(el => {
				if (ite > init.length) { //Si nous avons dépassé l'en-tête
					if (boucle < 8) {
						temp.push(el); //Je stocke les possibles valeurs de alpha - blue - green - red
						boucle++;
					}
					if (boucle == 8) { //Si nous avons stocké toutes les valeurs de alpha - blue - green - red
						var old = ""; //Variable stockant la première valeur d'uen paire en héxa
						temp.forEach(el => {
							if (el != "0") { //Si la deuxième valeur de la paire en héxa n'est pas égale à 0
								if (old != "0") { //Si la première valeur de la paire en héxa n'est pas égale à 0
									old += el.codePointAt(0).toString(16); //encodage acceptant l'hexa

									//opérateur ternaire => se référer à Swann le gros bg
									color.push((old.slice(0, 2) == "0" || old.slice(0, 2) == "1" || old.slice(0, 2) == "2" || old.slice(0, 2) == "3" || old.slice(0, 2) == "4" || old.slice(0, 2) == "5" || old.slice(0, 2) == "6" || old.slice(0, 2) == "7" || old.slice(0, 2) == "8" || old.slice(0, 2) == "9" || old.slice(0, 2) == "a" || old.slice(0, 2) == "b" || old.slice(0, 2) == "c" || old.slice(0, 2) == "d" || old.slice(0, 2) == "e" || old.slice(0, 2) == "f" ? "0" + old.slice(0, 2) : old.slice(0, 2)));
									//--------------------------------------

									test++;
									old = ""; //reset de la variable
								} else {
									old = el;
								}
							}
						})
						//Réinitialisation du tableau alpha - blue - green - red
						temp = new Array(8);
						boucle = 0;
						//-------------------------------------------------------
					}
				}
				ite++;
			});
			ar = color;
			construct_mesh();
		})
	document.getElementById('visu2').innerHTML = "";
	document.getElementById('visu2').appendChild(rendu.domElement);
});


const size = 2; // largeur, longueur et profondeur de la structure (cube)
const ray = 0.05; // Rayon des points centraux / dans les coins
const decale = 0.5; // Décalage pour que ce soit aligné sur les axes
var tab = table(size); // Initialisation d'un tableau à 3 dimensions de la taille voulu
var map = table(size); // Initialisation d'une map contenant la position de chaque Mesh
var point_corner = table(size); // Initialisation d'un tableau contenant tous les points de coins pour chaque Mesh
var point_middle = table(size); // Initialisation d'un tableau contenant tous les points du milieu pour chaque Mesh
var map_point_visible = table(size);
var texture;
point_corner.forEach(el => {
	el = new Array(8); // Crée un tableau de 8 valeurs correspondant au 8 coins d'une forme
})
const coordinate = {
	x: 0,
	y: 0,
	z: 0
};
map.forEach(el => {
	el = coordinate;
});


function construct_mesh() {
	var ite_color = 1;
	// Triple boucle pour pouvoir créer des formes dans un espace à 3 dimensions
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			for (var k = 0; k < size; k++) {
				let voxel_color = parseInt(ar[0] /*+ar[ite_color]*/ + ar[ite_color + 3] + ar[ite_color + 2] + ar[ite_color + 1]); // fait toute les couleur
				if (ar[ite_color] == "00" && ar[ite_color + 1] == "00" && ar[ite_color + 2] == "00" && ar[ite_color + 3] == "00") {
					texture = new THREE.MeshPhongMaterial({
						wireframe: true
					}); //mettre la couleur dans texture
				} else {
					texture = new THREE.MeshPhongMaterial({
						color: voxel_color
					}); //mettre la couleur dans texture
				}
				//point_corner[i][j][k] = new Array(8); // Crée un tableau de 8 valeurs correspondant au 8 coins d'une forme

				// création d'une instance de forme géométrique je lui ai mis en paramètre 3 valeurs : La largeur, la hauteur et la profondeur
				// On peut également régler d'autres paramètres optionnels.
				// je vous conseille d'éplucher la doc, car une fois qu'on connait les fonctions existantes, tout devient plus clair
				// Ci joint le lien vers la "classe" (ou plutôt l'objet ?) BoxGeometry
				// https://threejs.org/docs/#api/en/geometries/BoxGeometry
				tab[i][j][k] = new THREE.BoxGeometry(1, 1, 1);


				// Instanciation d'une forme cubique
				// https://threejs.org/docs/#api/en/objects/Mesh
				tab[i][j][k] = new THREE.Mesh(tab[i][j][k], texture);

				tab[i][j][k].material.needsUpdate = true;
				//tab[i][j][k].castShadow = true;
				//tab[i][j][k].receiveShadow = true;	

				// Ajout de notre forme à la scene.
				visualisation.add(tab[i][j][k]);
				map[i][j][k].x = i;
				map[i][j][k].y = j;
				map[i][j][k].z = k;

				// Positionnement de la forme dans la scene
				tab[i][j][k].translateX(i + decale);
				tab[i][j][k].translateY(j + decale);
				tab[i][j][k].translateZ(k + decale);

				// voxel_couleur

				//console.log(voxel_color);
				// Initialisation des points dans les coins et centraux
				create_point_middle(i, j, k, voxel_color, ite_color);
				create_point_corner(i, j, k, voxel_color, ite_color);

				ite_color += 4;
			}
		}
	}
	// Cache les points initialisé par défaut (ils seront affichés via l'utilisation de l'option associée)
	show_point_de_croute(false);
	show_point_middle(false);
}


// Fonctione initialisant un tableau à 3 dimensions d'une taille voulu
function table(size) {
	let tmp = new Array(size);
	for (let i = 0; i < size; i++) {
		tmp[i] = new Array(size);
		for (let j = 0; j < size; j++) {
			tmp[i][j] = new Array(size);
			for (let k = 0; k < size; k++) {
				tmp[i][j][k] = new Array(size);
			}
		}
	}
	return tmp;
}


function animation() {
	requestAnimationFrame(animation);
	controls.update();
	rendu.render(visualisation, camera);
	let dir = camera;
	let x = dir.position.x;
	let y = dir.position.y;
	let z = dir.position.z;
	light.position.set(x, y, z);
}

animation();


function create_point_middle(i, j, k, voxel_color, ite_color) {
	if (voxel_color == 0x000000) {
		texture = new THREE.MeshPhongMaterial({
			wireframe: true
		});
	} else {
		texture = new THREE.MeshPhongMaterial({
			color: voxel_color
		});
	}
	var tmp = new THREE.Mesh(new THREE.SphereGeometry(ray, 10, 10), texture);
	tmp.translateX(i + decale);
	tmp.translateY(j + decale);
	tmp.translateZ(k + decale);
	visualisation.add(tmp);
	point_middle[i][j][k] = tmp;
}

function create_point_corner(i, j, k, voxel_color) {
	map_point_visible[i][j][k] = true;
	if (voxel_color == 0x000000) {
		texture = new THREE.MeshPhongMaterial();
		map_point_visible[i][j][k] = false;
	} else {
		texture = new THREE.MeshPhongMaterial({
			color: voxel_color
		});
	}
	var tmp = new THREE.Mesh(new THREE.SphereGeometry(ray, 10, 10), texture);
	tmp.translateX(i);
	tmp.translateY(j);
	tmp.translateZ(k);
	visualisation.add(tmp);
	point_corner[i][j][k][0] = tmp;

	tmp = new THREE.Mesh(new THREE.SphereGeometry(ray, 10, 10), texture);
	tmp.translateX(i + 1);
	tmp.translateY(j);
	tmp.translateZ(k);
	visualisation.add(tmp);
	point_corner[i][j][k][1] = tmp;

	tmp = new THREE.Mesh(new THREE.SphereGeometry(ray, 10, 10), texture);
	tmp.translateX(i);
	tmp.translateY(j + 1);
	tmp.translateZ(k);
	visualisation.add(tmp);
	point_corner[i][j][k][2] = tmp;

	tmp = new THREE.Mesh(new THREE.SphereGeometry(ray, 10, 10), texture);
	tmp.translateX(i);
	tmp.translateY(j);
	tmp.translateZ(k + 1);
	visualisation.add(tmp);
	point_corner[i][j][k][3] = tmp;

	tmp = new THREE.Mesh(new THREE.SphereGeometry(ray, 10, 10), texture);
	tmp.translateX(i + 1);
	tmp.translateY(j + 1);
	tmp.translateZ(k);
	visualisation.add(tmp);
	point_corner[i][j][k][4] = tmp;

	tmp = new THREE.Mesh(new THREE.SphereGeometry(ray, 10, 10), texture);
	tmp.translateX(i);
	tmp.translateY(j + 1);
	tmp.translateZ(k + 1);
	visualisation.add(tmp);
	point_corner[i][j][k][5] = tmp;

	tmp = new THREE.Mesh(new THREE.SphereGeometry(ray, 10, 10), texture);
	tmp.translateX(i + 1);
	tmp.translateY(j);
	tmp.translateZ(k + 1);
	visualisation.add(tmp);
	point_corner[i][j][k][6] = tmp;

	tmp = new THREE.Mesh(new THREE.SphereGeometry(ray, 10, 10), texture);
	tmp.translateX(i + 1);
	tmp.translateY(j + 1);
	tmp.translateZ(k + 1);
	visualisation.add(tmp);
	point_corner[i][j][k][7] = tmp;
}

function show_point_de_croute(show) {
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			for (let k = 0; k < size; k++) {
				for (let l = 0; l < 8; l++) {
					if (show) {
						if (map_point_visible[i][j][k]) {
							point_corner[i][j][k][l].visible = true;
						}
					} else {
						point_corner[i][j][k][l].visible = false;
					}
				}
			}
		}
	}
}

function show_point_middle(show) {
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			for (let k = 0; k < size; k++) {
				if (show) {
					if (map_point_visible[i][j][k]) {
						point_middle[i][j][k].visible = true;
					}
				} else {
					point_middle[i][j][k].visible = false;
				}
			}
		}
	}
}

function show_mesh(hide) {
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			for (let k = 0; k < size; k++) {
				if (hide) {
					tab[i][j][k].visible = true;
				} else {
					tab[i][j][k].visible = false;
				}
			}
		}
	}
}

/*
==============================================================================================================================
==============================================================================================================================
==============================================================================================================================
==============================================================================================================================
==============================================================================================================================
==============================================================================================================================
==============================================================================================================================
==============================================================================================================================
*/


const li_p = document.getElementsByClassName("li_p")[0];
const li_c = document.getElementsByClassName("li_c")[0];
const li_g = document.getElementsByClassName("li_g")[0];
const is_point_middle = document.getElementById("point_middle");
const is_point_de_croute = document.getElementById("point_de_croute");
const is_point_normal = document.getElementById("point_normal");
is_point_normal.checked = true;

function set_wireframe(on) {
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			for (var k = 0; k < size; k++) {
				if (on) {
					tab[i][j][k].material.wireframe = true;
				} else {
					tab[i][j][k].material.wireframe = false;
				}
			}
		}
	}
}

is_point_middle.addEventListener('click', () => {
	if (is_point_de_croute.checked == true || is_point_normal.checked == true) {
		if (is_point_de_croute.checked == true) {
			is_point_de_croute.checked = false;
			show_point_de_croute(false);
		} else {
			is_point_normal.checked = false;
			show_mesh(false);
		}
		show_point_middle(true);
	} else {
		is_point_middle.checked = true;
	}
});

is_point_de_croute.addEventListener('click', () => {
	if (is_point_middle.checked == true || is_point_normal.checked == true) {
		if (is_point_middle.checked == true) {
			is_point_middle.checked = false;
			show_point_middle(false);
		} else {
			is_point_normal.checked = false;
			show_mesh(false);
		}
		show_point_de_croute(true);
	} else {
		is_point_de_croute.checked = true;
	}
});

is_point_normal.addEventListener('click', () => {
	if (is_point_de_croute.checked == true || is_point_middle.checked == true) {
		if (is_point_de_croute.checked == true) {
			is_point_de_croute.checked = false;
			show_point_de_croute(false);
		} else {
			is_point_middle.checked = false;
			show_point_middle(false);
		}
		show_mesh(true);
	} else {
		is_point_normal.checked = true;
	}
});


/*
===
===
===
===
*/


var active = "";

li_p.addEventListener('click', () => {
	open("point");
	active = "point";
});

li_c.addEventListener('click', () => {
	open("chroma");
	active = "chroma";
});

li_g.addEventListener('click', () => {
	open("gray");
	active = "gray";
});

function open(div) {
	const win = document.getElementsByClassName(div)[0];
	win.style.display = "flex";
}

function close(div) {
	if (active != "") {
		const win = document.getElementsByClassName(div)[0];
		win.style.display = "none";
	}
}

document.getElementsByTagName("html")[0].addEventListener("mousedown", (event) => {
	if (event.target.offsetParent != null) {
		let split = event.target.offsetParent.className.split(' ')[1];
		if (event.target.className.split(' ')[1] != active) {
			if (split == undefined) {
				close(active);
			}
		}
	} else {
		close(active);
	}
});


// function tmp(){
// 	const f = document.getElementById("file");
// 	console.log(f.files);
// }


/*===================================================== 
================Travail en cours Suzy==================
=======================================================

// Création d'un Object Color
// Prend en parametre 4 valeurs
// a pour l'alpha, r pour le rouge, g pour le vert, b pour le bleu
function Color(a,r,g,b)
{
    // Construction
    this.alpha = a;
    this.red = r;
    this.green = g;
    this.blue = b;

	 // Lorsque l'on gèrera les différents affichage de couleur, on aura besoin de manipuler des objets de type Color
	 // d'où la classe Color en plus de la classe Voxel
    // Fonction pour multiplier un double avec une couleur
    // retourne un Objet Color
    this.operation_multiplication = function (dec,c1)
    {
        var col = new Color(dec*(c1.alpha),dec*(c1.red),dec*(c1.green),dec*(c1.blue));
        return col;
    };

    // Fonction pour additionner un double avec une couleur
    // retourne un Objet Color
    this.operation_addition = function (c1,c2)
    {
        var col = new Color((c1.alpha+c2.alpha),(c1.red+c2.red),(c1.green+c2.green),(c1.blue+c2.blue));
        return col;
    };
};
    

// Création d'un Object Voxel
// TODO à revoir
function Voxel(c)
{  
    // Construction
    this.color = c;
    // pour savoir si le voxel est plein (fill=true) ou vide (fill=false)
    if(c.alpha == 0 & c.red == 0 & c.green == 0 & c.blue == 0)
    {
        this.fill = false;
    }
    else
    {
        this.fill = true;
    }
};

// Création d'un Objet Image3d
function Image3d (w,h,p)
{
    // Construction
    this.width = w;                     // largeur
    this.height = h;                    // hauteur
    this.depth = p;                     // profondeur
    this.data_vox = new Array(w*h*p);   // Tableau de voxels

    // Fabrique une nouvelle scene d'après la lecture d'un fichier au format .dv
    this.readDV = function (???) // Récupérer donnée à partir de la lecture de swann
    {
        // TODO en cours
        var format;             // vérifier que c'est "DV2"
        var dim;                // vérifier que c'est 3 pour 3D
        var size;               //  {w:2, h:2, d:2}
        var bits;               // vérifier 32

        // TODO récupérer la lecture des données de chaque voxel
        for (var i = 0; i < this.size*4; i++) 
        {   
            // TODO  
        }  
    };
};

// TODO voir fonction split()


// TODO est-ce utile ?
// Fonction d'ajout d'un voxel dans le tableau de voxel
void function add (vox)
{
      
};*/