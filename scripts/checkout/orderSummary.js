import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { cartQuantity, deleteFromCart, displayInputSection, updateItemQuantity } from '../../data/cart.js';
import { getDeliveryDateString, } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(cart) {
    updateHeaderQuantity();
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
          updateHeaderQuantity();
          renderPaymentSummary(cart);   
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
          updateHeaderQuantity();
          renderPaymentSummary(cart);
      });

      document.querySelectorAll(`.delivery-option-input[data-product-id="${cartItem.id}"]`).forEach(radioButton => {
        radioButton.addEventListener('click', () => {
          let newOptionId = Number(radioButton.dataset.optionId);
          cartItem.deliveryOptionId = newOptionId;

          document.querySelector(`.js-delivery-date-${cartItem.id}`).innerText = `Delivery date: ${getDeliveryDateString(cartItem.deliveryOptionId)}`;

          renderPaymentSummary(cart);

          localStorage.setItem('cart', JSON.stringify(cart));
        });
      });

    });
    
}

function generateOrderHTML(cartItem) {
    const product = getProduct(cartItem.id);
    let html = `
        <div class="cart-item-container" data-product-id="${product.id}">
            <div class="delivery-date js-delivery-date-${product.id}">
              Delivery date: ${getDeliveryDateString(cartItem.deliveryOptionId)}
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
                  <input type="radio" ${cartItem.deliveryOptionId===1 ? 'checked' : ''} class="delivery-option-input"
                  name="delivery-option-${product.id}"
                  data-option-id="1"
                  data-product-id="${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${getDeliveryDateString(1)}
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" ${cartItem.deliveryOptionId===2 ? 'checked' : ''} class="delivery-option-input"
                  name="delivery-option-${product.id}"
                  data-option-id="2"
                  data-product-id="${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${getDeliveryDateString(2)}
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" ${cartItem.deliveryOptionId===3 ? 'checked' : ''} class="delivery-option-input"
                  name="delivery-option-${product.id}"
                  data-option-id="3 "
                  data-product-id="${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${getDeliveryDateString(3)}
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

function updateHeaderQuantity(){
  document.querySelector('.quantity-header').innerText = cartQuantity;
}