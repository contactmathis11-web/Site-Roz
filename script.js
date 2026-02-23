// Charger les données depuis le fichier JSON
async function loadActivities() {
    const response = await fetch("activities.json");
    const activities = await response.json();
    displayActivities(activities);
}

function displayActivities(activities) {
    const container = document.getElementById("activities-container");

    const savedStates = JSON.parse(localStorage.getItem("activitiesState")) || {};

    activities.forEach(activity => {
        const card = document.createElement("div");
        card.className = "activity-card";

        const img = document.createElement("img");
        img.src = activity.image;

        if (savedStates[activity.id]) {
            img.classList.add("completed");
        }

        const title = document.createElement("h2");
        title.textContent = activity.title;

        const checkboxDiv = document.createElement("div");
        checkboxDiv.className = "checkbox-area";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = savedStates[activity.id] || false;

        // Gestion du clic sur la case
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                img.classList.add("completed");
                savedStates[activity.id] = true;
            } else {
                img.classList.remove("completed");
                savedStates[activity.id] = false;
            }
            localStorage.setItem("activitiesState", JSON.stringify(savedStates));
        });

        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(document.createTextNode("Activité réalisée"));

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(checkboxDiv);

        container.appendChild(card);
    });
}

loadActivities();