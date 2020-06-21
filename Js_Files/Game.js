function include(url) {
    if(document.getElementById(url)){
        return;
    }

    let script = document.createElement('script');
    script.src = url;
    script.id = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
include("Js_Files/Animation.js");
include("Js_Files/Drawing.js");
include ("Js_Files/Frame.js");
include ("Js_Files/Text.js");
include("Js_Files/Layer.js");
include("Js_Files/LayerMainMenu.js");
include("Js_Files/Level.js");

class Game {

    static game = null;

    static getInstance() {
        if (!this.game) {
            this.game = new Game();
        }

        return this.game;
    }

    constructor() {

        //For FPS Calculator
        this.lastframe = 0;
        this.fpstime = 0;
        this.framecount = 0;
        this.fps = 0;

        this.layers = [];

        let mainMenuLayer = new LayerMainMenu();
        this.addLayer(mainMenuLayer);

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);

		this.init();
		
		this.loop = this.loop.bind(this);
    }

    init() {
        Drawing.canvas.addEventListener("mousemove", this.onMouseMove);
        Drawing.canvas.addEventListener("mousedown", this.onMouseDown);
        Drawing.canvas.addEventListener("mouseup", this.onMouseUp);
        Drawing.canvas.addEventListener("mouseout", this.onMouseOut);

        this.newGame();
    }

    loop(tframe) {
        // Request animation frames
        window.requestAnimationFrame(this.loop);

        // Update and render the game
        this.update(tframe);
        this.render();
    }

    update(tframe) {
        let dt = (tframe - this.lastframe) / 1000;
        this.lastframe = tframe;

        this.updateFps(dt);

        let topLayer = this.getTopLayer();

        if (topLayer) {
            topLayer.update(dt);
        }
    }

    updateFps(dt) {
        if (this.fpstime > 0.25) {
            // Calculate fps
            this.fps = Math.round(this.framecount / this.fpstime);

            // Reset time and framecount
            this.fpstime = 0;
            this.framecount = 0;
        }

        // Increase time and framecount
        this.fpstime += dt;
        this.framecount++;
    }

    addLayer(layer) {
        this.layers.push(layer);
    }

    removeLayer(layerType) {
        this.layers = this.layers.filter(layer => layer.layerType !== layerType);
    }

    getTopLayer() {
        if (this.layers.length <= 0) {
            return null;
        }

        return this.layers[this.layers.length - 1];
    }

    render() {
        Drawing.canvas.width = Drawing.canvas.width;

        for (let layer of this.layers) {
            layer.render();
        }
    }

    newGame() {
        // implement ?
    }

    onMouseDown(e) {
        let mousePos = this.getMousePos(e);

        let topLayer = this.getTopLayer();

        if (topLayer) {
            topLayer.onMouseDown(mousePos);
        }
    }

    onMouseMove(e) {
        let mousePos = this.getMousePos(e);

        let topLayer = this.getTopLayer();

        if (topLayer) {
            topLayer.onMouseMove(mousePos);
        }
    }

    onMouseUp(e) {
        let mousePos = this.getMousePos(e);

        let topLayer = this.getTopLayer();

        if (topLayer) {
            topLayer.onMouseUp(mousePos);
        }
    }

    onMouseOut(e) {
        let mousePos = this.getMousePos(e);

        let topLayer = this.getTopLayer();

        if (topLayer) {
            topLayer.onMouseOut(mousePos);
        }
    }

    getMousePos(e) {
        let rect = Drawing.canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * Drawing.canvas.width),
            y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * Drawing.canvas.height)
        };
    }
}