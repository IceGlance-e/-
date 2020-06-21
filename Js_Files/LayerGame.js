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
include("Js_Files/Field.js");

class LayerGame extends Layer
{
    constructor()
    {
        super();

        this.setLayerType(LayerType.Game);
		this.levels = [];
		
		let level = new Field(new Point(38,10));
		this.levels.push(level);
		
		

    }
	
	
	render(){
		
	this.levels[0].render();
		
		
	}
}