let butterflyPos;
let angle = 0;
let trail = [];

function setup() {
  createCanvas(800, 600);
  textSize(48); // Size for emoji
  textAlign(CENTER, CENTER);
  butterflyPos = createVector(width / 2, height / 2);
}

function draw() {
  background(255); // Navy-transparent background

  // Wave motion + attraction to mouse
  let waveY = sin(angle) * 10;
  angle += 0.05;

  let target = createVector(mouseX, mouseY + waveY);
  let dir = p5.Vector.sub(target, butterflyPos);
  dir.limit(2); // Smooth following
  butterflyPos.add(dir);

  // Trail effect
  trail.push(butterflyPos.copy());
  if (trail.length > 20) trail.shift();

  // Draw trail
  noStroke();
  for (let i = 0; i < trail.length; i++) {
    let alpha = map(i, 0, trail.length, 20, 100);
    fill(255, 255, 255, alpha);
    text("🦋", trail[i].x, trail[i].y);
  }

  // Draw butterfly
  fill(255);
  text("🦋", butterflyPos.x, butterflyPos.y);
}
