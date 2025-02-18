import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export let cartQuantity = JSON.parse(localStorage.getItem('cart-quantity')) || 0;
let timeoutIds = [];

export function addToCart(productId) {
    const selectorQuantity = Number(document.querySelector(`select[data-product-id="${productId}"]`).value);
    let existsInCart = false;
    cart.forEach(cartItem => {
        if(cartItem.id === productId){
            cartItem.quantity += selectorQuantity;
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
    
    updateCartIcon();
    displayAdded(productId);

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cart-quantity', JSON.stringify(cartQuantity));
}

export function deleteFromCart(productId){
    cart.forEach((cartItem, index) => {
        if(cartItem.id === productId){
            cart.splice(index, 1);
        }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    renderOrderSummary(cart);
}

export function updateCartIcon() {
    cartQuantity = 0;

    cart.forEach(cartItem => {
       cartQuantity += cartItem.quantity; 
    });
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