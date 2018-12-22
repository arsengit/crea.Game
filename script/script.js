let rows = 10;
let cols = 10;
let cnt = [];
let id = [1, 2, 3, 4]
let colors = ["blue", "red", "green", "orange"];
const container = document.getElementById("container");


function paint() {
    for (let i = 0; i < rows; i++) {
        cnt[i] = [];
        for (let j = 0; j < cols; j++) {
            
            let balls = document.createElement("div");
            cnt[i][j] = colors[Math.floor(Math.random() * colors.length)];
            cnt[i][j] = balls;
            balls.className = "balls";
            balls.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(balls);
            balls.addEventListener("click", ()=> {
                    checkColor();             
            });

            function checkColor () {
                if ( cnt[i][j].style.backgroundColor === cnt[i][j+1].style.backgroundColor || cnt[i][j].style.backgroundColor === cnt[i][j-1].style.backgroundColor){
                    balls.style.backgroundColor = "white"
                }
            }
        }
    }

}

paint();