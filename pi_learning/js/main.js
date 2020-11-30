var pi=[3,1,4,1,5,9,2,6,5,3,5,8,9,7,9,3,2,3,8,4,6,2,6,4,3,3,8,3,2,7,9,5,0,2,8,8,4,1,9,7,1,6,9,3,9,9,3,7,5,1,0,5,8,2,0,9,7,4,9,4,4,5,9,2,3,0,7,8,1,6,4,0,6,2,8,6,2,0,8,9,9,8,6,2,8,0,3,4,8,2,5,3,4,2,1,1,7,0,6,7,9,8,2,1,4,8,0,8,6,5,1,3,2,8,2,3,0,6,6,4,7];const resp=document.querySelector("#response"),bad=document.querySelector("#bad");function touche(e){13==event.keyCode&&verif(document.querySelector("#pi").value)}function verif(e){for(var n,r=0,t=e,o=new Array,i=0;i<t.length;i++)o[i]=t[i];o.splice(1,1);for(i=0;i<o.length;i++)pi[i]!=o[i]&&(r++,n=i);var c="";if(0==r){alert("Bien joué tout est juste !");for(i=1;i<o.length;i++)c=c.concat("",o[i].toString());resp.innerHTML="3."+c,bad.style.display="none"}else{for(i=1;i<n;i++)c=c.concat("",o[i].toString());resp.innerHTML="3."+c,bad.innerHTML=o[n]+"--\x3e"+pi[i],bad.style.display="block"}}

// var pi = [3,1,4,1,5,9,2,6,5,3,5,8,9,7,9,3,2,3,8,4,6,2,6,4,3,3,8,3,2,7,9,5,0,2,8,8,4,1,9,7,1,6,9,3,9,9,3,7,5,1,0,5,8,2,0,9,7,4,9,4,4,5,9,2,3,0,7,8,1,6,4,0,6,2,8,6,2,0,8,9,9,8,6,2,8,0,3,4,8,2,5,3,4,2,1,1,7,0,6,7,9,8,2,1,4,8,0,8,6,5,1,3,2,8,2,3,0,6,6,4,7];
// const resp = document.querySelector('#response');
// const bad = document.querySelector('#bad');

// function touche(e){
// 	var touche = event.keyCode;
// 	if (touche==13)
// 	{
// 		var pi_try = document.querySelector('#pi').value;
// 		verif(pi_try);
// 	}
// }

// function verif(try_pi){
// 	var error = 0;
// 	var index;
// 	var array_pi = try_pi;
// 	var tab = new Array();
// 	for(var i = 0; i < array_pi.length; i++){
// 		tab[i] = array_pi[i];
// 	}
// 	tab.splice(1,1);
// 	for(var i = 0; i < tab.length; i++){
// 		if(pi[i] != tab[i]){
// 			error++;
// 			index = i;
// 		}
// 	}
// 	var str = "";
// 	if(error == 0){
// 		alert("Bien joué tout est juste !");
// 		for(var i = 1; i < tab.length; i++){
// 			str = str.concat('',tab[i].toString());
// 		}
// 		resp.innerHTML = "3."+str;
// 		bad.style.display = "none";
// 	}else{
// 		for(var i = 1; i < index; i++){
// 			str = str.concat('',tab[i].toString());
// 		}
// 		resp.innerHTML = "3."+str;
// 		bad.innerHTML = tab[index]+"-->"+pi[i];
// 		bad.style.display = "block";
// 	}
// }