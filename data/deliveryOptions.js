import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    id: 1,
    time: 7,
    priceCents: 0
}, {
    id: 2,
    time: 3,
    priceCents: 499
}, {
    id: 3,
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

export function getDeliveryOption(optionId) {
  let matchingOption;
  deliveryOptions.forEach(option => {
    if(option.id === optionId)
        matchingOption = option;
  })
  return matchingOption;
}