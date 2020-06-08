// The function gets called when the window is fully loaded
window.onload = function () {
    // Get the canvas and context
    let canvas = document.getElementById("viewport");
    let context = canvas.getContext("2d");

    // Timing and frames per second



    // Mouse dragging
    let drag = false;

    // Level object
    let level = {
        x: 250,         // X position
        y: 113,         // Y position
        columns: 9,     // Number of tile columns
        rows: 7,        // Number of tile rows
        tilewidth: 60,  // Visual width of a tile
        tileheight: 60, // Visual height of a tile
        tiles: [],      // The two-dimensional tile array
        selectedtile: {selected: false, column: 0, row: 0}
    };
    let normalScale = 0.85;
    let maxScale = 0;
    let types = {empty: -1};
    let zeroTile = {type: 0, shift: 0, scale:   normalScale};


    let imageTokens = [
        "Done_assets/blue.png",
        "Done_assets/red.png",
        "Done_assets/orange.png",
        "Done_assets/yellow.png",
        "Done_assets/baklazhan.png",
        "Done_assets/green.png"
    ];

    // Clusters and moves that were found
    let clusters = [];  // { column, row, length, horizontal }
    let moves = [];     // { column1, row1, column2, row2 }




    // Score
    let score = 0;

    // Animation variables
    let animationstate = 0;
    let animationtime = 0;
    let animationtimetotal = 0.27;

    // Show available moves
    let showmoves = false;

    // The AI bot
    let aibot = false;


    // Gui buttons
    let buttons = [{
        x: 30, y: 240, width: 150, height: 50, text: "New Game", onclick: function () {
            newGame();
        }
    },
        {
            x: 30, y: 300, width: 150, height: 50, text: "Show Moves", onclick: function () {
                showmoves = !showmoves;
                buttons.text = (showmoves ? "Hide" : "Show") + " Moves";
            }
        },
        {
            x: 30, y: 360, width: 150, height: 50, text: "Enable AI Bot", onclick: function (button) {
                aibot = !aibot;
                button.text = (aibot ? "Disable" : "Enable") + " AI Bot";
            }
        }];
    let currentPopup = null;
    let popups = {
        loose: {
            renderFunction : drawLoosePopup,
            inputFunction : processLoosePopup
        }
    };

    // Initialize the game
    function init() {
        // Add mouse events


        // Initialize the two-dimensional tile array
        for (let i = 0; i < level.columns; i++) {
            level.tiles[i] = [];
            for (let j = 0; j < level.rows; j++) {
                // Define a tile type and a shift parameter for animation
                level.tiles[i][j] = Object.assign({}, zeroTile);
            }
        }

    }

    // Main loop
    function main(tframe) {

    }

    function getBestMove() {
        let bestMove = null;
        for (let i = 0; i < moves.length; i++) {
            if (!bestMove) {
                bestMove = moves[i];
                continue;
            }
            if (bestMove.length < moves[i].length) {
                bestMove = moves[i];
            }

        }
        return bestMove;
    }

    // Update the game state
    function update(tframe) {


        // Update the fps counter
        updateFps(dt);







            // Let the AI bot make a move, if enabled
            if (aibot) {
                animationtime += dt;
                if (animationtime > animationtimetotal) {
                    // Check if there are moves available
                    findMoves();

                    if (moves.length > 0) {
                        let move = getBestMove();

                        // Simulate a player using the mouse to swap two tiles
                        mouseSwap(move.column1, move.row1, move.column2, move.row2);
                    } else {
                        // No moves left, Game Over. We could start a new game.
                        gamestate = gamestates.over;
                        return;

                    }
                    animationtime = 0;
                }
            }
        } else if (gamestate === gamestates.resolve) {
            // Game is busy resolving and animating clusters
            animationtime += dt;

            if (animationstate === 0) {
                // Clusters need to be found and removed
                if (animationtime > animationtimetotal) {

                    findClusters();

                    if (clusters.length > 0) {
                        // Add points to the score
                        for (let i = 0; i < clusters.length; i++) {
                            // Add extra points for longer clusters
                            score += 100 * (clusters[i].length - 2);
                        }

                        // Clusters found, remove them
                        removeClusters();

                        // Tiles need to be shifted
                        animationstate = 1;
                    } else {
                        // No clusters found, animation complete
                        gamestate = gamestates.ready;
                    }
                    animationtime = 0;
                }
            } else if (animationstate === 1) {
                // Tiles need to be shifted
                if (animationtime > animationtimetotal) {
                    // Shift tiles
                    shiftTiles();

                    // New clusters need to be found
                    animationstate = 0;
                    animationtime = 0;

                    // Check if there are new clusters
                    findClusters();
                    if (clusters.length <= 0) {
                        // Animation complete
                        gamestate = gamestates.ready;
                    }
                }
            } else if (animationstate === 2) {
                // Swapping tiles animation
                if (animationtime > animationtimetotal) {
                    // Swap the tiles
                    swap(currentmove.column1, currentmove.row1, currentmove.column2, currentmove.row2);

                    // Check if the swap made a cluster
                    findClusters();
                    if (clusters.length > 0) {
                        movesLeft -= 1;
                        // Valid swap, found one or more clusters
                        // Prepare animation states
                        animationstate = 0;
                        animationtime = 0;
                        gamestate = gamestates.resolve;
                    } else {
                        // Invalid swap, Rewind swapping animation
                        animationstate = 3;
                        animationtime = 0;
                    }

                    // Update moves and clusters
                    findMoves();
                    findClusters();
                }
            } else if (animationstate == 3) {
                // Rewind swapping animation
                if (animationtime > animationtimetotal) {
                    // Invalid swap, swap back
                    swap(currentmove.column1, currentmove.row1, currentmove.column2, currentmove.row2);

                    // Animation complete
                    gamestate = gamestates.ready;
                }
            }

            // Update moves and clusters
            findMoves();
            findClusters();
        }
    }

    function updateFps(dt) {

    }

    // Draw text that is centered
    function drawCenterText(text, x, y, width) {
        var textdim = context.measureText(text);
        context.fillText(text, x + (width - textdim.width) / 2, y);
    }

    // Render the game
    function render() {
        canvas.width = canvas.width;
        // Draw the frame
        drawFrame();
        context.fillStyle = "rgb(180,161,160)";
       // context.fillRect(30, level.y + 10, 150, 73);
        // Draw score
        context.fillStyle = "rgb(0,0,0)";
        context.font = "24px Verdana";
        drawCenterText("Score:", 30, level.y + 40, 150);
        drawCenterText(score, 30, level.y + 70, 150);


        // Draw buttons
        drawButtons();

        // Draw level background
        var levelwidth = level.columns * level.tilewidth;
        var levelheight = level.rows * level.tileheight;
        context.fillStyle = "#000000";
        //context.fillRect(level.x - 4, level.y - 4, levelwidth + 8, levelheight + 8);

        // Render tiles
        renderTiles();


        // Render moves, when there are no clusters
        if (showmoves && clusters.length <= 0 && gamestate == gamestates.ready) {
            renderMoves();
        }

        // Game Over overlay
        if (gamestate === gamestates.over) {
          currentPopup = popups.loose;
        }
        if (gamestate === gamestates.win) {
            context.fillStyle = "rgba(31,255,16,0.8)";
            context.fillRect(level.x, level.y, levelwidth, levelheight);

            context.fillStyle = "#000000";
            context.font = "24px Verdana";
            drawCenterText("Game Over!", level.x, level.y + levelheight / 2 + 10, levelwidth);

        }
        if(currentPopup){
            currentPopup.renderFunction();
        }
    }

    // Draw a frame with a border
    function drawFrame() {
        // Draw background and a border
        context.strokeStyle = "#d0d0d0";
        context.lineWidth = 7;
        context.strokeRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#e8eaec";
        //context.fillRect(1, 1, canvas.width-2, canvas.height-2);

        let heightHeader = 65;
        // Draw header
        context.fillStyle = "#303030";
        context.fillRect(0, 0, canvas.width, heightHeader);

        // Draw title
        context.fillStyle = "#ffffff";
        context.font = "24px Verdana";
        context.fillText("Oh shit", 10, 30);

        // Display fps
        context.fillStyle = "#ffffff";
        context.font = "12px Verdana";
        context.fillText("Fps: " + fps, 13, 50);

        //Display moves
        context.fillStyle = "#ffffff";
        context.font = "12px Verdana";
        context.fillText("Moves:" + movesLeft, canvas.width - 60, 50);

        let winObjectFrame = {
            y: 0,
            width: 150,
            height: heightHeader
        };
        winObjectFrame.x = canvas.width / 2 - winObjectFrame.width / 2;
        winObjectFrame.y = heightHeader / 2 - winObjectFrame.height / 2;

        //WinObject
        context.fillStyle = "#ff57ad";
        context.fillRect(winObjectFrame.x, winObjectFrame.y, winObjectFrame.width, winObjectFrame.height);

        let horizontalPadding = 15;

        let winObjectImage = {
            image: new Image(),
            width: 40,
            height: 40

        };
        winObjectImage.image.src = imageTokens[winObject.type];
        winObjectImage.x = winObjectFrame.x + winObjectFrame.width / 4 - winObjectImage.width / 2;
        winObjectImage.y = winObjectFrame.height / 2 - winObjectImage.height / 2;

        context.drawImage(winObjectImage.image, winObjectImage.x + horizontalPadding, winObjectImage.y, winObjectImage.width, winObjectImage.height);

        let winObjectText = {
            size: 24,
            text: winObject.count - winObject.progress
        }
        winObjectText.x = winObjectFrame.x + winObjectFrame.width * 3 / 4;
        winObjectText.y = winObjectFrame.y + winObjectFrame.height / 2 + 2;

        let oldContextAlign = {
            align: context.textAlign,
            baseline: context.textBaseline
        }

        context.fillStyle = "#6170ff";
        context.font = winObjectText.size + "px Verdana";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(winObjectText.text, winObjectText.x - horizontalPadding, winObjectText.y);
        context.textAlign = oldContextAlign.align;
        context.textBaseline = oldContextAlign.baseline;
    }

    function drawLoosePopup() {
        let popupPath = "Done_assets\\loose_screen_clean.png";

        let popupInfo = {
            image: new Image(),
            width: 300
        }

        popupInfo.image.src = popupPath;

        let { x, y, height } = drawPopup(popupInfo);

        let oldContextAlign = {
            align: context.textAlign,
            baseline: context.textBaseline
        };

        let text = "Score: " + score;
        let textX = popupInfo.width / 2;
        let textY = height / 2;
        context.fillStyle = "white";
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.font = "bold 21px Verdana";
        context.textAlign = "center";
        context.textBaseline = "middle";

        context.fillText("Moves out", x + textX, y + textY + 35);
        context.strokeText("Moves out", x + textX, y + textY + 35);
        context.fillText(text, x + textX, y + textY + 60);
        context.strokeText(text, x + textX, y + textY + 60);

        context.textAlign = oldContextAlign.align;
        context.textBaseline = oldContextAlign.baseline;

      /*  context.beginPath();  // FOR TEST
        context.fillStyle = "red";
        context.arc(536,165,29,0,2* Math.PI);
        context.arc(414,438,30,0,2* Math.PI);
        context.fill(); */
    }

    function processLoosePopup(pos) {
        let buttons = [

            {
                x: 414,
                y: 438,
                radius:30,
                onClick: newGame
            },
            {
                x: 536,
                y: 165,
                radius:30,
                onClick: newGame
            }
        ];
        processPopupInput(pos,buttons);
    }
    function processPopupInput(pos, buttons){

        for( let i = 0; i < buttons.length; i++){
            let button = buttons[i];

            if (isPointInsideCircle(pos,button)){
                button.onClick();
                return;
            }
        }
    }

    function isPointInsideCircle(point,circle){
        return Math.sqrt(Math.pow(point.x - circle.x, 2) + Math.pow(point.y - circle.y, 2)) <= circle.radius;
    }

    function drawPopup(popupInfo) {
        context.fillStyle = "rgba(0,0,0,0.4)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        let factor = popupInfo.image.width / popupInfo.image.height;
        let height = popupInfo.width / factor;

        let x = canvas.width / 2 - popupInfo.width / 2;
        let y = canvas.height / 2 - height / 2;

        context.drawImage(popupInfo.image, x, y, popupInfo.width, height);
        return{ x, y, height };
    }

    // Draw buttons
    function drawButtons() {
        for (var i = 0; i < buttons.length; i++) {
            // Draw button shape
            context.fillStyle = "rgb(180,161,160)";
            context.fillRect(buttons[i].x, buttons[i].y, buttons[i].width, buttons[i].height);

            // Draw button text

            context.fillStyle = "rgb(0,0,0)";
            context.font = "18px Verdana";
            var textdim = context.measureText(buttons[i].text);
            context.fillText(buttons[i].text, buttons[i].x + (buttons[i].width - textdim.width) / 2, buttons[i].y + 30);
        }
    }

    // Render tiles
    function renderTiles() {

        //render lines
        for (var i = 0; i < level.columns; i++) {
            for (var j = 0; j < level.rows; j++) {
                // Calculate the tile coordinates
                var coord = getTileCoordinate(i, j, 0, 0);

                context.strokeStyle = "white";
                context.lineWidth = 1.5;
                context.strokeRect(coord.tilex, coord.tiley, level.tilewidth, level.tileheight);
            }
        }

        for (var i = 0; i < level.columns; i++) {
            for (var j = 0; j < level.rows; j++) {

                if (gamestate == gamestates.resolve && (animationstate === 2 || animationstate === 3) &&
                    (i === currentmove.column1 && j === currentmove.row1 ||
                        i === currentmove.column2 && j === currentmove.row2)) {
                    continue;
                }

                // Get the shift of the tile for animation
                var shift = level.tiles[i][j].shift;

                // Calculate the tile coordinates
                var coord = getTileCoordinate(i, j, 0, (animationtime / animationtimetotal) * shift);

                var selected = false;

                // Draw the selected tile
                if (level.selectedtile.selected) {
                    if (level.selectedtile.column == i && level.selectedtile.row == j) {
                        // Draw a red tile
                        selected = true;
                    }
                }
                // Check if there is a tile present
                if (level.tiles[i][j].type >= 0) {

                    // Draw the tile using the color
                    drawTile(coord.tilex, coord.tiley, level.tiles[i][j], selected);
                }


            }
        }

        // Render the swap animation
        if (gamestate == gamestates.resolve && (animationstate == 2 || animationstate == 3)) {
            // Calculate the x and y shift
            var shiftx = currentmove.column2 - currentmove.column1;
            var shifty = currentmove.row2 - currentmove.row1;

            // First tile
            var coord1 = getTileCoordinate(currentmove.column1, currentmove.row1, 0, 0);
            var coord1shift = getTileCoordinate(currentmove.column1, currentmove.row1, (animationtime / animationtimetotal) * shiftx, (animationtime / animationtimetotal) * shifty);


            // Second tile
            var coord2 = getTileCoordinate(currentmove.column2, currentmove.row2, 0, 0);
            var coord2shift = getTileCoordinate(currentmove.column2, currentmove.row2, (animationtime / animationtimetotal) * -shiftx, (animationtime / animationtimetotal) * -shifty);


            // Change the order, depending on the animation state
            if (animationstate == 2) {
                // Draw the tiles
                drawTile(coord1shift.tilex, coord1shift.tiley, level.tiles[currentmove.column1][currentmove.row1]);
                drawTile(coord2shift.tilex, coord2shift.tiley, level.tiles[currentmove.column2][currentmove.row2]);
            } else {
                // Draw the tiles
                drawTile(coord2shift.tilex, coord2shift.tiley, level.tiles[currentmove.column2][currentmove.row2]);
                drawTile(coord1shift.tilex, coord1shift.tiley, level.tiles[currentmove.column1][currentmove.row1]);
            }
        }
    }

    // Get the tile coordinate
    function getTileCoordinate(column, row, columnoffset, rowoffset) {
        var tilex = level.x + (column + columnoffset) * level.tilewidth;
        var tiley = level.y + (row + rowoffset) * level.tileheight;
        return {tilex: tilex, tiley: tiley};
    }

    // Draw a tile with a color
    function drawTile(x, y, tileInfo, selected) {

        let scaleDifference = tileInfo.scale - normalScale;
        let animationCompletion = (animationtime / animationtimetotal); // progress animation
        let currentScale = normalScale + (scaleDifference * animationCompletion);

        let tileScaleSize = {
            width: level.tilewidth * currentScale,
            height: level.tileheight * currentScale
        };
        let scaleOffset = {
            x: (level.tilewidth - tileScaleSize.width) / 2,
            y: (level.tileheight - tileScaleSize.height) / 2
        };

        if (selected) {
            context.fillStyle = "rgba(255,48,19,0.7)";
            context.fillRect(x, y, level.tileheight, level.tilewidth);
        }


        var offset = 4;


        var img = new Image();
        img.src = imageTokens[tileInfo.type];
        context.drawImage(img, x + scaleOffset.x, y + scaleOffset.y, tileScaleSize.width, tileScaleSize.height);

    }


    // Render moves
    function renderMoves() {
        for (var i = 0; i < moves.length; i++) {
            // Calculate coordinates of tile 1 and 2
            var coord1 = getTileCoordinate(moves[i].column1, moves[i].row1, 0, 0);
            var coord2 = getTileCoordinate(moves[i].column2, moves[i].row2, 0, 0);

            // Draw a line from tile 1 to tile 2
            context.strokeStyle = "#ff0000";
            context.beginPath();
            context.moveTo(coord1.tilex + level.tilewidth / 2, coord1.tiley + level.tileheight / 2);
            context.lineTo(coord2.tilex + level.tilewidth / 2, coord2.tiley + level.tileheight / 2);
            context.stroke();
        }
    }

    // Start a new game
    function newGame() {
        // Reset score

        // Set the gamestate to ready

        // Create the level
        createLevel();
        taskInLevel();

        // Find initial clusters and moves
        findMoves();
        findClusters();
    }

    // Create a random level
    function createLevel() {
        var done = false;

        // Keep generating levels until it is correct
        while (!done) {

            // Create a level with random tiles
            for (var i = 0; i < level.columns; i++) {
                for (var j = 0; j < level.rows; j++) {
                    level.tiles[i][j].type = getRandomTile();
                }
            }

            // Resolve the clusters
            resolveClusters();

            // Check if there are valid moves
            findMoves();

            // Done when there is a valid move
            if (moves.length > 0) {
                done = true;
            }

        }

    }

    function taskInLevel() {

    }

    // Get a random tile
    function getRandomTile() {
        return Math.floor(Math.random() * imageTokens.length);
    }

    // Remove clusters and insert tiles
    function resolveClusters() {
        // Check for clusters
        findClusters();

        // While there are clusters left
        while (clusters.length > 0) {

            // Remove clusters
            removeClusters();

            // Shift tiles
            shiftTiles();

            // Check if there are clusters left
            findClusters();
        }
    }

    // Find clusters in the level
    function findClusters() {
        // Reset clusters
        clusters = []

        // Find horizontal clusters
        for (var j = 0; j < level.rows; j++) {
            // Start with a single tile, cluster of 1
            var matchlength = 1;
            for (var i = 0; i < level.columns; i++) {
                var checkcluster = false;

                if (i == level.columns - 1) {
                    // Last tile
                    checkcluster = true;
                } else {
                    // Check the type of the next tile
                    if (level.tiles[i][j].type == level.tiles[i + 1][j].type &&
                        level.tiles[i][j].type != types.empty) {
                        // Same type as the previous tile, increase matchlength
                        matchlength += 1;
                    } else {
                        // Different type
                        checkcluster = true;
                    }
                }

                // Check if there was a cluster
                if (checkcluster) {
                    if (matchlength >= 3) {
                        // Found a horizontal cluster
                        clusters.push({
                            column: i + 1 - matchlength, row: j,
                            length: matchlength, horizontal: true
                        });
                    }

                    matchlength = 1;
                }
            }
        }

        // Find vertical clusters
        for (var i = 0; i < level.columns; i++) {
            // Start with a single tile, cluster of 1
            var matchlength = 1;
            for (var j = 0; j < level.rows; j++) {
                var checkcluster = false;

                if (j == level.rows - 1) {
                    // Last tile
                    checkcluster = true;
                } else {
                    // Check the type of the next tile
                    if (level.tiles[i][j].type == level.tiles[i][j + 1].type &&
                        level.tiles[i][j].type != types.empty) {
                        // Same type as the previous tile, increase matchlength
                        matchlength += 1;
                    } else {
                        // Different type
                        checkcluster = true;
                    }
                }

                // Check if there was a cluster
                if (checkcluster) {
                    if (matchlength >= 3) {
                        // Found a vertical cluster
                        clusters.push({
                            column: i, row: j + 1 - matchlength,
                            length: matchlength, horizontal: false
                        });
                    }

                    matchlength = 1;
                }
            }
        }

        for (let y = 0; y < level.tiles.length; y++) {
            for (let x = 0; x < level.tiles[y].length; x++) {
                level.tiles[y][x].scale = normalScale;
            }
        }

        for (let i = 0; i < clusters.length; i++) {
            let cluster = clusters[i];
            for (let j = 0; j < cluster.length; j++) {
                if (cluster.horizontal) {
                    level.tiles[cluster.column + j][cluster.row].scale = maxScale;

                } else {
                    level.tiles[cluster.column][cluster.row + j].scale = maxScale;
                }

            }
        }
    }

    // Find available moves
    function findMoves() {
        // Reset moves
        moves = []

        // Check horizontal swaps
        for (var j = 0; j < level.rows; j++) {
            for (var i = 0; i < level.columns - 1; i++) {
                // Swap, find clusters and swap back
                swap(i, j, i + 1, j);
                findClusters();
                swap(i, j, i + 1, j);

                // Check if the swap made a cluster
                if (clusters.length > 0) {
                    let length = 0;
                    for (let k = 0; k < clusters.length; k++) {
                        length += clusters[k].length;
                    }
                    moves.push({column1: i, row1: j, column2: i + 1, row2: j, length: length});
                }
            }
        }

        // Check vertical swaps
        for (var i = 0; i < level.columns; i++) {
            for (var j = 0; j < level.rows - 1; j++) {
                // Swap, find clusters and swap back
                swap(i, j, i, j + 1);
                findClusters();
                swap(i, j, i, j + 1);

                // Check if the swap made a cluster
                if (clusters.length > 0) {
                    let length = 0;
                    for (let k = 0; k < clusters.length; k++) {
                        length += clusters[k].length;
                    }
                    moves.push({column1: i, row1: j, column2: i, row2: j + 1, length: length});
                }
            }
        }

        // Reset clusters
        clusters = []
    }

    // Loop over the cluster tiles and execute a function
    function loopClusters(func) {
        for (var i = 0; i < clusters.length; i++) {
            //  { column, row, length, horizontal }
            var cluster = clusters[i];
            var coffset = 0;
            var roffset = 0;
            for (var j = 0; j < cluster.length; j++) {
                func(i, cluster.column + coffset, cluster.row + roffset, cluster);

                if (cluster.horizontal) {
                    coffset++;
                } else {
                    roffset++;
                }
            }
        }
    }

    // Remove the clusters
    function removeClusters() {
        // Change the type of the tiles to -1, indicating a removed tile
        loopClusters(function (index, column, row, cluster) {
            let tile = level.tiles[column][row];

            if (tile.type === winObject.type && winObject.progress < winObject.count) {
                winObject.progress++
            }
            level.tiles[column][row].type = types.empty;
        });


        // Calculate how much a tile should be shifted downwards
        for (var i = 0; i < level.columns; i++) {
            var shift = 0;
            for (var j = level.rows - 1; j >= 0; j--) {
                // Loop from bottom to top
                if (level.tiles[i][j].type == types.empty) {
                    // Tile is removed, increase shift
                    shift++;
                    level.tiles[i][j].shift = 0;
                } else {
                    // Set the shift
                    level.tiles[i][j].shift = shift;
                }
            }
        }
    }

    // Shift tiles and insert new tiles
    function shiftTiles() {
        // Shift tiles
        for (var i = 0; i < level.columns; i++) {
            for (var j = level.rows - 1; j >= 0; j--) {
                // Loop from bottom to top
                if (level.tiles[i][j].type == types.empty) {
                    // Insert new random tile
                    level.tiles[i][j].type = getRandomTile();
                } else {
                    // Swap tile to shift it
                    var shift = level.tiles[i][j].shift;
                    if (shift > 0) {
                        swap(i, j, i, j + shift);
                    }
                }

                // Reset shift
                level.tiles[i][j].shift = 0;
            }
        }
    }

    // Get the tile under the mouse
    function getMouseTile(pos) {
        // Calculate the index of the tile
        var tx = Math.floor((pos.x - level.x) / level.tilewidth);
        var ty = Math.floor((pos.y - level.y) / level.tileheight);

        // Check if the tile is valid
        if (tx >= 0 && tx < level.columns && ty >= 0 && ty < level.rows) {
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

    // Check if two tiles can be swapped
    function canSwap(x1, y1, x2, y2) {
        // Check if the tile is a direct neighbor of the selected tile
        if ((Math.abs(x1 - x2) == 1 && y1 == y2) ||
            (Math.abs(y1 - y2) == 1 && x1 == x2)) {
            return true;
        }

        return false;
    }

    // Swap two tiles in the level
    function swap(x1, y1, x2, y2) {
        var typeswap = level.tiles[x1][y1].type;
        level.tiles[x1][y1].type = level.tiles[x2][y2].type;
        level.tiles[x2][y2].type = typeswap;
    }

    // Swap two tiles as a player action
    function mouseSwap(c1, r1, c2, r2) {
        // Save the current move
        currentmove = {column1: c1, row1: r1, column2: c2, row2: r2};

        // Deselect
        level.selectedtile.selected = false;

        // Start animation
        animationstate = 2;
        animationtime = 0;
        gamestate = gamestates.resolve;
    }

    // On mouse movement
    function onMouseMove(e) {
        // Get the mouse position
        var pos = getMousePos(canvas, e);

        // Check if we are dragging with a tile selected
        if (drag && level.selectedtile.selected) {
            // Get the tile under the mouse
            mt = getMouseTile(pos);
            if (mt.valid) {
                // Valid tile

                // Check if the tiles can be swapped
                if (canSwap(mt.x, mt.y, level.selectedtile.column, level.selectedtile.row)) {
                    // Swap the tiles
                    mouseSwap(mt.x, mt.y, level.selectedtile.column, level.selectedtile.row);
                }
            }
        }
    }

    // On mouse button click
    function onMouseDown(e) {
        // Get the mouse position
        var pos = getMousePos(canvas, e);

        if(currentPopup){
            currentPopup.inputFunction(pos);
            return;
        }

        // Start dragging
        if (!drag && gamestate == gamestates.ready) {
            // Get the tile under the mouse
            mt = getMouseTile(pos);

            if (mt.valid) {
                // Valid tile
                var swapped = false;
                if (level.selectedtile.selected) {
                    if (mt.x == level.selectedtile.column && mt.y == level.selectedtile.row) {
                        // Same tile selected, deselect
                        level.selectedtile.selected = false;
                        drag = true;
                        return;
                    } else if (canSwap(mt.x, mt.y, level.selectedtile.column, level.selectedtile.row)) {
                        // Tiles can be swapped, swap the tiles
                        mouseSwap(mt.x, mt.y, level.selectedtile.column, level.selectedtile.row);
                        swapped = true;
                    }
                }

                if (!swapped) {
                    // Set the new selected tile
                    level.selectedtile.column = mt.x;
                    level.selectedtile.row = mt.y;
                    level.selectedtile.selected = true;
                }
            } else {
                // Invalid tile
                level.selectedtile.selected = false;
            }

            // Start dragging
            drag = true;
        }

        // Check if a button was clicked
        for (var i = 0; i < buttons.length; i++) {
            if (pos.x >= buttons[i].x && pos.x < buttons[i].x + buttons[i].width &&
                pos.y >= buttons[i].y && pos.y < buttons[i].y + buttons[i].height) {

                // Button i was clicked
                buttons[i].onclick(buttons[i]);
            }
        }
    }

    function onMouseUp(e) {
        // Reset dragging
        drag = false;
    }

    function onMouseOut(e) {
        // Reset dragging
        drag = false;
    }

    // Get the mouse position
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
            y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
        };
    }

    // Call init to start the game
    init();
};
