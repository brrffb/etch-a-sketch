let gridSize = 16;
const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorpicker");
const sizePicker = document.getElementById("range");
const sizeDiv = document.getElementById("size-display");
const clearGridBtn = document.getElementById("clearGridBtn");
const eraserBtn = document.getElementById("eraserBtn");
const colorModeToggle = document.getElementById("colorModeToggle");

let currentSize = gridSize;
let currentMode = "color";
let isMouseDown = false;

document.onmousedown = () => (isMouseDown = true);
document.onmouseup = () => (isMouseDown = false);

sizePicker.addEventListener("mousemove", (e) => updateSizeDiv(e.target.value));
sizePicker.addEventListener("change", (e) => changeSize(e.target.value));

clearGridBtn.addEventListener("click", () => resetGrid());
eraserBtn.addEventListener("click", (e) => {
  currentMode = "eraser";
  setCurrentMode(e);
});
colorModeToggle.addEventListener("click", (e) => {
  currentMode = "color";
  setCurrentMode(e);
});

function updateSizeDiv(value) {
  sizeDiv.innerHTML = `${value} x ${value}`;
}

function setGridSize(newSize) {
  gridSize = newSize;
}

function resetGrid() {
  const gridElements = document.querySelectorAll(".gridElement");
  gridElements.forEach((element) => {
    element.style.backgroundColor = "#f2f3f5";
  });
}

function changeSize(value) {
  setGridSize(value);
  setUpGrid(value);
  resetGrid();
}

function setUpGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("gridElement");
    gridElement.addEventListener("mouseover", (e) => updateColor(e));
    gridElement.addEventListener("mousedown", (e) => updateColor(e));
    grid.appendChild(gridElement);
  }
}

function updateColor(e) {
  if (e.type === "mouseover" && !isMouseDown) return;
  if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#f2f3f5";
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = colorPicker.value;
  }
}

function setCurrentMode(e) {
  if (e.target === colorModeToggle) {
    eraserBtn.classList.remove("active");
    colorModeToggle.classList.add("active");
  } else if (e.target === eraserBtn) {
    colorModeToggle.classList.remove("active");
    eraserBtn.classList.add("active");
  }
}

window.onload = () => {
  colorModeToggle.classList.add("active");
  setUpGrid(gridSize);
  sizeDiv.innerHTML = `${sizePicker.value} x ${sizePicker.value}`;
};
