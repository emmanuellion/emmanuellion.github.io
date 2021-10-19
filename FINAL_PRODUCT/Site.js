
// var btnPopup = document.getElementById('btnPopup');
// btnPopup.addEventListener('click',openMoadl);
// function openMoadl() {
// 	overlay.style.display='block';
// }

// var btnClose = document.getElementById('btnClose');
// btnClose.addEventListener('click',closeModal);
// function closeModal() {
// 	overlay.style.display='none';
// }
 


//________________________________________________________________________________

$('.resizable').resizable({
    handles: {
        'nw': '.ui-resizable-nw',
		'ne': '.ui-resizable-ne',
		'sw': '.ui-resizable-sw',
		'se': '.ui-resizable-se',
		'n': '.ui-resizable-n',
		'e': '.ui-resizable-e',
		's': '.ui-resizable-s',
		'w': '.ui-resizable-w'
    }
});
$( '.draggable' ).draggable().on('click', function(){
if ( $(this).is('.ui-draggable-dragging') ) {
return;
}
$(this).draggable( 'option', 'disabled', true );
$(this).prop('contenteditable','true');
})
.on('blur', function(){
$(this).draggable( 'option', 'disabled', false);
$(this).prop('contenteditable','false');
});


//________________________________________________________________________________

//<script type="text/javascript" src="url/Site.js">

//function open_infos()
//{
//	window.open ('Site.html', 'visualiseur', config='height=100, 
//	width=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, 
//	location=no, directories=no, status=no')
//}

//function popupcentre(adresse, visualiseur, largeur, hauteur, scroll) 
//  {
//  var largeurEcran = (screen.width - largeur) / 2;
//  var hauteurEcran = (screen.height - hauteur) / 2;
//  window.open(adresse, visualiseur, 'height=' + hauteur + ', width=' + largeur + ', 
//  top=' + hauteurEcran + ', left=' + largeurEcran + ', scrollbars=' + scroll + ', 
//  resizable')
//  }
  
//</script>