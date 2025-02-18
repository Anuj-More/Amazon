import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";


export function renderPaymentSummary(cart) {
    console.log('payment summary rendered');

    let itemsTotalCents = getItemsTotal(cart);
    let shippingCostCents = getShippingCost(cart);
    let totBeforeTaxCents = itemsTotalCents + shippingCostCents;
    let taxCents = Math.round(totBeforeTaxCents * 0.1);
    let grandTotCents = totBeforeTaxCents + taxCents;
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