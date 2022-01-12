let tmp = document.getElementsByTagName("div")
for(let i = 0; i < tmp.length; i++){
	let div = tmp.item(i);
	if(div.dataset.color){
		div.style.backgroundColor = div.dataset.color
	}
	if(div.dataset.progress){
		div.style.height = "100%";
		div.style.width = div.dataset.progress+"%";
	}
}

