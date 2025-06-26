

document.addEventListener('DOMContentLoaded', () => {
    const productId = new URLSearchParams(window.location.search).get('id');
    const productContainer = document.getElementById('product-container');

    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(product => {
            displayProduct(product);
        })
        .catch(error => {
            productContainer.innerHTML = `<p>Error fetching product: ${error.message}</p>`;
        });

    function displayProduct(product) {
        productContainer.innerHTML = `
            <h1>${product.title}</h1>
            <img src="${product.image}" alt="${product.title}" />
            <p>Price: $${product.price}</p>
            <p>Description: ${product.description}</p>
            <p>Category: ${product.category}</p>
        `;
    }
});
