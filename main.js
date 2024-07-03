const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Max  = 500;

class Attempts {
    constructor() {
        this.attempts = [];
    }

    init() {
        this.element = document.querySelector('#attempts');

        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
    }

    addAttempt(attempt, isRight) {
        this.attempts.push(attempt);

        if (attempt < 0 || attempt > 500) {
            return;
        }
        
        const element = document.createElement('div');
        element.classList.add('texts-xs');
        element.innerText =  isRight ? "🟢" : "x";
        element.style.position = 'absolute';

        const maxWidth = this.element.offsetWidth; 
        const elementWidth = 10; 
        const adjustedMaxWidth = maxWidth - elementWidth; 
        const percentage = (attempt / 500) * adjustedMaxWidth;

        element.style.left = `${percentage}px`;
        element.style.top = "9px";

        this.element.appendChild(element);
    }
}

class Game {
    constructor() {
        this.targetNumber = getRandomNumber(0, Max);
        console.log(this.targetNumber);
        this._attempt = 0;
        this.attempts = new Attempts();

        this.submitHandler = (event) => {
            this.submitGuess(event);
        }
    }

    get attempt() {
        return this._attempt;
    }

    set attempt(newAttempt) {
        this._attempt = newAttempt;
        this.attemptElement.innerText = `Tentative(s) : ${newAttempt}`;
    }

    init() {
        this.attempts.init();
        this.element = document.querySelector('.play-app');
        this.element.classList.remove('hidden');
        this.element.style.display = 'flex';

        this.guessForm = document.querySelector('#guess-form');
        this.message = document.querySelector('#message');
        this.attemptElement = document.querySelector('#attempt');
        this.guessForm.addEventListener('submit', this.submitHandler);
        this.restartButton = document.querySelector('#restart');
    }

    submitGuess(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const guess = Number(formData.get('guess'));

        if (Number.isNaN(guess)) {
            this.message.innerText = "❌ Proposition invalide, vous devez utiliser un nombre valide";
            return;
        }

        this.attempt++;
        form.querySelector('input').value = '';

        this.attempts.addAttempt(guess, guess === this.targetNumber);
        
        if (guess === this.targetNumber) {
            this.message.innerText = `🎉 Bravo, vous avez trouvé le nombre qui été ${this.targetNumber}, en ${this._attempt} Tentative(s).`;
            this.restartButton.classList.remove('hidden');
            this.restartButton.style.display = 'flex';
            return;
        }

        if (guess > this.targetNumber) {
            this.message.innerText = "🔽 Votre nombre est trop grand";
            return
        }

        if (guess < this.targetNumber) {
            this.message.innerText = "🔼 Votre nombre est trop petit";
            return;
        }
    }

    destroy() {
        this.element.classList.add('hidden');
        this.guessForm.removeEventListener('submit', this.submitHandler);
        this.message.innerText = "";
        this.attemptElement.innerText = "Tentative(s) : 0";
        this.restartButton.classList.add('hidden');
        this.restartButton.style.display = 'none';
    }
}

let game = null;
const startGame = () => {
    const startContainer = document.querySelector('#start-container');
    startContainer.classList.add('hidden');

    if (game) {
        game.destroy();
    }

    game = new Game();
    game.init()
}

const startButton = document.querySelector('#start');
startButton.addEventListener('click', startGame)

const restartButton = document.querySelector('#restart');
restartButton.addEventListener('click', startGame)


