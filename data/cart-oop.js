function Cart(localStorageKey, localStorageKey2) {
    const cart = {
        cartItems : undefined,
        cartQuantity : undefined,
        timeoutIds : undefined,
    
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
            this.cartQuantity = JSON.parse(localStorage.getItem(localStorageKey2)) || 0
        },
    
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
            localStorage.setItem(localStorageKey2, JSON.stringify(this.cartQuantity));
        },
    
        addToCart(productId) {
            // const selectorQuantity = Number(document.querySelector(`select[data-product-id="${productId}"]`).value);
            let existsInCart = false;
            this.cartItems.forEach(cartItem => {
                if(cartItem.id === productId){
                    existsInCart = true;
                    // cartItem.quantity += selectorQuantity;
                    cartItem.quantity += 1;
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
            this.cartQuantity = 0;
        
            this.cartItems.forEach(cartItem => {
                this.cartQuantity += cartItem.quantity; 
            });
            
            // this.updateCartIcon();
            // this.displayAdded(productId);
        
            this.saveToStorage();
        },
    
        deleteFromCart(productId){
            this.cartItems.forEach((cartItem, index) => {
                if(cartItem.id === productId){
                    this.cartItems.splice(index, 1);
                    this.cartQuantity -= cartItem.quantity;
                }
            });
            
            this.saveToStorage();
            document.querySelector(`.cart-item-container[data-product-id="${productId}"]`).remove();
        },
    
        displayInputSection(productId) {
            const updateElement = document.querySelector(`.cart-item-container[data-product-id="${productId}"]`);
        
            updateElement.classList.add('is-editing-quantity');
        },
    
        updateItemQuantity(productId) {
            const inputEle = document.querySelector(`.update-input[data-product-id="${productId}"]`);
            
            document.querySelector(`.quantity-label[data-product-id="${productId}"]`).innerText = Number(inputEle.value);
        
            let iniQ, newQ;
            this.cartItems.forEach(cartItem => {
                if(cartItem.id === productId){
                    iniQ = cartItem.quantity;
                    newQ = Number(inputEle.value);
                    cartItem.quantity = newQ;
                }
            });
        
            let diff = newQ - iniQ;
            cartQuantity += diff;
            this.saveToStorage();
            
            document.querySelector(`.cart-item-container[data-product-id="${productId}"]`).classList.remove('is-editing-quantity');
        },
    
        updateCartIcon() {
            this.cartQuantity = 0;
        
            this.cartItems.forEach(cartItem => {
                this.cartQuantity += cartItem.quantity; 
            });
            if(this.cartQuantity > 0){
                document.querySelector('.js-cart-quantity').innerText = this.cartQuantity;
            }else{
                document.querySelector('.js-cart-quantity').innerText = '';
            }
        },
    
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

    return cart;
}

const cart = Cart('cart-oop', 'cart-quantity-oop');
cart.loadFromStorage();
// cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

const businessCart = Cart('cart-business', 'cart-quantity-oop-business');
businessCart.loadFromStorage();
// businessCart.addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
// businessCart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

console.log(cart)
console.log(businessCart)