function include(url) {

    if (document.getElementById(url)) {
        return;
    }

    let script = document.createElement('script');
    script.src = url;
    script.id = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include("Drawing.js");

class Point {
    constructor(x, y) {
        this.x = Math.floor(Drawing.canvas.width * x / 100);
        this.y = Math.floor(Drawing.canvas.height * y / 100);
    }
}