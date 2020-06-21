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

class LayerSelectLevel extends Layer
{
    constructor()
    {
        super();

		this.setLayerType(LayerType.SelectLevel);

        let selectLevelMainPopup = new Frame( new Point (0,0), new Size( 100, 100 ) );
		selectLevelMainPopup.setImageSrc("Done_assets/popup_1.png");
		
		let selectLevel_text = new Text( new Point( 50, 10))
		selectLevel_text.setFontSize("64px Arial");
		selectLevel_text.setFillColor("white");
		selectLevel_text.setText("Select level");
		selectLevel_text.setWidth(300);
		selectLevel_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);
		
		let levelButton_1 = new Frame( new Point ( 10, 20), new Size ( 10,15) );
		levelButton_1.setImageSrc( "Done_assets/Circle_Button.png");
		
		let level_1text = new Text ( new Point( 14.9,27.5) );
		level_1text.setFontSize("42px Arial");
		level_1text.setFillColor("white");
		level_1text.setText("1");
		level_1text.setWidth(300);
		level_1text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);
		
		let red_Tape = new Frame ( new Point (9, 19), new Size (12,5) );
		red_Tape.setImageSrc( "Done_assets/Red_Tape.png"); 
		
		let starOne = new Frame ( new Point (11,19) , new Size (3,4) );
		starOne.setImageSrc ( "Done_assets/Gold_star.png");
		
		let starTwo = new Frame ( new Point (14, 18), new Size (3,4) );
		starTwo.setImageSrc( "Done_assets/Gold_star.png");
		
		let starThree = new Frame ( new Point ( 17,19), new Size (3,4) );
		starThree.setImageSrc("Done_assets/Gold_star.png");
		
		let lockedLevel = new Frame ( new Point ( 30, 20), new Size (10,15) );
		lockedLevel.setImageSrc("Done_assets/LockedLevelButton.png");
		
		let lock = new Frame ( new Point (32.65, 24.2), new Size (5,7));
		lock.setImageSrc("Done_assets/Lock.png");
		
		
		this.addRenderable(selectLevelMainPopup);
		this.addRenderable(selectLevel_text);
		
		this.addRenderable(levelButton_1);
		this.addRenderable(level_1text);
		
		this.addRenderable(red_Tape);
		this.addRenderable(starOne);
		this.addRenderable(starTwo);
		this.addRenderable(starThree);
		
		this.addRenderable(lockedLevel);
		this.addRenderable(lock);

    }
	
}