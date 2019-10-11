var SceneEnd = function (game) {
    var s = {
        game: game,
    }
    //初始化
    s.draw = function () {
        //draw Labels
        game.context.fillText('Game Over', 250, 250)
    }
    s.update = function () {

    }

    return s
}