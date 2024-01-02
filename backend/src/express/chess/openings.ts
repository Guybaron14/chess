import { games } from './bot/openings';
import { Board, EMPTY } from './types';
import { tileNumberToString } from './utils';

export const handleOpening = (board: Board) => {
    const game = games.find((game) => game.some((tempBoard) => JSON.stringify(tempBoard) === JSON.stringify(board)));

    if (game) {
        const index = game.findIndex((tempBoard) => JSON.stringify(tempBoard) === JSON.stringify(board));

        const currBoard = game[index];
        const nextBoard = game[index + 1];
        let tile;
        let move;

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (currBoard[i][j] !== EMPTY && nextBoard[i][j] === EMPTY) {
                    tile = tileNumberToString(i, j);
                }

                if (
                    (currBoard[i][j] === EMPTY && nextBoard[i][j] !== EMPTY) ||
                    (currBoard[i][j] !== EMPTY && nextBoard[i][j] !== currBoard[i][j])
                ) {
                    move = tileNumberToString(i, j);
                }
            }
        }

        console.log({ move, tile });
        return { move, tile };
    }

    return undefined;
};
