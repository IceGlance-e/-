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

        this.field = new Field(new Point(20,10), new Size(60, 80));
        this.field.setGameLayer(this);

        this.addRenderable(this.field);

        this.progress = 0; // objective progress
        this.score = 0;
        this.spentMoves = 0;
    }

    newGame() {
        this.score = 0;
        this.spentMoves = 0;
        this.progress = 0;

        this.field.init();
    }

    addScore(score) {
        this.score += score;
    }

    update(dt) {
        super.update(dt);

        if (this.field.getGameState() === Field.gameStates.ready) {

            if (this.progress >= this.field.getLevel().progress) {
                this.field.onWin();
                return;
            }

            if (this.spentMoves >= this.field.getLevel().moves) {
                this.field.onLoose();
                return;
            }
        } else {
            this.field.update(dt);
        }
    }

	onMouseUp(mousePos) {
        super.onMouseUp(mousePos);

        this.field.onMouseUp(mousePos);
    }

    onMouseDown(mousePos) {
        super.onMouseDown(mousePos);

        this.field.onMouseDown(mousePos);
    }

    onMouseMove(mousePos) {
        super.onMouseMove(mousePos);

        this.field.onMouseMove(mousePos);
    }

    onMouseOut(mousePos) {
        super.onMouseOut(mousePos);

        this.field.onMouseOut(mousePos);
    }
}