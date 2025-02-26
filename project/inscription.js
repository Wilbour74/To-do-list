window.onload = (event) => {
    const form = document.querySelector("form");
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "red";   
    form.appendChild(errorMessage); 

    // S'il n'y a pas encore de 0 on initie l'enregistrement à 0
    let id_user = localStorage.getItem("id");
        if(id_user == null){
            localStorage.setItem("id", 0);
        }

    // On récupère l'évènement du formulaire

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        // On recupère les données du formulaire        
        let prenom = event.target.Prenom.value
        let pseudo = event.target.Pseudo.value
        let password = event.target.Password.value

        // Message d'erreur
        if (!prenom || !pseudo || !password) {
            errorMessage.textContent = "Tous les champs sont obligatoires.";
            return;
        }

        if (localStorage.getItem(pseudo)) {
            errorMessage.textContent = "Ce pseudo est déjà utilisé. Veuillez en choisir un autre.";
            return;
        }

        // On garde récupère l'id et on l'additionne pour avoir un nouvel id
        let id = Number(localStorage.getItem("id"));

        // On stocke les données dans un tableau
        const data = {
            prenom: prenom,
            pseudo: pseudo,
            password: password,
            id_user: id+1
        }
        // On ajoute plus un pour ajouter l'enregistrement
        localStorage.setItem("id", id+1)
        
        // On stocke l'utilisateur dans le localStorage avec le pseudo comme nom pour pouvoir le récupérer facilement
        localStorage.setItem(`${pseudo}`, JSON.stringify(data))

        // Stocker le pseudo de la persone connecté
        localStorage.setItem("isLogged", pseudo)
        
        // Redirection
        window.history.replaceState(null, 'Titre de la page, peut être vide', 'tasks.html');
        location.reload()
    
        console.log(data)    
    })

}