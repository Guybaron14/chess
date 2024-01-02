// import { movesMap } from '../moves';
// import { games } from './games';
// import * as fs from 'fs';

// const gamesArr = games.map((game) => game.split(' '));

// const strToCol = (str) => {
//     switch (str) {
//         case 'a':
//             return 0;
//         case 'b':
//             return 1;
//         case 'c':
//             return 2;
//         case 'd':
//             return 3;
//         case 'e':
//             return 4;
//         case 'f':
//             return 5;
//         case 'g':
//             return 6;
//         case 'h':
//             return 7;
//         default:
//             return 8;
//     }
// };

// const makeMove = (board, move, turn) => {
//     if (move.length === 2) {
//         const column = strToCol(move.split('')[0]);
//         const row = 8 - move.split('')[1];

//         if (turn === 'w') {
//             board[row][column] = 'P';
//             if (board[row + 2][column] === 'P') {
//                 board[row + 2][column] = '0';
//             }
//             board[row + 1][column] = '0';
//         } else {
//             board[row][column] = 'p';
//             if (board[row - 2][column] === 'p') {
//                 board[row - 2][column] = '0';
//             }
//             board[row - 1][column] = '0';
//         }
//     } else if (move.length === 3) {
//         const piece = move.split('')[0];
//         const column = strToCol(move.split('')[1]);
//         const row = 8 - move.split('')[2];

//         for (let i = 0; i < 8; i++) {
//             for (let j = 0; j < 8; j++) {
//                 if (
//                     board[i][j].toUpperCase() === piece &&
//                     (turn === 'w'
//                         ? board[i][j].toUpperCase() === board[i][j]
//                         : board[i][j].toLowerCase() === board[i][j])
//                 ) {
//                     if (movesMap[piece](board, i, j, turn).some((movess) => movess.move === move.slice(1, 3))) {
//                         board[i][j] = '0';
//                         board[row][column] = turn === 'w' ? piece : piece.toLowerCase();
//                     }
//                 }
//             }
//         }
//     }
//     // } else if (move.length === 4) {
//     //     const piece = move.split('')[0] === 'c' ? 'P' : move.split('')[0];
//     //     const column = strToCol(move.split('')[2]);
//     //     const row = 8 - move.split('')[1];

//     //     for (let i = 0; i < 8; i++) {
//     //         for (let j = 0; j < 8; j++) {
//     //             if (
//     //                 board[i][j].toUpperCase() === piece && turn === 'w'
//     //                     ? board[i][j].toUpperCase() === board[i][j]
//     //                     : board[i][j].toLowerCase() === board[i][j]
//     //             ) {
//     //                 console.log(piece);
//     //                 if (movesMap[piece](board, i, j, turn).includes(move.slice(2, 4))) {
//     //                     board[i][j] = '0';
//     //                     board[row][column] = turn === 'w' ? piece : piece.toLowerCase();
//     //                 }
//     //             }
//     //         }
//     //     }
//     // }
// };

// const trimmed = gamesArr
//     .map((game) => game.slice(0, 8))
//     .filter(
//         (game) =>
//             !game.some((move) => move.includes('+') || move.includes('O') || move.includes('cx') || move.length >= 4),
//     );

// console.log(trimmed.length);

// fs.appendFileSync('./src/express/chess/bot/games.json', '[');

// for (const game of trimmed) {
//     const board = [
//         ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
//         ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
//         ['0', '0', '0', '0', '0', '0', '0', '0'],
//         ['0', '0', '0', '0', '0', '0', '0', '0'],
//         ['0', '0', '0', '0', '0', '0', '0', '0'],
//         ['0', '0', '0', '0', '0', '0', '0', '0'],
//         ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
//         ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
//     ];

//     let turn = 'w';
//     fs.appendFileSync('./src/express/chess/bot/games.json', '[');

//     for (const move of game) {
//         makeMove(board, move, turn);
//         turn = turn === 'w' ? 'b' : 'w';
//         fs.appendFileSync('./src/express/chess/bot/games.json', JSON.stringify(board) + ',');
//     }
//     fs.appendFileSync('./src/express/chess/bot/games.json', '],');
// }

// fs.appendFileSync('./src/express/chess/bot/games.json', ']');
