import { BISHOP, BLACK, Board, KING, KNIGHT, PAWN, QUEEN, ROOK, WHITE } from '../types';
import { squareTable } from './squareTable';

export const scoresMap = {
    [PAWN]: 100,
    [KNIGHT]: 320,
    [BISHOP]: 330,
    [ROOK]: 500,
    [QUEEN]: 900,
    [KING]: 20000,
};

export const evaluate = (board: Board) => {
    let score = 0;
    let pieceCount = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            const color = board[i][j].toUpperCase() === board[i][j] ? WHITE : BLACK;
            const piece = board[i][j].toUpperCase();

            const pieceScore = scoresMap[piece] || 0;
            if (pieceScore) pieceCount++;
            score += color === WHITE ? pieceScore : -pieceScore;

            if (pieceScore) score += squareTable[piece][color][i][j] * (color === WHITE ? 1 : -1);
        }
    }

    if (pieceCount <= 12) {
        const kingPosition = board.flat().findIndex((piece) => piece === KING);
        if (kingPosition === -1) console.log(board);

        const kingRow = Math.floor(kingPosition / 8);
        const kingCol = kingPosition % 8;
        const color = board[kingRow][kingCol].toUpperCase() === board[kingRow][kingCol] ? WHITE : BLACK;

        const kingScore = squareTable[KING + 'ENDGAME'][color][kingRow][kingCol] * (color === WHITE ? 1 : -1);

        score += kingScore * (12 - pieceCount) < 4 ? 1 : 2;
    }

    if (pieceCount <= 8) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                const color = board[i][j].toUpperCase() === board[i][j] ? WHITE : BLACK;
                const piece = board[i][j].toUpperCase();

                if (piece === PAWN) {
                    const pawnScore = squareTable[PAWN + 'ENDGAME'][color][i][j] * (color === WHITE ? 1 : -1);
                    score += pawnScore;
                }
            }
        }
    }

    return score;
};
