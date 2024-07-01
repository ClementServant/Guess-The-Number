const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Max  = 500;

class Game {
    constructor() {
        this.targetNumber = getRandomNumber(0, Max);
        this.attempts = 0;
    }

    init() {
        this.element = document.querySelector('.play-app');
        this.element.classList.remove('hidden');
        this.element.style.display = 'flex';
    }
}

let game = null;
const startGame = () => {
    const startContainer = document.querySelector('#start-container');
    startContainer.classList.add('hidden');

    if (game) {
        // Reset the game
    }

    game = new Game();
    game.init()
}

const startButton = document.querySelector('#start');
startButton.addEventListener('click', startGame)


