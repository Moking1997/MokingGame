var Ball = function (game) {
    var o = game.imageByName('ball')
    o.x = 200
    o.y = 50
    o.speedX = 12
    o.speedY = 12
    o.fired = false

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

    o.hasPoint = function (x, y) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    return o
}
