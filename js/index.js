const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const dpr = window.devicePixelRatio || 1

canvas.width = 1024 * dpr
canvas.height = 576 * dpr


// Change xy coordinates to move player's default position
const player = new Player({
  x: 100,
  y: 100,
  size: 64,
})

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
}

let lastTime = performance.now()
function animate() {
  // Calculate delta time
  const currentTime = performance.now()
  const deltaTime = (currentTime - lastTime) / 1000
  lastTime = currentTime

  // Update player position
  player.handleInput(keys)
  player.update(deltaTime)

  // Render scene
  c.save()
  c.scale(dpr, dpr)
  c.clearRect(0, 0, canvas.width, canvas.height)
  player.draw(c)
  c.restore()

  requestAnimationFrame(() => animate())
}

animate()

