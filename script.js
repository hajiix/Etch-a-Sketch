let gridSize = 16;
let grid = document.querySelector(".grid");

for (let i = 0; i < gridSize; i++) {
  let row = document.createElement("div");
  row.classList.add("row");

  for (let j = 0; j < gridSize; j++) {
    let square = document.createElement("div");
    square.classList.add("square", "black");
    row.appendChild(square);
    grid.appendChild(row);
  }
}
