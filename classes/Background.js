class Background {
  constructor({x = 0, y = 0, imageSrc}) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw(c) {
    c.drawImage(this.image, this.x, this.y);
  }
}
