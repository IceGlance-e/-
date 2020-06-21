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
		
	constructor(leftPoint)
		{
		this.point = leftPoint;
		this.level = new Level();
		this.level.setColumns(8);
		this.level.setRows(8);
	
		this.tiles = [];
		this.tiles.push(new Tile(new Point( 40,12), new Size (150,150)));
		this.init();
		}
		
	
	init(){
		let tokenTypesArray = [];
		
		for(let type in Tile.tilesTypes){
			tokenTypesArray.push(Tile.tilesTypes[type]);
		}
		

		
		for (let i = 0; i < this.level.rows; i++){
			this.tiles[i] = [];
			for ( let j = 0; j < this.level.columns; j++){
			this.tiles[i][j] = Math.floor(Math.random() * tokenTypesArray.length);
			}
		}
		
		
		}
		
	render(){
		
			for (let i = 0; i < this.level.rows; i++){
				for ( let j = 0; j < this.level.colummns; j++){
					this.tiles[i][j].render();
					}
				}
		}
		
	
	
}