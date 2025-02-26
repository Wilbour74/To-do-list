window.onload = (event) => {
    const form = document.querySelector("form");
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "red";
    form.appendChild(errorMessage);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        // On récupère l'évènement du formulaire
        let pseudo = event.target.Pseudo.value
        let password = event.target.Password.value

        if (!pseudo || !password) {
            errorMessage.textContent = "Tous les champs sont obligatoires.";
            return;
        }
        
        
        // On recupère les données de la personne qu'on souhaite connecté à l'aide du pseudo
        let data = JSON.parse(localStorage.getItem(pseudo))

        if(data !== null){
            console.log(data);
            // On verifie si le mot de passe correspond à celui enregistré
            if(data.password == password){
                console.log("Mot de passe correct")
                // Stocker le pseudo de la persone connecté
                localStorage.setItem("isLogged", data.pseudo)
                // Rediriger vers la page de tasks
                window.history.replaceState(null, 'Titre de la page, peut être vide', 'tasks.html');
                location.reload()
            } else{
                // Message d'erreur
                console.error(`Mot de passe incorrect ${data.password} ${password}`);
                errorMessage.textContent = "Mot de passe incorrect";
            }
        }else{
            // Message d'erreur
            console.error("Utilisateur non trouvée");
            errorMessage.textContent = "Utilisateur non trouvée";
        }

    })

}