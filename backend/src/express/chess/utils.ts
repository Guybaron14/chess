export const tileNumberToString = (row: number, col: number): string => {
    return `${String.fromCharCode(col + 97)}${8 - row}`;
};

export const isCapturePossible = (board: Array<Array<string>>, row: number, col: number, turn: string): boolean => {
    if (turn === 'w') {
        if (/^[a-z]+$/.test(board[row][col])) {
            return true;
        }
    } else {
        if (/^[A-Z]+$/.test(board[row][col])) {
            return true;
        }
    }

    return false;
};

export const convertTileToNumber = (tile: string) => {
    let [col, row] = tile.split('');
    return 64 - (8 - (col.charCodeAt(0) - 97)) - (Number(row) - 1) * 8;
};
