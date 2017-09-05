var skinColor, buttonColor, noseColor, mouthColor, torsoColor;
var eyeBaseColor, eyeLidColor, eyeColor;
var sleep;

function setup() { 
	//set up canvas
  createCanvas(300, 400);
	background(100, 150, 255);
	
	skinColor = color(123, 178, 118);
	buttonColor = color(116, 255, 102);
	noseColor = color(116, 255, 102);
	mouthColor = color(255, 94, 195);
	torsoColor = color(178, 0, 112);
	eyeBaseColor = color(255, 94, 195);
	eyeLidColor = color(133 - 60, 188 - 60, 128 - 60);
	eyeColor = color(23, 255, 0);
	sleep = false;
	
	cloud(70, 50);
	cloud(220, 80);
	
	//hills
	hill(-100, 400, 400, 400);
	hill(100, 400, 400, 300);
	hill(0, 400, 300, 200);
} 

function draw() { 
	head();
	if(!sleep){
		eye(130, 135, eyeBaseColor, eyeColor);
		eye(170, 135, eyeBaseColor, eyeColor);
	} else{
		eye(130, 135, eyeLidColor, eyeLidColor);
		eye(170, 135, eyeLidColor, eyeLidColor);
	}
	nose();
	mouth();
	arm(80, 230);
	arm(170, 230);
	torso();
	leg(100, 320);
	leg(180, 320);
	button(150, 250);
	button(150, 290);
}

function mousePressed(){
	sleep = !sleep;
}

function keyPressed(){
	var skinR = random(256);
	var skinG = random(256);
	var skinB = random(256);
	skinColor = color(skinR, skinG, skinB);
	buttonColor = color(random(256), random(256), random(256));
	noseColor = color(random(256), random(256), random(256));
	mouthColor = color(random(256), random(256), random(256));
	torsoColor = color(random(256), random(256), random(256));
	var eyeR, eyeG, eyeB;
	if(skinR - 50 < 0)
		eyeR = 0;
	else
		eyeR = skinR - 50;
	if(skinG - 50 < 0)
		eyeG = 0;
	else
		eyeG = skinG - 50;
	if(skinB - 50 < 0)
		eyeB = 0;
	else
		eyeB = skinB - 50;
	eyeLidColor = color(eyeR, eyeG, eyeB);
	eyeBaseColor = color(random(256), random(256), random(256));
	eyeColor = color(random(256), random(256), random(256));
}

function hill(x, y, w, h){
	fill(color(0, 255, 0));
	arc(x + (w / 2), y, w, h, PI, 0, PIE);
}

function head(){
	//head
	fill(skinColor);
	ellipse(150, 150, 100, 100);
}

function nose(){
	//nose
	fill(noseColor);
	triangle(150, 140, 160, 160, 140, 160);
}

function eye(x, y, eyeBase, eye){
	fill(eyeBase);
	ellipse(x, y, 20, 30);
	if(sleep){
		noStroke();
		fill(eye);
		ellipse(x, y + 7.5, 15, 15);
		stroke(0, 0, 0);
	} else {
		fill(eye);
		ellipse(x, y + 7.5, 15, 15);
	}
}

function mouth(){
	//mouth
	fill(mouthColor);
	arc(150, 170, 40, 20, 0, PI, CHORD);
}

function leg(x, y){
	fill(skinColor);
	rect(x, y, 20, 40);
}

function torso(){
	//torso
	fill(torsoColor);
	triangle(150, 200, 70, 320, 230, 320);
}

function arm(x, y){
	fill(skinColor);
	rect(x, y, 50, 20);
}

function button(x, y){
	fill(buttonColor);
	ellipse(x, y, 20, 20);
}

function cloud(x, y){
	noStroke();
	arc(x, y, 80, 80, PI, 0, OPEN);
	arc(x + 60, y, 80, 80, PI, 0, OPEN);
	stroke(0, 0, 0);
}


