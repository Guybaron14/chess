import { useEffect, useState } from 'react';
import { convertTileToNumber, tileNumberToString, tileNumToRowCol } from '../utils/utils';
import axios from 'axios';
import { checkCastling, markCastling, returnFromBackend } from '../utils/castling';

export const useBoard = (): [Array<Array<string>>, (tile: string) => void, boolean] => {
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
    const [isBotLoading, setIsBotLoading] = useState<boolean>(false);
    const [currPiece, setCurrPiece] = useState<string>('');
    const [currTurn, setCurrTurn] = useState<string>('w');
    const [enPassant, setEnPassant] = useState<string>('');
    const [castlingOptions, setCastlingOptions] = useState<string>('KQkq');
    const [boardLegalMoves, setBoardLegalMoves] = useState<returnFromBackend | { tile: string; move: string }>({});

    useEffect(() => {
        const fetchBoard = async () => {
            if (!board.some((row: any[]) => row.some((tile: string) => tile.includes('#')))) {
                if (currTurn === 'b') setIsBotLoading(true);
                const moves = (
                    await axios.post(`http://localhost:8080/api/${currTurn}-${castlingOptions}-${enPassant}-0`, {
                        board: board,
                    })
                ).data;

                setIsBotLoading(false);
                setBoardLegalMoves(moves);
            }
        };
        fetchBoard();
    }, [board, currTurn]);

    useEffect(() => {
        if (currTurn === 'b' && 'tile' in boardLegalMoves) {
            const { newBoard, newCastlingOptions, isCastlingDone } = checkCastling(
                board,
                boardLegalMoves.move as string,
                boardLegalMoves.move as string,
                castlingOptions,
            );
            setBoard(newBoard);
            setCastlingOptions(newCastlingOptions);

            if (!isCastlingDone)
                makeMove(
                    convertTileToNumber(boardLegalMoves.tile as string),
                    convertTileToNumber(boardLegalMoves.move as string),
                );
            setCurrTurn('w');
        }
    }, [boardLegalMoves, currTurn]);

    useEffect(() => {
        setInterval(() => {
            if (Object.values(boardLegalMoves).length === 0 && Object.keys(boardLegalMoves).length >= 1)
                alert('Checkmate!');
        }, 1000);
    }, []);

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
                setBoard(markCastling(board, tile, boardLegalMoves as returnFromBackend));
                for (const move of legalMoves) {
                    const moveTile = convertTileToNumber(move);
                    tempBoard[Math.floor(moveTile / 8)][moveTile % 8] += '#';
                }
            }
        }

        setBoard(tempBoard);
    };

    const makeMove = (tile: any, target: any) => {
        const [tileRow, tileCol] = tileNumToRowCol(tile);
        const [targetRow, targetCol] = tileNumToRowCol(target);
        const tempBoard = [...board];

        if (makeEnPassant(tempBoard, tile, target)) return;

        if (tempBoard[tileRow][tileCol] === 'p' && targetRow === 7) {
            tempBoard[targetRow][targetCol] = 'q';
        } else if (tempBoard[tileRow][tileCol] === 'P' && targetRow === 0) {
            tempBoard[targetRow][targetCol] = 'Q';
        } else {
            tempBoard[targetRow][targetCol] = tempBoard[tileRow][tileCol];
        }

        tempBoard[tileRow][tileCol] = '0';

        checkPossibleEnPassant(tile, target);
        setBoard(tempBoard);
    };

    const checkPossibleEnPassant = (tile: string, target: string) => {
        const [tileRow, tileCol] = tileNumToRowCol(tile);
        const [targetRow, targetCol] = tileNumToRowCol(target);

        if (
            (Math.abs(tileRow - targetRow) === 2 && board[targetRow][targetCol] === 'p') ||
            board[targetRow][targetCol] === 'P'
        ) {
            if (tileRow === 1) {
                setEnPassant(tileNumberToString(2, tileCol));
            } else {
                setEnPassant(tileNumberToString(5, tileCol));
            }
        } else {
            setEnPassant('');
        }
    };

    const makeEnPassant = (board: string[][], tile: string, target: string) => {
        const [tileRow, tileCol] = tileNumToRowCol(tile);
        const [targetRow, targetCol] = tileNumToRowCol(target);

        if (
            Math.abs(tileCol - targetCol) === 1 &&
            board[targetRow][targetCol] === '0' &&
            (board[tileRow][tileCol] === 'p' || board[tileRow][tileCol] === 'P')
        ) {
            board[targetRow][targetCol] = board[tileRow][tileCol];
            board[tileRow][tileCol] = '0';

            if (targetRow === 2) {
                board[3][targetCol] = '0';
            } else {
                board[4][targetCol] = '0';
            }

            setBoard(board);
            return true;
        } else {
            return false;
        }
    };

    return [board, pieceSelected, isBotLoading];
};
