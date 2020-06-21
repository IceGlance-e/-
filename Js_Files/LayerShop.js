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

class LayerShop extends Layer
{
    constructor()
    {
        super();

		this.setLayerType(LayerType.Shop);

        let shopMainPopup = new Frame( new Point (0,0), new Size( 100, 100 ) );
		shopMainPopup.setImageSrc("Done_assets/popup_3.png");
		
		
		this.addRenderable(shopMainPopup);
		

    }
	
}