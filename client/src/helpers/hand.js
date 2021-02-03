// How to sort hand objects?
import Card from "./card";

// Each of your own card a sprite
export default class Hand {
    constructor(cards, scene) {
        this.hand = [];
        this.cardsDown = [];
        this.topPosition = 0;

        cards.forEach(card => {
            this.add(card, scene);
        });
    }

    add(card, scene) {
        let cardObject = new Card(card, this.topPosition, scene);
        this.hand.push(cardObject)
        this.topPosition += 50;
    }
}