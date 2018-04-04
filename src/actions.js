//actions

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const sendMessage = (name, text) => ({
    type: SEND_MESSAGE,
    name,
    text,
});

export const PLACE_CARD_ON_STACK = 'PLACE_CARD_ON_STACK';
export const placeCardOnStack = (playerIndex, cardType) => ({
    type: PLACE_CARD_ON_STACK,
    playerIndex,
    cardType,
});