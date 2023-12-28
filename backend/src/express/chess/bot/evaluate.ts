import { BISHOP, BLACK, Board, KING, KNIGHT, PAWN, QUEEN, ROOK, WHITE } from '../types';

const scoresMap = {
    [PAWN]: 10,
    [KNIGHT]: 30,
    [BISHOP]: 30,
    [ROOK]: 50,
    [QUEEN]: 90,
    [KING]: 900,
};

export const evaluate = (board: Board) => {
    let score = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            const color = board[i][j].toUpperCase() === board[i][j] ? WHITE : BLACK;
            const piece = board[i][j].toUpperCase();
            const currentScore = scoresMap[piece] || 0;

            score += color === WHITE ? currentScore : -currentScore;
        }
    }

    return score;
};
