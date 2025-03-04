import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {
    await loadProductsFetch();

    await new Promise((resolve) => {
        loadCart(() => {
            console.log('cart done');
            resolve();
        })
    })

    renderOrderSummary();
    renderPaymentSummary();

}

// loadPage();

loadPage().then(() =>{
    console.log('next step')
});

// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             console.log('cart done');
//             resolve();
//         })
//     })
// ]).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     console.log('loading all promises simultaneously');
// });

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
