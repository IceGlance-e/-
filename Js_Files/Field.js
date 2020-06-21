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
include("Js_Files/Tile.js");
include("Js_Files/Point.js");
include("Js_Files/Size.js");


class Field {

    static gameStates = {
        init: 0,
        ready: 1,
        resolve: 2,
        over: 3,
        win: 4
    };

    static animationStates = {
        resolveClusters: 0,
        tokensFall: 1,
        swapSelectedTiles: 2,
        reverseSwapSelectedTiles: 3
    };

    static normalScale = 0.8;
    static maxScale = 0.2;

    static levels = [];

    constructor(leftPoint, size) {
        this.point = leftPoint;
        this.size = size;

        this.level = null;

        this.tiles = [];
        this.tileSize = null;

        this.gameLayer = null;
        // m3 fields

        this.drag = false;
        this.selectedTile = {
            selected: false,
            column: 0,
            row: 0
        };
        this.currentMove = {
            columnFrom: 0,
            rowFrom: 0,
            columnTo: 0,
            rowTo: 0
        };

        this.gameState = Field.gameStates.init;
        this.animationState = Field.animationStates.resolveClusters;

        this.clusters = [];
        this.moves = [];

        this.currentLevelIndex = 0;

        this.init();
    }

    static generateLevels() {
        let level001 = new Level();
        level001.setColumns(8);
        level001.setRows(8);
        level001.setMoves(30);
        level001.setTypeWinObject(Tile.tilesTypes.Yellow);
        level001.setCountWinObject(6);
        level001.setScoreToReachStart(2000);

        this.levels.push(level001);

        let level002 = new Level();
        level002.setColumns(5);
        level002.setRows(6);
        level002.setMoves(60);
        level002.setTypeWinObject(Tile.tilesTypes.Red);
        level002.setCountWinObject(60);
        level002.setScoreToReachStart(10000);

        this.levels.push(level002);

        let game = Game.getInstance();
        let levelProgress = game.getUserInfo().levelProgress;

        for (let i = 0; i < this.levels.length; i++) {
            let levelNumber = i + 1;

            if (!levelProgress.find(level => level.levelNumber === levelNumber)) {
                let m3levelInfo = new Match3Level();
                m3levelInfo.levelNumber = levelNumber;

                levelProgress.push(m3levelInfo);
            }
        }

        Game.getInstance().saveGame();
    }

    getGameState() {
        return this.gameState;
    }

    getLevel() {
        return this.level;
    }

    setGameLayer(gameLayer) {
        this.gameLayer = gameLayer;
    }

    init() {

        this.gameState = Field.gameStates.init;

        this.level = Field.levels[this.currentLevelIndex];

        let tileWidth = this.size.widthP / this.level.columns;
        let tileHeight = this.size.heightP / this.level.rows;
        this.tileSize = new Size(tileWidth, tileHeight);

        this.createLevel();

        this.gameState = Field.gameStates.ready;

        this.findMoves();
        this.findClusters();
    }

    setCurrentLevel(levelNumber) {
        if (levelNumber - 1 >= 0 && levelNumber <= this.levels.length) {
            this.currentLevelIndex = levelNumber - 1;
            this.init();
        }
    }

    getLevelNumber() {
        return this.currentLevelIndex + 1;
    }

    hasNextLevel() {
        return this.currentLevelIndex < Field.levels.length - 1;
    }

    loadNextLevel() {
        this.currentLevelIndex++;
        this.init();
    }

    loadLastLevel() {

        let levelProgress = Game.getInstance().getUserInfo().levelProgress;

        for (let i = 0; i < levelProgress.length; i++) {
            if (!levelProgress[i].isPassed) {
                this.currentLevelIndex = i;
                this.init();
                return;
            }
        }

        this.currentLevelIndex = Field.levels.length - 1;
    }

    consolePrintLevel() {
        for (let i = 0; i < this.level.rows; i++) {
            let row = "";
            for (let j = 0; j < this.level.columns; j++) {
                row += this.tiles[i][j].typeTile;
            }
            console.log(row);
        }
    }

    createLevel() {
        let done = false;

        // Keep generating levels until it is correct
        while (!done) {

            this.tiles = [];
            // Create a level with random tiles
            for (let i = 0; i < this.level.rows; i++) {
                this.tiles[i] = [];
                for (let j = 0; j < this.level.columns; j++) {

                    this.tiles[i][j] = new Tile(new Point(
                        this.point.xP + j * this.tileSize.widthP,
                        this.point.yP + i * this.tileSize.heightP),
                        this.tileSize);

                    this.tiles[i][j].setTypeTile(this.getRandomTileType());
                }
            }

            // Resolve the clusters
            this.resolveClusters();

            // Debug console printing
            //this.consolePrintLevel();

            // Check if there are valid moves
            this.findMoves();

            // Done when there is a valid move
            if (this.moves.length > 0) {
                done = true;
            }
        }
    }

    getRandomTileType() {
        let tokenTypesArray = [];

        for (let type in Tile.tilesTypes) {
            if (Tile.tilesTypes[type] !== Tile.tilesTypes.Empty) {
                tokenTypesArray.push(Tile.tilesTypes[type]);
            }
        }

        let tileTypeIndex = Math.floor(Math.random() * tokenTypesArray.length);
        return tokenTypesArray[tileTypeIndex];
    }

    render() {

        let renderTiles = [];

        for (let i = 0; i < this.level.rows; i++) {
            for (let j = 0; j < this.level.columns; j++) {

                let tile = this.tiles[i][j];

                renderTiles.push(tile);
                tile.setRenderPriority(0);
                tile.setSelected(false);
                tile.setAnimationOffset({x: 0, y: tile.shift});
            }
        }

        if (this.selectedTile.selected) {
            let tile = this.tiles[this.selectedTile.row][this.selectedTile.column];
            tile.setSelected(true);
        }

        if (this.gameState === Field.gameStates.resolve &&
            (this.animationState === Field.animationStates.swapSelectedTiles ||
                this.animationState === Field.animationStates.reverseSwapSelectedTiles)) {
            let columnShift = this.currentMove.columnTo - this.currentMove.columnFrom;
            let rowShift = this.currentMove.rowTo - this.currentMove.rowFrom;

            let fromTile = this.tiles[this.currentMove.rowFrom][this.currentMove.columnFrom];
            let toTile = this.tiles[this.currentMove.rowTo][this.currentMove.columnTo];

            fromTile.setAnimationOffset({x: columnShift, y: rowShift});
            toTile.setAnimationOffset({x: -columnShift, y: -rowShift});

            fromTile.setRenderPriority(2);
            toTile.setRenderPriority(1);
        }

        renderTiles.sort(
            (tile1, tile2) => tile2.renderPriority - tile1.renderPriority
        );

        for (let i = 0; i < this.level.rows; i++) {
            for (let j = 0; j < this.level.columns; j++) {

                let tile = this.tiles[i][j];

                Drawing.context.beginPath();
                Drawing.context.strokeStyle = "white";
                Drawing.context.lineWidth = 2;
                Drawing.context.strokeRect(tile.point.x, tile.point.y, tile.size.width, tile.size.height);
            }
        }

        for (let tile of renderTiles) {
            tile.render();
        }
    }

    update(dt) {
        switch (this.gameState) {
            case Field.gameStates.ready:
                // this processed in LayerGame
                break;
            case Field.gameStates.resolve:
                Animation.time += dt;

                if (Animation.time >= Animation.total) {
                    switch (this.animationState) {
                        case Field.animationStates.resolveClusters:

                            this.findClusters();

                            if (this.clusters.length > 0) {

                                for (let i = 0; i < this.clusters.length; i++) {
                                    this.gameLayer.addScore(100 * this.clusters[i].length);
                                }

                                this.removeClusters();

                                this.animationState = Field.animationStates.tokensFall;
                            } else {
                                this.gameState = Field.gameStates.ready;
                            }

                            Animation.time = 0;

                            break;
                        case Field.animationStates.tokensFall:

                            this.shiftTiles();

                            this.animationState = Field.animationStates.resolveClusters;
                            Animation.time = 0;

                            this.findClusters();

                            if (this.clusters.length <= 0) {
                                this.gameState = Field.gameStates.ready;
                            }

                            break;
                        case Field.animationStates.swapSelectedTiles: {
                            let fromTile = this.tiles[this.currentMove.rowFrom][this.currentMove.columnFrom];
                            let toTile = this.tiles[this.currentMove.rowTo][this.currentMove.columnTo];

                            this.swapTypes(fromTile, toTile);

                            this.findClusters();

                            if (this.clusters.length > 0) {
                                // valid swap
                                this.animationState = Field.animationStates.resolveClusters;
                                this.gameState = Field.gameStates.resolve;

                                this.gameLayer.spendMove();
                            } else {
                                this.animationState = Field.animationStates.reverseSwapSelectedTiles;
                            }

                            Animation.time = 0;

                            break;
                        }
                        case Field.animationStates.reverseSwapSelectedTiles: {

                            let fromTile = this.tiles[this.currentMove.rowFrom][this.currentMove.columnFrom];
                            let toTile = this.tiles[this.currentMove.rowTo][this.currentMove.columnTo];

                            this.swapTypes(fromTile, toTile);
                            this.gameState = Field.gameStates.ready;

                            break;
                        }
                    }

                    this.findMoves();
                    this.findClusters();
                }

                break;
        }
    }

    findClusters() {
        // Reset clusters
        this.clusters = [];

        // Find horizontal clusters
        for (let j = 0; j < this.level.rows; j++) {
            // Start with a single tile, cluster of 1
            let matchLength = 1;
            for (let i = 0; i < this.level.columns; i++) {
                let checkCluster = false;

                if (i === this.level.columns - 1) {
                    // Last tile
                    checkCluster = true;
                } else {
                    // Check the type of the next tile
                    if (this.tiles[j][i].typeTile === this.tiles[j][i + 1].typeTile &&
                        this.tiles[j][i].typeTile !== Tile.tilesTypes.Empty) {
                        // Same type as the previous tile, increase matchLength
                        matchLength += 1;
                    } else {
                        // Different type
                        checkCluster = true;
                    }
                }

                // Check if there was a cluster
                if (checkCluster) {
                    if (matchLength >= 3) {
                        // Found a horizontal cluster
                        this.clusters.push({
                            column: i + 1 - matchLength, row: j,
                            length: matchLength, horizontal: true
                        });
                    }
                    matchLength = 1;
                }
            }
        }

        // Find vertical clusters
        for (let i = 0; i < this.level.columns; i++) {
            // Start with a single tile, cluster of 1
            let matchLength = 1;
            for (let j = 0; j < this.level.rows; j++) {
                let checkCluster = false;

                if (j === this.level.rows - 1) {
                    // Last tile
                    checkCluster = true;
                } else {
                    // Check the type of the next tile
                    if (this.tiles[j][i].typeTile === this.tiles[j + 1][i].typeTile &&
                        this.tiles[j][i].typeTile !== Tile.tilesTypes.Empty) {
                        // Same type as the previous tile, increase matchLength
                        matchLength += 1;
                    } else {
                        // Different type
                        checkCluster = true;
                    }
                }

                // Check if there was a cluster
                if (checkCluster) {
                    if (matchLength >= 3) {
                        // Found a vertical cluster
                        this.clusters.push({
                            column: i, row: j + 1 - matchLength,
                            length: matchLength, horizontal: false
                        });
                    }

                    matchLength = 1;
                }
            }
        }

        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[y].length; x++) {
                this.tiles[y][x].setScale(Field.normalScale);
            }
        }

        for (let i = 0; i < this.clusters.length; i++) {
            let cluster = this.clusters[i];

            let currentPoint = {
                x: cluster.column,
                y: cluster.row
            };

            let stepOffset = {
                x: 0,
                y: 1
            };

            if (cluster.horizontal) {
                stepOffset.x = 1;
                stepOffset.y = 0;
            }

            for (let step = 0; step < cluster.length; step++) {
                this.tiles[currentPoint.y][currentPoint.x].setScale(Field.maxScale);

                currentPoint.x += stepOffset.x;
                currentPoint.y += stepOffset.y;
            }
        }
    }

    findMoves() {
        // Reset moves
        this.moves = [];

        // Check horizontal swaps
        for (let j = 0; j < this.level.rows; j++) {
            for (let i = 0; i < this.level.columns - 1; i++) {

                let firstTile = this.tiles[j][i];
                let secondTile = this.tiles[j][i + 1];
                // Swap, find clusters and swap back
                this.swapTypes(firstTile, secondTile);
                this.findClusters();
                this.swapTypes(firstTile, secondTile);

                // Check if the swap made a cluster
                if (this.clusters.length > 0) {
                    let length = 0;
                    for (let k = 0; k < this.clusters.length; k++) {
                        length += this.clusters[k].length;
                    }
                    this.moves.push({columnFrom: i, rowFrom: j, columnTo: i + 1, rowTo: j, length: length});
                }
            }
        }

        // Check vertical swaps
        for (let i = 0; i < this.level.columns; i++) {
            for (let j = 0; j < this.level.rows - 1; j++) {

                let firstTile = this.tiles[j][i];
                let secondTile = this.tiles[j + 1][i];
                // Swap, find clusters and swap back
                this.swapTypes(firstTile, secondTile);
                this.findClusters();
                this.swapTypes(firstTile, secondTile);

                // Check if the swap made a cluster
                if (this.clusters.length > 0) {
                    let length = 0;
                    for (let k = 0; k < this.clusters.length; k++) {
                        length += this.clusters[k].length;
                    }
                    this.moves.push({columnFrom: i, rowFrom: j, columnTo: i, rowTo: j + 1, length: length});
                }
            }
        }

        // Reset clusters
        this.clusters = []
    }

    resolveClusters() {
        // Check for clusters
        this.findClusters();

        // While there are clusters left
        while (this.clusters.length > 0) {

            // Remove clusters
            this.removeClusters();

            // Shift tiles
            this.shiftTiles();

            // Check if there are clusters left
            this.findClusters();
        }
    }

    removeClusters() {

        for (let i = 0; i < this.clusters.length; i++) {
            let cluster = this.clusters[i];

            let columnOffset = 0;
            let rowOffset = 0;

            for (let j = 0; j < cluster.length; j++) {

                let tile = this.tiles[cluster.row + rowOffset][cluster.column + columnOffset];

                this.onTileDestroyed(tile.typeTile);

                tile.typeTile = Tile.tilesTypes.Empty;

                if (cluster.horizontal) {
                    columnOffset++;
                } else {
                    rowOffset++;
                }
            }
        }

        // Calculate how much a tile should be shifted downwards
        for (let i = 0; i < this.level.columns; i++) {
            let shift = 0;
            for (let j = this.level.rows - 1; j >= 0; j--) {
                // Loop from bottom to top
                if (this.tiles[j][i].typeTile === Tile.tilesTypes.Empty) {
                    // Tile is removed, increase shift
                    shift++;
                    this.tiles[j][i].setShift(0);
                } else {
                    // Set the shift
                    this.tiles[j][i].setShift(shift);
                }
            }
        }

    }

    shiftTiles() {
        // Shift tiles
        for (let i = 0; i < this.level.columns; i++) {
            for (let j = this.level.rows - 1; j >= 0; j--) {
                // Loop from bottom to top

                let tile = this.tiles[j][i];

                if (tile.typeTile === Tile.tilesTypes.Empty) {
                    // Insert new random tile
                    tile.setTypeTile(this.getRandomTileType());
                } else {
                    // Swap tile to shift it
                    let shift = tile.shift;
                    if (shift > 0) {

                        let shiftTile = this.tiles[j + shift][i];

                        this.swapTypes(tile, shiftTile);
                    }
                }

                // Reset shift
                this.tiles[j][i].setShift(0);
            }
        }
    }

    swapTypes(tile1, tile2) {
        let tile2Type = tile2.typeTile;
        tile2.setTypeTile(tile1.typeTile);
        tile1.setTypeTile(tile2Type);
    }

    onTileDestroyed(tileType) {
        if (this.gameState !== Field.gameStates.resolve) {
            return;
        }

        if (tileType === this.level.typeWinObject) {
            if (this.gameLayer) {
                this.gameLayer.addProgress(1);
            }
        }
    }

    getTileUnderMouse(mousePos) {
        // Calculate the index of the tile
        let tx = Math.floor((mousePos.x - this.point.x) / this.tileSize.width);
        let ty = Math.floor((mousePos.y - this.point.y) / this.tileSize.height);

        // Check if the tile is valid
        if (tx >= 0 && tx < this.level.columns && ty >= 0 && ty < this.level.rows) {
            // Tile is valid
            return {
                valid: true,
                x: tx,
                y: ty
            };
        }

        // No valid tile
        return {
            valid: false,
            x: 0,
            y: 0
        };
    }

    onWin() {
        this.gameState = Field.gameStates.win;

        let game = Game.getInstance();

        let levelNumber = this.getLevelNumber();
        let userInfo = game.getUserInfo();
        let match3LevelInfo = userInfo.levelProgress.find(level => level.levelNumber === levelNumber);
        match3LevelInfo.isPassed = true;

        let starCount = Math.floor(this.gameLayer.getScore() / this.level.scoreToReachStar);
        if (starCount > 3) {
            starCount = 3;
        }

        if (match3LevelInfo.starsCount < starCount) {
            match3LevelInfo.starsCount = starCount;
        }

        userInfo.coins += Math.floor(game.getLayer(LayerType.Game).getScore() / 10);

        game.saveGame();

        let winLayer = new LayerWinPopup();
        game.addLayer(winLayer);
    }

    onLoose() {
        this.gameState = Field.gameStates.over;

        let game = Game.getInstance();
        let userInfo = game.getUserInfo();
        userInfo.coins += Math.floor(game.getLayer(LayerType.Game).getScore() / 100);
    }

    canSwapTiles(x1, y1, x2, y2) {
        return (Math.abs(x1 - x2) === 1 && y1 === y2) || (Math.abs(y1 - y2) === 1 && x1 === x2);
    }

    swapTiles(x1, y1, x2, y2) {

        this.currentMove.columnFrom = x1;
        this.currentMove.rowFrom = y1;

        this.currentMove.columnTo = x2;
        this.currentMove.rowTo = y2;

        this.selectedTile.selected = false;

        this.animationState = Field.animationStates.swapSelectedTiles;
        Animation.time = 0;

        this.gameState = Field.gameStates.resolve;
    }

    onMouseMove(mousePos) {
        if (this.drag && this.selectedTile.selected) {
            let mouseTile = this.getTileUnderMouse(mousePos);

            if (mouseTile.valid) {
                if (this.canSwapTiles(mouseTile.x, mouseTile.y,
                    this.selectedTile.column, this.selectedTile.row)) {
                    this.swapTiles(mouseTile.x, mouseTile.y,
                        this.selectedTile.column, this.selectedTile.row);
                }
            }
        }
    }

    onMouseDown(mousePos) {
        if (!this.drag) {

            let mouseTile = this.getTileUnderMouse(mousePos);

            if (mouseTile.valid && this.gameState === Field.gameStates.ready) {
                // Valid tile
                let swapped = false;
                if (this.selectedTile.selected) {
                    if (mouseTile.x === this.selectedTile.column && mouseTile.y === this.selectedTile.row) {
                        // Same tile selected, deselect
                        this.selectedTile.selected = false;
                        this.drag = true;

                        return;
                    } else if (this.canSwapTiles(mouseTile.x, mouseTile.y, this.selectedTile.column, this.selectedTile.row)) {
                        // Tiles can be swapped, swap the tiles
                        this.swapTiles(mouseTile.x, mouseTile.y, this.selectedTile.column, this.selectedTile.row);
                        swapped = true;
                    }
                }

                if (!swapped) {
                    // Set the new selected tile
                    this.selectedTile.column = mouseTile.x;
                    this.selectedTile.row = mouseTile.y;
                    this.selectedTile.selected = true;
                }
            } else {
                // Invalid tile
                this.selectedTile.selected = false;
            }

            // Start dragging
            this.drag = true;
        }
    }

    onMouseUp(mousePos) {
        this.drag = false;
    }

    onMouseOut(mousePos) {
        this.drag = false;
    }

}