import { getBishopMoves } from './bishop';
import { getRookMoves } from './rook';
export const getQueenMoves = (board: Array<Array<string>>, row: number, col: number, turn: string): Array<string> => {
    const legalMoves: Array<string> = [];
    legalMoves.push(...getRookMoves(board, row, col, turn));
    legalMoves.push(...getBishopMoves(board, row, col, turn));
    console.log(legalMoves);
    
    return legalMoves;
}
