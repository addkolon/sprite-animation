// 1. Bakgrund - Skapa klassen

class Background {
  constructor({x = 0, y = 0, imageSrc}) {
    this.x = x
    this.y = y
    this.width = 1024
    this.height = 576
    this.image = new Image()
    this.image.src = imageSrc
  }

  draw(c) {
    // FORMULA
    // d = destination (Vart skall denna ritas ut och hur stor skall den vara?)

    // this.image, // Add the image to the canvas

    // Where to place Cut out image on the canvas
    // dx, // Add the x position of the image on the canvas
    // dy, // Add the y position of the image on the canvas
    // dWidth, // Add the width of the image on the canvas
    // dHeight // Add the height of the image on the canvas

    c.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height,
    )
  }
}