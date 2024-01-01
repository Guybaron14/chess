import { Board, Move } from '../types';
import { getBishopMoves } from './bishop';
import { getRookMoves } from './rook';
export const getQueenMoves = (board: Board, row: number, col: number, turn: string) => {
    const legalMoves: Move[] = [];
    legalMoves.push(...getRookMoves(board, row, col, turn));
    legalMoves.push(...getBishopMoves(board, row, col, turn));
    
    return legalMoves;
}
