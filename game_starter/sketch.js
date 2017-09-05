/*
 * @name Cookie Monster
 * @description You will need to include the 
 * <a href="http://p5js.org/reference/#/libraries/p5.dom">p5.dom library</a>
 */

var monster_img;
var cookie_img;
var pie_img;
var cake_img;
var points;
var misses;
var monster_x, monster_y;
var cookie_x, cookie_y;
var pie_x, pie_y;
var cake_x, cake_y;
var count;
var button;
var scores =[];

function preload() {
  monster_img = loadImage("assets/cookie_monster.png");
  cookie_img = loadImage("assets/cookie.png");
  pie_img = loadImage("assets/pie.png");
  cake_img = loadImage("assets/cake.png");
  scores[0] = 0;
  scores[1] = 0;
  scores[2] = 0;
}

function setup() {
  createCanvas(720, 400);
  monster_x = 150;
  monster_y = height-150;
  cookie_x = 725;
  cookie_y = random(350);
  pie_x = 725;
  pie_y = random(350);
  cake_x = 725;
  cake_y = random(350);
  points = 0;
  misses = 0;
  count = 0;
  removeElements();
}

function draw() {
  if(misses < 3) {
    count++;
    background(200);
    displayPoints();
    displayMisses();
    
    image(monster_img, monster_x, monster_y);
    image(cookie_img, cookie_x, cookie_y);
    image(pie_img, pie_x, pie_y);
    image(cake_img, cake_x, cake_y);
    
    moveCookie();
    movePie();
    moveCake();
    moveMonster();
    checkForChomp();
  } else {
    gameOver();
  }
}

function displayPoints() {
  fill(160);
  textSize(150);
  text(points,10,370);
}

function displayMisses() {
  fill(255, 0, 0);
  textSize(150);
  text(misses,10,130);
}

function gameOver() {
  background(0);
  fill(255, 0, 0);
  textAlign(CENTER);
  textSize(130);
  text("Game Over!", 350, 130);
  displayLeaderBoard();
  button = createButton('Try Again?');
  button.position(630, 370);
  button.mousePressed(setup);
}

function displayLeaderBoard() {
  textAlign(CENTER);
  textSize(40);
  text("Leaderboard:", 350, 250);
  for (var i = 0; i < 3; i++) {
    if (points > scores[i]) {
      var temp = scores[i];
      scores[i] = points;
      points = temp;
    }
  }
  textSize(20);
  for (var i = 0; i < 3; i++) {
    text(scores[i], 350, 300 + i * 20);
  }
}

function moveCookie() {
  if(cookie_x < 0) {
    cookie_x = 725;
    cookie_y = random(350);
    misses++;
  }
  else 
    cookie_x -= points * 2 + 4;
}

function movePie() {
  if(pie_x < 0 && count > 100) {
    pie_x = random(720);
    pie_y = random(350);
  }
  else 
    pie_x -= 6;
}

function moveCake() {
  if(cake_x < 0 && count > 150) {
    cake_x = random(720);
    cake_y = random(350);
    count = 0;
  }
  else 
    cake_x -= 6;
}

function moveMonster() {
  if(keyIsDown(UP_ARROW) && monster_y > 0)
    monster_y -= 2;
  if(keyIsDown(DOWN_ARROW) && monster_y < height-150)
    monster_y += 2;
  if(keyIsDown(LEFT_ARROW) && monster_x > 0)
    monster_x -= 2;
  if(keyIsDown(RIGHT_ARROW) && monster_x < width-150)
    monster_x += 2;
}

function checkForChomp() {
  var dCookie = dist(cookie_x, cookie_y, monster_x, monster_y);
  if (dCookie < 100) {
    points += 1;
    cookie_x = 725;
    cookie_y = random(350);
  }
  
  var dPie = dist(pie_x, pie_y, monster_x, monster_y);
  if (dPie < 100) {
    misses += 1;
    pie_x = 725;
    pie_y = random(350);
  }
  
  var dCake = dist(cake_x, cake_y, monster_x, monster_y);
  if (dCake < 100) {
    misses += 1;
    cake_x = 725;
    cake_y = random(350);
  }
}
