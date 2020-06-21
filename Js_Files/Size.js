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

class Size {
    constructor(width, height) {
        this.widthP = width;
        this.heightP = height;

        this.width = Math.floor(Drawing.canvas.width * width / 100);
        this.height = Math.floor(Drawing.canvas.height * height / 100);
    }
}