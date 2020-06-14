function include(url) {

    if (document.getElementById(url)) {
        return;
    }

    let script = document.createElement('script');
    script.src = url;
    script.id = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include("Js_Files/Drawing.js");


class Point {
    constructor(x,y) {
       this.point_x = x;
	   this.point_y = y;
    }
}