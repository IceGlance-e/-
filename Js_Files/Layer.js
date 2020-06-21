function include(url) {
    if(document.getElementById(url)){
        return;
    }

    let script = document.createElement('script');
    script.src = url;
    script.id = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

const LayerType = {
    MainMenu: 0,
    Game: 1,
	Setting: 2,
	Shop: 3,
	SelectLevel: 4,
    None: 999999
};

class Layer
{
    constructor()
    {
        this.renderables = [];
        this.layerType = LayerType;
    }

    addRenderable(renderable)
    {
        this.renderables.push(renderable);
    }

    setLayerType(type) {
        this.layerType = type;
    }

    render()
    {
        for (let renderable of this.renderables)
        {
            renderable.render();
        }
    }

    onMouseUp(mousePos) {

    }
}