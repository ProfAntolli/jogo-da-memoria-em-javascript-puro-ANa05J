// CRIANDO AS CARTAS
const cardArray = [
    {name:"A", img: "A"},
    {name:"A", img: "A"},
    {name:"B", img: "B"},
    {name:"B", img: "B"},
    {name:"C", img: "C"},
    {name:"C", img: "C"},
    {name:"D", img: "D"},
    {name:"D", img: "D"},
];

// EMBARALHAR ESSAS CARTAS
cardArray.sort(() => 0.5 - Math.random());

// RENDERIZAR AS CARTAS NO TABULEIRO 
const gameBoard = document.querySelector("#game-board");

cardArray.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.name = card.name;
    cardElement.innerText = "?";
    gameBoard.appendChild(cardElement);
});

// CRIANDO A LOGICA DO JOGO 

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("card-flipped");
    this.innerText = this.dataset.name;

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMath();
}

function checkForMath() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        disablaCards()
    } else {
        unflipCard();
    }
}

function disablaCards() {
    firstCard.removeEventListenner("click", flipCard);
    secondCard.removeEventListenner("click", flipCard);

    resetBoard();
}

function unflipCard() {
    lockBoard = true

    setTimeout(() => {
        firstCard.classList.remove("card-flipped");
        secondCard.classList.remove("card-flipped");
        firstCard.innerText = "?";
        secondCard.innerText = "?";

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

document
 .querySelectorAll(".card")
 .forEach ((card) => card.addEventListener("click", flipCard));