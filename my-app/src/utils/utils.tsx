export const tileNumToRowCol = (tileNum: string): [number, number] => {
    const row = Math.floor(Number(tileNum) / 8);
    const col = Number(tileNum) % 8;
    return [row, col];
};

export const convertTileToNumber = (tile: string) => {
    let [col, row] = tile.split('');
    return 64 - (8 - (col.charCodeAt(0) - 97)) - (Number(row) - 1) * 8;
};