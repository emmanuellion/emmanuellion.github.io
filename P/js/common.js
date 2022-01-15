function load_bar(div){
	if(div.dataset.progress){
		div.style.width = div.dataset.progress+"%";
		if(div.dataset.progress>13)
			div.innerHTML = div.dataset.progress+"%";
		else
			div.innerHTML = div.dataset.progress;
		div.style.color = "white";
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const div_load = document.getElementById("onload");
var tab_bar = [];
window.addEventListener('load', async()=>{
    div_load.classList.add("fondu");
    div_load.style.zIndex = "-1";
    let tmp = document.getElementsByTagName("div");
	for(let i = 0; i < tmp.length; i++){
		setTimeout(()=>{
			let div = tmp.item(i);
			if(div.classList.value.includes("card")){
				div.style.transform = "translateY(0px)";
				div.style.color = "white";
			}
			if(div.dataset.bg){
				div.style.backgroundColor = div.dataset.bg;
				if(div.classList.value.includes("bar-progress")){
					div.style.borderColor = div.dataset.bg;
				}
			}
			load_bar(div);
		}, i*100);
	}
	let tmpp = document.getElementsByTagName("span");
	for(let i = 0; i < tmpp.length; i++){
		setTimeout(()=>{
			let span = tmpp.item(i);
			if(span.classList.value.includes("u-card")){
				span.style.color = "white";
			}
		}, i*500);
	}
	await sleep(3000);
	let a = document.getElementById("su");
	a.style.width = "100%";
	a.style.left = "0";
})
