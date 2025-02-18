import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    optionid: 1,
    time: 7,
    priceCents: 0
}, {
    optionid: 2,
    time: 3,
    priceCents: 499
}, {
    optionid: 3,
    time: 1,
    priceCents: 999
}];

export function getDeliveryDateString(time) {
    let today = dayjs();
    
    switch(time){
        case 1:
            return today.add(7, 'd').format('dddd, MMMM D');
        case 2:
            return today.add(5, 'd').format('dddd, MMMM D');
        case 3:
            return today.add(3, 'd').format('dddd, MMMM D');
        default:
            return '';
    }
}