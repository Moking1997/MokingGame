var Scene = function (game) {
    var s = {
        game: game,
    }

    var paddle = Paddle(game)
    var ball = Ball(game)

    var score = 0

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

    s.draw = function () {
        // draw background
        game.context.fillStyle = '#666'
        game.context.fillRect(0, 0, 800, 600)
        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw Lable
        game.context.fillText('分数:   ' + score, 740, 580)

    }

    s.update = function () {
        if (window.paused) {
            return
        }

        ball.move()
        //  判断游戏结束
        if (ball.y > paddle.y) {
            // 跳转到游戏结束页面
            var end = SceneEnd.new(game)
            game.replaceScene(end)
        }

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
    return s
}