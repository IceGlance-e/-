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

class LayerGame extends Layer
{
    constructor()
    {
        super();

        this.setLayerType(LayerType.Game);


    }
}