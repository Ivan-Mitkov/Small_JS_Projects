const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;
const brickRowCount = 9;
const brickColumnCount = 5;

//Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};
//Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};
//create bricks props
const brick = {
  w: 70,
  h: 15,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};
//Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brick.w + brick.padding) + brick.offsetX;
    const y = j * (brick.h + brick.padding) + brick.offsetY;
    bricks[i][j] = { ...brick, x, y };
  }
}
function increaseScore() {
  score++;
  //check if there are still bricks
  if (score % (brickColumnCount * brickRowCount) === 0) {
    setTimeout(() => {
      showAllBricks();
    }, 500);
  }
}

//Make all bricks appear
function showAllBricks() {
  bricks.forEach((c) => {
    c.forEach((br) => (br.visible = true));
  });
}

//Draw ball on canvas
function drawBall() {
  //start path
  ctx.beginPath();
  //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true);
  //set fill color
  ctx.fillStyle = "#0095dd";
  //call to fill it
  ctx.fill();
  //finish path
  ctx.closePath();
}
//Draw ball on canvas
function drawPaddle() {
  //start path
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}
//Draw score
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}
//Draw bricks
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((b) => {
      ctx.beginPath();
      ctx.rect(b.x, b.y, b.w, b.h);
      ctx.fillStyle = b.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

function movePaddle() {
  paddle.x += paddle.dx;
  //Wall detection
  //righ
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  //left side
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  //wall collision (x)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  //wall collision (y)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }
  //paddle collion
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }
  //bricks collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });
  //Hit bottom wall loose
  if (ball.y + ball.size > canvas.height) {
    score = 0;
    showAllBricks();
  }
}
function draw() {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //draw
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

function update() {
  movePaddle();
  moveBall();
  draw();
  // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  requestAnimationFrame(update);
}

update();
function paddleKeyDown(e) {
  //right arrow
  if (e.keyCode === 39) {
    // console.log(e.key);
    paddle.dx = paddle.speed;
  }
  if (e.keyCode === 37) {
    // console.log(e.key);
    paddle.dx = -paddle.speed;
  }
}
function paddleKeyUp(e) {
  if (e.keyCode === 39 || e.keyCode === 37) {
    // console.log(e.key);
    paddle.dx = 0;
  }
}
//Keybords events
document.addEventListener("keydown", paddleKeyDown);
document.addEventListener("keyup", paddleKeyUp);
//Event handlers
rulesBtn.addEventListener("click", () => {
  rules.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  rules.classList.remove("show");
});
