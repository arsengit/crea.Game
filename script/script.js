const rows = 10;
const cols = 10;
let colors = ["blue", "red", "green", "orange"];
const container = document.getElementById("container");

const ballsList = [];

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
            container.appendChild(ball);
            ball.addEventListener("click", handleClick);
            ballsList[i][j] = ball;
        }
    }
}

function checkColor () {
    
}


function handleClick () {
    
}

build();