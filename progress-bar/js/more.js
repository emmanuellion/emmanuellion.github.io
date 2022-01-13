let r = ["red", "blue", "cyan", "green", "white", "yellow", "orange", "brown", "purple", "pink"];
let body = document.getElementsByTagName("body")[0];
for(let i = 0; i <= 100; i++){
	let div = document.createElement("div");
	div.setAttribute("class", "card row column_center flex_center");
	div.setAttribute("data-bg", "#7D49F4");
	let div2 = document.createElement("div");
	div2.setAttribute("class", "bar-progress crop-all");
	div2.setAttribute("data-bg", "#3B2273");
	let div3 = document.createElement("div");
	div3.setAttribute("data-progress", i.toString());
	div3.setAttribute("data-bg", r[i%10]);
	div3.setAttribute("style", "color: black;");
	div2.appendChild(div3);
	div.appendChild(div2);
	body.appendChild(div);
}

setTimeout(()=>{
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
},0.1);