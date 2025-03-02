// API URL
const apiUrl = "https://api.escuelajs.co/api/v1/products";

// Function to fetch products
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl); // Fetch data from the API
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const products = await response.json(); // Convert response to JSON
        displayProducts(products); // Display the products
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Function to display products
function displayProducts(products) {
    const productContainer = document.getElementById("productContainer");

    // Clear any existing content
    productContainer.innerHTML = "";

    // Loop through the products and create HTML for each product
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        // Check if the product has a valid image
        const productImage = product.images[0] && product.images ? product.images[0] : "https://via.placeholder.com/200";

        productCard.innerHTML = `
            <img src="${productImage}" alt="${product.title || 'No Title'}">
            <h3>${product.title || 'No Title'}</h3>
            <p>$${product.price || 'N/A'}</p>
        `;

        // Add event listener to the product image
        const productImageElement = productCard.querySelector('img');
        productImageElement.addEventListener('click', () => {
            showProductDetails(product);
        });

        productContainer.appendChild(productCard);
    });
}
// Function to show product details in a SweetAlert2 pop-up
function showProductDetails(product) {
    Swal.fire({
        title: product.title || 'No Title',
        html: `
            <img src="${product.images[0] || 'https://via.placeholder.com/200'}" alt="${product.title || 'No Title'}" style="max-width: 100%; height: auto; border-radius: 10px;">
            <p><strong>Price:</strong> $${product.price || 'N/A'}</p>
            <p><strong>Description:</strong> ${product.description || 'No description available.'}</p>
        `,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: 'Close',
    });
}

// Fetch and display products when the page loads
fetchProducts();

const menuBtn = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navigation');

menuBtn.addEventListener('click', () => {
    navigation.classList.toggle('active');
    menuBtn.classList.toggle('active')
});