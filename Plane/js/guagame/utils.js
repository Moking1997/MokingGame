var log = console.log.bind(console)

var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

var aInb = function (x, x1, x2) {
    return x >= x1 && x <= x2
}

var rectIntersects = function (a, b) {
    if (a.y + a.image.height > b.y && a.y < b.y + b.image.height) {
        if (a.x + a.image.width > b.x && a.x < b.x + b.image.width) {
            return true
        }
    }
    return false
}

var randomAtoB = function (a, b) {
    return Math.floor(Math.random() * (b - a)) + a
}

