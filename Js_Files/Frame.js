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
include("Js_Files/Point.js");
include("Js_Files/Size.js");


class Frame {
    constructor(leftTopPoint, size) {
        this.point = leftTopPoint;
        this.size = size;

        this.filled = false;
        this.fillColor = "rgba(0,0,0,0.5)";
        this.borderWidth = 1;
        this.borderColor = "rgb(0, 0, 0, 0)";
        this.src = '';
        this.isVisible = true;
    }

    setFiled(filled) {
        this.filled = filled;
    }

    setBorderWidth(width) {
        this.borderWidth = width;
    }

    setBorderColor(color) {
        this.borderColor = color;
    }

    setImageSrc(src) {
        this.src = src;
    }

    setVisible(isVisible) {
        this.isVisible = isVisible;
    }

    render_old() {
        Drawing.context.lineWidth = this.borderWidth;
        Drawing.context.sctrokeStyle = this.borderColor;
        Drawing.context.strokeRect(
            this.point.x + this.borderWidth / 2,
            this.point.y + this.borderWidth / 2,
            this.size.width - this.borderWidth,
            this.size.height - this.borderWidth);

        if (this.filled) {
            Drawing.context.fillStyle = this.fillColor;
            Drawing.context.fillRect(
                this.point.x + this.borderWidth,
                this.point.y + this.borderWidth,
                this.size.width - this.borderWidth * 2,
                this.size.height - this.borderWidth * 2
            );
        }
    }

    render() {
        if (!this.isVisible) {
            return;
        }

        let image = new Image();
        image.src = this.src;

        Drawing.context.drawImage(image, this.point.x, this.point.y, this.size.width, this.size.height);
    }

    isPointInside(point) {
        return point.x >= this.point.x && point.x <= this.point.x + this.size.width &&
            point.y >= this.point.y && point.y <= this.point.y + this.size.height;
    }

}