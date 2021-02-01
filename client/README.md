# May-I-Card-Game
Node-based card game where you have to satisfy certain requirements for a winning hand. Requirements change every hand. A losing hand adds points to your score, where the goal is to have the lowest score at the end of 10 hands.

##Rules
The goal of the game is to put your hand "down" every round, and eventually empty your hand.
Every round (10 rounds total) has a "goal hand" to reach, which can be any combination of "runs" or "sets", which are created by taking turns picking and discarding cards in your hand.
- Ex: round 1's goal is to get 2 sets of 3 and a run of 5. This means you need 2 "sets" of 3 cards of the same value, and a run of 5 cards of the same suit. You can have longer runs or bigger sets if possible.
- An example hand that satisfies these requirements is 9, 9, 9, 9, J, J, J, (8 spades, 9 spades, 10 spades, J spades, Q spades, K spades)

Once you can satisfy the round's rules for a winning hand, you can "go down". This means you lay your cards down for the whole table to see. If you still have cards left in your hand, the game continues until someone's hand is completely empty.



##Gameplay
1. Dealer tries to select exactly half of the deck. If the dealer does successfully, they get to subtract -10 from their score.
2. Everyone gets dealt 11 cards, and the next card starts the "discard pile".
3. The person to the left of the dealer can either take the card on top of the discard pile, or select a new card from the deck.
4. The person who just selected another card must choose a card to discard. At any point in the game, all hands must always be at exactly 11 cards.
5.
