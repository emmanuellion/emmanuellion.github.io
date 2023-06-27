const li_p = document.getElementsByClassName("li_p")[0];
const li_c = document.getElementsByClassName("li_c")[0];
const li_g = document.getElementsByClassName("li_g")[0];

let active = "";

const actions = ["point", "chroma", "gray"];
let i = 0;
[li_p, li_c, li_g].forEach(el => {
    el.addEventListener('click', () => {
        open(actions[i]);
        active = actions[i];
    });
    i++;
});

function open(div){
    const win = document.getElementsByClassName(div)[0];
    win.style.display = "flex";
}

function close(div){
    if(active !== ""){
        const win = document.getElementsByClassName(div)[0];
        win.style.display = "none";
    }
}

document.getElementsByTagName("html")[0].addEventListener("mousedown", (event) => {
    if(event.target.offsetParent != null){
        let split = event.target.offsetParent.className.split(' ')[1];
         if(event.target.className.split(' ')[1] !== active){
             if(split === undefined){
                close(active);
             }
         }
    }else{
        close(active);
    }
});
