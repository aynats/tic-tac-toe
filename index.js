const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

let order = 0;

const matrix = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]]
let count = 9;

const container = document.getElementById('fieldWrapper');


startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);

    if (order === 0 && matrix[row][col] === EMPTY && count > 0){
        renderSymbolInCell(CROSS, row, col);
        matrix[row][col] = CROSS;
        order = 1;
        count--;
        isThereWinner();
    }
    else if (matrix[row][col] === EMPTY && count > 0) {
        renderSymbolInCell(ZERO, row, col);
        matrix[row][col] = ZERO;
        order = 0;
        count--;
        isThereWinner();
    }
}

function isThereWinner() {
    if (matrix[0][0] === matrix[0][1] && matrix[0][1] === matrix[0][2]
        && matrix[0][0] !== EMPTY) {
        //return matrix[0][0];
        drawWinner([0, 0], [0, 1], [0, 2]);
    }
    else if (matrix[1][0] === matrix[1][1] && matrix[1][1] === matrix[1][2]
        && matrix[1][0] !== EMPTY) {
        drawWinner([1, 0], [1, 1], [1, 2]);
    }
    else if (matrix[2][0] === matrix[2][1] && matrix[2][1] === matrix[2][2]
        && matrix[2][0] !== EMPTY) {
        drawWinner([2, 0], [2, 1], [2, 2]);
    }

    else if (matrix[0][0] === matrix[1][0] && matrix[1][0] === matrix[2][0]
        && matrix[0][0] !== EMPTY) {
        drawWinner([0, 0], [1, 0], [2, 0]);
    }
    else if (matrix[0][1] === matrix[1][1] && matrix[1][1]  === matrix[2][1]
        && matrix[1][1] !== EMPTY) {
        drawWinner([0, 1], [1, 1], [2, 1]);
    }
    else if (matrix[0][2] === matrix[1][2] && matrix[1][2] === matrix[2][2]
        && matrix[2][2] !== EMPTY) {
        drawWinner([0, 2], [1, 2], [2, 2]);
    }

    else if (matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]
        && matrix[2][2] !== EMPTY) {
        drawWinner([0, 0], [1, 1], [2, 2]);
    }

    else if (matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0]
        && matrix[0][2] !== EMPTY) {
        drawWinner([0, 2], [1, 1], [2, 0]);
    }

    else if (count === 0) {
        alert('Победила дружба');
    }
}

function drawWinner(a, b, c) {
    let c1 = findCell(a[0], a[1]);
    c1.style.color = "red";
    let c2 = findCell(b[0], b[1]);
    c2.style.color = "red";
    let c3 = findCell(c[0], c[1]);
    c3.style.color = "red";
    alert(matrix[a[0]][a[1]]);
    count = 0;
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
