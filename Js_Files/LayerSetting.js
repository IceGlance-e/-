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
include("Js_Files/Text.js");


class LayerSetting extends Layer
{
    constructor()
    {
        super();

		this.setLayerType(LayerType.Setting);

        let settingMainPopup = new Frame( new Point (0,0), new Size( 100, 100 ) );
		settingMainPopup.setImageSrc("Done_assets/popup_1.png");
		
		//let borderPopup = new Frame ( new Point( 33.3, 3.3) , new Size (33.3,10) );
		//borderPopup.setImageSrc("Done_assets/Rectangle_popup.png");
		
		let borderPopup_text = new Text( new Point (50, 10) );
		borderPopup_text.setFontSize("64px Arial");
		borderPopup_text.setFillColor("white");
		borderPopup_text.setText("Settings");
		borderPopup_text.setWidth(300);
		borderPopup_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

		let englishLanguage = new Frame ( new Point ( 39, 30 ) , new Size (9,13) );
		englishLanguage.setImageSrc("Done_assets/English_2.png");
		
		let ukraineLanguage = new Frame ( new Point ( 53, 30), new Size ( 9,13));
		ukraineLanguage.setImageSrc("Done_assets/Ukraine_2.png");
		
		let language_text = new Text ( new Point (50,25 ) );
		language_text.setFontSize("42px Verdana");
		language_text.setFillColor("White");
		language_text.setText("Languages");
		language_text.setWidth(185);
		language_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);
		
		let volume_text = new Text ( new Point (50, 55) );
		volume_text.setFontSize("32px Verdana");
		volume_text.setFillColor("White");
		volume_text.setText("Music volume");
		volume_text.setWidth(200);
		volume_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);
		
		let musicVolume = new Frame ( new Point(30, 60) , new Size ( 40,5) ) ;
		musicVolume.setImageSrc("Done_assets/Empty_Line.png");
		
		let phioletLine = new Frame ( new Point (30.5,60), new Size (39.5,4) );
		phioletLine.setImageSrc( " Done_assets/Phiolet_Line.png ");
		
		let phioletButton_minus = new Frame ( new Point ( 21, 57.25), new Size (8,10) );
		phioletButton_minus.setImageSrc("Done_assets/Pirple_Circle_2.png");
		
		let phioletButton_plus = new Frame ( new Point ( 71, 57.25) , new Size (8,10) );
		phioletButton_plus.setImageSrc("Done_assets/Pirple_Circle_2.png");
		
		
		let sound_text = new Text( new Point ( 50, 75) );
		sound_text.setFontSize("32px Verdana");
		sound_text.setFillColor("White");
		sound_text.setText("Sound volume");
		sound_text.setWidth(200);
		sound_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);
		
		let soundVolume = new Frame ( new Point(30,80), new Size (40,5) );
		soundVolume.setImageSrc( "Done_assets/Empty_Line.png");
		
		let redLine = new Frame ( new Point (30.5, 80), new Size ( 39.5,4) );
		redLine.setImageSrc("Done_assets/Red_Line.png");
		
		let redButton_minus = new Frame ( new Point ( 21, 77.25), new Size ( 8,10) );
		redButton_minus.setImageSrc("Done_assets/Red_circle_2.png");
		
		let redButton_plus = new Frame ( new Point ( 71, 77.25), new Size (8,10) );
		redButton_plus.setImageSrc("Done_assets/Red_circle_2.png");
		
		let infoButton = new Frame (new Point ( 6, 6), new Size ( 7,7) );
		infoButton.setImageSrc("Done_assets/question.png");
		
		let reloadButton = new Frame ( new Point ( 88,6), new Size ( 6,7) );
		reloadButton.setImageSrc("Done_assets/reload.png");
		
		
		this.addRenderable(settingMainPopup);
		//this.addRenderable(borderPopup);
		this.addRenderable(borderPopup_text);
		this.addRenderable(englishLanguage);
		this.addRenderable(ukraineLanguage);
		this.addRenderable(language_text);
		this.addRenderable(volume_text);
		this.addRenderable(phioletLine);
		this.addRenderable(musicVolume);
		this.addRenderable(phioletButton_minus);
		this.addRenderable(phioletButton_plus);
		this.addRenderable(sound_text);
		this.addRenderable(redLine);
		this.addRenderable(soundVolume);
		this.addRenderable(redButton_minus);
		this.addRenderable(redButton_plus);
		this.addRenderable(infoButton);
		this.addRenderable(reloadButton);

		
		

    }
	
}