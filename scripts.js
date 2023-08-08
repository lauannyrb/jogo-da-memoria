document.addEventListener('DOMContentLoaded', () => {
  let currentPlayer = 1; // Inicia com o jogador 1

  const cards = [
    {
      name: 'android',
      img: 'images/android.png'
    },
    {
      name: 'chrome',
      img: 'images/chrome.png'
    },
    {
      name: 'git',
      img: 'images/git.png'
    },
    {
      name: 'stackoverflow',
      img: 'images/stackoverflow.png'
    },
    {
      name: 'linux',
      img: 'images/linux.png'
    },
    {
      name: 'github',
      img: 'images/github.png'
    },
    {
      name: 'android',
      img: 'images/android.png'
    },
    {
      name: 'chrome',
      img: 'images/chrome.png'
    },
    {
      name: 'git',
      img: 'images/git.png'
    },
    {
      name: 'stackoverflow',
      img: 'images/stackoverflow.png'
    },
    {
      name: 'linux',
      img: 'images/linux.png'
    },
    {
      name: 'github',
      img: 'images/github.png'
    }
  ]
  // Embaralhar as cartas
  cards.sort(() => 0.5 - Math.random());

  // Selecionar elementos do DOM
  const board = document.querySelector('.board');
  const resultView = document.querySelector('#result');
  const currentPlayerView = document.querySelector('#currentPlayer');

  // Variáveis de controle do jogo
  let canClick = true; // Para impedir cliques enquanto o jogo está processando
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = { 1: [], 2: [] };

  // Criar o quadro de cartas
  function createBoard() {
    for (let i = 0; i < cards.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/board.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      board.appendChild(card);
    }
  }

  // Função para verificar se há combinação
  function checkForMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (cardsChosen[0] === cardsChosen[1]) {
      // Cartas iguais, combinação encontrada
      alert('Você encontrou uma combinação');
      cards[optionOneId].style.visibility = 'hidden';
      cards[optionTwoId].style.visibility = 'hidden';
      cardsWon[currentPlayer].push(cardsChosen);

      updateScore();
    } else {
      // Cartas diferentes, restaura as imagens e troca de jogador
      cards[optionOneId].setAttribute('src', 'images/board.png');
      cards[optionTwoId].setAttribute('src', 'images/board.png');
      alert('Errou, passando para o próximo jogador');
      togglePlayer();
    }

    // Limpar cartas escolhidas
    cardsChosen = [];
    cardsChosenId = [];
    canClick = true; // Permitir que o próximo jogador jogue

    // Verificar se o jogo acabou
    if (cardsWon[1].length + cardsWon[2].length === cards.length) {
      showWinner();
    }
  }

  // Função para virar as cartas
  function flipCard() {
    if (!canClick) return; // Impedir cliques durante o processamento

    const cardId = this.getAttribute('data-id');
    
    // Verificar se a carta já foi selecionada
    if (!cardsChosenId.includes(cardId) && cardsChosen.length < 2) {
      cardsChosen.push(cards[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cards[cardId].img);

      if (cardsChosen.length === 2) {
        canClick = false; // Impedir cliques enquanto o jogo processa
        setTimeout(checkForMatch, 500);
      }
    }
  }

  // Atualizar a pontuação dos jogadores
  function updateScore() {
    resultView.textContent = `Pontuação do Jogador 1: ${cardsWon[1].length} | Pontuação do Jogador 2: ${cardsWon[2].length}`;
  }

  // Alternar entre jogadores
  function togglePlayer() {
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
    currentPlayerView.textContent = currentPlayer;
  }

  // Mostrar o vencedor ou empate
  function showWinner() {
    let winner = '';
    if (cardsWon[1].length > cardsWon[2].length) {
      winner = 'Jogador 1';
    } else if (cardsWon[2].length > cardsWon[1].length) {
      winner = 'Jogador 2';
    } else {
      winner = 'Empate';
    }
    resultView.textContent = `Fim de Jogo! ${winner} venceu!`;
  }

  // Iniciar o jogo
  createBoard();
  updateScore();
  currentPlayerView.textContent = currentPlayer;
});
