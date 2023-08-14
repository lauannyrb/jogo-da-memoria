//delcarando grid de cartas
const grid = document.querySelector(".grid");
//declarando span de jogadores
const spanPlay = document.querySelector(".players");
//declarando timer do jogo
const timer = document.querySelector(".timer");
//pegando jogador 1 do local storage
const player1 = localStorage.getItem("player1");
//pegando jogador 2 do local storage
const player2 = localStorage.getItem("player2");

//declarando let para alterar jogador
let currentPlayer = 1;
//declarando placar do jogador 1
let player1Score = 0;
//declarando placar do jogador 2
let player2Score = 0;


//fazendo o jogo
//declarando todas as cartas do jogo
const breads = [
    'pao1',
    'pao2',
    'pao3',
    'pao4',
    'pao5',
    'pao6',
    'pao7',
    'pao8',
    'pao9',
    'pao10',
];

//criadando uma função para criar elementos HTML dinamicamente e atribuir classes a eles
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//criando uma carta 
const createCard = (bread) => {
    //atribuindo a carta a uma div
    const card = createElement("div", "card");
    //atribuindo a carta a uma div com a classe face
    const front = createElement("div", "face front");
    //atribuindo a carta a uma div com a classe back
    const back = createElement("div", "face back");
    //atribuindo a carta a uma div com a classe back e a imagem do pão
    front.style.backgroundImage = `url(./imagens/${bread}.png)`;
    //atribuindo a carta a classe front
    card.appendChild(front);
    //atribuindo a carta a classe back
    card.appendChild(back);
    //criando um evento de click para revelar a carta
    card.addEventListener("click", revealCard);
    //atribuindo a carta a um atributo data-bread
    card.setAttribute("data-bread", bread);
    //retornando a carta
    return card;

}

//carregando todas as cartas do jogo
const loadGame = () => {
    //criando um array com todas as cartas e duplicando elas
    const duplicateBreads = [...breads, ...breads];
    //embaralhando as cartas
    const shuffledBreads = duplicateBreads.sort(() => Math.random() - 0.5);
    //criando as cartas no grid usando o array embaralhado conm forEach e a função createCard
    shuffledBreads.forEach((bread) => {
        //criando a carta
        const card = createCard(bread);
        //adicionando a carta ao grid
        grid.appendChild(card);
    });
}

//Criando um timer
const startTimer = () => {
    this.loop = setInterval(() => {//this.loop é uma variavel global que vai ser usada para parar o timer
        const currentTime = +timer.innerHTML; //pegando o tempo atual do timer e transformando em numero o sinal de + é para transformar em numero
        timer.innerHTML = currentTime + 1; //adicionando 1 segundo ao timer
    }, 1000);//tempo para adicionar 1 segundo ao timer
}

//checando se o jogo acabou
const checkEndGame = () => {
    //pegando todas as cartas com a classe disabled-card e colocando em um array
    const disabledCards = document.querySelectorAll(".disabled-card");

    //checando se o array disabledCards tem 20 cartas
    if (disabledCards.length === 20) {
        //this loop é uma variavel global que vai ser usada para parar o timer
        clearInterval(this.loop);
        //checando quem ganhou
        if (player1Score > player2Score) {
            alert(`Jogador ${player1} ganhou com ${player1Score} pontos!`);
        } else if (player2Score > player1Score) {
            alert(`Jogador ${player2} ganhou com ${player2Score} pontos!`);
        } else {
            alert("Empate!");
        }
    }
}

//variavel para revelar as cartas
const revealCard = ({ target }) => {//target é o elemento que foi clicado
    if (target.classList.contains("reveal-card") || target.parentNode.classList.contains("reveal-card")) {//se o elemento clicado ou o pai dele tiver a classe reveal-card
        return;//retorna e não faz nada
    }

    if (firstCard === "") {//se a primeira carta for vazia
        target.parentNode.classList.add("reveal-card");//adiciona a classe reveal-card ao pai do elemento clicado para revelar a carta
        firstCard = target.parentNode; //atribui a primeira carta ao elemento clicado
    } else if (secondCard === "") { //se a segunda carta for vazia
        target.parentNode.classList.add("reveal-card"); //adiciona a classe reveal-card ao pai do elemento clicado para revelar a carta
        secondCard = target.parentNode; //atribui a segunda carta ao elemento clicado
        if (firstCard !== secondCard) {//se a primeira carta for diferente da segunda carta
            checkCards(); //chama a função checkCards
        }
    }
}

//checando as cartas para ver se são iguais ou não
//declarando as variaveis firstCard e secondCard
let firstCard = "";
let secondCard = "";
//declarando o checkCards para checar as cartas
const checkCards = () => {
    //pegando o atributo data-bread da primeira carta
    const firstCardBread = firstCard.getAttribute("data-bread");
    //pegando o atributo data-bread da segunda carta
    const secondCardBread = secondCard.getAttribute("data-bread");
    //checando se as cartas são iguais
    if (firstCardBread === secondCardBread) {
        //adicionando a classe disabled-card para desabilitar as cartas
        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");
        //limpando as variaveis firstCard e secondCard
        firstCard = "";
        secondCard = "";
        //adicionando os pontos ao jogador
        if (currentPlayer === 1) {
            player1Score++;
        } else {
            player2Score++;
        }
        spanPlay.innerHTML = player1 + ":" + player1Score + " X " + player2 + ":" + player2Score + "  vez do jogador "+ currentPlayer;//mostrando o nome dos jogadores e os pontos
        //chamando a função checkEndGame
        checkEndGame();
    } else {
        setTimeout(() => {
            //removendo a classe reveal-card para esconder as cartas
            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");
            //limpando as variaveis firstCard e secondCard
            firstCard = "";
            secondCard = "";
            //alterando o jogador
            currentPlayer = currentPlayer === 1 ? 2 : 1;//se o jogador atual for 1 altera para 2 se não altera para 1
            spanPlay.innerHTML = player1 + ":" + player1Score + " X " + player2 + ":" + player2Score + "  vez do jogador "+ currentPlayer;//mostrando o nome dos jogadores e os pontos

        }, 1000);//tempo para esconder as cartas
    }
}



window.onload = () => {//quando a pagina carregar
    spanPlay.innerHTML = player1 + ":" + player1Score + " X " + player2 + ":" + player2Score + "  vez do jogador "+ currentPlayer;//mostrando o nome dos jogadores e os pontos
    startTimer();//chamando a função startTimer
    loadGame();//chamando a função loadGame
}

playAgainButton.addEventListener("click", () => {//quando clicar no botão jogar novamente vai zerar os pontos e o timer e carregar o jogo novamente
    player1Score = 0; //zerando os pontos do jogador 1
    player2Score = 0; //zerando os pontos do jogador 2
    currentPlayer = 1; //alterando o jogador para o jogador 1
    timer.innerHTML = "0"; //zerando o timer
    grid.innerHTML = ""; //limpando o grid
    loadGame(); //carregando o jogo
    spanPlay.innerHTML = player1 + ":" + player1Score + " X " + player2 + ":" + player2Score + "  vez do jogador "+ currentPlayer;//mostrando o nome dos jogadores e os pontos
    clearInterval(this.loop); //parando o timer
    startTimer(); //chamando a função startTimer
    
});
