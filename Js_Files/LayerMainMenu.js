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
include("Js_Files/LayerGame.js");

class LayerMainMenu extends Layer
{
    constructor()
    {
        super();

        this.setLayerType(LayerType.MainMenu);

        let mainMenuPopup = new Frame(new Point (30,0) , new Size ( 40,100 ) );
        mainMenuPopup.setImageSrc("Done_assets/popup_2.png");

        this.playButton = new Frame( new Point (36,10), new Size (28,15) );
        this.playButton.setImageSrc("Done_assets/Yellow_button_2.png");

        let playButton_text = new Text ( new Point (50,17.5) );
        playButton_text.setFontSize("48px Arial");
        playButton_text.setFillColor("#000000");
        playButton_text.setText("Play");
        playButton_text.setWidth(1500);
        playButton_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        let mainMenuButton_2 = new Frame( new Point (36, 32) , new Size (28,15) );
        mainMenuButton_2.setImageSrc("Done_assets/Yellow_button_2.png");

        let mainMenuButton_3 = new Frame ( new Point (36,54), new Size (28,15) );
        mainMenuButton_3.setImageSrc("Done_assets/Yellow_button_2.png");

        let mainMenuButton_4 = new Frame ( new Point ( 36, 76), new Size (28,15) ) ;
        mainMenuButton_4.setImageSrc("Done_assets/Yellow_button_2.png");

        this.addRenderable(mainMenuPopup);
        this.addRenderable(this.playButton);
        this.addRenderable(playButton_text);
        this.addRenderable(mainMenuButton_2);
        this.addRenderable(mainMenuButton_3);
        this.addRenderable(mainMenuButton_4);
    }

    onPlayReleased() {

        let game = Game.getInstance();

        game.removeLayer(LayerType.MainMenu);

        let gameLayer = new LayerGame();
        game.addLayer(gameLayer);

    }

    onMouseUp(mousePos) {
        super.onMouseUp(mousePos);

        if (this.playButton.isPointInside(mousePos)) {
            this.onPlayReleased();
        }
    }

}