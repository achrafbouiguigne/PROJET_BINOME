// Gestionnaire de soumission du formulaire
document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupère les valeurs sélectionnées par l'utilisateur
    const terrain = document.getElementById('terrain').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Crée une chaîne décrivant la réservation
    const slot = `${terrain} - ${date} à ${time}`;

    // Ajoute la réservation à la liste des créneaux
    const slotsList = document.getElementById('slotsList');
    const listItem = document.createElement('li');
    listItem.textContent = slot;
    slotsList.appendChild(listItem);

    // Enregistre la réservation dans le stockage local (localStorage)
    saveReservation(slot);

    // Réinitialise le formulaire après soumission
    document.getElementById('reservationForm').reset();

    // Réinitialise l'image après soumission
    updateTerrainImage("");
});

// Fonction pour mettre à jour l'image du terrain
function updateTerrainImage(terrain) {
    const terrainPreview = document.getElementById('terrainPreview');

    const terrainImages = {
        basketball: "/image/image.png", // Image pour le terrain de basket
        football: "/image/football.png",    // Image pour le terrain de football
        volleyball: "/image/volley.png", // Image pour le terrain de volley
        "9andahar": "/image/9andahar.png"   // Image pour le terrain "9andahar"
    };

    if (terrainImages[terrain]) {
        terrainPreview.src = terrainImages[terrain];
        terrainPreview.alt = `Image de ${terrain}`;
        terrainPreview.style.display = "block";
    } else {
        terrainPreview.style.display = "none"; // Cache l'image si aucune sélection
    }
}

// Gestionnaire de changement de sélection pour afficher l'image
document.getElementById('terrain').addEventListener('change', function() {
    const selectedTerrain = this.value;
    updateTerrainImage(selectedTerrain);
});

// Fonction pour enregistrer une réservation dans le localStorage
function saveReservation(slot) {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.push(slot);
    localStorage.setItem('reservations', JSON.stringify(reservations));
}

// Fonction pour charger l'historique des réservations à partir du localStorage
function loadHistory() {
    const historyList = document.getElementById('slotsList'); // Liste des créneaux réservés
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    // Ajoute chaque réservation à la liste affichée
    reservations.forEach(reservation => {
        const listItem = document.createElement('li');
        listItem.textContent = reservation;
        historyList.appendChild(listItem);
    });
}

// Chargement de l'historique des réservations lorsque la page est chargée
window.onload = loadHistory;
