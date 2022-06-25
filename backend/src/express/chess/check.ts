import { getBishopMoves } from './bishop';
import { getKnightMoves } from './knight';
import { getPawnMoves } from './pawn';
import { getQueenMoves } from './queen';
import { getRookMoves } from './rook';
import { convertTileToNumber, tileNumberToString } from './utils';

export const checkCheck = (board, start, end, turn) => {
    const boardCopy = JSON.parse(JSON.stringify(board));
    const newBoard = makeMove(boardCopy, start, end);
    return canCaptureKing(newBoard, turn);
};

const canCaptureKing = (board, turn) => {
    const king = turn === 'w' ? 'K' : 'k';
    const kingPos = getKingPosition(board, king);

    if (!kingPos) {
        return true;
    }

    let flag = false;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (turn === 'w') {
                if (board[i][j] === 'p' && getPawnMoves(board, i, j, 'b', '').includes(kingPos)) {
                    flag = true;
                }
                if (board[i][j] === 'n' && getKnightMoves(board, i, j, 'b').includes(kingPos)) {
                    flag = true;
                }
                if (board[i][j] === 'b' && getBishopMoves(board, i, j, 'b').includes(kingPos)) {
                    flag = true;
                }
                if (board[i][j] === 'r' && getRookMoves(board, i, j, 'b').includes(kingPos)) {
                    flag = true;
                }
                if (board[i][j] === 'q' && getQueenMoves(board, i, j, 'b').includes(kingPos)) {
                    flag = true;
                }
            } else {
                if (board[i][j] === 'P' && getPawnMoves(board, i, j, 'w', '').includes(kingPos)) {
                    flag = true;
                }
                if (board[i][j] === 'N' && getKnightMoves(board, i, j, 'w').includes(kingPos)) {
                    flag = true;
                }
                if (board[i][j] === 'B' && getBishopMoves(board, i, j, 'w').includes(kingPos)) {
                    flag = true;
                }
                if (board[i][j] === 'R' && getRookMoves(board, i, j, 'w').includes(kingPos)) {
                    flag = true;
                }
                if (board[i][j] === 'Q' && getQueenMoves(board, i, j, 'w').includes(kingPos)) {
                    flag = true;
                }
            }
        }
    }

    return flag;
};

const getKingPosition = (board, king) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === king) {
                return tileNumberToString(i, j);
            }
        }
    }

    return null;
};

const makeMove = (board, start, end) => {
    if (start === 'castling') {
        makeCastlingMove(board, end);
        return board;
    }

    const startPos = convertTileToNumber(start);
    const endPos = convertTileToNumber(end);

    const piece = board[Math.floor(startPos / 8)][startPos % 8];
    board[Math.floor(startPos / 8)][startPos % 8] = '0';
    board[Math.floor(endPos / 8)][endPos % 8] = piece;

    return board;
};

const makeCastlingMove = (board, type) => {
    if (type === 'O-O') {
        board[7][4] = '0';
        board[7][6] = 'K';
        board[7][5] = 'R';
        board[7][7] = '0';
    } else if (type === 'O-O-O') {
        board[7][4] = '0';
        board[7][2] = 'K';
        board[7][3] = 'R';
        board[7][0] = '0';
    } else if (type === 'o-o') {
        board[0][4] = '0';
        board[0][6] = 'k';
        board[0][5] = 'r';
        board[0][7] = '0';
    } else if (type === 'o-o-o') {
        board[0][4] = '0';
        board[0][2] = 'k';
        board[0][3] = 'r';
        board[0][0] = '0';
    }

    return board;
};
