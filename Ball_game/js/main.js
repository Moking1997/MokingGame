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

    window.addEventListener('keydown', function (event) {
        var k = event.key
        if (k == 'p') {
            paused = !paused
        } else if ('12345678'.includes(k)) {
            blocks = loadLevel(game, Number(k))
        }
    })
    document.querySelector('#id-input-speed').addEventListener('input', function (event) {
        var input = event.target
        window.fps = input.value + 1
        log(window.fps)
    })
}

var paused = false
var blacks = []
var _main = function () {
    var score = 0
    var images = {
        ball: 'images/ball.png',
        block: 'images/block.png',
        paddle: 'images/paddle.png',
    }
    var game = MoGame(30, images, function (g) {

        var paddle = Paddle(game)
        var ball = Ball(game)
        blocks = loadLevel(game, 1)
        game.registerAction('a', function () {
            paddle.moveLeft()
        })
        game.registerAction('d', function () {
            paddle.moveRight()
        })
        game.registerAction('f', function () {
            ball.fire()
        })



        game.update = function () {
            if (paused) {
                return
            }
            ball.move()
            if (rectIntersects(ball, paddle) || rectIntersects(paddle, ball)) {
                ball.bounce()
            }
            // 判断 ball 和 block 相撞
            for (let i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                if (block.collide(ball)) {
                    ball.bounce()
                    block.kill()
                    // 更新分数
                    score += 100
                }
            }
        }
        // mouse event
        var enableDrag = false
        game.canvas.addEventListener('mousedown', function (event) {

            var x = event.offsetX
            var y = event.offsetY
            log(x, y, ball.hasPoint(x, y))
            if (ball.hasPoint(x, y)) {
                enableDrag = true
                log('down', enableDrag)
            }
        })
        game.canvas.addEventListener('mousemove', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            if (enableDrag) {
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            enableDrag = false
        })

        game.draw = function () {
            // draw background
            game.context.fillStyle = '#666'
            game.context.fillRect(0, 0, 800, 600)
            game.drawImage(paddle)
            game.drawImage(ball)
            for (let i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                if (block.alive) {
                    game.drawImage(block)
                }
            }
            // draw Lable
            game.context.fillText('分数:   ' + score, 740, 580)

        }
    })
    enableDebugMode(game, true)

}
_main()