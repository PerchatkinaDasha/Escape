const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');

let snake;
let food;
let direction;
let score;
let highScore = 0;
let gameInterval;

const gridSize = 20;
const snakeColor = '#e74c3c';
const snakeBorderColor = '#c0392b';
const foodColor = '#f1c40f';
const foodBorderColor = '#f39c12';

function startGame() {
    snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    food = { x: gridSize * 10, y: gridSize * 10 };
    direction = { x: gridSize, y: 0 };
    score = 0;
    updateScore();
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
    updateSnake();
    if (checkCollision()) {
        endGame();
        return;
    }
    if (checkFoodCollision()) {
        growSnake();
        placeFood();
        score++;
        updateScore();
    }
    clearCanvas();
    drawFood();
    drawSnake();
}

function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    snake.pop();
}

function checkCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height;
}

function checkFoodCollision() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

function growSnake() {
    const tail = { ...snake[snake.length - 1] };
    snake.push(tail);
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach(part => {
        ctx.fillStyle = snakeColor;
        ctx.strokeStyle = snakeBorderColor;
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
        ctx.strokeRect(part.x, part.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.strokeStyle = foodBorderColor;
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
    ctx.strokeRect(food.x, food.y, gridSize, gridSize);
}

function updateScore() {
    scoreElement.textContent = score;
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
    }
}

function endGame() {
    clearInterval(gameInterval);
    alert('Game Over! Your score: ' + score);
}

window.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -gridSize };
    } else if (key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: gridSize };
    } else if (key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -gridSize, y: 0 };
    } else if (key === 'ArrowRight' && direction.x === 0) {
        direction = { x: gridSize, y: 0 };
    }
});

startButton.addEventListener('click', startGame);
