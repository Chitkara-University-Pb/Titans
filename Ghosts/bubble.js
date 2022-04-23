class Ghost {
	constructor(tempD, c, x, y) {
		this.x = x;
		this.y = y ? y : random(height);
		this.color = c;
		this.diameter = tempD;
		this.width = this.diameter / 1.2;
		this.height = this.diameter * 1.2;
		this.speed = 2;
		this.popped = false;
		this.img = loadImage("ghost.png");
	}

	clicked(mx, my) {
		var d = dist(x, y, mx, my);
		if (d < diameter / 2) {
			this.popped = true;
		}
	}

	ascend() {
		this.y -= this.speed;
		this.x = this.x + random(-2, 2);
	}

	display() {
		if (!this.popped) {
			image(this.img, this.x, this.y);
		}
	}

	top() {
		if (this.y < -this.diameter / 2) {
			this.y = height + this.diameter / 2;
		}
	}

	newSpeed(nS) {
		this.speed = nS;
	}
}
