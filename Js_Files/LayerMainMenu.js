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

class LayerMainMenu extends Layer
{
    constructor()
    {
        super();

        this.setLayerType(LayerType.MainMenu);

        let mainMenuPopup = new Frame(new Point (30,0) , new Size ( 40,100 ) );
        mainMenuPopup.setImageSrc("Done_assets/popup_2.png");

        let mainMenuButton_1 = new Frame( new Point (36,10), new Size (28,15) );
        mainMenuButton_1.setImageSrc("Done_assets/Yellow_button_2.png");

        let mainMenuButton_1_text = new Text ( new Point (50,17.5) );
        mainMenuButton_1_text.setFontSize("48px Arial");
        mainMenuButton_1_text.setFillColor("#000000");
        mainMenuButton_1_text.setText("Play");
        mainMenuButton_1_text.setWidth(1500);
        mainMenuButton_1_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        let mainMenuButton_2 = new Frame( new Point (36, 32) , new Size (28,15) );
        mainMenuButton_2.setImageSrc("Done_assets/Yellow_button_2.png");

        let mainMenuButton_3 = new Frame ( new Point (36,54), new Size (28,15) );
        mainMenuButton_3.setImageSrc("Done_assets/Yellow_button_2.png");

        let mainMenuButton_4 = new Frame ( new Point ( 36, 76), new Size (28,15) ) ;
        mainMenuButton_4.setImageSrc("Done_assets/Yellow_button_2.png");

        this.addRenderable(mainMenuPopup);
        this.addRenderable(mainMenuButton_1);
        this.addRenderable(mainMenuButton_2);
        this.addRenderable(mainMenuButton_3);
        this.addRenderable(mainMenuButton_4);
        this.addRenderable(mainMenuButton_1_text);
    }
}