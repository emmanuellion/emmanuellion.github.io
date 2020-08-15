var first;
var Ls=screen.width;
first = Ls;
function size()
{
	Ls = screen.width;
	if(first != Ls)
	{
		console.log(Ls);
		if (Ls >= 0 && Ls <= 400){
			window.location = "test_400.html";
		}
		else if (Ls > 400 && Ls <= 600){
			window.location = "test_600.html";
		}
		else if (Ls > 600 && Ls <= 800){
			window.location = "test_800.html";
		}
		else if (Ls > 800 && Ls <= 1000){
			window.location = "test_1000.html";
		}
		else if (Ls > 1000 && Ls <= 1200){
			window.location = "test_1200.html";
		}
		else if (Ls > 1200 && Ls <= 1400){
			window.location = "test_1400.html";
		}	
	}
										
}
setInterval(size,100)

function sizy(){
	alert(Ls = screen.width);
}