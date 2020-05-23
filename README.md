## canvas 画板
---
### 1. 鼠标点击事件（mouse事件）
* 按下鼠标（onmousedown）
* 移动鼠标（onmousemove）
* 松开鼠标（onmouseup）
---
### 2. 手机触屏事件（touch事件）
* touchstart
* touchmove
* touchend
---
### 3. canvas使用方法
* 绘制矩形
    ``` 
        颜色  fillStyle(color) 
        填充矩形  fillRect(x, y, width, height) 
        描边矩形  strokeRect(x, y, width, height) 
        清楚指定区域 clearRect(x, y, width, height) 
    ```
* 绘制三角
    ``` ctx.beginPath();
        ctx.moveTo(75, 50);
        ctx.lineTo(100, 75);
        ctx.lineTo(100, 25);
        ctx.fill();
    ```
* 两点之间画线（绘制路径）
    ```
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineWidth = _degree
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath()
    ```
___
### 4. 手机上viewport显示问题
*
``` <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"> ```
---
### 5. 遇到的问题
* 初步开发时引入外部css，但是不起作用，最后发现是chrome浏览器的缓存导致css文件不更新，在调试器中关闭缓存即可。
* 获取浏览器的视口的宽高的方法用 ``` document.documentElement.clientWidth ``` 和 ``` document.documentElement.clientHeight ```,然后赋值给canvas元素使其可以铺满屏幕。
* 判断设备是否支持触屏事件，通过 ``` "ontouchstart" in document.body ``` 来判断
* 保存画板内容为png格式的图片，通过``` _canvas.toDataURL ```获取地址，在浏览器生成一个a标签，把图片的地址赋给a标签。
  ``` 
        var url = _canvas.toDataURL("image/png")
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = '画板'
        a.target = '_blank'
        a.click()
  ```
---