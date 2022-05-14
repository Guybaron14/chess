import React from "react";
import Piece from "../Piece/Piece";
import "./Tile.css";

type props = { color: string; piece?: string };

const Tile: React.FC<props> = (props) => {
  const className = `tile ${props.color}`;
  return <div className={className}>{props.piece && <Piece piece={props.piece} />}</div>;
};

export default Tile;
