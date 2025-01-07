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
    c.drawImage(
      this.image, // Add the image to the canvas

      // Vårat fönster (vilken del av bilden skall ritas ut?)
      this.currentDirection.x, // Add the x position of the image
      this.currentDirection.y,  // Add the y position of the image
      this.frameWidth, // Add the width of the image
      this.frameHeight, // Add the height of the image

      

      // Vart skall denna ritas ut och hur stor skall den vara?
      this.x, // Add the x position of the image on the canvas
      this.y, // Add the y position of the image on the canvas
      this.width, // Add the width of the image on the canvas
      this.height // Add the height of the image on the canvas
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
