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
include("Js_Files/LayerSetting.js");
include("Js_Files/LayerShop.js");
include("Js_Files/LayerSelectLevel.js");

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
        playButton_text.setWidth(110);
        playButton_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.selectLevelButton = new Frame( new Point (36, 32) , new Size (28,15) );
        this.selectLevelButton.setImageSrc("Done_assets/Yellow_button_2.png");
		
		let selectLevelButton_text = new Text ( new Point (50, 39.5) );
		selectLevelButton_text.setFontSize("48px Arial");
		selectLevelButton_text.setFillColor("#000000");
		selectLevelButton_text.setText("Select Level");
		selectLevelButton_text.setWidth(190);
		selectLevelButton_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.settingButton = new Frame ( new Point (36,54), new Size (28,15) );
        this.settingButton.setImageSrc("Done_assets/Yellow_button_2.png");
		
		let settingButton_text = new Text( new Point (50,61.5));
		settingButton_text.setFontSize("48px Arial");
		settingButton_text.setFillColor("#000000");
		settingButton_text.setText("Setting");
		settingButton_text.setWidth(1500);
		settingButton_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.shopButton = new Frame ( new Point ( 36, 76), new Size (28,15) ) ;
        this.shopButton.setImageSrc("Done_assets/Yellow_button_2.png");
		
		let shopButton_text = new Text( new Point (50, 83.5));
		shopButton_text.setFontSize("48px Arial");
		shopButton_text.setFillColor("#000000");
		shopButton_text.setText("Shop");
		shopButton_text.setWidth(100);
		shopButton_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);	

        this.addRenderable(mainMenuPopup);
        this.addRenderable(this.playButton);
        this.addRenderable(playButton_text);
        this.addRenderable(this.selectLevelButton);
		this.addRenderable(selectLevelButton_text);
        this.addRenderable(this.settingButton);
		this.addRenderable(settingButton_text);
        this.addRenderable(this.shopButton);
		this.addRenderable(shopButton_text);
    }

    onPlayReleased() {

        let game = Game.getInstance();

        game.removeLayer(LayerType.MainMenu);

        let gameLayer = new LayerGame();
        gameLayer.loadLastLevel();
        game.addLayer(gameLayer);
    }
	
	onSettingReleased(){
		
		let game = Game.getInstance();
		
		game.removeLayer(LayerType.MainMenu);
		
		let settingLayer = new LayerSetting();
		game.addLayer(settingLayer);
	}
	
	onShopReleased(){
		let game = Game.getInstance();
		game.removeLayer(LayerType.MainMenu);
		
		let shopLayer = new LayerShop();
		game.addLayer(shopLayer);
	}
	
	onSelectLevelReleased(){
		let game = Game.getInstance();
		game.removeLayer(LayerType.MainMenu);
		
		let selectLevelLayer = new LayerSelectLevel();
		game.addLayer(selectLevelLayer);
	}

    onMouseUp(mousePos) {
        super.onMouseUp(mousePos);

        if (this.playButton.isPointInside(mousePos)) {
            this.onPlayReleased();
        }
		
		if (this.settingButton.isPointInside(mousePos)){
			
			this.onSettingReleased();
		}
		
		if(this.shopButton.isPointInside(mousePos)){
			
			this.onShopReleased();
		}
		
		if(this.selectLevelButton.isPointInside(mousePos)){
			
			this.onSelectLevelReleased();
			
		}
    }

}