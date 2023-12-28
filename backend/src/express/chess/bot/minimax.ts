import { makeMove } from '../check';
import { getLegalMoves } from '../main';
import { Board } from '../types';
import { evaluate } from './evaluate';

export const minimax = (
    board: Board,
    depth: number,
    maximizingPlayer: boolean,
    alpha: number,
    beta: number,
    maxDepth: number,
    casteling: string,
    enPassant?: string,
) => {
    if (depth === 0) return evaluate(board);

    const legalMoves = getLegalMoves(board, maximizingPlayer ? 'w' : 'b', casteling, enPassant);

    let bestMove = maximizingPlayer ? -Infinity : Infinity;
    let bestMoveFound: any = null;

    for (const tile of Object.keys(legalMoves)) {
        for (const move of legalMoves[tile]) {
            const boardCopy = JSON.parse(JSON.stringify(board));
            const newBoard = makeMove(boardCopy, tile, move);

            const result = minimax(newBoard, depth - 1, !maximizingPlayer, alpha, beta, maxDepth, casteling, enPassant);

            if (maximizingPlayer) {
                if (result > bestMove) {
                    bestMove = result;
                    if (maxDepth === depth) bestMoveFound = { tile, move };
                }

                alpha = Math.max(alpha, bestMove);
                if (beta <= alpha) return bestMove;
            } else {
                if (result < bestMove) {
                    bestMove = result;
                    if (maxDepth === depth) bestMoveFound = { tile, move };
                }

                beta = Math.min(beta, bestMove);
                if (beta <= alpha) return bestMove;
            }
        }
    }

    return maxDepth === depth ? bestMoveFound : bestMove;
};
