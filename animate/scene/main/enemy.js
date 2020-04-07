var randomAtoB = function (a, b) {
  return Math.floor(Math.random() * (b - a)) + a
}

class Enemy extends GuaImage {
  constructor(game) {
    name = "enemy" + randomAtoB(0, 4)
    super(game, name)
    this.setup()
  }

  setup() {
    this.x = randomAtoB(0, 340)
    this.y = -randomAtoB(0, 200)
    this.speed = randomAtoB(1, 4)
    console.log(this.w, this.h);
  }
  update() {
    this.y += this.speed
    if (this.y > 600) {
      this.setup()
    }
  }
}
