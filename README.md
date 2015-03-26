# prlx
Safe way to parallax your site!


```javascript
// Worse
window.addEventListener('scroll', function() {
    var posY = window.scrollY;
    // do something.
}, false);

// Better
var prlx = new Prlx({ raf: true });
// var prlx = new Prlx({ fps: 30 });

prlx.on('scroll', function(ev) {
    var posY = ev.data.y;
    // do something.
});
```
