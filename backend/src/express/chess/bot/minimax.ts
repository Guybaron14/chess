import { makeMove, undoMove } from '../check';
import { getLegalMoves } from '../moves';
import { Board } from '../types';
import { evaluate } from './evaluate';

let count = 0;

export const minimax = (
    board: Board,
    depth: number,
    maximizingPlayer: boolean,
    alpha: number,
    beta: number,
    maxDepth: number,
    casteling: string,
    enPassant?: string,
): { evaluation: number; tile: string | null; move: string | null } => {
    if (maxDepth === depth) {
        count = 0;
    }

    if (depth === 0) return { evaluation: evaluate(board), tile: null, move: null };

    const legalMoves = getLegalMoves(board, maximizingPlayer ? 'w' : 'b', casteling, enPassant);
    const legalMovesArr = Object.keys(legalMoves);

    let bestTile: string | null = null;
    let bestMove: string | null = null;

    for (const tile of legalMovesArr) {
        for (const move of legalMoves[tile]) {
            const { pieceEaten, didPromote } = makeMove(board, tile, move);
            if ((pieceEaten === 'Q' || pieceEaten === 'q') && depth === 1) depth++;

            count++;
            if (count % 1000000 === 0) console.log(`${count / 1000000} Million`);

            const result = minimax(board, depth - 1, !maximizingPlayer, alpha, beta, maxDepth, casteling, enPassant);
            undoMove(board, tile, move, pieceEaten, didPromote);

            if (maximizingPlayer) {
                if (result.evaluation >= beta) return result;
                if (alpha < result.evaluation) {
                    alpha = result.evaluation;
                    bestTile = tile;
                    bestMove = move;
                    if (result.evaluation > 1300)
                        return { evaluation: result.evaluation, tile: bestTile, move: bestMove };
                }
            } else {
                if (depth === maxDepth) console.log(result, tile, move);

                if (result.evaluation <= alpha) return result;
                if (beta > result.evaluation) {
                    beta = result.evaluation;
                    bestTile = tile;
                    bestMove = move;
                    if (result.evaluation < -1300)
                        return { evaluation: result.evaluation, tile: bestTile, move: bestMove };
                }
            }
        }
    }

    return { evaluation: maximizingPlayer ? alpha : beta, tile: bestTile, move: bestMove };
};
