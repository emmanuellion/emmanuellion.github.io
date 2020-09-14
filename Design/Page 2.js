const span1 = document.getElementsByClassName('spanofin')[0];
const span2 = document.getElementsByClassName('spanofin')[1];

const input1 = document.getElementsByClassName('input')[0];
const input2 = document.getElementsByClassName('input')[1];

input1.onfocus = function(){
	up(span1);
}

input1.onblur = function(){
	down(input1, span1);
}

input2.onfocus = function(){
	up(span2);
}

input2.onblur = function(){
	down(input2, span2);
}

function down(obj, children){
	if(obj.value == "" || obj.value == " "){
		children.style.transform = "translateY(39px)";
		children.style.fontSize = "100%";
		children.style.color = "#9195A0";
	}else{
		children.style.color = "#DF9215";
	}
	console.log(obj.value);
}

function up(children){
	children.style.transform = "translateY(20px)";
	children.style.fontSize = "90%";
}