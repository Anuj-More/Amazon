import {getProduct} from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export let cartQuantity = JSON.parse(localStorage.getItem('cart-quantity')) || 0;
let timeoutIds = [];

export function addToCart(productId) {
    const selectorQuantity = Number(document.querySelector(`select[data-product-id="${productId}"]`).value);
    let existsInCart = false;
    cart.forEach(cartItem => {
        if(cartItem.id === productId){
            cartItem.quantity += selectorQuantity;
            // cartQuantity += selectorQuantity;
            existsInCart = true;
            return;
        }
    })
    if(!existsInCart){
        cart.push({
            id: productId,
            quantity: selectorQuantity
        })
    }
    cartQuantity += selectorQuantity;   

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cart-quantity', JSON.stringify(cartQuantity));
    
    updateCartIcon();
    displayAdded(productId);
    // console.log(cart, cartQuantity);
}

export function updateCartIcon() {
    document.querySelector('.js-cart-quantity').innerText = cartQuantity;
}

function displayAdded(productId) {
    const msgElement = document.querySelector(`.added-to-cart[data-product-id="${productId}"]`);

    msgElement.classList.add('added');

    if(timeoutIds[productId] !== null){
        clearTimeout(timeoutIds[productId]);
    }
    const timeoutId = setTimeout(() => {
        msgElement.classList.remove('added');
    },2000)

    timeoutIds[productId] = timeoutId;
}