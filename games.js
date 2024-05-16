/* Code adapted from: https://github.com/ImKennyYip/2048 */


var board;
var rows = 3;
var columns = 3;

window.onload = function() {
    startGame();
}

function startGame() {
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    for (let r = 0; r < rows; r++) {
        for(let c= 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + '-' + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    var img = document.createElement("img");
    img.style.width = "100%";
    img.style.height = "100%"
    if (num == 2) {
        img.src = "images/Goose-art/IMG_0215.jpg";
    } else if (num == 4) {
        img.src = "images/Goose-art/IMG_0216.jpg";
    } else if (num == 8) {
        img.src = "images/Goose-art/IMG_0217.jpg";
    } else if (num == 16) {
        img.src = "images/Goose-art/IMG_0219.jpg";
    } else if (num == 32) {
        img.src = "images/Goose-art/IMG_0221.jpg";
    } else if (num == 64) {
        img.src = "images/Goose-art/IMG_0222.jpg";
    } else if (num == 128) {
        img.src = "images/Goose-art/IMG_0223.jpg";
    }
    tile.appendChild(img);
   
   
}

document.addEventListener("keyup", (e) => {
    if (checkWin()) {
        document.getElementById("game-win").style.display = "block"; // Show the game win badge
        return; 
    }

    if (checkGameOver()) {
        document.getElementById("game-over").style.display = "block"; // Show the game over badge
        return; 
    }


    if (e.code == "ArrowLeft") {
        slideLeft();
    } else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    } else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();

    } else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
})

function filterZero(row){
    return row.filter(num => num != 0); 
}

function slide(row) {
    row = filterZero(row); 
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
        }
    } 
    row = filterZero(row); 
 
    while (row.length < columns) {
        row.push(0);
    } 
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];  
        row.reverse();           
        row = slide(row)            
        board[r] = row.reverse();   
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.classList.value = "";
            tile.classList.add("tile");
            var img = document.createElement("img");
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            img.src = "images/Goose-art/IMG_0215.jpg"; 
            tile.appendChild(img); 
            found = true;
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { 
                return true;
            }
        }
    }
    return false;
}

function checkWin() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === 128) { 
                return true;
            }
        }
    }
    return false; // If no tile has reached the target value, return false
}


function checkGameOver() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // Check horizontally
            if (c < columns - 1 && board[r][c] === board[r][c + 1]) {
                return false;
            }
            // Check vertically
            if (r < rows - 1 && board[r][c] === board[r + 1][c]) {
                return false;
            }
            // Check if any tile is empty
            if (board[r][c] === 0) {
                return false;
            }
        }
    }
    return true; // If no adjacent tiles are the same and all tiles are not empty, return true (game over)
}
