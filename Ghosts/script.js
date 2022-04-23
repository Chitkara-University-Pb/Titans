let ghosts = [];
let radii = 120;
let handsfree;
let colors;
let flag = 0;
let timer = 60;
let bg;
let score = 0;

function setup() {
	bg = loadImage("bg.png");
	createCanvas(windowWidth, windowHeight);
	let temp = 0;

	colors = [
		color(255, 57, 64),
		color(56, 99, 255),
		color(57, 203, 58),
		color(57, 216, 255),
		color(255, 240, 0),
		color(242, 55, 255),
	];

	for (let i = 0; i < width; i += 20) {
		ghosts.push(new Ghost(radii, getColor(), temp));
		temp += radii + i;
	}

	handsfree = new Handsfree({
		showDebug: true,
		hands: {
			enabled: true,
			maxNumHands: 1,
			minDetectionConfidence: 0.7,
		},
	});

	handsfree.start();
}

function draw() {
	background(bg);
	for (let i = 0; i < ghosts.length; i++) {
		ghosts[i].ascend();
		ghosts[i].display();
		ghosts[i].top();
	}
	let out = drawHand();

	if (flag == 1) {
		startTimer();
		flag = 0;
	}

	for (let i = 0; i < ghosts.length; i++) {
		if (
			pow(out.px - ghosts[i].x, 2) + pow(out.py - ghosts[i].y, 2) <
			pow(ghosts[i].diameter, 2)
		) {
			let prevX = ghosts[i].x;
			let prevD = ghosts[i].diameter;
			ghosts.splice(i, 1);
			score += 10;

			ghosts.push(
				new Ghost(
					radii,
					getColor(),
					prevX + random(-10, 10),
					height + prevD
				)
			);
		}
	}
}

function getColor() {
	return colors[parseInt(random(6))];
}

function startTimer() {
	if (timer <= 0) {
		fill(255, 0, 0);
		textStyle(BOLD);
		text("GAME OVER", width / 2 - 200, height / 2);
		noLoop();
	}
	textSize(50);
	fill(255);
	text(timer, width - 100, 60);
	text("Score: " + score, 20, 60);
	if (frameCount % 60 == 0 && timer > 0) {
		timer--;
		for (let i = 0; i < ghosts.length; i++) {
			ghosts[i].newSpeed(60 - timer);
		}
	}
}

function drawHand() {
	fill(0);
	noStroke();
	let out = {};
	if (handsfree.data.hands) {
		try {
			if (flag == 0) {
				flag = 1;
			}
			var landmarks = handsfree.data.hands.multiHandLandmarks[0][8];
			var px = landmarks.x;
			var py = landmarks.y;
			px = map(px, 0, 1, width, 0);
			py = map(py, 0, 1, 0, height);
			fill(255, 255, 0);
			circle(px, py, 20);
			out = { px, py };
		} catch (e) {}
	}
	return out;
}
