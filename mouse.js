let _moving = false
let _wash = false
let _fillall = false
/** 获取浏览器视口的宽高 */
let _width = document.documentElement.clientWidth
let _height = document.documentElement.clientHeight

/** 通过getElementById选取canvas元素 */
let _canvas = document.getElementById('canvas')

_canvas.width = _width - 120
_canvas.height = _height - 40

let _contain = document.getElementById('container')
_contain.style.width = '100vw'
_contain.style.height = '100vh'

let _pencil = document.getElementById('pencil')
let _eraser = document.getElementById('eraser')
let _fill = document.getElementById('fill')
_pencil.onclick = function (e) {
    _pencil.classList.add('active')
    _eraser.classList.remove('active')
    _fill.classList.remove('active')
    _wash = false
    _fillall = false
}
_eraser.onclick = function (e) {
    _eraser.classList.add('active')
    _pencil.classList.remove('active')
    _fill.classList.remove('active')
    _wash = true
    _fillall = false
}
_fill.onclick = function (e) {
    _fill.classList.add('active')
    _eraser.classList.remove('active')
    _pencil.classList.remove('active')
    _wash = false
    _fillall = true
}

let _back = document.getElementById('back')
let _clear = document.getElementById('clear')
let _load = document.getElementById('load')



let colorList = ["#000000", "#393D49", "#2F4056", "#75878a", "#d1d9e0", "#ffffff", "#1E9FFF", "#41555d", "#725e82", "#eacd76", "#a78e44", "#FFB800", "#FF5722", "#009688", "#5FB878"]
let _colorArray = document.getElementById('color')

colorList.forEach((item) => {
    let div = document.createElement('div')
    div.style.background = item
    div.className = 'color_item'
    _colorArray.appendChild(div)
})

let paintColor = '#000000'
let _allColor = document.getElementsByClassName('color_item')
_allColor[0].classList.add('active')
for (var i = 0; i < _allColor.length; i++) {
    _allColor[i].index = i
    _allColor[i].onclick = function (e) {
        paintColor = colorList[e.target.index]
        for (var j = 0; j < _allColor.length; j++) {
            console.dir(_allColor[j])
            _allColor[j].classList.remove('active')
        }
        e.target.classList.add('active')
    }
}

if (_canvas.getContext) {
    let _point = [0, 0]
    let _newPoint = [0, 0]
    let ctx = canvas.getContext('2d')
    _canvas.onmousedown = function (e) {
        if (_fillall) {
            ctx.fillStyle = paintColor
            ctx.fillRect(0, 0, _canvas.width, _canvas.height);
        } else {
            let pointX = e.layerX
            let pointY = e.layerY
            _point = [pointX, pointY]
            ctx.fillStyle = paintColor
            ctx.fillRect(pointX - 4, pointY - 4, 8, 8);
            _moving = true
            if (_wash) {
                ctx.clearRect(pointX - 4, pointY - 4, 8, 8)
            }
        }

    }
    _canvas.onmouseleave = function (e) {
        _moving = false
    }

    _canvas.onmousemove = function (e) {
        let newPointX = e.layerX
        let newPointY = e.layerY
        if (_fillall) { return }
        if (_moving) {
            if (_wash) {
                ctx.clearRect(newPointX - 5, newPointY - 5, 10, 10)
            } else {
                _newPoint = [newPointX, newPointY]
                drawLine(_point[0], _point[1], _newPoint[0], _newPoint[1])
                _point = _newPoint
            }

        }
    }

    _canvas.onmouseup = function (e) {
        _moving = false
    }

    _clear.onclick = function (e) {
        ctx.fillStyle = '#fefefe'
        ctx.fillRect(0, 0, _canvas.width, _canvas.height);
        console.log(e)
    }

    _load.onclick = function (e) {
        var url = _canvas.toDataURL("image/png")
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = '画板'
        a.target = '_blank'
        a.click()
    }

    function drawLine(x1, y1, x2, y2) {
        console.log(paintColor)
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineWidth = 8
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = paintColor
        if (_wash) {

        } else {

        }
        ctx.stroke();
        ctx.closePath()
    }
}
