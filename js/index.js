const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const dpr = window.devicePixelRatio || 1

// Set canvas size
canvas.width = 1024 * dpr
canvas.height = 576 * dpr

// 2. Bakgrund - Skapa en instans av klassen med parametrar
const background = new Background({
  x: 0,
  y: 0,
  imageSrc: './images/background1.png',
})


// Change xy coordinates to move player's default position
const player = new Player({
  x: 300,
  y: 400,
  size: 64,
})

// Handle input
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
  // 3. Springa - Sätt den till att vara false initialt
  j: {
    pressed: false,
  }
}

// Handle animation loop
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
  // Clear canvas
  c.clearRect(0, 0, canvas.width, canvas.height)

  // Draw background
  // 3. Bakgrund - Anropa metoden draw på instansen av klassen
  background.draw(c)

  // Draw player
  player.draw(c)

  c.restore()



  requestAnimationFrame(() => animate())
}

animate()

