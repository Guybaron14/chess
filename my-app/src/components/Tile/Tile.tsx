import React from 'react';
import Piece from '../Piece/Piece';
import './Tile.css';

type props = {
    color: string;
    index: number;
    handleClick: (tileIndex: string) => void;
    piece?: string;
    targetTile?: boolean;
};

const Tile: React.FC<props> = (props) => {
    const tileClicked = () => {
        props.handleClick(props.index.toString());
    };

    const className = `tile ${props.color}`;
    const transparent = props.targetTile ? 'tile transparent' : `tile ${props.color}`;

    return (
        <div onClick={tileClicked} className={className}>
            <div className={transparent}>{props.piece && <Piece piece={props.piece} />}</div>
        </div>
    );
};

export default Tile;
