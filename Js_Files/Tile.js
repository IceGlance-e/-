function include(url) {
    if(document.getElementById(url)){
        return;
    }

    let script = document.createElement('script');
    script.src = url;
    script.id = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include("Js_Files/Level.js");
include("Js_Files/Game.js");
include("Js_Files/Frame.js");


class Tile {

	static tilesTypes = {
			
			Yellow : 0,
			Green:1,
			Blue:2,
			Purple:3,
			Orange:4,
			Red:5		
		};
		
	static tilesImages = {
		
			[this.tilesTypes.Yellow] : "D:/Match3/Done_assets/yellow.png",
			[this.tilesTypes.Green]: "D:/Match3/Done_assets/green.png",
			[this.tilesTypes.Blue]: "D:/Match3/Done_assets/blue.png",
			[this.tilesTypes.Purple]: "D:/Match3/Done_assets/purple.png",
			[this.tilesTypes.Orange]: "D:/Match3/Done_assets/orange.png",
			[this.tilesTypes.Red]: "D:/Match3/Done_assets/red.png"
		};

	constructor(leftPoint, sizeTile){
	
	this.point = leftPoint;
	this.size = sizeTile;
	this.typeTile = 0;
	
		
	}
	setTypeTile(type){
	
	this.typeTile = type;
	
	}
	
	render(){
		let image = new Image();
		image.src =  this.src;
		
		Drawing.context.drawImage( image, this.point.x, this.point.y, this.size.width, this.size.height );
	}
	
	
}