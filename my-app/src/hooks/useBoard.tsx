import { useEffect, useState } from 'react';
import { convertTileToNumber, tileNumToRowCol } from '../utils/utils';
import axios from 'axios';
import { checkCastling, markCastling, returnFromBackend } from '../utils/castling';

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
    const [castlingOptions, setCastlingOptions] = useState<string>('KQkq');
    const [boardLegalMoves, setBoardLegalMoves] = useState<returnFromBackend>({});

    useEffect(() => {
        const fetchBoard = async () => {
            if (!board.some((row: any[]) => row.some((tile: string) => tile.includes('#')))) {
                setBoardLegalMoves(
                    (await axios.post(`http://localhost:8080/api/${currTurn}-${castlingOptions}--0`, { board: board }))
                        .data,
                );
            }
        };

        fetchBoard();
    }, [board, currTurn]);

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
                if (tempBoard[i][j].includes('#')) {
                    tempBoard[i][j] = tempBoard[i][j].replace('#', '');
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

        if (selectedPiece.includes('#')) {
            const { newBoard, newCastlingOptions, isCastlingDone } = checkCastling(
                board,
                tile,
                currPiece,
                castlingOptions,
            );
            setBoard(newBoard);
            setCastlingOptions(newCastlingOptions);

            if (!isCastlingDone) {
                makeMove(currPiece, tile);
            }
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
            if (convertTileToNumber(pieceInLegalMoves) === Number(tile)) {
                setBoard(markCastling(board, tile, boardLegalMoves));
                for (const move of legalMoves) {
                    const moveTile = convertTileToNumber(move);
                    tempBoard[Math.floor(moveTile / 8)][moveTile % 8] += '#';
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
