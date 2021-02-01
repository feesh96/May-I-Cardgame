// How to sort hand objects?
// Each of your own card a sprite
export default class Hand {
    constructor() {
        this.hand = [];
        this.cardsDown = [];
        this.isTurn = false;
        this.number = -1;

        this.setPlayer = (playerNumber) => {
            this.number = playerNumber;
        }

        this.render = () => {

        }

        this.deal = (cards) => {
            this.hand = cards;
        }
    }
}