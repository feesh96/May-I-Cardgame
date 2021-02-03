import io from 'socket.io-client';
import Hand from '../helpers/hand';
import Player from '../helpers/player';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        // Load cards 2 through 10
        for (var i = 2; i <= 10; i++) {
            this.load.image(i + 'S', 'src/assets/cards/' + i + 'S.png');
            this.load.image(i + 'D', 'src/assets/cards/' + i + 'D.png');
            this.load.image(i + 'H', 'src/assets/cards/' + i + 'H.png');
            this.load.image(i + 'C', 'src/assets/cards/' + i + 'C.png');
        }

        // Load cards Jack through Ace
        let faceCards = ['J', 'Q', 'K', 'A'];
        for (let face in faceCards) {
            this.load.image(faceCards[face] + 'S', 'src/assets/cards/' + faceCards[face] + 'S.png');
            this.load.image(faceCards[face] + 'D', 'src/assets/cards/' + faceCards[face] + 'D.png');
            this.load.image(faceCards[face] + 'H', 'src/assets/cards/' + faceCards[face] + 'H.png');
            this.load.image(faceCards[face] + 'C', 'src/assets/cards/' + faceCards[face] + 'C.png');
        }

        // Load card backs
        this.load.image('backBlue', 'src/assets/cards/blue_back.png');
        this.load.image('backGreen', 'src/assets/cards/green_back.png');
        this.load.image('backYellow', 'src/assets/cards/yellow_back.png');
        this.load.image('backGray', 'src/assets/cards/gray_back.png');
        this.load.image('backRed', 'src/assets/cards/red_back.png');
        this.load.image('backPurple', 'src/assets/cards/purple_back.png');

        this.load.image('blankCard', 'src/assets/cards/card_empty.png');
        this.load.image('table', 'src/assets/poker_table.jpg');
    }

    create() {
        this.add.image(830, 450, 'table').setScale(3.7, 3.7);
        // When someone clicks on the deck, they get the card
        // Make sure only the p
        this.deck = this.add.image(750,250, 'backRed').setScale(0.15, 0.15).setInteractive();
        this.discardPile = this.add.image(950,250, 'blankCard').setScale(2.5, 2.5);
        let self = this;

        this.player = new Player();
        this.players = [];
        this.turn = 1;

        this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(30).setFontFamily('Trebuchet MS').setColor('#00ffff');

        this.dealText.on('pointerdown', function () {
            self.socket.emit("dealCards");
            self.dealText.disableInteractive();
        });

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        });

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        });

        // Interactable Objects on the table:
        // Your cards
        // Opponents' down cards
        // Draw and Discard piles
        // Button that says "may I" (only clickable when not your turn)
        // Popup that says "<player name> asked May I!" with yes/no buttons


        // When you click a card
        //  - it becomes "selected"
        //  - it gets a highlight/border
        //  - you can drag it around 
        //  - you can make it switch spots with another card in your hand
        //  - IF ELIGIBLE: 
        //      - you can click or drag the discard pile to discard
        //      - you can place cards in another pile

        // Keep track of other players -- their positions for turn ordering, if its their turn or not
        // Need to keep track of other players' number of cards, the discard pile, and your own hand
        // Need a function that creates a "you may" button, which when clicked should make it dissapear and pass to the next person
        
        // What kinds of things should I keep track of in the server?
        // What kinds of things should be kept track of in the client? 
        // What kinds of things should be kept in both?

        // Well, anything we keep track of in the client should be kept track of in the server, right?
        // What about "isMyTurn"? Yeah, both. Players need an identity (turn order) and the server keeps track of the turn. When it changes, client is notified and does the visuals.

        // Server should keep track of "gamemaster data". The rule keeper 
    
        this.socket = io('http://localhost:3000');

        this.socket.on('connect', function () {
            console.log('Connected!');
            self.socket.emit("connected")
        });

        this.socket.on('newPlayer', function (number) {
            if (self.player.number === -1) {
                // If player number isn't set, fill the player array and add yourself
                for (let i = 0; i++; i < number - 1) {
                    self.players[i] = new Player();
                }

                self.players[number - 1] = self.player;
                self.player.number = number;
                console.log("This is player number " + self.player.number);

                if (self.player.number === self.turn) {
                    self.dealText.setInteractive();
                }
            } else {
                // Otherwise, just add the new player to the player array
                self.players[number - 1] = new Player();
            }
        })

        this.socket.on('dealCards', function (cards, playerNumber) {
            if (playerNumber === self.player.number) {
                console.log(playerNumber);
                console.log(cards);
                self.player.hand = new Hand(cards, self);
            }
        })

        this.socket.on('discard', function (card) {
            self.discardPile.setTexture(card).setScale(0.15, 0.15);
        });

        this.socket.on('roundOver', function (newTurn) {
            turn = newTurn();
            if (this.player.number === turn) {
                self.dealText.setInteractive();
            }
        });

        // this.socket.on('cardPlayed', function (gameObject, isPlayerA) {
        //     if (isPlayerA !== self.isPlayerA) {
        //         let sprite = gameObject.textureKey;
        //         self.opponentCards.shift().destroy();
        //         self.dropZone.data.values.cards++;
        //         let card = new Card(self);
        //         card.render(((self.dropZone.x - 350) + (self.dropZone.data.values.cards * 50)), (self.dropZone.y), sprite).disableInteractive();
        //     }
        // })
    }
    
    update() {
    
    }

    dealCards(cards) {

    }
}