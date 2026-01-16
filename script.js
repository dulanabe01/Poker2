 let deck; 
 let hole_cards;
 let river_cards;
 // I start at cut-off, so Oshen is dealer
 let dealerSeatIndex = 5;

 document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('#deal').onclick = function () {
        deck = buildDeck();
        deck = shuffleDeck(deck);
        // lets divy up the cards
        let numplayers = 6;
        hole_cards = []; 
        for (let i = 0; i < numplayers*2; i++) {
            let card1 = deck.pop();
            hole_cards.push(card1);
        }
        let holeCardImages = document.querySelectorAll(".hole-card");
        holeCardImages.forEach((img, index) => {
            img.dataset.value=hole_cards[index];
        });


    }
    
    document.querySelector('#flop').onclick = function () {
        // get 3 cards
        flop_cards = [];
        for (let i = 0; i < 3; i++) {
            card = deck.pop();
            flop_cards.push(card);
        }
        
        let flopCardImages = document.querySelectorAll(".flop-card");
        flopCardImages.forEach((img, index) => {
            img.dataset.value=flop_cards[index];
            img.src = `static/cards/${img.dataset.value}.svg`;
        })

        // loop through all of the hole-cards and mark them now as faceup


    }

        document.querySelector("#turn-button").onclick = function () {
        // get turn card
        turn_card = deck.pop(); 
        turnCardImage = document.querySelector('.turn-card');
        turnCardImage.dataset.value = turn_card;
        turnCardImage.src = `static/cards/${turnCardImage.dataset.value}.svg`;
    }

    document.querySelector("#river-button").onclick = function () {
        // get river card
        river_card = deck.pop(); 
        riverCardImage = document.querySelector('.river-card');
        riverCardImage.dataset.value=river_card;
        riverCardImage.src = `static/cards/${riverCardImage.dataset.value}.svg`;
    }



    document.querySelector('#new-hand-button').onclick = function () {
        // rebuild the deck:
        deck = buildDeck(); 
        deck = shuffleDeck(deck);
        // make all the cards appear like backs
        let hands = document.querySelectorAll(".cards");
        hands.forEach((hand) => {
            hand.classList.remove("faceup");
            hand.classList.add("facedown");
        })
        //refresh all the cards
        let holeCards = document.querySelectorAll(".card");
        holeCards.forEach((holeCard) => {
            holeCard.src = 'static/cards/1B.svg';
        })
        
        // move the dealer badge

        // remove dealer badge from current person
        // get the seat object of the person who is currently dealer
        let current_dealer = document.querySelector(".is-dealer");
        // remove them as dealer
        current_dealer.classList.remove("is-dealer");

        // increment dealer
        dealerSeatIndex = (dealerSeatIndex+1)%6;

        // get the new dealer
        let new_dealer = document.querySelector(`.seat${dealerSeatIndex}`);
        new_dealer.classList.add("is-dealer");
        
        

    }

    // add card flip functionality to all of the cards
    const holeCards = document.querySelectorAll(".hole-cards");
    holeCards.forEach(function(hand){
        hand.addEventListener("click", function () {


        const cards = hand.querySelectorAll("img"); 

        if (hand.classList.contains("facedown")) {
            cards[0].src = `static/cards/${cards[0].dataset.value}.svg`;
            cards[1].src = `static/cards/${cards[1].dataset.value}.svg`;
        } else {
            cards[0].src = "static/cards/1B.svg"; 
            cards[1].src = "static/cards/1B.svg";
        }


        
        hand.classList.toggle("faceup");
        hand.classList.toggle("facedown");
        });
    })
})


function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
    let suits = ["C", "D", "H", "S"];
    let deck = []; 
    
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + suits[i]);
        }
    }
    return deck;
}

function shuffleDeck(deck) {
   for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random()* deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
   } 
   return deck;
}
