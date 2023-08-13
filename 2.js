const players = [];
let currentPlayerIndex = 0;
let firstCard = null;
let secondCard = null;
let canClick = true;
let score = [0, 0];
let cardsFlipped = 0;

const values = Array.from({ length: 10 }, (_, i) => i + 1);
const cards = [...values, ...values]; // Cada valor aparece duas vezes

const playerTurnElem = document.getElementById('player-turn');
const boardElem = document.getElementById('board');
const resultElem = document.getElementById('result');
const restartButton = document.getElementById('restart-button');

const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame);

function startGame() {
  const player1 = document.getElementById('player1').value;
  const player2 = document.getElementById('player2').value;
  if (player1 && player2) {
    players.push(player1, player2);
    startButton.style.display = 'none';
    createBoard();
    updatePlayerTurn();
  }
}

function createBoard() {
  shuffleCards(cards);
  for (let i = 0; i < cards.length; i++) {
    const cardElem = document.createElement('div');
    cardElem.className = 'card';
    cardElem.dataset.value = cards[i];
    cardElem.addEventListener('click', () => onCardClick(cardElem));
    boardElem.appendChild(cardElem);
  }
}

function onCardClick(cardElem) {
  if (!canClick || cardElem.classList.contains('found') || cardElem.classList.contains('flipped')) return;

  cardElem.textContent = cardElem.dataset.value;
  cardElem.classList.add('flipped');

  if (!firstCard) {
    firstCard = cardElem;
  } else if (!secondCard) {
    secondCard = cardElem;
    checkMatch();
  }

  if (firstCard && secondCard) {
    canClick = false;
    setTimeout(() => {
      if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('found');
        secondCard.classList.add('found');
        score[currentPlayerIndex]++;
        cardsFlipped += 2;
        updateScore();
      } else {
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        currentPlayerIndex = 1 - currentPlayerIndex;
        updatePlayerTurn();
      }

      firstCard = null;
      secondCard = null;
      canClick = true;

      if (cardsFlipped === cards.length) {
        endGame();
      }
    }, 1000);
  }
}

function updateScore() {
  resultElem.textContent = `${players[0]}: ${score[0]} - ${players[1]}: ${score[1]}`;

  if (cardsFlipped === cards.length) {
    if (score[0] > score[1]) {
      resultElem.textContent += ` - ${players[0]} wins!`;
    } else if (score[1] > score[0]) {
      resultElem.textContent += ` - ${players[1]} wins!`;
    } else {
      resultElem.textContent += ' - It\'s a tie!';
    }
    restartButton.style.display = 'block';
  }
}

function updatePlayerTurn() {
  playerTurnElem.textContent = `Current Player: ${players[currentPlayerIndex]}`;
}

function endGame() {
  resultElem.textContent = 'Game Over';
  restartButton.style.display = 'block';
}

restartButton.addEventListener('click', () => {
  currentPlayerIndex = 0;
  firstCard = null;
  secondCard = null;
  canClick = true;
  score = [0, 0];
  cardsFlipped = 0;
  resultElem.textContent = '';
  restartButton.style.display = 'none';
  boardElem.innerHTML = '';
  updatePlayerTurn();
  createBoard();
});

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
