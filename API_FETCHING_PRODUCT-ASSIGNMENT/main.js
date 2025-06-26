
const productContainer = document.getElementById('product-container');
const loadMoreButton = document.getElementById('load-more');
const searchInput = document.getElementById('search-input');

let products = [];
let currentIndex = 0;
const productsPerPage = 5;

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts() {
    const endIndex = currentIndex + productsPerPage;
    const productsToDisplay = products.slice(currentIndex, endIndex);

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;
        productCard.addEventListener('click', () => {
            window.location.href = `product.html?id=${product.id}`;
        });
        productContainer.appendChild(productCard);
    });

    currentIndex += productsPerPage;

    if (currentIndex >= products.length) {
        loadMoreButton.style.display = 'none';
    }
}

loadMoreButton.addEventListener('click', displayProducts);

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm)
    );

    productContainer.innerHTML = '';

    if (filteredProducts.length > 0) {
        currentIndex = 0;
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
            `;
            productCard.addEventListener('click', () => {
                window.location.href = `product.html?id=${product.id}`;
            });
            productContainer.appendChild(productCard);
        });
    } else {
        productContainer.innerHTML = '<p>No products found</p>';
    }
});

fetchProducts();
