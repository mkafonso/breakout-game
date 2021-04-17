const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const paddle_width = 120;
const paddle_thickness = 20;
const paddle_distance_from_edge = 60;
let paddleX = innerWidth / 2;
let ballX = 75;
let ballY = 75;
let ballSpeedX = 5;
let ballSpeedY = 7;

function updatePaddlePosition(event) {
  let moveToLeft =
    event.key === "a" || event.key === "A" || event.key == "ArrowLeft";

  let moveToRight =
    event.key === "d" || event.key === "D" || event.key == "ArrowRight";

  if (moveToLeft && paddleX > 0) {
    paddleX -= 20;
  }

  if (moveToRight && paddleX < canvas.width - paddle_width) {
    paddleX += 20;
  }
}

window.onload = function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  let framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  document.addEventListener("keydown", updatePaddlePosition);
};

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX > canvas.width || ballX < 0) {
    ballSpeedX *= -1;
  }

  if (ballY < 0) {
    ballSpeedY *= -1;
  }

  if (ballY > canvas.height) {
    resetBallPosition();
  }

  let paddleTopEdgeY = canvas.height - paddle_distance_from_edge;
  let paddleBottomEdgeY = paddleTopEdgeY + paddle_thickness;
  let paddleLeftEdgeX = paddleX;
  let paddleRightEdgeX = paddleLeftEdgeX + paddle_width;

  if (
    ballY > paddleTopEdgeY &&
    ballY < paddleBottomEdgeY &&
    ballX > paddleLeftEdgeX &&
    ballX < paddleRightEdgeX
  ) {
    ballSpeedY *= -1;

    let centerOfPaddleX = paddleX + paddle_width / 2;
    let ballDistanceFromPaddleCenterX = ballX - centerOfPaddleX;
    ballSpeedX = ballDistanceFromPaddleCenterX * 0.35;
  }
}

function drawAll() {
  // draw the canva
  colorRect(0, 0, canvas.width, canvas.height, "#2b2d42");

  // draw the ball
  colorCircle(ballX, ballY, 10, "#ff8c42");

  // draw the paddleX
  colorRect(
    paddleX,
    canvas.height - paddle_distance_from_edge,
    paddle_width,
    paddle_thickness,
    "#f8f8f8"
  );
}

function colorRect(
  topLeftX = 0,
  topLeftY = 0,
  boxWidth = canvas.width,
  boxHeight = canvas.height,
  fillColor = "#2b2d42"
) {
  ctx.fillStyle = fillColor;
  ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(
  centerX = 0,
  centerY = 0,
  radius = 10,
  fillColor = "#ff8c42"
) {
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  ctx.fill();
}

function resetBallPosition() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}
