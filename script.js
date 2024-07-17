document.addEventListener('DOMContentLoaded', function() {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
        const categories = data.categories;
        categories.forEach(category => {
            const categoryName = category.category_name.toLowerCase();
            const container = document.getElementById(categoryName);
            if (container) {
                category.category_products.forEach(product => {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    const discount = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;
                    card.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        ${product.badge_text ? `<div class="badge">${product.badge_text}</div>` : ''}
                        <div class="product-info">
                            <div class="product-info-title">
                                <h3>${truncateText(product.title, 20)}</h3>
                                <h5> &bull;${product.vendor}</h5>
                            </div>
                            <div class="product-info-priceTag">
                                <p class="product-price">Rs ${product.price}.00</p>
                                <p class="compare-at-price">Rs ${product.compare_at_price}</p>
                                <p class="discount">${discount.toFixed(2)}% OFF</p>
                            </div>
                        </div>
                        <button class="addToCart">Add to Cart</button>
                    `;
                    container.appendChild(card);
                });
            }
        });
        showCategory('men');
    });
});

function truncateText(text, limit) {
    if (text.length > limit) {
        return text.substring(0, limit) + '...';
    } else {
        return text;
    }
}

function showCategory(category) {
    const categories = ['men', 'women', 'kids'];
    categories.forEach(cat => {
        const element = document.getElementById(cat);
        const tab = document.getElementById(`${cat}-tab`);
        if (element && tab) {
            if (cat === category) {
                element.style.display = 'flex';
                tab.classList.add('active');
            } else {
                element.style.display = 'none';
                tab.classList.remove('active');
            }
        }
    });
}
