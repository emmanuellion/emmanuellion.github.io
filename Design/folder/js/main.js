to_open = document.getElementById("to_open");
to_close = document.getElementById("to_close");
ul = document.getElementById("ul");

to_open.onclick = function(){
	to_open.style.display = "none";
	to_close.style.display = "block";
	ul.style.display = "block";
}

to_close.onclick = function(){
	to_close.style.display = "none";
	to_open.style.display = "block";
	ul.style.display = "none";
}

to_open1 = document.getElementById("to_open1");
to_close1 = document.getElementById("to_close1");
ul1 = document.getElementById("ul1");

to_open1.onclick = function(){
	to_open1.style.display = "none";
	to_close1.style.display = "block";
	ul1.style.display = "block";
}

to_close1.onclick = function(){
	to_close1.style.display = "none";
	to_open1.style.display = "block";
	ul1.style.display = "none";
}