const ArrayList = require('arraylist')

function Dealer(numDecks) {

    this.numDecks = numDecks;
    this.deck = new ArrayList();
    this.discardPile = new Stack();

    //Fill deck
    for (let i = 0; i < 4; i++) {
        let suits = ['S', 'H', 'C', 'D']
        for (let j = 0; j < 13 * numDecks; j++) {
            let cardNum = (j % 13) + 2;
            switch (j % 13) {
                case 9:
                    cardNum = 'J';
                    break;
                case 10:
                    cardNum = 'Q';
                    break;
                case 11:
                    cardNum = 'K';
                    break;
                case 12:
                    cardNum = 'A';
            }

            // Add cards e.g. 5S, JD, AC
            this.deck.add(cardNum.toString() + suits[i]);
        }
    }

    this.deck = this.deck.shuffle();
    
    // Deal 11 cards to each player
    this.dealCards = (players) => {
        this.deck = this.deck.shuffle();
        return this.deck.splice(0, 11 * players);
    }

    // Deal single card
    this.drawCard = (fromDiscard) => {      
        // Draw top card from discard pile or deck
        return fromDiscard ? this.discardPile.pop() : this.deck.shift();
    }

    this.discard = (card) => {
        // Add it to the discard pile
        this.discardPile.push(card);
    }
}

class Stack {
    items = []
    push = (element) => this.items.push(element)
    pop = () => this.items.pop()
    isempty = () => this.items.length === 0
    empty = () => (this.items.length = 0)
    size = () => this.items.length
  }

module.exports = {
    Dealer: Dealer
}