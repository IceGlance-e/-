function include(url) {
    if (document.getElementById(url)) {
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

class SelectLevel {
    constructor(leftPoint) {

        this.starsCount = 0;
        this.isPassed = false;
        this.isLocked = true;
        this.levelNumber = 0;

        // ui

        this.levelButton_1 = new Frame(leftPoint, new Size(10, 15));
        this.levelButton_1.setImageSrc("Done_assets/Circle_Button.png");

        this.level_1text = new Text(new Point(leftPoint.xP + 4.9, leftPoint.yP + 7.5));
        this.level_1text.setFontSize("42px Arial");
        this.level_1text.setFillColor("white");
        this.level_1text.setWidth(300);
        this.level_1text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.red_Tape = new Frame(new Point(leftPoint.xP - 1, leftPoint.yP - 1), new Size(12, 5));
        this.red_Tape.setImageSrc("Done_assets/Red_Tape.png");

        let starOne = new Frame(new Point(leftPoint.xP + 1, leftPoint.yP - 1), new Size(3, 4));
        starOne.setImageSrc("Done_assets/Gold_star.png");

        let starTwo = new Frame(new Point(leftPoint.xP + 4, leftPoint.yP - 2), new Size(3, 4));
        starTwo.setImageSrc("Done_assets/Gold_star.png");

        let starThree = new Frame(new Point(leftPoint.xP + 7, leftPoint.yP - 1), new Size(3, 4));
        starThree.setImageSrc("Done_assets/Gold_star.png");

        let lockedLevel = new Frame(new Point(leftPoint.xP, leftPoint.yP), new Size(10, 15));
        lockedLevel.setImageSrc("Done_assets/LockedLevelButton.png");

        let lock = new Frame(new Point(leftPoint.xP + 2.65, leftPoint.yP + 4.2), new Size(5, 7));
        lock.setImageSrc("Done_assets/Lock.png");

        this.stars = [starOne, starTwo, starThree];
        this.opened = [this.levelButton_1, this.level_1text];
        this.locked = [lockedLevel, lock];
    }

    render() {

        let renderParts = [];

        if (this.isLocked) {
            renderParts = renderParts.concat(this.locked);
        } else {

            renderParts = renderParts.concat(this.opened);
            this.level_1text.setText(this.levelNumber);

            if (this.isPassed) {
                renderParts.push(this.red_Tape);

                for (let i = 0; i < this.starsCount; i++) {
                    renderParts.push(this.stars[i]);
                }
            }
        }

        for (let renderable of renderParts) {
            renderable.render();
        }
    }

    isPointInside(mousePos) {
    	if (this.isLocked) {
    		return false;
		}

    	return this.levelButton_1.isPointInside(mousePos);
	}

	onClick() {
    	let game = Game.getInstance();
    	let gameLayer = new LayerGame();

    	game.removeLayer(LayerType.SelectLevel);

    	gameLayer.loadLevelByNumber(this.levelNumber);
    	game.addLayer(gameLayer);
	}

}

class LayerSelectLevel extends Layer {
    constructor() {
        super();

        this.setLayerType(LayerType.SelectLevel);

        let selectLevelMainPopup = new Frame(new Point(0, 0), new Size(100, 100));
        selectLevelMainPopup.setImageSrc("Done_assets/popup_1.png");

        let selectLevel_text = new Text(new Point(50, 10))
        selectLevel_text.setFontSize("64px Arial");
        selectLevel_text.setFillColor("white");
        selectLevel_text.setText("Select level");
        selectLevel_text.setWidth(300);
        selectLevel_text.setHorizontalAlignment(Text.HorizontalAlignmentType.Center);

        this.addRenderable(selectLevelMainPopup);
        this.addRenderable(selectLevel_text);

        this.levels = [];

        let levelProgress = Game.getInstance().getUserInfo().levelProgress;

        let startPoint = new Point(10, 20);
        let levelsInRow = 7;
        let rowNumber = 0;
        let columnNumber = 0;

        let rowOffset = 20;
        let columnOffset = 14;

        let isOpenedLevelFound = false;

        for (let i = 0; i < levelProgress.length; i++) {
            let levelRenderable = new SelectLevel(
                new Point(startPoint.xP + columnNumber * columnOffset,
                    startPoint.yP + rowNumber * rowOffset)
            );

            levelRenderable.levelNumber = levelProgress[i].levelNumber;
            levelRenderable.starsCount = levelProgress[i].starsCount;
            levelRenderable.isPassed = levelProgress[i].isPassed;
			levelRenderable.isLocked = false;

            if (!levelRenderable.isPassed) {
                if (!isOpenedLevelFound) {
                    isOpenedLevelFound = true;
                } else {
                    levelRenderable.isLocked = true;
                }
            }

            this.addRenderable(levelRenderable);
            this.levels.push(levelRenderable);

            columnNumber++;

            if (columnNumber + 1 >= levelsInRow) {
                rowNumber++;
                columnNumber = 0;
            }
        }
    }

    onMouseUp(mousePos) {
		super.onMouseUp(mousePos);

		for (let level of this.levels) {
			if (level.isPointInside(mousePos)) {
				level.onClick();
				return;
			}
		}
	}

}