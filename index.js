const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
const values = [1,2,3,4,5,6,7,8,9,10,10,10,10]

let cards = document.getElementById("Cards")

let sum = document.getElementById("Sum")
let sum2 = document.getElementById("DealerSum")

let bj = document.getElementById("BJ")
let Dealer = document.getElementById("Dealer")
let type = ""
let ace = false
let dealerAce = false

let playerHasBlackJack = false
let dealerHasBlackJack = false

let playerSum = 0
let playerSum2 = 0

let dealerSum = 0
let dealerSum2 = 0

let x = -200

function conditions(Sum,Sum2,type){
    if (Sum == 21 || Sum2 == 21){
        if (type == "player"){
            playerHasBlackJack = true 
        }
        else if (type == "dealer"){
            dealerHasBlackJack = true 
        }
    }
}

function reset(){
    playerSum = 0
    playerSum2 = 0
    dealerSum = 0
    dealerSum2 = 0

    playerHasBlackJack = false
    dealerHasBlackJack = false

    const image = document.getElementById('dPic');
    image.style.transform = `translate(-200px, -315px)`;
    const dSum = document.getElementById('DealerSum');
    dSum.style.transform = `translate(-200px, -25px)`;
    
    const hit = document.getElementById('hitButton');
    const stand = document.getElementById('standButton');
    hit.style.display = 'inline';
    stand.style.display = 'inline';

    x = -200
    sum2.innerText = ""
    cards.innerText = ""
    sum.innerText = ""
    bj.innerText = "Blackjack:"
    Dealer.innerText = ""
    const winner = document.getElementById("win")
    // winner.innerText = ""
    ace = false
    dealerAce = false
    
}

function generateCard(){
    return Math.floor((Math.random() * 13)+1)
}

function generateSuit(){
    return suits[Math.floor(Math.random() * (suits.length))];
}

function createCard(type){
    // Creates a card to be displayed for both the dealer and player.
    let cardVal = generateCard();
    let cardSuit =  generateSuit();
    let cardElement = document.createElement('card-t');
    cardElement.setAttribute('suit', cardSuit);
    cardElement.setAttribute('rank', cardVal.toString());
    if (type == "player"){
        document.getElementById('Cards').appendChild(cardElement);
        if (cardVal == 1){
            playerSum2 += 10
            ace = true
        }
        playerSum2 += values[cardVal-1]
        playerSum += values[cardVal-1]
    }
    else{
        document.getElementById('Dealer').appendChild(cardElement);
        if (cardVal == 1){
            dealerSum2 += 10
            dealerAce = true
        }
        dealerSum2  += values[cardVal-1]
        dealerSum += values[cardVal-1]
    }
    
}

function isAce(ACE,Sum1,Sum2,type){
    // Checks if an ace is present for special conditions.
    if (type == "player"){
        if (ACE == true){
            sum.innerText += Sum1 + " OR " + Sum2
        }else{
            sum.innerText += Sum1 
        }
    }
        
    else if (type == "dealer"){
        if (ACE == true){
            sum2.innerText += Sum1 + " OR " + Sum2
        }else{
            sum2.innerText += Sum1 
        }
    }

}

function play(){
    // Function to initiate the game.
    reset()

    createCard("dealer")
    conditions(dealerSum,dealerSum2,"dealer")
    isAce(dealerAce,dealerSum,dealerSum2,"dealer")

    createCard("player")
    createCard("player")

    if (playerSum > 21 || playerSum2 > 21) {
        const hiddenContent = document.getElementById('HiddenContent');
        let winner = document.getElementById("win")
        hiddenContent.style.display = 'none';
        winner.innerText = "Busted!";
    }else{
        conditions(playerSum,playerSum2,"player")
        isAce(ace,playerSum,playerSum2,"player")
        emoji()
    }

}

function hit(){
    //Function to provide player cards when they want to hit.
    sum.innerText = ""
    bj.innerText = "Blackjack:"
    playerHasBlackJack = false
    createCard("player")
    isAce(ace,playerSum,playerSum2,"player")
    conditions(playerSum,playerSum2,"player")
    emoji()
    if (playerSum > 21 && playerSum2 > 21){
        setTimeout(function() {win();}, 1000); 
    }
    
}

function emoji(){
    if (playerHasBlackJack == true){
        var emoji = String.fromCodePoint(0x2705)
        bj.innerText = "Blackjack:" + emoji
    }
    else{
        var emoji = String.fromCodePoint(0x274c)
        bj.innerText = "Blackjack:" + emoji
    }
}

function stand() {
    function winGame(){
        // Make a delay of 1.5 seconds for better transitioning.
        setTimeout(function() {win();}, 1500); 
    }
    function performStand() {
        // Adjust position of image and related card values.
        const image = document.getElementById('dPic');
        const dSum = document.getElementById('DealerSum');
        x -= 72;
        image.style.transform = `translate(${x}px, -315px)`;
        image.style.transition = 'transform 0.5s';

        dSum.style.transform = `translate(${x}px, -25px)`;
        dSum.style.transition = 'transform 0.5s';

        // Dish a card out to the dealer.
        createCard("dealer");
        sum2.innerText = "";
        isAce(dealerAce, dealerSum, dealerSum2, "dealer");
        conditions(dealerSum, dealerSum2, "dealer");

        if ((!(dealerSum >= 21 && dealerSum2 >= 21) || (dealerSum == playerSum || dealerSum2 == playerSum || dealerSum == playerSum2 || dealerSum2 == playerSum2 ))) {
            setTimeout(performStand, 1000);
        } else {
            winGame()
        }
    }
    performStand();
}

function win(){
    const hiddenContent = document.getElementById('HiddenContent');
    let winner = document.getElementById("win")
    hiddenContent.style.display = 'none';

    const button2 = document.getElementById('replay');
    button2.style.display = 'inline';

    if (playerSum === 21 || playerSum2 === 21) {
    // If player hits exactly 21, player wins.
        winner.innerText = "You Win!";
    }
    else if (playerSum > 21 && playerSum2 > 21) {
    // If both player sums are over 21, player busts and dealer wins.
        winner.innerText = "Busted!";
    } else if (dealerSum > 21 && dealerSum2 > 21) {
    // If both dealer sums are over 21, dealer busts and player wins.
        winner.innerText = "You Win!";
    }else if ((dealerSum === 21 && playerSum === 21) || (dealerSum2 === 21 && playerSum === 21)|| (dealerSum2 === 21 && playerSum2 === 21) || (dealerSum === 21 && playerSum2 === 21))
    {
        winner.innerText = "You lose!";
    }else if (dealerSum === 21 || dealerSum2 === 21) {
    // If dealer hits exactly 21, dealer wins.
         winner.innerText = "You lose!";
    } else if (playerSum > dealerSum && playerSum <= 21) {
    // If player sum is greater than dealer sum and <= 21, player wins.
        winner.innerText = "You Win!";
    } else if (playerSum2 > dealerSum && playerSum2 <= 21) {
    // If player alternative sum is greater than dealer sum and <= 21, player wins.
        winner.innerText = "You Win!";
    } else if (playerSum > dealerSum2 && playerSum <= 21) {
    // If player sum is greater than dealer alternative sum and <= 21, player wins.
        winner.innerText = "You Win!";
    } else if (playerSum2 > dealerSum2 && playerSum2 <= 21) {
    // If player alternative sum is greater than dealer alternative sum and <= 21, player wins.
        winner.innerText = "You Win!";
    } else if (dealerSum > playerSum && dealerSum <= 21) {
    // If dealer sum is greater than player sum and <= 21, dealer wins.
        winner.innerText = "You lose!";
    } else if (dealerSum2 > playerSum && dealerSum2 <= 21) {
    // If dealer alternative sum is greater than player sum and <= 21, dealer wins.
        winner.innerText = "You lose!";
    } else if (dealerSum > playerSum2 && dealerSum <= 21) {
    // If dealer sum is greater than player alternative sum and <= 21, dealer wins.
        winner.innerText = "You lose!";
    } else if (dealerSum2 > playerSum2 && dealerSum2 <= 21) {
    // If dealer alternative sum is greater than player alternative sum and <= 21, dealer wins.
        winner.innerText = "You lose!";
    } else {
    // Default case dealer wins.
        winner.innerText = "You lose!";
    }

    button2.addEventListener('click', function() {
        winner.innerText = ""
        button2.style.display = 'none';
        reset()
        play()
        hiddenContent.style.display = 'inline';

    });
}

