/*
 * @name Pong
 * @description 
 * <a href="http://p5js.org/reference/#/libraries/p5.dom">p5.dom library</a>
 */

var paddleWest;
var paddleEast;
var ball;
var paddleWestX;
var paddleEastX
var paddleY;
var ballX, ballY;
var ballVel;
var ballAngle;
var bounces;
var misses;
var button;
var maxBounces;

function preload(){
  paddleWest = loadImage("assets/paddle.png");
  paddleEast = loadImage("assets/paddle.png");
  ball = loadImage("assets/ball.png");
}

function setup() {
  createCanvas(1000, 700);
  paddleWestX = 10;
  paddleEastX = width - 40;
  paddleY = height / 2 - 60;
  ballX = 500;
  ballY = 350;
  ballVel = -2;
  ballAngle = 0;
  bounces = 0;
  misses = 0;
  maxBounces = 0;
  removeElements();
}

function draw() {
  if(misses < 3){
    background(0);
    image(paddleWest, paddleWestX, paddleY);
    image(paddleEast, paddleEastX, paddleY);
    image(ball, ballX, ballY);
    
    movePaddle();
  	moveBall();
  	
  	displayBounces();
  	displayMisses();
  } else{
    gameOver();
  }
}

function movePaddle(){
  if(keyIsDown(UP_ARROW) && paddleY > 10){
    paddleY -= 2;
  }
  if(keyIsDown(DOWN_ARROW) && paddleY < height - 170){
    paddleY += 2;
  }
}
  
function moveBall(){
	if(ballX < 40){
  	if(ballY > paddleY - 25 && ballY < paddleY + 160){
  		ballBounced();
	  } else{
	    ballMissed();
	  }
	} else if(ballX > width - 68){
	  if(ballY > paddleY - 25 && ballY < paddleY + 160){
		  ballBounced();
	  } else{
	    ballMissed();
	  }
	}
	if(ballY < 0 || ballY > height - 25){
	  ballAngle *= -1;
	}
	ballX += ballVel;
	ballY += ballAngle;
}

function ballBounced(){
  ballVel *= -1;
  ballAngle = random(7);
  if(ballAngle > 3){
    ballAngle *= -1;
    ballAngle += 3;
  }
  bounces++;
}

function ballMissed(){
  ballY = 350;
  ballX = 500;
  ballVel *= -1;
  ballAngle = 0;
  if(bounces > maxBounces){
    maxBounces = bounces;
  }
  bounces = 0;
  misses++;
}

function displayBounces(){
  fill(0, 255, 0);
	textSize(30);
	text("Bounces: " + bounces, 10, 30);
}

function displayMisses(){
  fill(255, 0, 0);
	textSize(30);
	text("Misses: " + misses, width - 134, 30);
}

function gameOver(){
  background(200);
  fill(0, 0, 255);
  textAlign(CENTER);
  textSize(130);
  text("GAME OVER!", 500, 130);
  textSize(80);
  text("Your Highest Score: " + maxBounces, 500, 400);
  button = createButton('Try Again?');
  button.position(910, 670);
  button.mousePressed(setup);
}