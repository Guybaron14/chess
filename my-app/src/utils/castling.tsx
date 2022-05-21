export interface returnFromBackend {
    [castling: string]: Array<string>;
}

export const markCastling = (board: string[][], tile: string, boardLegalMoves: returnFromBackend) => {
    const tempBoard = [...board];

    if (boardLegalMoves.castling) {
        if (tile === '60') {
            console.log('abil]lel');
            console.log(boardLegalMoves['castling']);

            if (boardLegalMoves['castling'].includes('O-O-O')) {
                tempBoard[7][2] += '#';
            }
            if (boardLegalMoves['castling'].includes('O-O')) {
                console.log('guya');

                tempBoard[7][6] += '#';
            }
        }
        if (tile === '4') {
            if (boardLegalMoves['castling'].includes('O-O-O')) {
                tempBoard[0][2] += '#';
            }
            if (boardLegalMoves['castling'].includes('O-O')) {
                tempBoard[0][6] += '#';
            }
        }
    }

    return tempBoard;
};

export const checkCastling = (board: string[][], tile: string, currPiece: string, castlingOptions: string) => {
    let isCastlingDone = false;
    let newBoard = [...board];
    let newCastlingOptions = castlingOptions;

    if (currPiece === '60') {
        if (tile === '62') {
            const { tempBoard, newCastlingOptionsReturn } = makeCastling(board, 'K', castlingOptions);
            newBoard = tempBoard;
            newCastlingOptions = newCastlingOptionsReturn;
            isCastlingDone = true;
        } else if (tile === '58') {
            const { tempBoard, newCastlingOptionsReturn } = makeCastling(board, 'Q', castlingOptions);
            newBoard = tempBoard;
            newCastlingOptions = newCastlingOptionsReturn;
            isCastlingDone = true;
        } else {
            newCastlingOptions = castlingOptions.replace('K', '').replace('Q', '');
        }
    } else if (currPiece === '4') {
        if (tile === '6') {
            const { tempBoard, newCastlingOptionsReturn } = makeCastling(board, 'k', castlingOptions);
            newBoard = tempBoard;
            newCastlingOptions = newCastlingOptionsReturn;
            isCastlingDone = true;
        } else if (tile === '2') {
            const { tempBoard, newCastlingOptionsReturn } = makeCastling(board, 'q', castlingOptions);
            newBoard = tempBoard;
            newCastlingOptions = newCastlingOptionsReturn;
            isCastlingDone = true;
        } else {
            newCastlingOptions = castlingOptions.replace('k', '').replace('q', '');
        }
    }
    return {newBoard, newCastlingOptions, isCastlingDone};
};

const makeCastling = (board: string[][], castlingType: string, castlingOptions: string) => {
    const tempBoard = [...board];
    let newCastlingOptions = castlingOptions;

    if (castlingType === 'K') {
        tempBoard[7][5] = tempBoard[7][7];
        tempBoard[7][7] = '0';
        tempBoard[7][6] = tempBoard[7][4];
        tempBoard[7][4] = '0';
        newCastlingOptions = castlingOptions.replace('K', '').replace('Q', '');
    } else if (castlingType === 'Q') {
        tempBoard[7][3] = tempBoard[7][0];
        tempBoard[7][0] = '0';
        tempBoard[7][2] = tempBoard[7][4];
        tempBoard[7][4] = '0';
        newCastlingOptions = castlingOptions.replace('K', '').replace('Q', '');
    } else if (castlingType === 'k') {
        tempBoard[0][5] = tempBoard[0][7];
        tempBoard[0][7] = '0';
        tempBoard[0][6] = tempBoard[0][4];
        tempBoard[0][4] = '0';
        newCastlingOptions = castlingOptions.replace('k', '').replace('q', '');
    } else {
        tempBoard[0][3] = tempBoard[0][0];
        tempBoard[0][0] = '0';
        tempBoard[0][2] = tempBoard[0][4];
        tempBoard[0][4] = '0';
        newCastlingOptions = castlingOptions.replace('k', '').replace('q', '');
    }

    return { tempBoard, newCastlingOptionsReturn: newCastlingOptions };
};
