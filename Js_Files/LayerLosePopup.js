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
		
		
		
		let score_text = new Text ( new Point (50,43));
		score_text.setFontSize("48px Verdana");
		score_text.setFillColor("Grey");
		score_text.setText("Score : 1267");
		score_text.setWidth(400);
		score_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);
		
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
		
		let countCoins = new Text ( new Point (63, 58));
		countCoins.setFontSize("56px Verdana");
		countCoins.setFillColor("Grey");
		countCoins.setText("244");
		countCoins.setWidth(300);
		countCoins.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);
		
		let resturtButton = new Frame (new Point (23,63), new Size (10.3,14.3));
		resturtButton.setImageSrc("Done_assets/Pirple_Circle_2.png");
		
		let nextButton = new Frame ( new Point (68, 62.3), new Size(9.7,13.7) );
		nextButton.setImageSrc("Done_assets/Green_Circle_2.png");
		
		let closeButton = new Frame ( new Point (68,11), new Size (9.7,13.7) );
		closeButton.setImageSrc("Done_assets/Red_Circle_2.png");
		
		let resturtIcon = new Frame ( new Point (25.7,65.7), new Size (5,8));
		resturtIcon.setImageSrc("Done_assets/Restart.png");
		
		let nextIcon = new Frame ( new Point ( 69.6, 66), new Size (6,6) );
		nextIcon.setImageSrc("Done_assets/next.png");
		
		let closeIcon = new Frame ( new Point (71, 14.5), new Size (4,6) );
		closeIcon.setImageSrc("Done_assets/Close.png");
		
		
		this.addRenderable(mainResultPopup);
		this.addRenderable(red_Tape);
		
		this.addRenderable(score_text);
		this.addRenderable(goldCoins);
		this.addRenderable(x_text);
		this.addRenderable(countCoins);
		this.addRenderable(resturtButton);
		this.addRenderable(nextButton);
		this.addRenderable(closeButton);
		this.addRenderable(resturtIcon);
		this.addRenderable(nextIcon);
		this.addRenderable(closeIcon);
		this.addRenderable(lose_text);

    }
	
}