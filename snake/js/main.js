const canvas = document.querySelector("#canvas");
const up = document.getElementsByTagName("div")[0];
const left = document.getElementsByTagName("div")[1];
const down = document.getElementsByTagName("div")[2];
const right = document.getElementsByTagName("div")[3];
const ctx = canvas.getContext('2d');
var w_canvas = canvas.width;
var nb_case = 10;
var case_size = w_canvas/nb_case;
var grid = new Array (nb_case);
var i;
var j;
var xA = 0;
var yA = 0;
var xB = 5;
var yB = 7;

for (i = 0; i < nb_case; i++){
 	ctx.beginPath();
 	ctx.moveTo(0,i*case_size);
 	ctx.lineTo(w_canvas,i*case_size);
 	ctx.stroke();
 	ctx.closePath();
/*-------------------------------*/
 	ctx.beginPath();
 	ctx.moveTo(i*case_size,0);
 	ctx.lineTo(i*case_size,w_canvas);
 	ctx.stroke();
 	ctx.closePath();
}

function Cells(i,j){
	this.x = i;
	this.y = j;
	this.show = function (color){
		ctx.fillStyle = color;
		ctx.fillRect(this.x*case_size,this.y*case_size,case_size,case_size);
	}
	this.wall = false;
	this.f = 0;
	this.g = 0;
	this.h = 0;
}

for (i = 0; i < nb_case; i++){
	grid[i] = new Array (nb_case);
}

for (i = 0; i < nb_case; i++){
	for(j = 0; j < nb_case; j++){
		grid[i][j] = new Cells(i,j);
		// grid[i][j].show("#fff");
	}
}

for (i = 0; i < nb_case; i++){
	for(j = 0; j < nb_case; j++){
		if (Math.random()<0.2){
			grid[i][j].wall = true;
			grid[i][j].show("#000");
		}
	}
}

function touche(e){
	var touche = event.keyCode;
	if (touche == 90){
		up();
	}
	else if (touche == 81){
		left();
	}
	else if (touche == 83){
		down();
	}
	else if (touche == 68){
		right();
	}
}

function noeud(x,y,cout,heuristique){
	var x = x;
	var y = y;
	var cout = cout;
	var heuristique = heuristique;
}

var heuristique_depart = 0;
var depart = new noeud(xA,yA,0,heuristique_depart);
grid[xA][yA].show("green");

grid[xB][yB].show("red");
var heuristique_objectif = Math.sqrt((xB-xA)*(xB-xA)+(yB+yA)*(yB+yA));
var objectif = new noeud(xB,yB,0,heuristique_objectif);

var closedList = new Array();
var openList = grid;

var u = new Object();
u.x = 0;
u.y = 0;
u.cout = 0;
u.heuristique;
var v = new Object();
v.x = 0;
v.y = 0;
v.cout = 0;
v.heuristique;
var end = new Object();
end.pos = [5][7];
var z;

function A(grid,depart,objectif){
	console.log(z);
	closedList = new Array();
	openList = new Array();
	openList.push(depart);
	console.log(openList);
	if (openList.length > null){
		u = openList.pop();
		if (u.x == xB && u.y == yB){
			alert("!");
			console.log("!");
			for (i = 0; i < closedList.length; i++){
				grid[u.x][u.y].show("green");
			}			
		}
		console.log(u);
		openList.pop();
		closedList.push(u);
		for (i = 0; i < nb_case; i++){
			for(j = 0; j < nb_case; j++){
				v.x = i;
				v.y = j;
				if (grid[i][j].wall = false || 	closedList.includes(v) || (openList.includes(v) && openList.values(v.cout) < u.cout)){
  					v.cout = u.cout +1;
  				 	v.heuristique = v.cout + Math.sqrt((xB-v.x)*(xB-v.x)+(yB+v.y)*(yB+v.y));
  				 	openList.enqueue(v);
  				 	console.log(v);
  				}
			}
		}	
		closedList.push(u);
		console.log(u);
	}
	// alert("error");
	z++;
}

function compare2noeuds(heuristique_depart,heuristique_objectif){
	if (heuristique_depart<heuristique_objectif){
		return 1;
	}
	else if (heuristique_depart==heuristique_objectif){
		return 0;
	}
	else{
		return -1;
	}
}

var interval = setInterval(A(grid,depart,objectif),100);