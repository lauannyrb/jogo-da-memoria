
const input1 = document.querySelector('.login-input1');//pegando o input do jogador 1
const input2 = document.querySelector('.login-input2');//pegando o input do jogador 2
const button = document.querySelector('.login-button');//pegando o botão de login
const form = document.querySelector('.login-form');//pegando o formulário de login

const validateInput = ({ target }) => {//criando uma função para validar os inputs
    if (input1.value.length > 3 && input2.value.length > 3) {//se o tamanho do input for maior que 3
        button.removeAttribute('disabled');//habilita o botão
    } else {
        button.setAttribute('disabled', 'true');//desabilita o botão
    }
}

input1.addEventListener('input', validateInput);//adicionando um evento de input para o input1
input2.addEventListener('input', validateInput);//adicionando um evento de input para o input2

const handleSubmit = (event) => {//criando uma função para o submit do formulário
    event.preventDefault();//previne o comportamento padrão do submit do formulário que é recarregar a página
    localStorage.setItem('player1', input1.value);//salva o valor do input1 no local storage
    localStorage.setItem('player2', input2.value);//salva o valor do input2 no local storage
    window.location.href = 'game.html';//redireciona para a página do jogo
}

form.addEventListener('submit', handleSubmit);//adicionando um evento de submit para o formulário
