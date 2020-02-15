# prlx
Safe way to parallax your site!

See


```javascript
// これを
window.addEventListener('scroll', function() {
    var posY = window.scrollY;
    // do something.
}, false);

// こうしようという試み
var prlx = new Prlx({ raf: true });
// var prlx = new Prlx({ fps: 30 });

prlx.onScroll(function(pos) {
    var posY = pos.y;
    // do something.
});

// スタートするまで何もしないよ
prlx.start();

// いらなくなったら
prlx.dispose();
```
