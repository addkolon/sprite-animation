let X_VELOCITY = 200;
let Y_VELOCITY = 200;

class Player {
  constructor({ x, y, size, velocity = { x: 0, y: 0 } }) {
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = size;
    this.velocity = velocity;

    this.image = new Image();
    this.image.src = "./images/character.png";

    this.frameWidth = this.width; // 64px
    this.frameHeight = this.height; // 64px

    this.direction = {
      down: {
        x: 0,
        y: this.frameHeight * 0, // 0
      },
      left: {
        x: 0,
        y: this.frameHeight * 1, // 64
      },
      right: {
        x: 0,
        y: this.frameHeight * 2, // 128
      },
      up: {
        x: 0,
        y: this.frameHeight * 3, // 192
      },
    };

    this.currentDirection = this.direction.down;

    this.frameX = 0;
    this.totalFrames = 4;
    this.frameTimer = 0;
    // Ju lägre värde, ju snabbare animationen
    this.frameInterval = 0.12;
  }

  // Draw the player on the canvas
  draw(c) {
    
    // // Blue square debug code
    // c.fillStyle = "rgba(0, 0, 255, 0.5)";
    // c.fillRect(this.x, this.y, this.width, this.height);

    // FORMULA
    // s = source (Vilken del av bilden ska ritas)
    // d = destination (Vart skall denna ritas ut och hur stor skall den vara?)

    // this.image, // Add the image to the canvas

    // Source Image Cut out
    // sx, // Add the x position of the image
    // sy, // Add the y position of the image
    // sWidth, // Add the width of the image
    // sHeight, // Add the height of the image

    // Where to place Cut out image on the canvas
    // dx, // Add the x position of the image on the canvas
    // dy, // Add the y position of the image on the canvas
    // dWidth, // Add the width of the image on the canvas
    // dHeight // Add the height of the image on the canvas

    c.drawImage(
      this.image, // Skapar ett bildobjekt - character.png

      // Vilken del av bilden skall ritas ut?
      this.frameX * this.frameWidth, // sx
      this.currentDirection.y, // sy
      this.frameWidth, // sWidth - frameWidth = 64
      this.frameHeight, // sHeight - frameHeight = 64

      // Vart skall denna ritas ut och hur stor skall den vara?
      this.x, // dx
      this.y, // dy
      this.width, // dWidth -  width = 64
      this.height // dHeight - height = 64
    );
  }

  // Update the player's position
  update(deltaTime) {
    if (!deltaTime) return;

    // Player Sprite Animation
    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      this.frameTimer += deltaTime;
      // frameInterval = 0.12
      if (this.frameTimer >= this.frameInterval) {
        this.frameTimer = 0;
        this.frameX += 1;
      }
    } else {
      this.frameX = 0;
    }

    // Säkerställer att den inte går längre än totalFrames = 4;
    if (this.frameX >= this.totalFrames) {
      this.frameX = 0;
    }

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

    if (keys.j.pressed) {
      X_VELOCITY = 400;
      Y_VELOCITY = 400;
      this.frameInterval = 0.09;
  } else if (keys.k.pressed) {
      X_VELOCITY = 20;
      Y_VELOCITY = 20;
      this.frameInterval = 0.3;
  } else {
      X_VELOCITY = 200;
      Y_VELOCITY = 200;
      this.frameInterval = 0.12;
  }
  }
}
