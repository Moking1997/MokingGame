var loadLevel = function (game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (let i = 0; i < level.length; i++) {
        let p = level[i]
        let b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function (event) {
        var k = event.key
        if (k == 'p') {
            window.paused = !window.paused
        } else if ('12345678'.includes(k)) {
            // blocks = loadLevel(game, Number(k))
        }
    })
}

var _main = function () {
    var images = {
        bullet: 'images/bullet.png',
        bg: 'images/bg.png',
        player: 'images/player.png',
        bullet: 'images/bullet.png',
        enemy0: 'images/enemy0.png',
        enemy1: 'images/enemy1.png',
        enemy2: 'images/enemy2.png',
    }
    var game = GuaGame.instance(60, images, function (g) {
        var s = Scene.new(g)
        g.runWithScene(s)
    })
    enableDebugMode(game, true)

}
_main()