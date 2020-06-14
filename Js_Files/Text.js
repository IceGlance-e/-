function include(url) {
    if(document.getElementById(url)){
        return;
    }

    let script = document.createElement('script');
    script.src = url;
    script.id = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
include("Js_Files/Drawing.js");
include("Js_Files/Point.js");

class Text {
	constructor(leftPoint)
	{
		
		this.point = leftPoint;
		this.widthText = 1;
		
		this.text = "";
		this.font_size = "";
		this.fillColor = "";
		
	}
	
	setFontSize(fontsize){
		
		this.font_size = fontsize;
	}
	setFillColor(color){
		
		this.fillColor = color;
	
	}
	setText(text) {
		
		this.text = text;
	}
	
	setWidth( width ) {
		
		this.widthText = width;
	}
	
	drawCenterText(){
		
		Drawing.context.fillStyle = this.fillColor;
		Drawing.context.font = this.font_size;
		Drawing.context.textAlign = "center";
		Drawing.context.textBaseline = "middle";
		Drawing.context.fillText(this.text,this.point.x, this.point.y, this.widthText);
		
	}
	drawStartText(){
		
		Drawing.context.fillStyle = this.fillColor;
		Drawing.context.font = this.font_size;
		Drawing.context.textAlign = "start";
		Drawing.context.textBaseline = "middle";
		Drawing.context.fillText(this.text,this.point.x, this.point.y, this.widthText);
	}
	
		drawEndText(){
		
		Drawing.context.fillStyle = this.fillColor;
		Drawing.context.font = this.font_size;
		Drawing.context.textAlign = "end";
		Drawing.context.textBaseline = "middle";
		Drawing.context.fillText(this.text,this.point.x, this.point.y, this.widthText);
	}
	
	
		
	


}