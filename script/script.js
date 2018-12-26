const rows = 10;
const cols = 10;
let colors = ["blue", "red", "green", "orange"];
const container = document.getElementById("container");
let checked = {};
let matches = [];

const ballsList = [];
const nodeList = {};

function build() {
    for (let i = 1; i <= rows; i++) {
        ballsList[i] = [];
        for (let j = 1; j <= cols; j++) {
            let ball = document.createElement("div");
            ball.dataset.row = i;
            ball.dataset.column = j;
            ball.className = "balls";
            const color = colors[Math.floor(Math.random() * colors.length)];
            ball.style.backgroundColor = color;
            ball.dataset.color = color;
            ball.addEventListener("click", handleClick);
            nodeList['key'+i+j] = ball;
            container.appendChild(ball);
            ballsList[i][j] = {
                row: i,
                column: j,
                color: color
            };
        }
    }
}

function checkColor(color, row, column) {
    if(!('key'+row+column in checked)) {
        checked['key'+row+column] = ballsList[row][column];
        if(ballsList[row][column].color === color) {
            // console.log(ballsList[row][column]);
            matches.push(ballsList[row][column]);
            if(row - 1 > 0) checkColor(color, row - 1, column);
            if(row + 1 <= rows) checkColor(color, row + 1, column);
            if(column - 1 > 0) checkColor(color, row, column - 1);
            if(column + 1 <= cols) checkColor(color, row, column + 1);
        }
    }
}

function handleClick (eventObj) {
    checked = {};
    matches = [];
    const { color, row, column } = eventObj.target.dataset;
    checkColor(color, +row, +column);
    if(matches.length > 2) {
        matches.forEach((ball) => {
            nodeList['key'+ball.row+ball.column].style.backgroundColor = 'white';
            const color = colors[Math.floor(Math.random() * colors.length)];
            nodeList['key'+ball.row+ball.column].dataset.color = color;
            ballsList[ball.row][ball.column].color = color;

            setTimeout(() => {
                nodeList['key'+ball.row+ball.column].style.backgroundColor = color;
            }, 500);
        })
    }
}

build();