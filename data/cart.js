

export let cart = undefined;
let timeoutIds = [];

loadFromStorage();

function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

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
    
    let cartCount = getCartCount();
    
    if(cartCount > 0){
        document.querySelector('.js-cart-quantity').innerText = cartCount;
    }else{
        document.querySelector('.js-cart-quantity').innerText = '';
    }
    displayAdded(productId);

    saveToStorage();
}

export function deleteFromCart(productId){
    cart.forEach((cartItem, index) => {
        if(cartItem.id === productId){
            cart.splice(index, 1);
        }
    });
    
    saveToStorage();
    document.querySelector(`.cart-item-container[data-product-id="${productId}"]`).remove();
}

export function displayInputSection(productId) {
    const updateElement = document.querySelector(`.cart-item-container[data-product-id="${productId}"]`);

    updateElement.classList.add('is-editing-quantity');
};

export function updateItemQuantity(productId) {
    const inputEle = document.querySelector(`.update-input[data-product-id="${productId}"]`);
    
    document.querySelector(`.quantity-label[data-product-id="${productId}"]`).innerText = Number(inputEle.value);

    cart.forEach(cartItem => {
        if(cartItem.id === productId){
            cartItem.quantity = Number(inputEle.value);
        }
    });
    saveToStorage();
    
    document.querySelector(`.cart-item-container[data-product-id="${productId}"]`).classList.remove('is-editing-quantity');
}

export function getCartCount() {
    let cartQuantity = 0;

    cart.forEach(cartItem => {
       cartQuantity += cartItem.quantity; 
    });
    return cartQuantity;
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