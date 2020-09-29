const footer = document.querySelector('#footer');
function get_year(){
	date = new Date;
	year = date.getFullYear();
	footer.innerHTML = "© Copyright "+year+" Emmanuel LION - Tous droits réservés";
}
clock = setInterval(get_year, 2000);