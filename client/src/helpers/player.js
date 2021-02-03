import Hand from "./hand";

// Keep track of "order", "hand", "cardsDown", "isTurn", "playerNumber"
export default class Player {
    constructor() {
        this.hand = [];
        this.cardsDown = [];
        this.isTurn = false;
        this.number = -1;
        this.points = 0;

        this.setPlayer = (playerNumber) => {
            this.number = playerNumber;
        }
        
        this.discard = (self, card, pile) => {
            self.hand.remove(card);
            Discard_Pile.add(pile, card);
        }
        
        this.draw = (self, deck) => {
            card = Deck.deal(deck);
            self.hand.append(card);
        }
            
        this.take_discard = (self, pile) => {
            card = Discard_Pile.remove(pile);
            self.hand.append(card);
        }
        
        this.may_i = (self, deck, pile) => {
            Player.take_discard(self, pile);
            Player.draw(self, deck);
        }
        
        this.add_points = (self, points) => {
            self.points = self.points + points;
        }
            
        this.get_points = (self) => {
            return self.points
        }
            
        this.get_hand = (self) => {
            return self.hand;
        }
    }
}