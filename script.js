//cota shevcvale. chance-ebi davamte da restarti da egetebi

const startWindow = document.getElementById("startWindow");
const mainGame = document.querySelector(".mainGame");
const colorsBox = document.querySelector(".colors-box");
const rgbCode = document.getElementById("rgb-code");
const chances = document.getElementById("chances");
const endWindow = document.querySelector(".endWindow");
const winResbtn = document.querySelector(".win-restart-btn");
const title = mainGame.querySelector("h1");

let colorToGuess;

function startGame(mode) {
  mainGame.classList.remove("hide");
  startWindow.classList.add("hide");
  endWindow.style.display = "none";
  winResbtn.style.display = "none";

  colorsBox.innerHTML = "";
  let colors = [];

  let n = mode === "hard" ? 6 : 3;
  let temp = mode === "hard" ? 4 : 2;
  chances.innerHTML = temp;

  for (let i = 0; i < n; i++) {
    let randCal = randomColor();
    colors.push(randCal);
    colorsBox.innerHTML += `<div class="box" onclick="guess(this)" style= "background-color: ${randCal}"></div>`;
  }

  colorToGuess = colors[Math.floor(Math.random() * n)];
  rgbCode.innerText = colorToGuess;
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function guess(box) {
  if (box.style.backgroundColor === colorToGuess) {
    endGame(true, box);
  } else {
    let remaining = Number(chances.innerHTML);
    remaining--;
    chances.innerHTML = remaining;
    box.style.opacity = "0";
    if (chances.innerHTML == 0) {
      endGame(false);
    }
  }
}

function endGame(win, box = null) {
  const allBoxes = colorsBox.querySelectorAll(".box");
  allBoxes.forEach((b) => (b.style.pointerEvents = "none"));

  if (win && box) {
    box.style.border = "10px solid lime";
    box.style.boxShadow = "0 0 20px 10px lime";

    title.innerText = "Correct!";
    title.style.color = "lightgreen";

    winResbtn.style.display = "block";
  } else if (!win) {
    endWindow.style.display = "flex";
  }
}

function restart() {
  mainGame.classList.add("hide");
  endWindow.style.display = "none";
  startWindow.classList.remove("hide");

  title.innerText = "Guess The Color by it's RGB code";
  title.style.color = "#00f2ff";
}
