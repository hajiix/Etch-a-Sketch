const gridSizeDefault = 16;
let gridSize = gridSizeDefault;
let grid = document.querySelector(".grid");
let body = document.querySelector(".container");
let size = document.querySelector(".size");
let clear = document.querySelector(".clear");
let colorful = document.querySelector(".colorful");
let shade = document.querySelector(".shade");

let isMouseDown = false;
let isColorful = false;
let isShade = false;

createGrid(gridSize);
setUpEventListerns();

function setUpEventListerns() {
  size.addEventListener("click", handleSizeClick);
  clear.addEventListener("click", handleClearClick);
  colorful.addEventListener("click", handleColorfulClick);
  shade.addEventListener("click", handleShadeClick);

  document.addEventListener("mousedown", () => (isMouseDown = true));
  document.addEventListener("mouseup", () => (isMouseDown = false));
}

function createGrid(size) {
  grid.innerHTML = "";
  for (let i = 0; i < size; i++) {
    let row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < size; j++) {
      const square = document.createElement("div");
      square.classList.add("square");

      square.addEventListener("mousedown", handleSquareInteraction);
      square.addEventListener("mouseover", handleSquareInteraction);

      row.appendChild(square);
    }
    grid.appendChild(row);
  }
}

function handleSizeClick() {
  let input = prompt("Please entire a size between 1 and 100", "16");
  if (isNaN(input) || input < 1 || input > 100) {
    alert("The input is invalid");
  } else {
    gridSize = parseInt(input);
    createGrid(gridSize);
  }
}

function handleClearClick() {
  grid.innerHTML = "";
  createGrid(gridSizeDefault);
  isColorful = false;
  turnButtonOnOrOff(colorful, isColorful);
}

function handleColorfulClick() {
  isColorful ? (isColorful = false) : (isColorful = true), (isShade = false);
  turnButtonOnOrOff(colorful, isColorful);
  turnButtonOnOrOff(shade, isShade);
}

function handleShadeClick() {
  isShade ? (isShade = false) : (isShade = true);
  turnButtonOnOrOff(shade, isShade);
}

function handleSquareInteraction(e) {
  if (e.type === "mousedown" || (e.type === "mouseover" && isMouseDown)) {
    let squareColor = e.target.style.backgroundColor;
    if (isShade && e.target.classList.contains("clicked")) {
      let rgbValues = squareColor
        ? squareColor.match(/\d+/g).map(Number)
        : [162, 124, 197];
      e.target.style.backgroundColor = shadeSquare(rgbValues);
    } else if (isColorful) {
      e.target.style.backgroundColor = getRandomColor();
    } else {
      e.target.style.backgroundColor = "rgb(162, 124, 197)";
    }
    e.target.classList.add("clicked");
  }
}

function getRandomColor() {
  const colorOne = 220;
  const colorTwo = 80;
  let colorThree = 80 + Math.floor(Math.random() * 140);

  let randomInt = Math.random() * 10;
  if (randomInt < 2) return `rgb(${colorOne}, ${colorTwo}, ${colorThree})`;
  else if (randomInt < 4) return `rgb(${colorTwo}, ${colorThree}, ${colorOne})`;
  else if (randomInt < 6) return `rgb(${colorThree}, ${colorOne}, ${colorTwo})`;
  else if (randomInt < 8) return `rgb(${colorOne}, ${colorThree}, ${colorTwo})`;
  else return `rgb(${colorThree}, ${colorTwo}, ${colorOne})`;
}

function shadeSquare(rgb) {
  for (let i = 0; i < 3; i++) {
    if (rgb[i] >= 25.5) {
      rgb[i] -= 25.5;
    } else rgb[i] = 0;
  }
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function turnButtonOnOrOff(button, isbutton) {
  if (isbutton) {
    button.classList.add("on");
  } else {
    button.classList.remove("on");
  }
}
