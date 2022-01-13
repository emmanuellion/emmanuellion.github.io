let tmp = document.getElementsByTagName("div");
for(let i = 0; i < tmp.length; i++){
	let div = tmp.item(i);
	if(div.dataset.bg){
		div.style.backgroundColor = div.dataset.bg;
		if(div.classList.value.includes("bar-progress")){
			div.style.borderColor = div.dataset.bg;
		}
	}
	if(div.dataset.progress){
		div.style.width = div.dataset.progress+"%";
		if(div.dataset.progress>13)
			div.innerHTML = div.dataset.progress+"%";
		else
			div.innerHTML = div.dataset.progress;
	}
}
