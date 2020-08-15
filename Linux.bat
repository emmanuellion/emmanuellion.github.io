@title Linux
@echo off
color 9
:lbl1
echo.
echo.
pause
echo L'extension des fichiers est deja renseignee
set /p project_file=Nom du projet :  
set /p file_css=Nom du fichier css : 
set /p file_js=Nom du fichier js : 
set file_css = %file_css%.css
set file_js = %file_js%.js
mkdir %project_file%
echo 1-Dossier %project_file% cree
cd C:\Users\%USERNAME%\Desktop\%project_file%
echo "<!DOCTYPE html>" > index.html
echo "<html lang='fr' style='scroll-behavior: smooth;'>" >> index.html
echo "<head>" >> index.html
echo "    <link href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' integrity='sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN' crossorigin='anonymous'>" >> index.html
echo "    <link rel='icon' type='text/css' href='img/votre_logo.jpg'>" >> index.html
echo "    <link rel='stylesheet' type='text/css' href='css/"%file_css%"'>" >> index.html
echo "    <meta charset='utf-8'>" >> index.html
echo "    <title></title>" >> index.html
echo "</head>" >> index.html
echo "<body class='body' id='body'>" >> index.html
echo "    <header class='header' id='header'>" >> index.html
echo "	  </header>" >> index.html
echo " " >> index.html
echo "<script src='js/"%file_js%"'></script>" >> index.html
echo "</body>" >> index.html
echo "</html>" >> index.html
echo 2-Fichier index.html cree 
mkdir img
echo 3-Dossier img cree
mkdir css
echo 4-Dossier css cree
mkdir js
echo 5-Dossier js cree
cd C:\Users\%USERNAME%\Desktop\%project_file%\js
echo . > %file_js%
echo 6-Fichier %file_js% cree
cd C:\Users\%USERNAME%\Desktop\%project_file%\css
echo "@import url('https://fonts.googleapis.com/css?family=Roboto:300&display=swap');" > %file_css%.css
echo "*{" >> %file_css%
echo "    margin: 0;" >> %file_css%
echo "    padding: 0;" >> %file_css%
echo "    box-sizing: border-box;" >> %file_css%
echo "    font-family: 'Roboto', sans-serif;" >> %file_css%
echo "}" >> %file_css%
echo "/*----------Responsive----------*/" >> %file_css%
echo "@media (min-width: 1280px){}" >> %file_css%
echo "@media (min-width: 1024px){}" >> %file_css%
echo "@media (min-width: 768px){}" >> %file_css%
echo "@media (min-width: 640px){}" >> %file_css%
echo "@media (min-width: 300px){}" >> %file_css%
echo 7-Fichier %file_css% cree
goto lbl1