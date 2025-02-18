import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deleteFromCart, displayInputSection, updateItemQuantity } from '../../data/cart.js';

export function renderOrderSummary(cart) {
    let orderSummaryHTML = '';
    cart.forEach(cartItem => {
        orderSummaryHTML += generateOrderHTML(cartItem);
    });
    document.querySelector('.order-summary').innerHTML = orderSummaryHTML;


    cart.forEach(cartItem => {
      document.querySelector(`.delete-quantity-link[data-product-id="${cartItem.id}"]`)
        .addEventListener('click', () => {
          // console.log(cart);
          deleteFromCart(cartItem.id);
      });

      document.querySelector(`.update-quantity-link[data-product-id="${cartItem.id}"]`)
        .addEventListener('click', () => {
          // console.log(cart);
          displayInputSection(cartItem.id);
      });

      document.querySelector(`.save-quantity-link[data-product-id="${cartItem.id}"]`)
        .addEventListener('click', () => {
          // console.log(cart);
          updateItemQuantity(cartItem.id);
      });
    });
    
}

function generateOrderHTML(cartItem) {
    const product = getProduct(cartItem.id);
    let html = `
        <div class="cart-item-container" data-product-id="${product.id}">
            <div class="delivery-date">
              Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label" data-product-id="${product.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-product-id="${product.id}">
                    Update
                  </span>
                  <input class="update-input" data-product-id="${product.id}">
                  <span class="save-quantity-link link-primary" data-product-id="${product.id}">Save</span>
                  <span class="delete-quantity-link link-primary" data-product-id="${product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-2">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" checked class="delivery-option-input"
                    name="delivery-option-2">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-2">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    `;
    return html;
}