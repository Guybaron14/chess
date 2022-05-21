export const getCastlingMoves = (board: string[][], castling: string, turn: string) => {
    const legalMoves: Array<string> = [];

    if (turn === 'w') {
        if (castling.includes('K')) {
            if (board[7][5] === '0' && board[7][6] === '0') {
                legalMoves.push('O-O');
            }
        }
        if (castling.includes('Q')) {
            if (board[7][1] === '0' && board[7][2] === '0' && board[7][3] === '0') {
                legalMoves.push('O-O-O');
            }
        }
    } else {
        if (castling.includes('k')) {
            if (board[0][5] === '0' && board[0][6] === '0') {
                legalMoves.push('O-O');
            }
        }
        if (castling.includes('q')) {
            if (board[0][1] === '0' && board[0][2] === '0' && board[0][3] === '0') {
                legalMoves.push('O-O-O');
            }
        }
    }

    return legalMoves;
};
