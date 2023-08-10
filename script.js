const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const startButton = document.getElementById('start-button');
const turnDisplay = document.getElementById('turn');
const board = document.getElementById('board');
const resultDisplay = document.getElementById('result');

let currentPlayer = '';
let firstCard = null;
let secondCard = null;
let cardsFlipped = 0;
let canClick = true;

const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
let shuffledCards = [];

function flipCard(card) {
  card.classList.add('flipped');
}

function unflipCards() {
  firstCard.classList.remove('flipped');
  secondCard.classList.remove('flipped');
  resetTurn();
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  canClick = true;
}

function checkForMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.removeEventListener('click', handleClick);
    secondCard.removeEventListener('click', handleClick);
    cardsFlipped += 2;
    resetTurn();
    checkForWin();
  } else {
    setTimeout(unflipCards, 1000);
  }
}

function handleClick() {
  if (!canClick) return;
  
  flipCard(this);
  
  if (!firstCard) {
    firstCard = this;
    return;
  }
  
  secondCard = this;
  canClick = false;
  
  checkForMatch();
}

function checkForWin() {
  if (cardsFlipped === cards.length) {
    resultDisplay.textContent = 'Jogo terminou!';
    resultDisplay.classList.remove('hidden');
    if (player1Input.value !== '' && player2Input.value !== '') {
      if (player1Score > player2Score) {
        resultDisplay.textContent = `${player1Input.value} ganhou!`;
      } else if (player2Score > player1Score) {
        resultDisplay.textContent = `${player2Input.value} ganhou!`;
      } else {
        resultDisplay.textContent = 'Empate!';
      }
    }
  }
}

startButton.addEventListener('click', () => {
  const player1 = player1Input.value || 'Jogador 1';
  const player2 = player2Input.value || 'Jogador 2';

  currentPlayer = player1;
  turnDisplay.textContent = `${currentPlayer}'s Turn`;
  turnDisplay.classList.remove('hidden');

  shuffledCards = cards.concat(cards).sort(() => Math.random() - 0.5);

  board.innerHTML = '';
  for (const card of shuffledCards) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = card;
    cardElement.textContent = card;
    cardElement.addEventListener('click', handleClick);
    board.appendChild(cardElement);
  }

  player1Input.disabled = true;
  player2Input.disabled = true;
  startButton.disabled = true;
});

board.addEventListener('click', () => {
  if (!canClick) return;
  
  if (currentPlayer === player1Input.value) {
    currentPlayer = player2Input.value;
  } else {
    currentPlayer = player1Input.value;
  }
  
  turnDisplay.textContent = `${currentPlayer}'s Turn`;
});
