const grid = document.querySelector(".grid");

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

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll(".disabled-card");

    if (disabledCards.length === 20) {
        alert("Você ganhou!");
    }
}

const checkCards = () => {
    const firstCardBread = firstCard.getAttribute("data-bread");
    const secondCardBread = secondCard.getAttribute("data-bread");

    if (firstCardBread === secondCardBread) {
        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

        firstCard = "";
        secondCard = "";

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");

            firstCard = "";
            secondCard = "";
        }, 1000);
    }
}

const revealCard = ({ target }) => {

    if (target.classList.contains("reveal-card")) {
        return
    }

    if (firstCard === "") {
        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;
    } else if (secondCard === "") {
        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;

        checkCards();
    } 

    target.parentNode.classList.add("reveal-card");
}

const createCard = (bread) => {
    const card = createElement("div", "card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");
    
    front.style.backgroundImage = `url(../imagens/${bread}.png)`;
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);
    card.setAttribute("data-bread", bread);
    
    return card;

}

const loadGame = () => {

    const duplicateBreads = [...breads, ...breads];

    const shuffledBreads = duplicateBreads.sort(() => Math.random() - 0.5);

    shuffledBreads.forEach((bread) => {
        const card = createCard(bread);
        grid.appendChild(card);
    });
}

loadGame();


