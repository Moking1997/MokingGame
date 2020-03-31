var SceneEnd = function (game) {
    var s = {
        game: game,
    }
    //初始化
    game.registerAction('r', function () {
        var s = new SceneTitle(game)
        game.replaceScene(s)
    })
    s.draw = function () {
        //draw Labels
        game.context.fillText('游戏结束,按 r 返回菜单界面 ', 250, 250)
    }
    s.update = function () {

    }

    return s
}