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
class Game {

    constructor() {


        this.winObject = {
            type: 0,
            count: 25,
            progress: 0
        };

        this.maxMoves = 29;
        this.movesLeft = 0;

        this.score = 0;

        // Current move
        this.currentmove = {column1: 0, row1: 0, column2: 0, row2: 0};

        // Game states
        this.gamestates = {init: 0, ready: 1, resolve: 2, over: 3, win: 4};
        this.gamestate = this.gamestates.init;

        //For FPS Calculator
        this.lastframe = 0;
        this.fpstime = 0;
        this.framecount = 0;
        this.fps = 0;


		this.init();

		
		this.mainMenuPopup = new Frame(new Point (30,0) , new Size ( 40,100 ) );
		this.mainMenuPopup.setImageSrc("Done_assets/popup_2.png");
		
		this.mainMenuButton_1 = new Frame( new Point (36,10), new Size (28,15) );
		this.mainMenuButton_1.setImageSrc("Done_assets/Yellow_button_2.png");
		
		
		this.mainMenuButton_1_text = new Text ( new Point (50,17.5) );
		this.mainMenuButton_1_text.setFontSize("48px Arial");
		this.mainMenuButton_1_text.setFillColor("#000000");
		this.mainMenuButton_1_text.setText("Play");
		this.mainMenuButton_1_text.setWidth(1500);
		

		
		this.mainMenuButton_2 = new Frame( new Point (36, 32) , new Size (28,15) );
		this.mainMenuButton_2.setImageSrc("Done_assets/Yellow_button_2.png");
		
		this.mainMenuButton_3 = new Frame ( new Point (36,54), new Size (28,15) );
		this.mainMenuButton_3.setImageSrc("Done_assets/Yellow_button_2.png");
		
		this.mainMenuButton_4 = new Frame ( new Point ( 36, 76), new Size (28,15) ) ;
		this.mainMenuButton_4.setImageSrc("Done_assets/Yellow_button_2.png");
		this.frames = [];
		this.frames.push(this.mainMenuButton_1);
		this.frames.push(this.mainMenuButton_2);
		this.frames.push(this.mainMenuButton_3);
		this.frames.push(this.mainMenuButton_4);
		this.frames.push(this.mainMenuPopup);
		
		this.loop = this.loop.bind(this);
    }

    init() {
        Drawing.canvas.addEventListener("mousemove", this.onMouseMove);
        Drawing.canvas.addEventListener("mousedown", this.onMouseDown);
        Drawing.canvas.addEventListener("mouseup", this.onMouseUp);
        Drawing.canvas.addEventListener("mouseout", this.onMouseOut);

        //TODO: init filed

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
        switch (this.gamestate) {
            case  this.gamestates.ready:
                // Game is ready for player input
                if (this.winObject.progress >= this.winObject.count) {
                    this.gamestate = this.gamestates.win;
                    return;
                }

                if (true /* TODO: !field has Moves */) {
                    //TODO: field create level
                }

                // Check for game over
                if (this.movesLeft <= 0) {
                    this.gamestate = this.gamestates.over;
                    return;
                }
            case this.gamestates.resolve:
                Animation.time += dt;
                //TODO: field update.
                break;

                //TODO Bot Class
                break;
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

    render() {
        Drawing.canvas.width = Drawing.canvas.width;
		//this.chetotamFrame.render();
		this.mainMenuPopup.render();
		this.mainMenuButton_1.render();
		this.mainMenuButton_2.render();
		this.mainMenuButton_3.render();
		this.mainMenuButton_4.render();
		this.mainMenuButton_1_text.drawCenterText();
	
    //TODO: class frame, draw

    //TODO: draw Labels
    //TODO: draw buttons

    //TODO: field render

    //TODO: current popup
    }

    newGame() {
        this.score = 0;

        this.movesLeft = this.maxMoves;

        this.gamestate = this.gamestates.ready;
        // TODO: Class popup, currentPopup = null;

        // TODO: field create level

        this.taskInLevel();

        //TODO: field find moves, cluster
    }

    taskInLevel() {
        this.winObject.progress = 0;
        this.winObject.type = 1; // TODO: filed getRandomTile();
    }

    onMouseDown(e) {

    }

    onMouseMove(e) {

    }

    onMouseUp(e) {

    }

    onMouseOut(e) {

    }
}