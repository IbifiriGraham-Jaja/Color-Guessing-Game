const colors = ["#800080", "#8A2BE2", "#9370DB", "#9400D3", "#9932CC", "#BA55D3", "#DA70D6", "#D8BFD8", "#E6E6FA", "#4B0082"];
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
        button.disabled = true; // Disable button

        setTimeout(() => {
            colorBox.classList.remove("wrong");
            gameStatus.textContent = "Guess the correct color!";
            button.style.border = "none";
            button.disabled = false; // Re-enable button
        }, 1000);
    }
}
newGameButton.addEventListener("click", () => {
    score = 0; // Reset score
    scoreDisplay.textContent = `Score: ${score}`;
    startNewGame();
});