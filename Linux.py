def GetDir():
    fenetre = Tk()
    fenetre.title("File Browser")
    fenetre.geometry("0x0")
    dirname = filedialog.askdirectory()
    return dirname


user = str(os.environ["USERNAME"])
desktop_path = "C:\\Users\\" + user + "\\Desktop"
turn_anti_path = 0
def command():
    global turn_anti_path
    verif_each_path = False #Demander à chaque fois si plusieurs actions à faire le lieu d'enregistrement du contenu (False = non)
    show_command = True #Commande pour débogger et voir les variables à la fin de chaque procédure
    command = str(input("Que voulez vous faire ? "))

    #------------fermer / arrêter le script----------
    if command == "close":
        sys.exit()
    #------------------------------------------------

    #--------------montrer toutes les commandes possibles----------------------------
    elif command == "commandes":
        print('\n\n********************\n-"close" : arrête le script\n-"commandes" : montre la liste des '
              'commandes\n-"create '
              'file" : procédure '
              'pour créer un fichier\n-"create folder" : procédure pour créer un dossier\n'
              '-"create website" : procédure pour créer tout un projet de site web\n'
              '-"delete file" : procédure pour supprimer un fichier\n'
              '-"delete folder" : procédure pour supprimer un dossier\n********************\n\n')
        reboot()
    #----------------------------------------------------------------------------------

    elif command == "none":
        reboot()
    else:

        #-------------------procédure création nouveau fichier--------------------------
        if command == "create file":
            name_file = str(input("Nom du fichier : "))
            extension = str(input("Extension du fichier (.html, .txt, .c, ...) : "))
            name_file = name_file + extension
            print(name_file)

            # ------------script destination contenu-----------
            print("Choisissez un emplacement")
            if turn_anti_path == 0:
                path = ""
                path = str(filedialog.askdirectory())
            if verif_each_path == True:
                turn_anti_path = 0
            else:
                turn_anti_path += 1
            # ------------------------------------------------

            try:
                if path == "":
                    path = desktop_path
                    path = os.path.join(path, name_file)
                    #os.makedirs(path)
                    with open(path, "w") as f:
                        print("Votre fichier a bien été crée ! ")
                else:
                    path = os.path.join(path, name_file)
                    #os.makedirs(path)
                    with open(path, "w") as f:
                        print("Votre fichier a bien été crée !" + path)
                print("Fichier crée dans " + str(os.path.dirname(path) + " " + name_file))
            except:
                print("Fichier existant")
            reboot()
        #-------------------------------------------------------------------------

        #---------------------------procédure pour supprimer un fichier--------------------
        elif command == "delete file":
            name_file = str(filedialog.askopenfilename())
            try:
                os.remove(name_file)
            except OSError as e:
                print("Fichier inexistant")
            else:
                print("Fichier " + name_file + " supprimé !")
            reboot()
        #------------------------------------------------------------------------------------

        #--------------------------procédure création nouveau dossier--------------------------------------
        elif command == "create folder":
            name_folder = str(input("Nom du dossier : "))
            # ------------script destination contenu-----------
            print("Choisissez un emplacement")
            if turn_anti_path == 0:
                path = ""
                path = str(filedialog.askdirectory())
            if verif_each_path == True:
                turn_anti_path = 0
            else:
                turn_anti_path += 1
            # ------------------------------------------------
            try:
                if path == "":
                    path = desktop_path
                    path = os.path.join(path, name_folder)
                    os.makedirs(path)
                else:
                    path = os.path.join(path, name_folder)
                    os.makedirs(path)
                print("Votre dossier a bien été crée ! ")
                print("Dossier crée dans " + str(os.path.dirname(path) +" " + name_folder))
            except:
                print("Dossier existant")
            reboot()
        #--------------------------------------------------------------------------------------------------

        #---------------------------procédure pour supprimer un dossier--------------------
        elif command == "delete folder":
            name_folder = str(filedialog.askdirectory())
            print("\n**ATTENTION !** Si votre dossier contient des fichiers ou d'autres dossiers ils seront eux aussi supprimés\n")
            choice = str(input('Pour confirmer la suppression du dossier veuillez écrire "oui"\n Choix : '))
            if choice == "oui":
                try:
                    shutil.rmtree(name_folder)
                except OSError as e:
                    print("Dossier inexistant")
                else:
                    print("Dossier " + name_folder + " supprimé !")
            else:
                print("\nProcédure annulée\n")
            reboot()
        # ------------------------------------------------------------------------------------

        #---------------------procédure créaton pack démarrage site web-----------------------------------
        elif command == " create website":
            # ------------script destination contenu-----------
            print("Choisissez un emplacement")
            if turn_anti_path == 0:
                path = ""
                path = str(filedialog.askdirectory())
            if verif_each_path == True:
                turn_anti_path = 0
            else:
                turn_anti_path += 1
            # ------------------------------------------------
            if path == "":
                path = desktop_path      #destination par défaut si aucune précisée
            print("L'extension des fichiers est déjà renseignée ; )\n")
            name_project = str(input("Nom du projet : "))
            name_css_file = str(input("Nom du fichier css : ")) + ".css"
            name_js_file = str(input("Nom du fichier js : ")) + ".js"

            #----------------création dossier du projet--------------
            path = os.path.join(path, name_project)
            os.makedirs(path)
            print("Votre dossier " + name_project + "a bien été crée !")
            #-------------------------------------------------------

            #----------------------------------création fichier html---------------------------------------------------
            name_file = "index.html"
            path = os.path.join(path, name_file)
            with open(path, "w") as file:
                file.write("<!DOCTYPE html>\n")
                file.write("<html lang='fr' style='scroll-behavior: smooth;'>\n")
                file.write("<head>\n")
                file.write("    <link href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min"
                           ".css' rel='stylesheet' "
                           "integrity='sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN' "
                           "crossorigin='anonymous'>\n")
                file.write("    <link rel='icon' type='text/css' href='img/votre_logo.jpg'>\n")
                file.write("    <link rel='stylesheet' type='text/css' href='css/"+name_css_file+"'>\n")
                file.write("    <meta charset='utf-8'>\n")
                file.write("    <title></title>\n")
                file.write("</head>\n")
                file.write("<body class='body' id='body'>\n")
                file.write("    <header class='header' id='header'>\n\n    </header>\n")
                file.write("\n")
                file.write("<script src='js/"+name_js_file+"'></script>\n")
                file.write("</body>\n")
                file.write("</html>")
                print("Votre fichier " + name_file + " a bien été crée !")
            #--------------------------------------------------------------------------

            #---------------------création dossier img-------------------------
            project_path = desktop_path + name_project
            path = project_path
            name_folder = "img"
            path = os.path.join(path, name_folder)
            os.makedirs(path)
            print("Votre dossier " + name_folder + " a bien été crée !")
            #-------------------------------------------------------------------

            #---------------------création dossier js-----------------------
            path = project_path
            name_folder = "js"
            path = os.path.join(path, name_folder)
            os.makedirs(path)
            print("Votre dossier " + name_folder + " a bien été crée !")
            #----------------------------------------------------------------

            #-------------------création fichier js-----------------
            path = os.path.join(path, name_js_file)
            with open(path, "w") as file:
                print("Votre fichier " + name_js_file + " a bien été crée !")
            #-------------------------------------------------------

            #--------------création dossier css----------------
            path = project_path
            name_folder = "css"
            path = os.path.join(path, name_folder)
            os.makedirs(path)
            print("Votre dossier " + name_folder + " a bien été crée !")
            #--------------------------------------------------

            #------------------------création fichier css---------------------------
            path = os.path.join(path, name_css_file)
            with open(path, "w") as file:
                file.write("@import url('https://fonts.googleapis.com/css?family=Roboto:300&display=swap');\n")
                file.write("\n*{\n")
                file.write("    margin: 0;\n")
                file.write("    padding: 0;\n")
                file.write("    box-sizing: border-box;\n")
                file.write("    font-family: 'Roboto', sans-serif;\n")
                file.write("}\n")
                file.write("\n/*----------Responsive----------*/")
                file.write("\n@media (min-width: 1280px){\n\n}")
                file.write("\n@media (min-width: 1024px){\n\n}")
                file.write("\n@media (min-width: 768px){\n\n}")
                file.write("\n@media (min-width: 640px){\n\n}")
                file.write("\n@media (min-width: 300px){\n\n}")
                print("Votre fichier " + name_css_file + " a bien été crée !")
            #---------------------------------------------------------------------

            reboot()
        #------------------------------------------------------------------------------------------

        else:
            print("Aucune commande n'a étée saisie")
            reboot()

    #----------déboggage des variables-----------
    if command != "" and show_command == True:
        print(command)
        print(path)
        if name_file != "":
            print(name_file)
        elif name_folder != "":
            print(name_folder)
    #---------------------------------------------


def reboot():
    command()


if __name__ == '__main__':
    import sys
    import os
    from os import getcwd, chdir, mkdir
    from tkinter import *
    from tkinter import filedialog
    import shutil
    print('**********\nPour avoir la liste des commandes existantes faites "commandes"\n**********\n\n')
    command()