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
include("Js_Files/LayerGame.js");

class LayerSelectLevel extends Layer
{
    constructor()
    {
        super();

		this.setLayerType(LayerType.SelectLevel);

        let selectLevelMainPopup = new Frame( new Point (0,0), new Size( 100, 100 ) );
		selectLevelMainPopup.setImageSrc("Done_assets/popup_1.png");
		
		
		this.addRenderable(selectLevelMainPopup);
		

    }
	
}