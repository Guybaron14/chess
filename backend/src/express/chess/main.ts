import { getQueenMoves } from './queen';
import { getBishopMoves } from './bishop';
import { getPawnMoves } from './pawn';
import { getRookMoves } from './rook';
import { tileNumberToString } from './utils';

export const main = (board, gameString) => {
    const [turn, _casteling, _enPassant, _moveCounter] = gameString.split('-');
    const legalMoves = {};

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 'P' || board[i][j] === 'p') {
                const possibleMoves = getPawnMoves(board, i, j, turn === 'w' ? 'w' : 'b');
                legalMoves[tileNumberToString(i, j)] = possibleMoves;
            }

            if (board[i][j] === 'R' || board[i][j] === 'r') {
                const possibleMoves = getRookMoves(board, i, j, turn === 'w' ? 'w' : 'b');
                legalMoves[tileNumberToString(i, j)] = possibleMoves;
            }

            if (board[i][j] === 'B' || board[i][j] === 'b') {
                const possibleMoves = getBishopMoves(board, i, j, turn === 'w' ? 'w' : 'b');
                legalMoves[tileNumberToString(i, j)] = possibleMoves;
            }

            if (board[i][j] === 'Q' || board[i][j] === 'q') {
                const possibleMoves = getQueenMoves(board, i, j, turn === 'w' ? 'w' : 'b');
                legalMoves[tileNumberToString(i, j)] = possibleMoves;
            }
        }
    }

    return legalMoves;
};
