let bgImage;
let maskGraphics;
let butterflyX = 0;

function preload() {
  // Create or load any image to reveal; here we generate a gradient
  bgImage = createGraphics(windowWidth, windowHeight);
  for (let y = 0; y < bgImage.height; y++) {
    for (let x = 0; x < bgImage.width; x++) {
      let c = lerpColor(color("#FFC0CB"), color("#87CEFA"), x / bgImage.width);
      bgImage.stroke(c);
      bgImage.point(x, y);
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  maskGraphics = createGraphics(width, height);
}

function draw() {
  background(255);

  // Clear previous mask
  maskGraphics.clear();

  // Draw butterfly-shaped mask at moving x position
  drawButterfly(maskGraphics, butterflyX, height / 2, 100);

  // Apply the mask to the background image
  let maskedImage = bgImage.get();
  maskedImage.mask(maskGraphics);

  image(maskedImage, 0, 0);

  // Move butterfly across screen
  butterflyX += 2;
  if (butterflyX > width + 100) butterflyX = -100;
}

// Butterfly shape made from two wings
function drawButterfly(pg, x, y, size) {
  pg.push();
  pg.translate(x, y);
  pg.fill(255);
  pg.noStroke();

  // Left wing
  pg.beginShape();
  pg.vertex(0, 0);
  pg.bezierVertex(-size, -size * 0.5, -size, size * 0.5, 0, 0);
  pg.endShape();

  // Right wing
  pg.beginShape();
  pg.vertex(0, 0);
  pg.bezierVertex(size, -size * 0.5, size, size * 0.5, 0, 0);
  pg.endShape();

  pg.pop();
}
