
const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "black", "cyan"];
let targetColor = "";
let score = 0;

const colorBox = document.getElementById("colorBox");
const gameStatus = document.getElementById("gameStatus");
const gameInstructions = document.getElementById("gameInstructions");
const colorOptionsContainer = document.querySelector(".color-options");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

function generateGameOptions(correctColor) {
    let shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    let uniqueOptions = new Set(shuffledColors.slice(0, 5));

    while (uniqueOptions.size < 5) {
        uniqueOptions.add(colors[Math.floor(Math.random() * colors.length)]);
    }

    uniqueOptions.add(correctColor);
    return Array.from(uniqueOptions).sort(() => Math.random() - 0.5);
}

function startNewGame() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;
    gameStatus.textContent = "Guess the correct color!";
    

    let options = generateGameOptions(targetColor);

    colorOptionsContainer.innerHTML = "";

    options.forEach(color => {
        const button = document.createElement("button");
        button.classList.add("color-button");
        button.style.backgroundColor = color;
        button.setAttribute("data-testid", "colorOption");
        button.setAttribute("aria-label", `Guess color ${color}`);

        button.addEventListener("click", () => handleColorGuess(color, button));

        colorOptionsContainer.appendChild(button);
    });
}

function handleColorGuess(selectedColor, button) {
    if (selectedColor === targetColor) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        gameStatus.textContent = "Correct! 🎉";

        colorBox.classList.add("correct");
        button.style.border = "4px solid green";

        setTimeout(() => {
            colorBox.classList.remove("correct");
            startNewGame();
        }, 1000);
    } else {
        gameStatus.textContent = "Wrong guess. Try again! 😕";
        colorBox.classList.add("wrong");
        button.style.border = "4px solid red";

        setTimeout(() => {
            colorBox.classList.remove("wrong");
            gameStatus.textContent = "Guess the correct color!";
            button.style.border = "none";
        }, 1000);
    }
}


newGameButton.addEventListener("click", startNewGame);

startNewGame();
