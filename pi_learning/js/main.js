var pi = [3,1,4,1,5,9,2,6,5,3,5,8,9,7,9,3,2,3,8,4,6,2,6,4,3,3,8,3,2,7,9,5,0,2,8,8,4,1,9,7,1,6,9,3,9,9,3,7,5,1,0,5,8,2,0,9,7,4,9,4,4,5,9,2,3,0,7,8,1,6,4,0,6,2,8,6,2,0,8,9,9,8,6,2,8,0,3,4,8,2,5,3,4,2,1,1,7,0,6,7,9,8,2,1,4,8,0,8,6,5,1,3,2,8,2,3,0,6,6,4,7];
const resp = document.querySelector('#response');

function touche(e){
	var touche = event.keyCode;
	if (touche==13)
	{
		var pi_try = parseInt(document.querySelector('#pi').value);
		verif(pi_try);
	}
}

function verif(try_pi){
	var error = 0;
	var array_pi = [try_pi];
	array_pi.splice(1,1);
	for(var i = 0;i<array_pi.length;i++){
		if(pi[i] != array_pi[i]){
			
			error++;
		}
	}
	if(error == 0){
		alert("Parfait !\nPour l'instant votre nombre pi est juste");
		var str = " ";
		for(var i = 1; i < array_pi.length;i++){
			console.log(array_pi[i]);
			if(array_pi[i].toString() != ","){
				str+=array_pi[i].toString();
				console.log("into");
			}
		}
		console.log(str);
		resp.innerHTML = "3."+str;
	}
}