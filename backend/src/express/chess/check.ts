import { getBishopMoves } from './pieces/bishop';
import { getKnightMoves } from './pieces/knight';
import { getPawnMoves } from './pieces/pawn';
import { getQueenMoves } from './pieces/queen';
import { getRookMoves } from './pieces/rook';
import {
    Board,
    KING_BLACK,
    KING_WHITE,
    PAWN_BLACK,
    PAWN_WHITE,
    Piece,
    QUEEN_BLACK,
    QUEEN_WHITE,
    Turn,
    WHITE,
} from './types';
import { convertTileToNumber, tileNumberToString } from './utils';

export const checkCheck = (board: Board, start: string, end: string, turn: Turn) => {
    const { pieceEaten, didPromote } = makeMove(board, start, end);
    const result = canCaptureKing(board, turn);
    undoMove(board, start, end, pieceEaten, didPromote);
    return result;
};

const canCaptureKing = (board: Board, turn: Turn) => {
    const king = turn === WHITE ? KING_WHITE : KING_BLACK;
    const kingPos = getKingPosition(board, king);

    if (!kingPos) {
        return true;
    }

    let flag = false;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (turn === WHITE) {
                if (board[i][j] === 'p' && getPawnMoves(board, i, j, 'b').includes(kingPos)) {
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
                if (board[i][j] === 'P' && getPawnMoves(board, i, j, 'w').includes(kingPos)) {
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

const getKingPosition = (board: Board, king: typeof KING_WHITE | typeof KING_BLACK) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === king) {
                return tileNumberToString(i, j);
            }
        }
    }

    return null;
};

export const makeMove = (board: Board, start: string, end: string): { pieceEaten: Piece; didPromote: boolean } => {
    if (start === 'castling') {
        makeCastlingMove(board, end);
        return { pieceEaten: '0', didPromote: false };
    }

    const startPos = convertTileToNumber(start);
    const endPos = convertTileToNumber(end);

    const startRow = Math.floor(startPos / 8);
    const startCol = startPos % 8;
    const endRow = Math.floor(endPos / 8);
    const endCol = endPos % 8;

    const piece = board[startRow][startCol];
    const pieceEaten = board[endRow][endCol];

    board[startRow][startCol] = '0';

    let didPromote = false;
    if (piece === PAWN_WHITE && endRow === 0) {
        board[endRow][endCol] = QUEEN_WHITE;
        didPromote = true;
    } else if (piece === 'p' && endRow === 7) {
        board[endRow][endCol] = QUEEN_BLACK;
        didPromote = true;
    } else board[endRow][endCol] = piece;

    return { pieceEaten, didPromote };
};

export const undoMove = (board: Board, start: string, end: string, pieceEaten: Piece, didPromote: boolean) => {
    if (start === 'castling') return undoCastlingMove(board, end);

    const startPos = convertTileToNumber(start);
    const endPos = convertTileToNumber(end);

    const startRow = Math.floor(startPos / 8);
    const startCol = startPos % 8;
    const endRow = Math.floor(endPos / 8);
    const endCol = endPos % 8;

    const piece = board[endRow][endCol];

    if (didPromote) board[startRow][startCol] = piece === QUEEN_WHITE ? PAWN_WHITE : PAWN_BLACK;
    else board[startRow][startCol] = piece;

    board[endRow][endCol] = pieceEaten;
};

const makeCastlingMove = (board: Board, type: string) => {
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

const undoCastlingMove = (board: Board, type: string) => {
    if (type === 'O-O') {
        board[7][4] = 'K';
        board[7][6] = '0';
        board[7][5] = '0';
        board[7][7] = 'R';
    } else if (type === 'O-O-O') {
        board[7][4] = 'K';
        board[7][2] = '0';
        board[7][3] = '0';
        board[7][0] = 'R';
    } else if (type === 'o-o') {
        board[0][4] = 'k';
        board[0][6] = '0';
        board[0][5] = '0';
        board[0][7] = 'r';
    } else if (type === 'o-o-o') {
        board[0][4] = 'k';
        board[0][2] = '0';
        board[0][3] = '0';
        board[0][0] = 'r';
    }
};
