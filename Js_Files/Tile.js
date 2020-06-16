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

	constructor(leftPoint, sizeTile){
	
	this.point = leftPoint;
	this.size = sizeTile;
	this.typeTile = 0;
	this.tilesTypes = {
		
		Yellow:0,
		Green:1,
		Blue:2,
		Purple:3,
		Orange:4,
		Red:5		
	};
	this.tilesImages ={
		tilesTypes.Yellow: "D:\Match3\Done_assets\yellow.png";
		tilesTypes.Green: "D:\Match3\Done_assets\green.png";
		tilesTypes.Blue: "D:\Match3\Done_assets\blue.png";
		tilesTypes.Purple: "D:\Match3\Done_assets\purple.png";
		tilesTypes.Orange: "D:\Match3\Done_assets\orange.png";
		tilesTypes.Red: "D:\Match3\Done_assets\red.png"
	};
		
	}
	
	
	
	setTypeTile(type){
	
	this.typeTile = type;
	
	}
	
	
}