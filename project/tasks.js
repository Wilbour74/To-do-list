window.onload = (event) => {
    let pseudo = localStorage.getItem("isLogged");

    // S'il n'y a pas d'user connecter on redirige sur la page d'accueil
    if(pseudo == null){
        window.location.href = "index.html"
    }

    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    const form = document.querySelector("form");
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "red";  
    form.appendChild(errorMessage); 

    const header = document.createElement("h1");
    
    // Titre dynamique
    header.textContent = `Bienvenue, ${pseudo} !`;
    document.body.prepend(header);

    // Recupérer les données de la personne connecté
    const myMessages = messages.filter((item) => item.user === pseudo);
    const taskContainer = document.getElementById("taskContainer");
    const completedTaskContainer = document.getElementById("completedTaskContainer");

    const searchInput = document.querySelector('input[name="search"]');

    const logoutBtn = document.getElementById("logoutBtn");

    // Bouton de deconnexion
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem('isLogged');
        window.location.href = "index.html";
    })
    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase();
    
        // Filtrer les tâches dans myMessages
        const filteredTasks = myMessages.filter(task => 
            task.nom.toLowerCase().includes(searchValue) || 
            task.description.toLowerCase().includes(searchValue)
        );
    
        // Effacer l'affichage actuel
        taskContainer.innerHTML = "";
        completedTaskContainer.innerHTML = "";
    
        // Réafficher les tâches filtrées
        filteredTasks.forEach(displayTask);
    });


    
    function displayTask(task) {

    // Creation d'affichage
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        let title = document.createElement("strong");
        title.textContent = task.nom;

        let description = document.createElement("p");
        description.textContent = task.description;
        description.classList.add("description");

        let deadline = document.createElement("p");
        deadline.textContent = `Date limite : ${task.deadline}`;
        deadline.classList.add("deadline");

        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        // Créer un bouton de suppression
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Supprimer";
        deleteBtn.addEventListener("click", () => {
            messages = messages.filter(t => t !== task);
            localStorage.setItem("messages", JSON.stringify(messages));
            taskDiv.remove();
        });

        // Créer un bouton de validation
        let validateBtn = document.createElement("button");
        validateBtn.textContent = "Valider";
        validateBtn.addEventListener("click", () => {
            taskDiv.classList.add("completed");
            task.statut = "done";
            localStorage.setItem("messages", JSON.stringify(messages));
            // Supprime les boutons de suppression et de validation 
            validateBtn.remove();
            deleteBtn.remove();
            completedTaskContainer.appendChild(taskDiv);
        });

        buttonContainer.appendChild(validateBtn);
        buttonContainer.appendChild(deleteBtn);
        taskDiv.appendChild(title);
        taskDiv.appendChild(description);
        taskDiv.appendChild(deadline);
        taskDiv.appendChild(buttonContainer);
        

        if (task.statut === "done") {
            taskDiv.classList.add("completed");
            // Supprime les boutons de suppression et de validation 
            validateBtn.remove();
            deleteBtn.remove();
            completedTaskContainer.appendChild(taskDiv);
        } else {
            buttonContainer.appendChild(validateBtn);
            buttonContainer.appendChild(deleteBtn);
            taskContainer.appendChild(taskDiv);
        }
    }

    myMessages.forEach(displayTask);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let nom = event.target.nom.value;
        let description = event.target.description.value;
        let deadline = event.target.deadline.value;

        // Message d'erreur
        if (!nom || !description || !deadline) {
            errorMessage.textContent = "Tous les champs sont obligatoires.";
            return;
        } else{
            errorMessage.textContent = ""
        }

        // Création de l'objet tâche
        const tache = {
            nom: nom,
            description: description,
            deadline: deadline,
            user: pseudo,
            statut: "todo"
        };

        messages.push(tache);
        myMessages.push(tache);
        localStorage.setItem("messages", JSON.stringify(messages));
        displayTask(tache);
        form.reset();
    });
}
