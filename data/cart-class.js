class Cart {
    cartItems;
    timeoutIds;
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    }

    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        // const selectorQuantity = Number(document.querySelector(`select[data-product-id="${productId}"]`).value);
        let existsInCart = false;
        this.cartItems.forEach(cartItem => {
            if(cartItem.id === productId){
                // cartItem.quantity += selectorQuantity;
                cartItem.quantity += 1;
                existsInCart = true;
                return;
            }
        })
        if(!existsInCart){
            this.cartItems.push({
                deliveryOptionId: 1,
                id: productId,
                // quantity: selectorQuantity
                quantity: 1
            })
        }
        
        let cartCount = this.getCartCount();
        
        if(cartCount > 0){
            document.querySelector('.js-cart-quantity').innerText = cartCount;
        }else{
            document.querySelector('.js-cart-quantity').innerText = '';
        }
        // displayAdded(productId);
    
        this.saveToStorage();
    }

    deleteFromCart(productId){
        this.cartItems.forEach((cartItem, index) => {
            if(cartItem.id === productId){
                this.cartItems.splice(index, 1);
            }
        });
        
        this.saveToStorage();
        document.querySelector(`.cart-item-container[data-product-id="${productId}"]`).remove();
    }

    displayInputSection(productId) {
        const updateElement = document.querySelector(`.cart-item-container[data-product-id="${productId}"]`);
    
        updateElement.classList.add('is-editing-quantity');
    }

    updateItemQuantity(productId) {
        const inputEle = document.querySelector(`.update-input[data-product-id="${productId}"]`);
        
        document.querySelector(`.quantity-label[data-product-id="${productId}"]`).innerText = Number(inputEle.value);
    
        this.cartItems.forEach(cartItem => {
            if(cartItem.id === productId){
                cartItem.quantity = Number(inputEle.value);
            }
        });
        this.saveToStorage();
        
        document.querySelector(`.cart-item-container[data-product-id="${productId}"]`).classList.remove('is-editing-quantity');
    }

    getCartCount() {
        let cartQuantity = 0;
    
        this.cartItems.forEach(cartItem => {
           cartQuantity += cartItem.quantity; 
        });
        return cartQuantity;
    }

    displayAdded(productId) {
        const msgElement = document.querySelector(`.added-to-cart[data-product-id="${productId}"]`);
    
        msgElement.classList.add('added');
    
        if(this.timeoutIds[productId] !== null){
            clearTimeout(this.timeoutIds[productId]);
        }
        const timeoutId = setTimeout(() => {
            msgElement.classList.remove('added');
        },2000)
    
        this.timeoutIds[productId] = timeoutId;
    }
}


const cart = new Cart('cart-oop');
console.log(cart);

const businessCart = new Cart('cart-business');
console.log(businessCart);