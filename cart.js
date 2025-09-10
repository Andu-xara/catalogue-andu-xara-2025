// Fonction pour afficher les articles du panier
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    let total = 0;

    cartContainer.innerHTML = ''; // Vider le contenu

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Votre panier est vide.</p>';
        totalElement.textContent = '0 Mru';
        return;
    }

    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <h4>${item.name}</h4>
            <p>Prix unitaire: ${item.price} Mru</p>
            <p>Quantité: ${item.quantity}</p>
            <p>Sous-total: ${itemTotal.toFixed(2)} Mru</p>
            <button onclick="removeFromCart(${item.id})">Supprimer</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    totalElement.textContent = total.toFixed(2) + ' Mru';
}

// Fonction pour supprimer un article du panier
function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems(); // Met à jour l'affichage
}

// Fonction pour commander par email (existante)
function placeOrder() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;
    let message = "Bonjour Andu-Xara !\n\nJe souhaite commander les produits suivants :\n\n";

    cartItems.forEach(item => {
        message += `- ${item.name} x ${item.quantity} : ${(item.price * item.quantity).toFixed(2)} Mru\n`;
        total += item.price * item.quantity;
    });

    message += `\nTotal : ${total.toFixed(2)} Mru\n\nCordialement.`;

    const email = "anduxara2408@gmail.com";
    const subject = "Nouvelle commande";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    // Ouvrir l'email
    window.location.href = mailtoLink;

    // Ouvrir la page de confirmation dans un NOUVEL ONGLET
    setTimeout(() => {
        window.open('commande-confirmee.html', '_blank');
    }, 2000);

    // Vider le panier après la commande
    localStorage.removeItem('cartItems');
}

// NOUVELLE FONCTION pour commander via WhatsApp
function placeOrderViaWhatsApp() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;
    let message = "Bonjour Andu-Xara !%0A%0AJ'aimerais commander les produits suivants :%0A%0A";

    cartItems.forEach(item => {
        let ligneProduit = `- ${item.name} x ${item.quantity} : ${(item.price * item.quantity).toFixed(2)} Mru%0A`;
        message += ligneProduit;
        total += item.price * item.quantity;
    });

    message += `%0A*Total : ${total.toFixed(2)} Mru*%0A%0ACordialement.`;

    let numeroWhatsApp = "22249037697";
    let url = `https://wa.me/${numeroWhatsApp}?text=${message}`;

    // Ouvrir WhatsApp
    window.open(url, '_blank');

    // Ouvrir la page de confirmation dans un nouvel onglet
    setTimeout(() => {
        window.open('commande-confirmee.html', '_blank');
    }, 1000);

    // Vider le panier après commande
    localStorage.removeItem('cartItems');
}

// Afficher les articles au chargement de la page
document.addEventListener('DOMContentLoaded', displayCartItems);
