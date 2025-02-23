import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            console.log('products done');
            resolve();
        })
    }),
    new Promise((resolve) => {
        loadCart(() => {
            console.log('cart done');
            resolve();
        })
    })
]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
    console.log('loading all promises simultaneously');
});

// new Promise((resolve) => {
//     loadProducts(() => {
//         console.log('products done');
//         resolve();
//     })
// }).then(() => {
//     return new Promise((resolve) => {
//         loadCart(() => {
//             console.log('cart done');
//             resolve();
//         })
//     });
// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     console.log('loading through a promise');
// });

// loadProducts(() => {
//     console.log('products done');
//     loadCart(() => {
//         console.log('cart done');
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
//     console.log('loading through a callback');
// });
