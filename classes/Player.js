const X_VELOCITY = 200
const Y_VELOCITY = 200

class Player {
  constructor({ x, y, size, velocity = { x: 0, y: 0 } }) {
    this.x = x
    this.y = y
    this.width = size
    this.height = size
    this.velocity = velocity
  }

  draw(c) {
    // Red square debug code
    c.fillStyle = 'rgba(0, 0, 255, 0.5)'
    c.fillRect(this.x, this.y, this.width, this.height)
  }

  update(deltaTime) {
    if (!deltaTime) return

    // Update horizontal position and check collisions
    this.updateHorizontalPosition(deltaTime)

    // Update vertical position and check collisions
    this.updateVerticalPosition(deltaTime)
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
    } else if (keys.a.pressed) {
      this.velocity.x = -X_VELOCITY
    } else if (keys.w.pressed) {
      this.velocity.y = -Y_VELOCITY
    } else if (keys.s.pressed) {
      this.velocity.y = Y_VELOCITY
    }
  }
}