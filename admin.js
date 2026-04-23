// admin.js - Gestion de l'interface d'administration HOSTIFY

document.addEventListener('DOMContentLoaded', function() {
    // Gestion des onglets
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const pageTitle = document.getElementById('page-title');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Mise à jour des classes actives
            menuItems.forEach(mi => mi.classList.remove('active'));
            this.classList.add('active');
            
            // Affichage du contenu correspondant
            tabContents.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === `${tabId}-tab`) {
                    tab.classList.add('active');
                }
            });
            
            // Mise à jour du titre
            const titles = {
                'dashboard': 'Tableau de bord',
                'hotels': 'Gestion des hôtels',
                'rooms': 'Gestion des chambres',
                'reservations': 'Gestion des réservations',
                'revenue': 'Suivi des recettes',
                'settings': 'Paramètres'
            };
            pageTitle.textContent = titles[tabId] || 'Tableau de bord';
        });
    });
    
    // Toggle sidebar sur mobile
    const toggleBtn = document.querySelector('.btn-toggle-sidebar');
    const sidebar = document.querySelector('.admin-sidebar');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Fermer la sidebar en cliquant en dehors
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Liens "Voir tout"
    document.querySelectorAll('[data-tab]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.dataset.tab;
            const targetMenuItem = document.querySelector(`.menu-item[data-tab="${tabId}"]`);
            if (targetMenuItem) {
                targetMenuItem.click();
            }
        });
    });
});

// Fonctions globales pour les modals
function showAddHotelModal() {
    document.getElementById('hotel-modal').style.display = 'flex';
}

function showAddRoomModal() {
    document.getElementById('room-modal').style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Fermer les modals en cliquant en dehors
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Fonctions pour les hôtels
function editHotel(id) {
    alert(`Édition de l'hôtel #${id}`);
    // Implémentez l'ouverture d'un modal d'édition
}

function viewHotel(id) {
    alert(`Affichage des détails de l'hôtel #${id}`);
}

function deleteHotel(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet hôtel ?')) {
        alert(`Hôtel #${id} supprimé`);
        // Implémentez la suppression
    }
}

// Fonctions pour les chambres
function editRoom(number) {
    alert(`Édition de la chambre #${number}`);
}

function changeRoomStatus(number) {
    const statuses = ['free', 'occupied', 'reserved'];
    const currentStatus = statuses[Math.floor(Math.random() * statuses.length)];
    alert(`Statut de la chambre #${number} changé pour : ${currentStatus}`);
}

function deleteRoom(number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette chambre ?')) {
        alert(`Chambre #${number} supprimée`);
    }
}

// Fonctions pour les réservations
function viewReservation(ref) {
    alert(`Détails de la réservation ${ref}`);
}

function editReservation(ref) {
    alert(`Édition de la réservation ${ref}`);
}

function cancelReservation(ref) {
    if (confirm(`Êtes-vous sûr de vouloir annuler la réservation ${ref} ?`)) {
        alert(`Réservation ${ref} annulée`);
    }
}

// Fonction d'export des recettes
function exportRevenue() {
    alert('Export des recettes en cours...');
    // Implémentez l'export CSV/PDF
}

// Gestion des formulaires
document.addEventListener('DOMContentLoaded', function() {
    // Formulaire hôtel
    const hotelForm = document.getElementById('hotel-form');
    if (hotelForm) {
        hotelForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Hôtel ajouté avec succès !');
            closeModal('hotel-modal');
            hotelForm.reset();
        });
    }
    
    // Formulaire chambre
    const roomForm = document.getElementById('room-form');
    if (roomForm) {
        roomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Chambre ajoutée avec succès !');
            closeModal('room-modal');
            roomForm.reset();
        });
    }
    
    // Filtre hôtel pour les chambres
    const filterHotel = document.getElementById('filter-hotel-rooms');
    if (filterHotel) {
        filterHotel.addEventListener('change', function() {
            const hotel = this.value;
            console.log('Filtrage par hôtel:', hotel);
            // Implémentez le filtrage
        });
    }
    
    // Sélecteur d'hôtel dans le header
    const hotelSelect = document.getElementById('hotel-select');
    if (hotelSelect) {
        hotelSelect.addEventListener('change', function() {
            const hotel = this.value;
            console.log('Hôtel sélectionné:', hotel);
            // Implémentez le changement d'hôtel
        });
    }
});