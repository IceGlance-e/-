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

        this.field = new Field(new Point(33,23), new Size(67, 77));
        this.field.setGameLayer(this);

        this.progress = 0; // objective progress
        this.score = 0;
        this.spentMoves = 0;

        // ui

        let topFrame = new Frame(new Point(0, 0), new Size(100, 15));
        topFrame.setImageSrc("Done_assets/Rectangle_popup.png");

        let leftFrame = new Frame(new Point(0, 0), new Size(25, 100 + 5));
        leftFrame.setImageSrc("Done_assets/Rectangle_popup.png");

        let objectiveFrame = new Frame(new Point(47.5, 0), new Size(30, 15));
        objectiveFrame.setImageSrc("Done_assets/Scroll_popup.png");

        this.objectiveIcon = new Frame(new Point(49.5, 2), new Size(10, 10));

        let xText = new Text(new Point(62.5, 7));
        xText.setFontSize("40px Arial");
        xText.setFillColor("black");
        xText.setText("x");
        xText.setWidth(200);
        xText.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.progressText = new Text(new Point(70.5, 8));
        this.progressText.setFontSize("80px Verdana");
        this.progressText.setFillColor("black");
        this.progressText.setWidth(200);
        this.progressText.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        let levelText = new Text(new Point(12.5, 6));
        levelText.setFontSize("32px Verdana");
        levelText.setFillColor("White");
        levelText.setText("Level");
        levelText.setWidth(200);
        levelText.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.levelNumberText = new Text(new Point(12.5, 12));
        this.levelNumberText.setFontSize("32px Verdana");
        this.levelNumberText.setFillColor("White");
        this.levelNumberText.setText("№");
        this.levelNumberText.setWidth(200);
        this.levelNumberText.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        let leftCircle = new Frame(new Point(25, 0), new Size(12, 15));
        leftCircle.setImageSrc("Done_assets/Circle_button.png");

        let fpsText = new Text(new Point(31, 6));
        fpsText.setFontSize("22px Verdana");
        fpsText.setFillColor("white");
        fpsText.setWidth(200);
        fpsText.setText("FPS:");
        fpsText.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.fpsNumber = new Text(new Point(31, 10));
        this.fpsNumber.setFontSize("22px Verdana");
        this.fpsNumber.setFillColor("white");
        this.fpsNumber.setWidth(200);
        this.fpsNumber.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        let rightCircle = new Frame(new Point(88, 0), new Size(12, 15));
        rightCircle.setImageSrc("Done_assets/Circle_button.png");

        let movesText = new Text(new Point(94, 6));
        movesText.setFontSize("18px Verdana");
        movesText.setFillColor("white");
        movesText.setWidth(200);
        movesText.setText("Moves:");
        movesText.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.movesNumber = new Text(new Point(94, 10));
        this.movesNumber.setFontSize("22px Verdana");
        this.movesNumber.setFillColor("white");
        this.movesNumber.setWidth(200);
        this.movesNumber.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        let scoreText = new Text(new Point(14, 23));
        scoreText.setFontSize("26px Verdana");
        scoreText.setFillColor("white");
        scoreText.setWidth(200);
        scoreText.setText("Score: ");
        scoreText.setHorizontalAlignment(Text.HorizontalAlignmentType.Left);

        this.scoreNumber = new Text(new Point(14, 23));
        this.scoreNumber.setFontSize("26px Verdana");
        this.scoreNumber.setFillColor("white");
        this.scoreNumber.setWidth(200);
        this.scoreNumber.setHorizontalAlignment(Text.HorizontalAlignmentType.Right);

        this.restartButton = new Frame(new Point(0, 30), new Size(25, 12));
        this.restartButton.setImageSrc("Done_assets/Green_button_2.png");

        let restartButtonText = new Text(new Point(12.5, 36));
        restartButtonText.setFontSize("36px Verdana");
        restartButtonText.setFillColor("white");
        restartButtonText.setWidth(200);
        restartButtonText.setText("Restart");
        restartButtonText.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.exitButton = new Frame(new Point(0, 88), new Size(25, 12));
        this.exitButton.setImageSrc("Done_assets/Red_button_2.png");

        let exitButtonText = new Text(new Point(12.5, 94));
        exitButtonText.setFontSize("36px Verdana");
        exitButtonText.setFillColor("white");
        exitButtonText.setWidth(200);
        exitButtonText.setText("Exit");
        exitButtonText.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.showMovesButton = new Frame(new Point(0, 50), new Size(18, 12));
        this.showMovesButton.setImageSrc("Done_assets/Phiolet_button_1.png");

        let showMovesCircle = new Frame(new Point(18, 51), new Size(7, 11));
        showMovesCircle.setImageSrc("Done_assets/Circle_button.png");

        let showMovesText = new Text(new Point(9, 56));
        showMovesText.setFontSize("18px Verdana");
        showMovesText.setFillColor("white");
        showMovesText.setWidth(200);
        showMovesText.setText("Show moves");
        showMovesText.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.showMovesNumber = new Text(new Point(21.5, 56.5));
        this.showMovesNumber.setFontSize("25px Verdana");
        this.showMovesNumber.setFillColor("white");
        this.showMovesNumber.setWidth(200);
        this.showMovesNumber.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.aiBotButton = new Frame(new Point(0, 65), new Size(18, 12));
        this.aiBotButton.setImageSrc("Done_assets/Phiolet_button_1.png");

        let aiBotCircle = new Frame(new Point(18, 66), new Size(7, 11));
        aiBotCircle.setImageSrc("Done_assets/Circle_button.png");

        let aiBotText = new Text(new Point(9, 71));
        aiBotText.setFontSize("18px Verdana");
        aiBotText.setFillColor("white");
        aiBotText.setWidth(200);
        aiBotText.setText("Show moves");
        aiBotText.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.aiBotNumber = new Text(new Point(21.5, 71.5));
        this.aiBotNumber.setFontSize("25px Verdana");
        this.aiBotNumber.setFillColor("white");
        this.aiBotNumber.setWidth(200);
        this.aiBotNumber.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.addRenderable(leftFrame);
        this.addRenderable(topFrame);

        this.addRenderable(objectiveFrame);
        this.addRenderable(this.objectiveIcon);
        this.addRenderable(xText);
        this.addRenderable(this.progressText);

        this.addRenderable(leftCircle);
        this.addRenderable(rightCircle);

        this.addRenderable(levelText);
        this.addRenderable(this.levelNumberText);

        this.addRenderable(fpsText);
        this.addRenderable(this.fpsNumber);

        this.addRenderable(movesText);
        this.addRenderable(this.movesNumber);

        this.addRenderable(scoreText);
        this.addRenderable(this.scoreNumber);

        this.addRenderable(this.restartButton);
        this.addRenderable(restartButtonText);

        this.addRenderable(this.exitButton);
        this.addRenderable(exitButtonText);

        this.addRenderable(this.showMovesButton);
        this.addRenderable(showMovesCircle);
        this.addRenderable(showMovesText);
        this.addRenderable(this.showMovesNumber);

        this.addRenderable(this.aiBotButton);
        this.addRenderable(aiBotCircle);
        this.addRenderable(aiBotText);
        this.addRenderable(this.aiBotNumber);

        this.addRenderable(this.field);
    }

    restart() {
        this.score = 0;
        this.spentMoves = 0;
        this.progress = 0;

        this.field.init();
    }

    exit() {
        this.restart();

        let game = Game.getInstance();
        game.removeLayer(LayerType.Game);

        let mainMenuLayer = new LayerMainMenu();
        game.addLayer(mainMenuLayer);
    }

    addScore(score) {
        this.score += score;
    }

    getScore() {
        return this.score;
    }

    addProgress(progress) {
        this.progress += progress;

        if (this.field.getLevel().countWinObject < this.progress) {
            this.progress = this.field.getLevel().countWinObject;
        }
    }

    spendMove() {
        this.spentMoves++;
    }

    render() {

        let levelNumber = this.field.getLevelNumber();
        this.levelNumberText.setText("№" + levelNumber);

        let levelInfo = this.field.level;
        let objectiveType = levelInfo.typeWinObject;
        this.objectiveIcon.setImageSrc(Tile.tilesImages[objectiveType]);

        let objectivesToCollect = levelInfo.countWinObject - this.progress;
        this.progressText.setText(objectivesToCollect);

        let game = Game.getInstance();

        this.fpsNumber.setText(game.getFps());

        this.movesNumber.setText(levelInfo.moves - this.spentMoves);

        this.scoreNumber.setText(this.score);

        this.showMovesNumber.setText(game.getUserInfo().showMovesBoosterCount);

        this.aiBotNumber.setText(game.getUserInfo().aiBotUseCount);

        super.render();
    }

    update(dt) {
        super.update(dt);

        if (this.field.getGameState() === Field.gameStates.ready) {

            if (this.progress >= this.field.getLevel().countWinObject) {
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

        if (this.restartButton.isPointInside(mousePos)) {
            this.restart();
            return;
        }

        if (this.exitButton.isPointInside(mousePos)) {
            this.exit();
            return;
        }

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