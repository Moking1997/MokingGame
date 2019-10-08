var Paddle = function () {
    var image = imageFromPath('paddle.png')

    var o = {
        image: image,
        x: 200,
        y: 450,
        speed: 8,
    }
    o.move = function (x) {
        if (x < 0) {
            x = 0
        }
        if (x > 800 - o.image.width) {
            x = 800 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function () {
        o.move(o.x -= o.speed)
    }
    o.moveRight = function () {
        o.move(o.x += o.speed)
    }
    return o
}
