const gridSizeDefault = 16;
let gridSize = gridSizeDefault;
let grid = document.querySelector(".grid");
let body = document.querySelector(".container");
let size = document.querySelector(".size");
let clear = document.querySelector(".clear");
let colorful = document.querySelector(".colorful");

let isMouseDown = false;
let isColorful = false;

createGrid(gridSize);
setUpEventListerns();

function setUpEventListerns() {
  size.addEventListener("click", handleSizeClick);
  clear.addEventListener("click", handleClearClick);
  colorful.addEventListener("click", handleColorfulClick);

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
  let size = prompt("Please entire a size between 1 and 100", "16");
  if (isNaN(size) || size < 1 || size > 100) {
    alert("The input is invalid");
  } else {
    gridSize = parseInt(size);
    createGrid(gridSize);
  }
}

function handleClearClick() {
  grid.innerHTML = "";
  createGrid(gridSizeDefault);
  isColorful = false;
}

function handleColorfulClick() {
  isColorful = true;
}
function handleSquareInteraction(e) {
  if (e.type === "mousedown" || (e.type === "mouseover" && isMouseDown)) {
    if (isColorful) {
      e.target.style.backgroundColor = getRandomColor();
    } else e.target.classList.add("clicked");
  }
}

function getRandomColor() {
  const colorOne = 255;
  const colorTwo = 0;
  let colorThree = Math.floor(Math.random() * 255);

  let randomInt = Math.random() * 10
  if (randomInt < 2) return `rgb(${colorOne}, ${colorTwo}, ${colorThree})`;
  else if (randomInt < 4) return `rgb(${colorTwo}, ${colorThree}, ${colorOne})`;
  else if (randomInt < 6) return `rgb(${colorThree}, ${colorOne}, ${colorTwo}`;
  else if (randomInt < 8) return `rgb(${colorOne}, ${colorThree}, ${colorTwo}`;
  else return `rgb(${colorThree}, ${colorTwo}, ${colorOne})`;
}
