var MoGame = function (fps, images, runCallBack) {
    //images 是一个对象，里面是图片的引用名字和图片路径
    var g = {
        actions: {},
        keydowns: {},
        images: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    //draw
    g.drawImage = function (MoImage) {
        g.context.drawImage(MoImage.image, MoImage.x, MoImage.y)
    }
    //evnets
    window.addEventListener('keydown', function (event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function (event) {
        g.keydowns[event.key] = false
    })
    //注册函数
    g.registerAction = function (key, callback) {
        g.actions[key] = callback
    }
    //timer
    window.fps = 60
    var runloop = function () {
        //events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                //如果按键被按下,调用注册函数
                g.actions[key]()
            }
        }
        //update
        g.update()
        context.clearRect(0, 0, canvas.width, canvas.height)
        g.draw()
        // next time
        setTimeout(function () {
            runloop()
        }, 1000 / window.fps)
    }
    //预先加载所有图片
    var loads = []
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i];
        var path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function () {
            //存入g.images[name] = img
            g.images[name] = img
            //所有图片载入之后，调用 run
            loads.push(1)
            if (loads.length == names.length) {
                g.run()
            }
        }
    }
    g.imageByName = function (name) {
        var img = g.images[name]
        var image = {
            w: img.width,
            w: img.height,
            image: img,
        }
        return image
    }
    g.run = function () {
        runCallBack(g)
        //开始运行程序
        setTimeout(function () {
            runloop()
        }, 1000 / fps)
    }

    return g
}
