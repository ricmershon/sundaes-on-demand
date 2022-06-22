import keyMirror from 'keymirror';

export const pricePerItem = {
    scoops: 2,
    toppings: 1.5
};

export const ORDER_PHASE = keyMirror({
    IN_PROGRESS: null,
    REVIEW: null,
    COMPLETED: null
});