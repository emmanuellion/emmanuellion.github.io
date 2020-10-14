const i1 = document.getElementsByTagName('input')[0];
const i2 = document.getElementsByTagName('input')[1];
const i3 = document.getElementsByTagName('input')[2];
const i4 = document.getElementsByTagName('input')[3];
const res = document.getElementById('res');

const s1 = document.getElementsByTagName('span')[0];
const s2 = document.getElementsByTagName('span')[1];
const s3 = document.getElementsByTagName('span')[2];
const s4 = document.getElementsByTagName('span')[3];

function up(children){
	children.style.transform = "translate(5px,0px)";
	children.style.fontSize = "80%";
	children.style.color = "#007BFF";
}

function down(obj, children){
	if(obj.value == "" || obj.value == " "){
		children.style.transform = "translate(10px,30px)";
		children.style.fontSize = "90%";
		children.style.color = "#6C757D";
		obj.style.borderColor = "#6C757D";
	}else{
		children.style.color = "#007BFF";
		obj.style.borderColor = "#007BFF";
	}
}

i1.onfocus = function(){
	up(s1);
}

i2.onfocus = function(){
	up(s2);
}

i3.onfocus = function(){
	up(s3);
}

i4.onfocus = function(){
	up(s4);
}

i1.onblur = function(){
	down(i1, s1);
}

i2.onblur = function(){
	down(i2, s2);
}

i3.onblur = function(){
	down(i3, s3);
}

i4.onblur = function(){
	down(i4, s4);
}

function good_verif(obj, children){
	children.style.transform = "translate(10px,20px)";
	children.style.fontSize = "90%";
	children.style.color = "#6C757D";
	obj.style.borderColor = "#6C757D";
}

res.addEventListener('click', () => {
    if(i1.value != "" && i1.value != " "){
		good_verif(i1, s1);
	}
	if(i2.value != "" && i2.value != " "){
		good_verif(i2, s2);
	}
	if(i3.value != "" && i3.value != " "){
		good_verif(i3, s3);
	}
	if(i4.value != "" && i4.value != " "){
		good_verif(i4, s4);
	}
});