const config = {
    player_speed: 10,
    player_cooldown: 10,
    enemy_speed: 5,
    bullet_speed: 5,
    bg_speed: 1,
}

class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = config.bullet_speed
    }
    update() {
        this.y -= this.speed
    }
}
class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = config.player_speed
        this.cooldown = 0
    }
    update() {
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    fire() {
        if (this.cooldown == 0) {
            let x = this.x + this.w / 2
            let y = this.y
            let b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    debug() {
        this.speed = config.player_speed
        this.cooldown = config.player_cooldown
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}

const randomBetween = function (start, end) {
    let n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 2)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 450)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.y += this.speed
        if (this.y > 700) {
            this.setup()
        }
    }
    moveDown() {
        this.y += this.speed
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        let game = this.game
        this.numberOfEnemies = 5
        this.bg_1 = GuaImage.new(game, 'bg')
        this.bg_2 = GuaImage.new(game, 'bg')
        this.bg_2.y = - this.bg_2.h
        this.player = Player.new(game)
        this.player.x = 150
        this.player.y = 400

        this.addElement(this.bg_1)
        this.addElement(this.bg_2)
        this.addElement(this.player)

        this.addEnemies()
    }
    addEnemies() {
        let es = []
        for (let i = 0; i < this.numberOfEnemies; i++) {
            let e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function () {
            s.player.moveLeft()
        })
        g.registerAction('d', function () {
            s.player.moveRight()
        })
        g.registerAction('w', function () {
            s.player.moveUp()
        })
        g.registerAction('s', function () {
            s.player.moveDown()
        })
        g.registerAction('j', function () {
            s.player.fire()
        })

    }
    update() {
        super.update()
        this.bgUpdate(this.bg_1)
        this.bgUpdate(this.bg_2)
    }

    bgUpdate(bg) {
        if (bg.y < bg.h - config.bg_speed) {
            bg.y += config.bg_speed
        } else {
            bg.y = -bg.h
        }
    }
}
// var Scene = function (game) {
//     var s = {
//         game: game,
//     }

//     var paddle = Paddle(game)
//     var ball = Ball(game)

//     var score = 0

//     blocks = loadLevel(game, 1)

//     game.registerAction('a', function () {
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function () {
//         paddle.moveRight()
//     })
//     game.registerAction('f', function () {
//         ball.fire()
//     })

//     s.draw = function () {
//         // draw background
//         game.context.fillStyle = '#666'
//         game.context.fillRect(0, 0, 800, 600)
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i];
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw Lable
//         game.context.fillText('分数:   ' + score, 740, 580)

//     }

//     s.update = function () {
//         if (window.paused) {
//             return
//         }

//         ball.move()
//         //  判断游戏结束
//         if (ball.y > paddle.y) {
//             // 跳转到游戏结束页面
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }

//         if (rectIntersects(ball, paddle) || rectIntersects(paddle, ball)) {
//             ball.bounce()
//         }
//         // 判断 ball 和 block 相撞
//         for (let i = 0; i < blocks.length; i++) {
//             var block = blocks[i];
//             if (block.collide(ball)) {
//                 ball.bounce()
//                 block.kill()
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }

//     // mouse event
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function (event) {

//         var x = event.offsetX
//         var y = event.offsetY
//         if (ball.hasPoint(x, y)) {
//             enableDrag = true
//             log('down', enableDrag)
//         }
//     })
//     game.canvas.addEventListener('mousemove', function (event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         if (enableDrag) {
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function (event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         enableDrag = false
//     })
//     return s
// }