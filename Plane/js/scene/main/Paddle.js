var Paddle = function (game) {
    var o = game.imageByName('paddle')
    o.x = 100
    o.y = 550
    o.speed = 12
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
