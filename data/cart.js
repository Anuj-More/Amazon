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
            deliveryOptionId: 1,
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
            cartQuantity -= cartItem.quantity;
        }
    });
    localStorage.setItem('cart-quantity', cartQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    document.querySelector(`.cart-item-container[data-product-id="${productId}"]`).remove();
}

export function displayInputSection(productId) {
    const updateElement = document.querySelector(`.cart-item-container[data-product-id="${productId}"]`);

    updateElement.classList.add('is-editing-quantity');
};

export function updateItemQuantity(productId) {
    const inputEle = document.querySelector(`.update-input[data-product-id="${productId}"]`);
    
    document.querySelector(`.quantity-label[data-product-id="${productId}"]`).innerText = Number(inputEle.value);

    let iniQ, newQ;
    cart.forEach(cartItem => {
        if(cartItem.id === productId){
            iniQ = cartItem.quantity;
            newQ = Number(inputEle.value);
            cartItem.quantity = newQ;
        }
    });

    let diff = newQ - iniQ;
    cartQuantity += diff;
    localStorage.setItem('cart-quantity', cartQuantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    document.querySelector(`.cart-item-container[data-product-id="${productId}"]`).classList.remove('is-editing-quantity');
}

export function updateCartIcon() {
    cartQuantity = 0;

    cart.forEach(cartItem => {
       cartQuantity += cartItem.quantity; 
    });
    if(cartQuantity > 0){
        document.querySelector('.js-cart-quantity').innerText = cartQuantity;
    }else{
        document.querySelector('.js-cart-quantity').innerText = '';
    }
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