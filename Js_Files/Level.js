function include(url) {
    if(document.getElementById(url)){
        return;
    }

    let script = document.createElement('script');
    script.src = url;
    script.id = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include("Js_Files/Layer.js");
include("Js_Files/Game.js");
include("Js_Files/Frame.js");

class Level
{
    constructor()
    {
		
		
		this.columns = 0;
		this.rows = 0;
		this.moves = 0;
		this.typeWinObject = "";
		this.countWinObject = 0;

    }
	
	setColumns(countColumns){
		
		this.columns = countColumns;
	}
	
	setRows(countRows){
		
		this.rows = countRows;
	}
	
	setMoves(countMoves){
		this.moves = countMoves;
	}
	
	setTypeWinObject(winObject){
		
		this.typeWinObject = winObject;
		
	}
	setCountWinObject (count){
		this.countWinObject = count;
	}
}