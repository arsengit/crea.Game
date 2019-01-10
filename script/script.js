const rows = 10;
const cols = 10;
const colors = ["blue", "red", "green", "orange"];
const container = document.getElementById("container");
let checked = {};
let matches = [];
let clickedColor;
let columns = {};

const ballsList = [];
const nodeList = {};

function build() {
  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= cols; i++) {
    const column = document.createElement("div");
    column.className = "column";
    ballsList[i] = [];
    ballsList[i][0] = {};
    for (let j = 1; j <= rows; j++) {
      const color = getRandomColor();
      const ball = createNode(j, i, color);
      nodeList["key" + i + j] = ball;
      column.appendChild(ball);
      ballsList[i][j] = {
        row: j,
        column: i,
        color: color
      };
    }
    fragment.appendChild(column);
  }
  container.appendChild(fragment);
}

function checkColor(row, column) {
  if (!("key" + column + row in checked)) {
    checked["key" + column + row] = ballsList[column][row];
    if (ballsList[column][row].color === clickedColor) {
      matches.push({
        row,
        column,
        color: clickedColor
      });
      if (row - 1 > 0) checkColor(row - 1, column);
      if (row + 1 <= rows) checkColor(row + 1, column);
      if (column - 1 > 0) checkColor(row, column - 1);
      if (column + 1 <= cols) checkColor(row, column + 1);
    }
  }
}

function handleClick(eventObj) {
  checked = {};
  matches = [];
  const { color, row, column } = eventObj.target.dataset;
  clickedColor = color;
  checkColor(+row, +column);
  if (matches.length > 2) {
    fill(matches);
  }
}

function fill(matches) {
  matches.forEach((ball, index) => {
    (function(ball) {
      const matchedEl = nodeList["key" + ball.column + ball.row];
      matchedEl.style.backgroundColor = "transparent";
      const parentEl = matchedEl.parentElement;
      setTimeout(() => {
        matchedEl.remove();
        const color = getRandomColor();
        const newBall = createNode(0, ball.column, color);
        nodeList["key" + ball.column + 0] = newBall;
        ballsList[ball.column][0].color = color;
        ballsList[ball.column][0].row = 0;
        parentEl.insertBefore(newBall, parentEl.firstChild);
        for (let i = ball.row; i > 0; i--) {
          +nodeList["key" + ball.column + (i - 1)].dataset.row++;
          nodeList["key" + ball.column + i] =
            nodeList["key" + ball.column + (i - 1)];
          ballsList[ball.column][i].color = ballsList[ball.column][i - 1].color;
          ballsList[ball.column][i].row =
            ballsList[ball.column][i - 1].color.row;
        }
      }, 500);
    })(ball);
  });
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function createNode(row, column, color) {
  const ball = document.createElement("div");
  ball.dataset.row = row;
  ball.dataset.column = column;
  ball.className = "balls";
  ball.style.backgroundColor = color;
  ball.dataset.color = color;
  ball.addEventListener("click", handleClick);
  return ball;
}

build();
