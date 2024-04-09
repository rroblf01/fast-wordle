const MAX_TRY = 5;
let tryCount = -1;

const infoTries = document.getElementById('info-tries')

const updateTries = () => {
    tryCount++;
    infoTries.textContent = `${MAX_TRY - tryCount} tries left`;
}

updateTries();

infoTries.textContent = `${MAX_TRY - tryCount} tries left`;
const focusNextInput = (currentInput) => {
    const nextInput = currentInput.nextElementSibling;
    if (nextInput) {
        nextInput.focus();
    }
}

const focusPreviousInput = (currentInput) => {
    const previousInput = currentInput.previousElementSibling;
    if (previousInput) {
        previousInput.focus();
    }
}

const handleInput = (input) => {
    if (input.value.length === 1) {
        focusNextInput(input);
    } else if (input.value.length === 0) {
        focusPreviousInput(input);
    }
}

const handlePaste = (e) => {
    const data = e.clipboardData.getData('text');
    const inputs = document.querySelectorAll('input');
    for (let i = 0; i < data.length; i++) {
        inputs[i].value = data[i];
    }
    e.preventDefault();
}

const handleKeydown = (e) => {
    const input = e.target;
    if (e.key === 'Backspace' && input.value.length === 0) {
        focusPreviousInput(input);
    }
}

const handleFocus = (e) => {
    e.target.select();
}

const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', () => handleInput(input));
    input.addEventListener('paste', handlePaste);
    input.addEventListener('keydown', handleKeydown);
    input.addEventListener('focus', handleFocus);
});

const setDisabledInputs = (state) => {
    const button = document.getElementById('submit');
    button.disabled = state;

    inputs.forEach(input => {
        input.disabled = state;
    });
}

const createLiElement = (content, classToAdd) => {
    const li = document.createElement('li');
    li.className = 'li-result';
    li.textContent = content;
    li.classList.add(classToAdd);

    return li;
};

const checkWin = (elements) => {
    let win = true;
    elements.forEach(element => {
        if (element !== 'green') {
            win = false;
        }
    });

    return win;
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const wordList = Array.from(data.values());
    const word = wordList.toString().replace(/,/g, '');

    setDisabledInputs(true);

    url = "/api/resoulve"
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ word }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            updateTries();

            const results = document.getElementById('results');
            const ul = document.createElement('ul');
            ul.className = 'ul-result';
            data.result.forEach((element, index) => {
                const li = createLiElement(wordList[index], element);
                ul.appendChild(li);
            });
            results.appendChild(ul);

            if (checkWin(data.result)) {
                alert('You win!');
            } else if (tryCount === MAX_TRY) {
                alert('You lose!');
            } else {
                setDisabledInputs(false);
            }
        })
});