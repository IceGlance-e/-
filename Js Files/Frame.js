function include(url) {
    if(document.getElementById(url)){
        return;
    }

    let script = document.createElement('script');
    script.src = url;
    script.id = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
include("Drawing.js");


class Frame {
    constructor(leftTopPoint, size){
        this.point = leftTopPoint;
        this.size = size;

        this.filled = false;
        this.fillColor = "rgba(0,0,0,0.5)"
        this.borderWidth = 1;
        this.borderColor = "rgb(0 , 0, 0, )";


    }

    setFiled(filled){
        this.filled = filled;
    }
    setBorderWidth(width){
        this.borderWidth = width;
    }
    setBorderColor(color){
        this.borderColor = color;
    }

    render(){
        Drawing.context.lineWidth = this.borderWidth;
        Drawing.context.sctrokeStyle = this.borderColor;
        Drawing.context.strokeRect(this.point.x, this.point.y, this.size.width, this.size.height);

        if (this.filled){
        Drawing.context.fillStyle = this.fillColor;
        Drawing.context.fillRect(
            this.point.x + this.borderWidth,
            this.point.y + this.borderWidth,
            this.size.width - this.borderWidth *2,
            this.size.height - this.borderWidth *2
        );
        }
    }

}