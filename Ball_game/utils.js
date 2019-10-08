var log = console.log.bind(console)

var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function (a, b) {
    if (a.y + a.image.height > b.y && a.y < b.y + b.image.height) {
        if (a.x + a.image.width > b.x && a.x < b.x + b.image.width) {
            return true
        }
    }
    return false
}
