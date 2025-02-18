import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";


export function renderPaymentSummary(cart) {
    console.log('payment summary rendered');
    
    let itemsTotalCents = getItemsTotal(cart);
    let shippingCostCents = getShippingCost(cart);
    let totBeforeTaxCents = itemsTotalCents + shippingCostCents;
    let taxCents = Math.round(totBeforeTaxCents * 0.1);
    let grandTotCents = totBeforeTaxCents + taxCents;

    const paymentSummaryHTML = generatePaymentHTML(itemsTotalCents, shippingCostCents, totBeforeTaxCents, taxCents, grandTotCents);
    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
};

function generatePaymentHTML(itemsTotalCents, shippingCostCents, totBeforeTaxCents, taxCents, grandTotCents) {
    return `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div class="item-count">Items (3):</div>
        <div class="payment-summary-money">${formatCurrency(itemsTotalCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingCostCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(grandTotCents)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
    `;
};

function getItemsTotal(cart) {
    let tot = 0;
    cart.forEach(cartItem => {
        const product = getProduct(cartItem.id);
        tot += cartItem.quantity * product.priceCents;
    });
    return tot;
};

function getShippingCost(cart) {
    let tot = 0;
    cart.forEach(cartItem => {
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        tot += deliveryOption.priceCents;
    });
    return tot;
};