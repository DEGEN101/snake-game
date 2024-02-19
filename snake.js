
const blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;


function Block(x, y, colour) 
{
    this.colour = colour;
    let position = [x, y];

    this.drawme = function(context) {
        context.fillStyle = this.colour;
        context.fillRect(position[0], position[1], blockSize, blockSize);
    };

    Object.defineProperty(this, "position", {
        get: function() {
            return position;
        }
    })
}

function Snake ()
{
    let head = new Block(blockSize * 5, blockSize * 5, "lime");
    let body = [];
    let velocity = [0, 0];

    this.update = function() {
        for (let i = body.length - 1; i > 0; i--){
            body[i].position[0] = body[i - 1].position[0];
            body[i].position[1] = body[i - 1].position[1];
        }
        if (body.length){
            body[0].position[0] = head.position[0];
            body[0].position[1] = head.position[1];
        }

        head.position[0] += velocity[0] * blockSize;
        head.position[1] += velocity[1] * blockSize;
    }

    this.ateFood = function(food) {
        return head.position[0] == food.position[0] && head.position[1] == food.position[1];
    }

    this.addSegment = function(x, y){
        let segment = new Block(x, y, "lime");
        body.push(segment);
    }

    this.drawSnake = function(context) {
        head.drawme(context);

        for (let i = 0; i < body.length; i++){
            body[i].drawme(context);
        }
    }

    Object.defineProperty(this, "velocity", {
        get: function() {
            return velocity;
        },
        set: function(new_velocity){
            velocity = new_velocity;
        }
    })

    this.hitSelf = function(){
        for (let i = 0; i < body.length; i++){
            if (head.position[0] == body[i].position[0] && head.position[1] == body[i].position[1]){
                return true
            }
        }
        return false;
    }

    this.outOfBound = function(){
        return head.position[0] < 0 || head.position[0] > cols * blockSize || head.position[1] < 0 || head.position[1] > rows * blockSize;
    }
}


// Snake
let snake = new Snake();

// Food
let food = new Block(blockSize * 10, blockSize * 10, "red");

let gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // Used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/8); //1000 milliseconds
}

function update() {
    if (gameOver){
        return;
    }

    context.fillStyle = "#000";
    context.fillRect(0, 0, board.width, board.height);

    food.drawme(context);

    if (snake.ateFood(food)){
        snake.addSegment(food.position[0], food.position[1]);
        placeFood();
    }

    snake.update()
    snake.drawSnake(context);

    if (snake.hitSelf() || snake.outOfBound()){
        gameOver = true;
        alert("Game Over!!!");
    }
}

function changeDirection(e)
{
    if (e.code == "ArrowUp" && snake.velocity[1] != 1){
        snake.velocity = [0, -1];
    }
    if (e.code == "ArrowDown" && snake.velocity[1] != -1){
        snake.velocity = [0, 1];
    }
    if (e.code == "ArrowRight" && snake.velocity[0] != -1){
        snake.velocity = [1, 0];
    }
    if (e.code == "ArrowLeft" && snake.velocity[0] != 1){
        snake.velocity = [-1, 0];
    }
}

function placeFood(){
    food.position[0] = Math.floor(Math.random() * cols) * blockSize;
    food.position[1] = Math.floor(Math.random() * rows) * blockSize; 
}