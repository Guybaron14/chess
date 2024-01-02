import { makeMove, undoMove } from '../check';
import { getLegalMoves } from '../moves';
import { BLACK, Board, KING_BLACK, KING_WHITE, Move, WHITE } from '../types';
import { tileNumberToString } from '../utils';
import { evaluate } from './evaluate';

let count = 0;

export const minimax = (
    board: Board,
    depth: number,
    maximizingPlayer: boolean,
    alpha: number,
    beta: number,
    maxDepth: number,
    greediness: number,
    casteling: string,
    enPassant?: string,
): { evaluation: number; tile: string | null; move: string | null } => {
    if (maxDepth === depth) count = 0;

    if (depth === 0) return { evaluation: evaluate(board), tile: null, move: null };

    const legalMoves = getLegalMoves(board, maximizingPlayer ? WHITE : BLACK, casteling, enPassant);

    let legalMovesArr: (Move & { tile: string })[] = [];
    const keys = Object.keys(legalMoves);
    for (let i = 0; i < keys.length; i++)
        legalMovesArr = legalMovesArr.concat(legalMoves[keys[i]].map((move) => ({ ...move, tile: keys[i] })));

    legalMovesArr.sort((a, b) => b.score - a.score);

    if (!legalMovesArr.length) {
        const kingNumberPosition = board
            .flat()
            .findIndex((piece) => piece === (maximizingPlayer ? KING_WHITE : KING_BLACK));
        const kingPosition = tileNumberToString(Math.floor(kingNumberPosition / 8), kingNumberPosition % 8);

        const otherPlayerLegalMoves = getLegalMoves(board, maximizingPlayer ? BLACK : WHITE, casteling, enPassant);

        if (!Object.values(otherPlayerLegalMoves).some((moves) => moves.some(({ move }) => move === kingPosition))) {
            return { evaluation: 0, tile: null, move: null };
        }
    }

    let bestTile: string | null = null;
    let bestMove: string | null = null;

    for (const { tile, move } of legalMovesArr) {
        const { pieceEaten, didPromote } = makeMove(board, tile, move);

        count++;
        if (count % 1000000 === 0) console.log(`${count / 1000000} Million`);

        const result = minimax(
            board,
            depth - 1,
            !maximizingPlayer,
            alpha,
            beta,
            maxDepth,
            greediness,
            casteling,
            enPassant,
        );

        undoMove(board, tile, move, pieceEaten, didPromote);

        if (maximizingPlayer) {
            if (result.evaluation >= beta) return { evaluation: result.evaluation, tile: tile, move: move };
            if (alpha < result.evaluation) {
                alpha = result.evaluation;
                bestTile = tile;
                bestMove = move;
                if (result.evaluation > greediness)
                    return { evaluation: result.evaluation, tile: bestTile, move: bestMove };
            }
        } else {
            if (depth === maxDepth) console.log(result, tile, move);

            if (result.evaluation <= alpha) return { evaluation: result.evaluation, tile: tile, move: move };
            if (beta > result.evaluation) {
                beta = result.evaluation;
                bestTile = tile;
                bestMove = move;
                if (result.evaluation < -greediness)
                    return { evaluation: result.evaluation, tile: bestTile, move: bestMove };
            }
        }
    }

    return { evaluation: maximizingPlayer ? alpha : beta, tile: bestTile, move: bestMove };
};
