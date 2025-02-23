import {renderProducts, loadProducts} from '../data/products.js'
import {addToCart} from '../data/cart.js';

loadProducts(renderProducts);

document.querySelectorAll('.js-add-to-cart').forEach(button => button.addEventListener('click', () => {
    addToCart(button.dataset.productId);
}))