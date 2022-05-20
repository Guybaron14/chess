import React from "react";
import Piece from "../Piece/Piece";
import "./Tile.css";

type props = { color: string; index: number; handleClick: (tileIndex: string) => void; piece?: string };

const Tile: React.FC<props> = (props) => {
  const tileClicked = () => {
    props.handleClick(props.index.toString());
  };

  const className = `tile ${props.color}`;
  return (
    <div onClick={tileClicked} className={className}>
      {props.piece && <Piece piece={props.piece} />}
    </div>
  );
};

export default Tile;
