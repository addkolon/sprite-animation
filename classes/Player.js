const X_VELOCITY = 200;
const Y_VELOCITY = 200;

class Player {
  constructor({ x, y, size, velocity = { x: 0, y: 0 } }) {
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = size;
    this.velocity = velocity;

    this.image = new Image();
    this.image.src = "./images/character.png";

    this.frameWidth = size;
    this.frameHeight = size;

    this.direction = {
      down: {
        x: 0,
        y: 0,
      },
      left: {
        x: 0,
        y: 64,
      },
      right: {
        x: 0,
        y: 128,
      },
      up: {
        x: 0,
        y: 192,
      },
    };

    this.currentDirection = this.direction.down;
  }

  // Draw the player on the canvas
  draw(c) {
    // Blue square debug code
    c.fillStyle = "rgba(0, 0, 255, 0.5)";
    c.fillRect(this.x, this.y, this.width, this.height);

    // FORMULA
    // s = source (Vilken del av bilden ska ritas)
    // d = destination (Vart skall denna ritas ut och hur stor skall den vara?)

    // this.image, // Add the image to the canvas

    // sx, // Add the x position of the image
    // sy, // Add the y position of the image
    // sWidth, // Add the width of the image
    // sHeight, // Add the height of the image

    // dx, // Add the x position of the image on the canvas
    // dy, // Add the y position of the image on the canvas
    // dWidth, // Add the width of the image on the canvas
    // dHeight // Add the height of the image on the canvas

    c.drawImage(
      this.image, // Add the image to the canvas

      // Vilken del av bilden skall ritas ut?
      this.currentDirection.x, // sx
      this.currentDirection.y, // sy
      this.frameWidth, // sWidth
      this.frameHeight, // sHeight

      // Vart skall denna ritas ut och hur stor skall den vara?
      this.x, // dx
      this.y, // dy
      this.width, // dWidth
      this.height // dHeight
    );
  }

  // Update the player's position
  update(deltaTime) {
    if (!deltaTime) return;

    // Update horizontal position
    this.updateHorizontalPosition(deltaTime);

    // Update vertical position
    this.updateVerticalPosition(deltaTime);
  }

  updateHorizontalPosition(deltaTime) {
    this.x += this.velocity.x * deltaTime;
  }

  updateVerticalPosition(deltaTime) {
    this.y += this.velocity.y * deltaTime;
  }

  handleInput(keys) {
    this.velocity.x = 0;
    this.velocity.y = 0;

    if (keys.d.pressed) {
      this.velocity.x = X_VELOCITY;
      this.currentDirection = this.direction.right;
    } else if (keys.a.pressed) {
      this.velocity.x = -X_VELOCITY;
      this.currentDirection = this.direction.left;
    } else if (keys.w.pressed) {
      this.velocity.y = -Y_VELOCITY;
      this.currentDirection = this.direction.up;
    } else if (keys.s.pressed) {
      this.velocity.y = Y_VELOCITY;
      this.currentDirection = this.direction.down;
    }
  }
}
