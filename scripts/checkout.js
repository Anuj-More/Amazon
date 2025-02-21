import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { cart } from '../../data/cart.js';
import '../data/cart-oop.js';

renderOrderSummary(cart);
renderPaymentSummary(cart);