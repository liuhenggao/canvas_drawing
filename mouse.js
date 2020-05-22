let _moving = false // 是否在移动
let _wash = false // 是否使用橡皮
let _fillall = false // 是否填充

/** 获取浏览器视口的宽高 */
let _width = document.documentElement.clientWidth
let _height = document.documentElement.clientHeight

/** 判断设备是否支持触摸 */
let isTouch = 'ontouchstart' in document.body ? true : false

/** 通过getElementById选取canvas元素 */
let _canvas = document.getElementById('canvas')

let _degree = 8 //画笔的粗细
let _range = _degree / 2 // 需要偏移的像素

_canvas.width = _width - 100
_canvas.height = _height - 30

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
_fill.onclick = function (e) { // 填充整个画板
    _fill.classList.add('active')
    _eraser.classList.remove('active')
    _pencil.classList.remove('active')
    _wash = false
    _fillall = true
}

let _back = document.getElementById('back')
let _clear = document.getElementById('clear')
let _load = document.getElementById('load')

/** 用一个数组来存储画笔的颜色 */
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
    if (isTouch) {
        _canvas.ontouchstart = function (e) {
            if (_fillall) {
                ctx.fillStyle = paintColor
                ctx.fillRect(0, 0, _canvas.width, _canvas.height);
            } else {
                console.log(e)
                let pointX = e.touches[0].clientX - 60
                let pointY = e.touches[0].clientY - 20
                _point = [pointX, pointY]
                ctx.fillStyle = paintColor
                ctx.fillRect(pointX - _range, pointY - _range, _degree, _degree);
                _moving = true
                if (_wash) {
                    ctx.clearRect(pointX - _range, pointY - _range, _degree, _degree)
                }
            }
        }
        _canvas.ontouchmove = function (e) {
            let newPointX = e.touches[0].clientX - 60
            let newPointY = e.touches[0].clientY - 20
            if (_fillall) { return }
            if (_moving) {
                _newPoint = [newPointX, newPointY]
                drawLine(_point[0], _point[1], _newPoint[0], _newPoint[1])
                _point = _newPoint
            }
        }
    } else {
        _canvas.onmousedown = function (e) { // 鼠标点击
            if (_fillall) {
                ctx.fillStyle = paintColor
                ctx.fillRect(0, 0, _canvas.width, _canvas.height);
            } else {
                let pointX = e.layerX
                let pointY = e.layerY
                _point = [pointX, pointY]
                ctx.fillStyle = paintColor
                ctx.fillRect(pointX - _range, pointY - _range, _degree, _degree);
                _moving = true
                if (_wash) {
                    ctx.clearRect(pointX - _range, pointY - _range, _degree, _degree)
                }
            }
        }
        _canvas.onmouseleave = function (e) { // 鼠标抬起
            _moving = false
        }
        _canvas.onmousemove = function (e) { // 鼠标移动
            let newPointX = e.layerX
            let newPointY = e.layerY
            if (_fillall) { return }
            if (_moving) {
                _newPoint = [newPointX, newPointY]
                drawLine(_point[0], _point[1], _newPoint[0], _newPoint[1])
                _point = _newPoint
            }
        }
        _canvas.onmouseup = function (e) { // 当鼠标离开canvas标签的范围时把_moving置为false
            _moving = false
        }
    }

    _clear.onclick = function (e) { // 清除画板上的所有内容，用一个新的白色背景覆盖画板
        ctx.fillStyle = '#fefefe'
        ctx.fillRect(0, 0, _canvas.width, _canvas.height);
        console.log(e)
    }

    _load.onclick = function (e) { // 下载画板内容为图片
        var url = _canvas.toDataURL("image/png")
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = '画板'
        a.target = '_blank'
        a.click()
    }

    function drawLine(x1, y1, x2, y2) { // canvas画线的方法
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineWidth = _degree
        ctx.lineTo(x2, y2);
        if (_wash) {
            ctx.strokeStyle = '#fefefe'
        } else {
            ctx.strokeStyle = paintColor
        }
        ctx.stroke();
        ctx.closePath()
    }
}

/** 修改画笔粗细 */
let _large = document.getElementById('large')
let _medium = document.getElementById('medium')
let _small = document.getElementById('small')
let _mini = document.getElementById('mini')

_large.onclick = function (e) {
    _degree = 10
}
_medium.onclick = function (e) {
    _degree = 8
}
_small.onclick = function (e) {
    _degree = 6
}
_mini.onclick = function (e) {
    _degree = 4
}
