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
include("Js_Files/Tile.js");
include("Js_Files/Point.js");
include("Js_Files/Size.js");



class Field {
		
	constructor()
		{
		this.level = new Level(new Point(38,10);
		this.tiles = [];
		this.tiles.push(new Tile(new Point( 40,12), new Size (150,150)));
		}
		
	
	init(){
		let tokenTypesArray = [];
		
		for(let type in Tile.tilesTypes){
			
			tokenTypesArray.push(Tile.tilesTypes[type]);
			
		}
		
	}
	
	
}