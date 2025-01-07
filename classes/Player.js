const X_VELOCITY = 200
const Y_VELOCITY = 200

class Player {
  constructor({ x, y, size, velocity = { x: 0, y: 0 } }) {
    this.x = x
    this.y = y
    this.width = size
    this.height = size
    this.velocity = velocity

    // Load player sprite sheet
    this.image = new Image()
    this.image.src = './images/character.png'
    this.spriteWidth = 64
    this.spriteHeight = 64

    // Animate player sprite sheet
    this.frameX = 0
    this.frameTimer = 0
    this.frameInterval = 1/12 // Adjust this value to control animation speed
    this.totalFrames = 4 // Number of frames in sprite sheet row


    this.spriteDirection = {
      up: {
        x: 0,
        y: 3,
      },
      right: {
        x: 0,
        y: 2,
      },
      down: {
        x: 0,
        y: 0,
      },
      left: {
        x: 0,
        y: 1,
      },
    }

    this.currentDirection = this.spriteDirection.down

  }

  draw(c) {
    // Red square debug code
    c.fillStyle = 'rgba(0, 0, 255, 0.5)'
    c.fillRect(this.x, this.y, this.width, this.height)

    // Draw player image
    c.drawImage(
      // Draw image from sprite sheet
      this.image,
      this.frameX * this.spriteWidth,
      this.currentDirection.y * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,

      // Draw image at player position
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  update(deltaTime) {
    if (!deltaTime) return

    // Update horizontal position and check collisions
    this.updateHorizontalPosition(deltaTime)

    // Update vertical position and check collisions
    this.updateVerticalPosition(deltaTime)
    

    // Add frame animation logic
    if (this.velocity.x !== 0 || this.velocity.y !== 0) {
      this.frameTimer += deltaTime
      if (this.frameTimer >= this.frameInterval) {
        this.frameTimer = 0
        this.frameX += 1
        
        // Reset frame when reaching the end
        if (this.frameX >= this.totalFrames) {
            this.frameX = 0
        }
    }
    } else {
      this.frameX = 0 // Reset to standing frame when not moving
    }

  }

  updateHorizontalPosition(deltaTime) {
    this.x += this.velocity.x * deltaTime
  }

  updateVerticalPosition(deltaTime) {
    this.y += this.velocity.y * deltaTime
  }

  handleInput(keys) {
    this.velocity.x = 0
    this.velocity.y = 0

    if (keys.d.pressed) {
      this.velocity.x = X_VELOCITY
      this.currentDirection = this.spriteDirection.right
    } else if (keys.a.pressed) {
      this.velocity.x = -X_VELOCITY
      this.currentDirection = this.spriteDirection.left
    } else if (keys.w.pressed) {
      this.velocity.y = -Y_VELOCITY
      this.currentDirection = this.spriteDirection.up
    } else if (keys.s.pressed) {
      this.velocity.y = Y_VELOCITY
      this.currentDirection = this.spriteDirection.down
    }
  }
}