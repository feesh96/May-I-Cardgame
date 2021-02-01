const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

const Dealer = require('./helpers/dealer');

let players = [];
let numDecks = 1;
let dealer = new Dealer.Dealer(0);
let turn = 1; // Player 1 starts

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    players.push(socket.id);
        
    numDecks = 2 + Math.ceil((players.length - 2.0) / 3.0);
    dealer = new Dealer.Dealer(numDecks);

    // console.log(dealer.deck); // Used for debugging

    socket.on('connected', function () {
        io.emit('newPlayer', players.length);
        console.log("New player! Number of decks used: " + numDecks);
    });

    socket.on('dealCards', function () {
        // Get top cards for dealing
        let cards = dealer.dealCards(players.length);

        // Deal each player 11 cards at a time
        for (let i = 1; i <= players.length; i++) {
            io.emit('dealCards', cards.slice(11 * (i - 1), i * 11), i);
        }

        // Add top card to discard pile
        io.emit('discard', dealer.drawCard(false));
    });

    socket.on('discard', function (card) {
        console.log('Discard: ' + card);
        dealer.discard(false);
    });

    socket.on('drawCard', function (fromDiscard) {
        console.log('Draw card: ' + fromDiscard);
        dealer.drawCard(fromDiscard);
    });

    socket.on('mayI', function (playerNumber) {
        io.emit('mayI', playerNumber);
    });

    socket.on('roundOver', function () {
        // Increase dealer turn, reset to 1 if needed
        turn = ++turn > players.length ? 1 : turn;

        // Calculate and update points totals

        io.emit('roundOver', turn);
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        players = players.filter(player => player !== socket.id);
    });
});

http.listen(3000, function () {
    console.log('Server started!');
});
