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
    document.querySelector('#id-input-speed').addEventListener('input', function (event) {
        var input = event.target
        window.fps = input.value + 1
        log(window.fps)
    })
}

var _main = function () {
    var images = {
        bullet: 'images/bullet.png',
        bg: 'images/bg.png',
        player: 'images/player.png',
    }
    var game = GuaGame.instance(120, images, function (g) {
        var s = Scene.new(g)
        g.runWithScene(s)
    })
    enableDebugMode(game, true)

}
_main()