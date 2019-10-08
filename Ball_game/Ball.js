var Ball = function () {
    var image = imageFromPath('ball.png')

    var o = {
        image: image,
        x: 200,
        y: 250,
        speedX: 12,
        speedY: 12,
        fired: false,
    }
    o.fire = function () {
        o.fired = true
    }
    o.move = function () {
        if (o.fired) {
            if (o.x < 0 || o.x + o.image.width > 800) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y + o.image.height > 600) {
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.bounce = function () {
        o.speedY *= -1
    }
    return o
}
