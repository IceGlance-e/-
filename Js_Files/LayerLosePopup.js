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
include("Js_Files/Game.js");


class LayerLosePopup extends Layer
{
    constructor()
    {
        super();

		this.setLayerType(LayerType.LosePopup);

		let mainResultPopup = new Frame(new Point ( 25, 15), new Size (50,60) );
		mainResultPopup.setImageSrc("Done_assets/Scroll_popup.png");
		
		let red_Tape = new Frame ( new Point (20, 22), new Size (60,15) );
		red_Tape.setImageSrc( "Done_assets/Red_Tape.png");

		let score_text = new Text ( new Point (55,43));
		score_text.setFontSize("48px Verdana");
		score_text.setFillColor("Grey");
		score_text.setText("Score : ");
		score_text.setWidth(400);
		score_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Left);

		this.scoreNumber = new Text(new Point(55, 43));
		this.scoreNumber.setFontSize("48px verdana");
		this.scoreNumber.setFillColor("Grey");
		this.scoreNumber.setWidth(400);
		this.scoreNumber.setHorizontalAlignment(Text.HorizontalAlignmentType.Right);

		let lose_text = new Text ( new Point ( 50,27.5) );
		lose_text.setFontSize ("48px Verdana");
		lose_text.setFillColor("White");
		lose_text.setText("You Lose!");
		lose_text.setWidth(400);
		lose_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);
		
		let goldCoins = new Frame ( new Point ( 35,50), new Size (10,14) );
		goldCoins.setImageSrc("Done_assets/Gold_21.png");
		
		let x_text = new Text ( new Point ( 51,58));
		x_text.setFontSize("48px Verdana");
		x_text.setFillColor("black");
		x_text.setText("X");
		x_text.setWidth(400);
		x_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);
		
		this.countCoins = new Text ( new Point (63, 58));
		this.countCoins.setFontSize("56px Verdana");
		this.countCoins.setFillColor("Grey");
		this.countCoins.setWidth(300);
		this.countCoins.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);
		
		this.resturtButton = new Frame (new Point (23,63), new Size (10.3,14.3));
		this.resturtButton.setImageSrc("Done_assets/Pirple_Circle_2.png");

		this.closeButton = new Frame ( new Point (68,11), new Size (9.7,13.7) );
		this.closeButton.setImageSrc("Done_assets/Red_Circle_2.png");
		
		let resturtIcon = new Frame ( new Point (25.7,65.7), new Size (5,8));
		resturtIcon.setImageSrc("Done_assets/Restart.png");
		
		let closeIcon = new Frame ( new Point (71, 14.5), new Size (4,6) );
		closeIcon.setImageSrc("Done_assets/Close.png");
		
		
		this.addRenderable(mainResultPopup);
		this.addRenderable(red_Tape);
		
		this.addRenderable(score_text);
		this.addRenderable(this.scoreNumber);
		this.addRenderable(goldCoins);
		this.addRenderable(x_text);
		this.addRenderable(this.countCoins);
		this.addRenderable(this.resturtButton);
		this.addRenderable(this.closeButton);
		this.addRenderable(resturtIcon);
		this.addRenderable(closeIcon);
		this.addRenderable(lose_text);

    }

    render() {

		Drawing.context.fillStyle = "rgba(0, 0, 0, 0.7)";
		Drawing.context.fillRect(0, 0, Drawing.canvas.width, Drawing.canvas.height);

		let game = Game.getInstance();
		let score = game.getLayer(LayerType.Game).getScore();
		this.scoreNumber.setText(score);
		this.countCoins.setText(Math.floor(score / 10));

		super.render();
	}

	onCloseReleased() {
		let game = Game.getInstance();

		game.removeLayer(LayerType.LosePopup);
		game.removeLayer(LayerType.Game);

		let menuLayer = new LayerMainMenu();
		game.addLayer(menuLayer);
	}

	onRestartReleased() {
		let game = Game.getInstance();

		game.removeLayer(LayerType.LosePopup);

		let gameLayer = game.getLayer(LayerType.Game);
		gameLayer.restart();
	}

	onMouseUp(mousePos) {
		super.onMouseUp(mousePos);

		if (this.closeButton.isPointInside(mousePos)) {
			this.onCloseReleased();
			return;
		}

		if (this.resturtButton.isPointInside(mousePos)) {
			this.onRestartReleased();
			return;
		}
	}

}