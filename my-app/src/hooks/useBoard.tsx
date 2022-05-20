import { useState } from 'react';
import { convertTileToNumber, tileNumToRowCol } from '../utils/utils';

export const useBoard = (): [Array<Array<string>>, (tile: string) => void] => {
    const [board, setBoard] = useState<Array<Array<string>>>([
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0', '0', '0'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ]);
    const [currPiece, setCurrPiece] = useState<string>('');
    const [currTurn, setCurrTurn] = useState<string>('w');
    const boardLegalMoves = { b2: ['b3', 'b4'], b7: ['b6', 'b5'] };

    const checkIfCurrTurn = (pieceString: string) => {
        if (currTurn === 'w') {
            return pieceString.charAt(0) === pieceString.charAt(0).toUpperCase();
        } else {
            return pieceString.charAt(0) === pieceString.charAt(0).toLowerCase();
        }
    };

    const clearTargets = () => {
        const tempBoard = [...board];
        for (let i = 0; i < tempBoard.length; i++) {
            for (let j = 0; j < tempBoard[i].length; j++) {
                if (tempBoard[i][j] === '#') {
                    tempBoard[i][j] = '0';
                }
            }
        }

        setBoard(tempBoard);
    };

    const pieceSelected = (tile: string) => {
        const tempBoard = [...board];
        const [row, col] = tileNumToRowCol(tile);
        const selectedPiece = tempBoard[row][col];
        clearTargets();

        if (selectedPiece === '#') {
            makeMove(currPiece, tile);
            setCurrPiece('');
            setCurrTurn(currTurn === 'w' ? 'b' : 'w');
            return;
        }

        if (selectedPiece === '0' || !checkIfCurrTurn(selectedPiece) || selectedPiece === currPiece) {
            setCurrPiece('');
            return;
        }

        setCurrPiece(tile);
        for (const [pieceInLegalMoves, legalMoves] of Object.entries(boardLegalMoves)) {
            if (convertTileToNumber(pieceInLegalMoves) === Number(tile) && checkIfCurrTurn(selectedPiece)) {
                for (const move of legalMoves) {
                    const moveTile = convertTileToNumber(move);
                    tempBoard[Math.floor(moveTile / 8)][moveTile % 8] = '#';
                }
            }
        }

        setBoard(tempBoard);
    };

    const makeMove = (tile: string, target: string) => {
        const [tileRow, tileCol] = tileNumToRowCol(tile);
        const [targetRow, targetCol] = tileNumToRowCol(target);
        const tempBoard = [...board];

        tempBoard[targetRow][targetCol] = tempBoard[tileRow][tileCol];
        tempBoard[tileRow][tileCol] = '0';

        setBoard(tempBoard);
    };

    return [board, pieceSelected];
};
