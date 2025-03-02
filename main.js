

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
        const productImage = product.images[0] && product.images ? product.images : "https://via.placeholder.com/200";

        productCard.innerHTML = `
            <img src="${productImage}" alt="${product.title || 'No Title'}">
            <h3>${product.title || 'No Title'}</h3>
            <p>$${product.price || 'N/A'}</p>
        `;

        productContainer.appendChild(productCard);
    });
}

// Fetch and display products when the page loads
fetchProducts();