import { Board, Move, Turn } from '../types';
import { getBishopMoves } from './bishop';
import { getRookMoves } from './rook';

export const getQueenMoves = (board: Board, row: number, col: number, turn: Turn) => {
    const legalMoves: Move[] = [];
    legalMoves.push(...getRookMoves(board, row, col, turn, true));
    legalMoves.push(...getBishopMoves(board, row, col, turn, true));

    return legalMoves;
};
