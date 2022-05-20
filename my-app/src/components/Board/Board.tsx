import React from 'react';
import Tile from '../Tile/Tile';
import './Board.css';
import blackPawn from '../../images/blackPawn.png';
import whitePawn from '../../images/whitePawn.png';
import blackRook from '../../images/blackRook.png';
import whiteRook from '../../images/whiteRook.png';
import blackKnight from '../../images/blackKnight.png';
import whiteKnight from '../../images/whiteKnight.png';
import blackBishop from '../../images/blackBishop.png';
import whiteBishop from '../../images/whiteBishop.png';
import blackQueen from '../../images/blackQueen.png';
import whiteQueen from '../../images/whiteQueen.png';
import blackKing from '../../images/blackKing.png';
import whiteKing from '../../images/whiteKing.png';
import { useBoard } from '../../hooks/useBoard';

const Board: React.FC<{}> = () => {
    const [twoDBoard, pieceSelected] = useBoard();

    const determineColor = (currBoardLength: number) => {
        if (Math.floor(currBoardLength / 8) % 2) {
            return currBoardLength % 2 ? 'white' : 'black';
        } else {
            return currBoardLength % 2 ? 'black' : 'white';
        }
    };

    const board = [];
    const dictOfPieces = {
        P: whitePawn,
        p: blackPawn,
        R: whiteRook,
        r: blackRook,
        N: whiteKnight,
        n: blackKnight,
        B: whiteBishop,
        b: blackBishop,
        Q: whiteQueen,
        q: blackQueen,
        K: whiteKing,
        k: blackKing,
    };

    for (let i = 0; i < twoDBoard.length; i++) {
        for (let j = 0; j < twoDBoard[i].length; j++) {
            const color = determineColor(board.length);

            if (twoDBoard[i][j] === '0') {
                board.push(<Tile color={color} key={board.length} index={board.length} handleClick={pieceSelected} />);
            } else if (twoDBoard[i][j] === '#') {
                board.push(<Tile color="move" key={board.length} index={board.length} handleClick={pieceSelected} />);
            } else {
                board.push(
                    <Tile
                        color={color}
                        piece={dictOfPieces[twoDBoard[i][j] as keyof typeof dictOfPieces]}
                        key={board.length}
                        index={board.length}
                        handleClick={pieceSelected}
                    />,
                );
            }
        }
    }

    return <div className="board">{board}</div>;
};

export default Board;
