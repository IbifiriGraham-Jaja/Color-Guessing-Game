const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown","neon","cyan"];
let targetColor = "";
let score = 0;

const colorBox = document.getElementById("colorBox");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

function generateGameOptions(correctColor) {
    let shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    let uniqueOptions = new Set(shuffledColors.slice(0, 5));
    uniqueOptions.add(correctColor);
    return Array.from(uniqueOptions).sort(() => Math.random() - 0.5);
}

function startNewGame() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;

    const options = generateGameOptions(targetColor);
    colorOptionsContainer.innerHTML = "";

    options.forEach(color => {
        const button = document.createElement("button");
        button.classList.add("color-button");
        button.style.backgroundColor = color;
        button.setAttribute("data-testid", "colorOption");

        button.addEventListener("click", () => handleColorGuess(color));
        colorOptionsContainer.appendChild(button);
    });

    gameStatus.textContent = "Guess the correct color!";
}

function handleColorGuess(selectedColor) {
    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct! 🎉";
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        colorBox.classList.add("correct");

        setTimeout(() => {
            colorBox.classList.remove("correct");
            startNewGame();
        }, 1000);
    } else {
        gameStatus.textContent = "Wrong guess. Try again! 😕";
        colorBox.classList.add("wrong");

        setTimeout(() => {
            colorBox.classList.remove("wrong");
            gameStatus.textContent = "Guess the correct color!";
        }, 1000);
    }
}

newGameButton.addEventListener("click", () => {
    score = 0;
    scoreDisplay.textContent = "Score: 0";
    startNewGame();
});

startNewGame();
