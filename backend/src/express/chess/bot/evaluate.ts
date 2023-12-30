import { BISHOP, BLACK, Board, EMPTY, KING, KNIGHT, PAWN, QUEEN, ROOK, WHITE } from '../types';
import { squareTable } from './squareTable';

const scoresMap = {
    [PAWN]: 100,
    [KNIGHT]: 320,
    [BISHOP]: 330,
    [ROOK]: 500,
    [QUEEN]: 900,
    [KING]: 20000,
};

export const evaluate = (board: Board) => {
    let score = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            const color = board[i][j].toUpperCase() === board[i][j] ? WHITE : BLACK;
            const piece = board[i][j].toUpperCase();

            const pieceScore = scoresMap[piece] || 0;
            score += color === WHITE ? pieceScore : -pieceScore;

            if (piece !== EMPTY) score += squareTable[piece][color][i][j] * (color === WHITE ? 1 : -1);
        }
    }

    return score;
};
