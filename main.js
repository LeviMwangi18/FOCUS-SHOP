const apiUrl = "https://api.escuelajs.co/api/v1/products";
let cart = []; // Array to hold the cart items

// Fetch products from the API
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Display products on the page
function displayProducts(products) {
    const productContainer = document.getElementById("productContainer");

    // Clear existing products
    productContainer.innerHTML = "";

    // Loop through products and display each one
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const productImage = product.images[0] || "https://via.placeholder.com/200";

        productCard.innerHTML = `
            <img src="${productImage}" alt="${product.title || 'No Title'}">
            <h3>${product.title || 'No Title'}</h3>
            <p>$${product.price || 'N/A'}</p>
            <button class="add-to-cart-btn" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">Add to Cart</button>
        `;

        // Append the product card to the product container
        productContainer.appendChild(productCard);
    });

    // Add event listeners for the "Add to Cart" buttons
    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
    addToCartBtns.forEach((btn) => {
        btn.addEventListener("click", addToCart);
    });
}

// Add item to the cart
function addToCart(event) {
    const button = event.target;
    const productId = button.getAttribute("data-id");
    const productTitle = button.getAttribute("data-title");
    const productPrice = button.getAttribute("data-price");

    // Create a cart item object
    const cartItem = {
        id: productId,
        title: productTitle,
        price: productPrice,
        quantity: 1,
    };

    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex((item) => item.id === productId);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(cartItem);
    }

    // Update the cart count in the header
    updateCartCount();

    // Display the cart
    displayCart();
}

// Remove item from the cart
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCartCount();
    displayCart();
}

// Display the cart items in the cart popup
function displayCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = ""; // Clear the cart items list

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    cart.forEach((item) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");
        cartItemDiv.innerHTML = `
            <span>${item.title} - $${item.price} x ${item.quantity}</span>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });
}

// Update the cart count in the header
function updateCartCount() {
    const cartCount = document.getElementById("cartCount");
    cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
}

// Toggle the cart popup visibility
document.getElementById("cartButton").addEventListener("click", () => {
    const cartPopup = document.getElementById("cartPopup");
    cartPopup.classList.toggle("active");
});


// Clear the cart
document.getElementById("clearCartBtn").addEventListener("click", () => {
    cart = [];
    updateCartCount();
    displayCart();
});

// Close the cart popup when clicking outside of it
document.addEventListener("click", (event) => {
    const cartPopup = document.getElementById("cartPopup");
    const cartButton = document.getElementById("cartButton");

    if (!cartPopup.contains(event.target) && !event.target.matches("#cartButton")) {
        closeCartPopup();
    }
});

// Close the cart popup
function closeCartPopup() {
    const cartPopup = document.getElementById("cartPopup");
    cartPopup.classList.remove("active");
}

// Checkout - clear the cart and show SweetAlert2 confirmation
document.getElementById("checkoutBtn").addEventListener("click", () => {
    // Show SweetAlert2 confirmation popup
    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to proceed with checkout?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, checkout!',
        cancelButtonText: 'No, cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            // Clear the cart after confirmation
            cart = [];
            updateCartCount();
            displayCart();

            // Show success message
            Swal.fire({
                title: 'Success!',
                text: 'Your order has been placed successfully!',
                icon: 'success',
            });

            closeCartPopup(); // Close the cart popup
        }
    });
});

// Close the cart popup when clicking outside of it
document.addEventListener("click", (event) => {
    const cartPopup = document.getElementById("cartPopup");
    if (!cartPopup.contains(event.target) && !event.target.matches("#cartButton")) {
        closeCartPopup();
    }
});

// Fetch and display products on page load
fetchProducts();

// Mobile menu toggle functionality
const menuBtn = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navigation');

menuBtn.addEventListener('click', () => {
    navigation.classList.toggle('active');
    menuBtn.classList.toggle('active');
});