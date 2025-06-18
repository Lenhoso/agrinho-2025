let playerY;
let angle = 0;
let bikeKick = false;
let ball;
let goalX = 500;
let goalY = 250;

function setup() {
  createCanvas(600, 400);
  playerY = height - 80;
  ball = {
    x: 200,
    y: playerY - 30,
    vx: 0,
    vy: 0,
    kicked: false
  };
}

function draw() {
  background(0, 150, 0); // campo verde

  drawGoal();
  drawPlayer();
  drawBall();

  if (bikeKick) {
    animateKick();
  }
  
  moveBall();
}

function drawGoal() {
  fill(255);
  rect(goalX, goalY - 50, 10, 100); // poste esquerdo
  rect(goalX + 100, goalY - 50, 10, 100); // poste direito
  rect(goalX, goalY - 50, 110, 10); // travessão
}

function drawPlayer() {
  fill(255, 204, 0);
  ellipse(200, playerY, 30, 30); // cabeça

  push();
  translate(200, playerY + 15);
  rotate(sin(angle) * 1.5);
  rect(-5, 0, 10, 40); // corpo e movimento de bicicleta
  pop();
}

function drawBall() {
  fill(255);
  ellipse(ball.x, ball.y, 20, 20);
}

function mousePressed() {
  if (!bikeKick) {
    bikeKick = true;
    ball.kicked = true;
    ball.vx = 5;
    ball.vy = -3;
  }
}

function animateKick() {
  angle += 0.2;
  if (angle > TWO_PI) {
    angle = 0;
    bikeKick = false;
  }
}

function moveBall() {
  if (ball.kicked) {
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy += 0.2; // gravidade

    // parar a bola quando ela atingir o chão
    if (ball.y >= height - 10) {
      ball.y = height - 10;
      ball.vy = 0;
      ball.vx = 0;
      ball.kicked = false;
    }
  }
}
