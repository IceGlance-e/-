function include(url) {
    if (document.getElementById(url)) {
        return;
    }

    let script = document.createElement('script');
    script.src = url;
    script.id = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include("Js_Files/Level.js");
include("Js_Files/Game.js");
include("Js_Files/Frame.js");


class Tile {

    static tilesTypes = {

        Yellow: 0,
        Green: 1,
        Blue: 2,
        Purple: 3,
        Orange: 4,
        Red: 5,
        Empty: 999
    };

    static tilesImages = {

        [this.tilesTypes.Yellow]: "Done_assets/yellow.png",
        [this.tilesTypes.Green]: "Done_assets/green.png",
        [this.tilesTypes.Blue]: "Done_assets/blue.png",
        [this.tilesTypes.Purple]: "Done_assets/purple.png",
        [this.tilesTypes.Orange]: "Done_assets/orange.png",
        [this.tilesTypes.Red]: "Done_assets/red.png"
    };

    constructor(leftPoint, sizeTile) {

        this.point = leftPoint;
        this.size = sizeTile;
        this.typeTile = 0;
		this.scale = 0;
		this.shift = 0;

		this.renderPriority = 0;
		this.selected = false;
		this.animationOffset = {x: 0, y: 0}; // 0 or 1 both
    }

    setTypeTile(type) {
        this.typeTile = type;
    }

    setScale(scale) {
    	this.scale = scale;
	}

	setShift(shift) {
    	this.shift = shift;
	}

	setRenderPriority(priority) {
    	this.renderPriority = priority;
	}

	setSelected(isSelected) {
    	this.selected = isSelected;
	}

	setAnimationOffset(offset) {
    	this.animationOffset = offset;
	}

    render() {

    	if (this.typeTile === Tile.tilesTypes.Empty) {
    		return;
		}

    	let animationPercent = Animation.time / Animation.total;

    	let offset = {
    		x: this.size.width * animationPercent * this.animationOffset.x,
			y: this.size.height * animationPercent * this.animationOffset.y
		};

        let image = new Image();
        image.src = Tile.tilesImages[this.typeTile];

		if (this.selected) {
			Drawing.context.fillStyle = "rgba(255,0,8,0.5)";
			Drawing.context.fillRect(this.point.x, this.point.y, this.size.width, this.size.height);
		}

		let scaleDifference = this.scale - Field.normalScale;
		let currentScale = Field.normalScale + (scaleDifference * animationPercent);

		let scaledSize = {
			width: this.size.width * currentScale,
			height: this.size.height * currentScale
		};

		let scaledOffset = {
			x: (this.size.width - scaledSize.width) / 2,
			y: (this.size.height - scaledSize.height) / 2
		};

        Drawing.context.drawImage(
        	image,
			this.point.x + offset.x + scaledOffset.x,
			this.point.y + offset.y + scaledOffset.y,
			scaledSize.width,
			scaledSize.height
		);
    }


}