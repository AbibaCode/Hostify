document.addEventListener('DOMContentLoaded', function() {
    // Données des hôtels et chambres (Côte d'Ivoire)
    const hotelsData = {
        azalai: {
            name: 'Azalaï Hôtel Abidjan',
            location: 'Marcory, Abidjan',
            rooms: [
                { 
                    id: 1, 
                    type: 'Chambre Standard', 
                    price: 65000, 
                    capacity: 2, 
                    description: 'Chambre confortable avec vue sur la lagune, climatisation, TV satellite, WiFi gratuit.',
                    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400',
                    amenities: ['Climatisation', 'WiFi', 'TV', 'Mini-bar', 'Coffre-fort']
                },
                { 
                    id: 2, 
                    type: 'Chambre Deluxe', 
                    price: 95000, 
                    capacity: 2, 
                    description: 'Chambre spacieuse avec vue panoramique, salon séparé, baignoire et douche.',
                    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400',
                    amenities: ['Climatisation', 'WiFi', 'TV', 'Mini-bar', 'Coffre-fort', 'Baignoire', 'Salon']
                },
                { 
                    id: 3, 
                    type: 'Suite Lagune', 
                    price: 150000, 
                    capacity: 4, 
                    description: 'Suite de luxe avec vue imprenable sur la lagune Ébrié, deux chambres, salon spacieux.',
                    image: 'https://images.unsplash.com/photo-1591088398332-8a779197280f?w=400',
                    amenities: ['Climatisation', 'WiFi', 'TV', 'Mini-bar', 'Coffre-fort', 'Baignoire', 'Salon', 'Terrasse privée']
                }
            ]
        },
        pullman: {
            name: 'Pullman Abidjan',
            location: 'Plateau, Abidjan',
            rooms: [
                { 
                    id: 4, 
                    type: 'Chambre Supérieure', 
                    price: 85000, 
                    capacity: 2, 
                    description: 'Chambre élégante au cœur du Plateau, parfaite pour les voyageurs d\'affaires.',
                    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
                    amenities: ['Climatisation', 'WiFi', 'TV', 'Bureau', 'Coffre-fort', 'Room service 24h']
                },
                { 
                    id: 5, 
                    type: 'Suite Exécutive', 
                    price: 180000, 
                    capacity: 3, 
                    description: 'Suite luxueuse avec accès au lounge exécutif, petit-déjeuner inclus, service de majordome.',
                    image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=400',
                    amenities: ['Climatisation', 'WiFi', 'TV', 'Bureau', 'Coffre-fort', 'Lounge accès', 'Majordome']
                }
            ]
        },
        tiama: {
            name: 'Tiama Hôtel Abidjan',
            location: 'Plateau, Abidjan',
            rooms: [
                { 
                    id: 6, 
                    type: 'Chambre Confort', 
                    price: 55000, 
                    capacity: 2, 
                    description: 'Chambre confortable avec décoration africaine authentique, idéale pour un séjour agréable.',
                    image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=400',
                    amenities: ['Climatisation', 'WiFi', 'TV', 'Décoration locale']
                },
                { 
                    id: 7, 
                    type: 'Suite Tiama', 
                    price: 120000, 
                    capacity: 4, 
                    description: 'Suite spacieuse alliant luxe moderne et touches traditionnelles ivoiriennes.',
                    image: 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?w=400',
                    amenities: ['Climatisation', 'WiFi', 'TV', 'Mini-bar', 'Coffre-fort', 'Salon', 'Vue ville']
                }
            ]
        }
    };
    
    let currentHotel = 'azalai';
    let searchData = {};
    
    // Sélection d'hôtel
    document.querySelectorAll('.hotel-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.hotel-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            this.querySelector('input[type="radio"]').checked = true;
            currentHotel = this.dataset.hotel;
        });
    });
    
    // Dates par défaut
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    document.getElementById('check-in').value = today.toISOString().split('T')[0];
    document.getElementById('check-out').value = tomorrow.toISOString().split('T')[0];
    
    // Recherche de chambres
    document.getElementById('search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const checkIn = document.getElementById('check-in').value;
        const checkOut = document.getElementById('check-out').value;
        const guests = document.getElementById('guests').value;
        const children = document.getElementById('children').value;
        
        if (new Date(checkOut) <= new Date(checkIn)) {
            alert('La date de départ doit être postérieure à la date d\'arrivée');
            return;
        }
        
        searchData = { 
            checkIn, 
            checkOut, 
            guests, 
            children, 
            hotel: currentHotel 
        };
        
        displayRooms(hotelsData[currentHotel]);
    });
    
    function displayRooms(hotelData) {
        const roomsList = document.getElementById('rooms-list');
        const roomsResults = document.getElementById('rooms-results');
        const resultsInfo = document.getElementById('results-info');
        
        const nights = Math.ceil((new Date(searchData.checkOut) - new Date(searchData.checkIn)) / (1000 * 60 * 60 * 24));
        
        resultsInfo.innerHTML = `
            <i class="fas fa-hotel"></i> ${hotelData.name} - ${hotelData.location}<br>
            <i class="fas fa-moon"></i> ${nights} nuit${nights > 1 ? 's' : ''} - 
            <i class="fas fa-users"></i> ${searchData.guests} adulte${searchData.guests > 1 ? 's' : ''}${searchData.children > 0 ? ', ' + searchData.children + ' enfant(s)' : ''}<br>
            <i class="fas fa-bed"></i> ${hotelData.rooms.length} chambre(s) disponible(s)
        `;
        
        roomsList.innerHTML = hotelData.rooms.map(room => {
            const totalPrice = room.price * nights;
            const formattedPrice = totalPrice.toLocaleString('fr-FR');
            
            return `
            <div class="room-item">
                <div class="room-image">
                    <img src="${room.image}" alt="${room.type}">
                </div>
                <div class="room-details">
                    <h4>${room.type}</h4>
                    <p class="room-description-text">${room.description}</p>
                    <div class="room-features-list">
                        ${room.amenities.map(amenity => `<span><i class="fas fa-check-circle"></i> ${amenity}</span>`).join('')}
                        <span><i class="fas fa-user"></i> ${room.capacity} personne(s)</span>
                        <span><i class="fas fa-wifi"></i> WiFi gratuit</span>
                        <span><i class="fas fa-utensils"></i> Petit-déjeuner: ${room.price > 80000 ? 'Inclus' : 'En supplément'}</span>
                    </div>
                </div>
                <div class="room-price-section">
                    <div class="price">${formattedPrice} FCFA</div>
                    <small>${room.price.toLocaleString('fr-FR')} FCFA / nuit</small>
                    <button class="btn-select-room" onclick="selectRoom('${hotelData.name}', '${room.type}', ${room.price}, ${room.id}, ${nights}, '${searchData.guests}', '${searchData.children}')">
                        <i class="fas fa-check"></i> Sélectionner
                    </button>
                </div>
            </div>
        `}).join('');
        
        roomsResults.style.display = 'block';
        roomsResults.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Fonction globale pour sélectionner une chambre
    window.selectRoom = function(hotelName, roomType, pricePerNight, roomId, nights, guests, children) {
        const totalPrice = pricePerNight * nights;
        
        document.getElementById('selected-room-id').value = roomId;
        document.getElementById('selected-hotel-id').value = currentHotel;
        document.getElementById('total-price-fcfa').value = totalPrice;
        
        document.getElementById('summary-hotel').textContent = hotelName;
        document.getElementById('summary-room').textContent = roomType;
        document.getElementById('summary-dates').textContent = 
            `Du ${formatDate(searchData.checkIn)} au ${formatDate(searchData.checkOut)} (${nights} nuit${nights > 1 ? 's' : ''})`;
        document.getElementById('summary-guests').textContent = 
            `${guests} adulte${guests > 1 ? 's' : ''}${children > 0 ? ', ' + children + ' enfant(s)' : ''}`;
        document.getElementById('summary-price').textContent = totalPrice.toLocaleString('fr-FR');
        
        document.getElementById('booking-modal').style.display = 'flex';
    };
    
    function formatDate(dateString) {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    }
    
    // Fermer la modale
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.getElementById('booking-modal').style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('booking-modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Soumission du formulaire de réservation
    document.getElementById('booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Générer une référence de réservation
        const bookingRef = 'HST-CI-' + Date.now().toString(36).toUpperCase();
        const guestEmail = document.getElementById('guest-email').value;
        const guestPhone = document.getElementById('guest-phone').value;
        const paymentMethod = document.getElementById('payment-method').value;
        const totalPrice = document.getElementById('total-price-fcfa').value;
        
        // Afficher les instructions de paiement
        let paymentInstructions = '';
        switch(paymentMethod) {
            case 'orange':
                paymentInstructions = `Veuillez effectuer le paiement de ${parseInt(totalPrice).toLocaleString('fr-FR')} FCFA via Orange Money au numéro : *144*07 08 09 10 11#`;
                break;
            case 'mtn':
                paymentInstructions = `Veuillez effectuer le paiement de ${parseInt(totalPrice).toLocaleString('fr-FR')} FCFA via MTN Mobile Money au numéro : *133*05 06 07 08 09#`;
                break;
            case 'wave':
                paymentInstructions = `Veuillez effectuer le paiement de ${parseInt(totalPrice).toLocaleString('fr-FR')} FCFA via Wave au numéro : 07 08 09 10 11`;
                break;
            case 'cash':
                paymentInstructions = `Paiement de ${parseInt(totalPrice).toLocaleString('fr-FR')} FCFA à effectuer en espèces à l'arrivée à l'hôtel.`;
                break;
            case 'card':
                paymentInstructions = `Un lien de paiement sécurisé pour ${parseInt(totalPrice).toLocaleString('fr-FR')} FCFA vous sera envoyé par SMS.`;
                break;
        }
        
        document.getElementById('booking-reference').textContent = bookingRef;
        document.getElementById('confirmation-email').textContent = guestEmail;
        document.getElementById('confirmation-phone').textContent = guestPhone;
        document.getElementById('payment-details').textContent = paymentInstructions;
        
        document.getElementById('booking-modal').style.display = 'none';
        document.getElementById('confirmation-message').style.display = 'flex';
        
        // Log pour débogage
        console.log('Réservation confirmée:', {
            hotel: currentHotel,
            roomId: document.getElementById('selected-room-id').value,
            guestName: document.getElementById('guest-name').value,
            guestEmail: guestEmail,
            guestPhone: guestPhone,
            nationality: document.getElementById('guest-nationality').value,
            paymentMethod: paymentMethod,
            totalPrice: totalPrice,
            dates: searchData,
            reference: bookingRef
        });
    });
    
    // Récupérer le paramètre d'hôtel depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const hotelParam = urlParams.get('hotel');
    if (hotelParam && hotelsData[hotelParam]) {
        currentHotel = hotelParam;
        const hotelOption = document.querySelector(`[data-hotel="${hotelParam}"]`);
        if (hotelOption) {
            hotelOption.classList.add('selected');
            hotelOption.querySelector('input[type="radio"]').checked = true;
        }
    }
});