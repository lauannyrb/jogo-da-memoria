const input1 = document.querySelector('.login-input1');
const input2 = document.querySelector('.login-input2');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
    if (input1.value.length > 3 && input2.value.length > 3) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', 'true');
    }
}

input1.addEventListener('input', validateInput);
input2.addEventListener('input', validateInput);

const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('player1', input1.value);
    localStorage.setItem('player2', input2.value);
    window.location.href = 'game.html';
}

form.addEventListener('submit', handleSubmit);
