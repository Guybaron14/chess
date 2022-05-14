import React from "react";
import Tile from "./Tile";
import "./styles/Board.css";

const Board: React.FC<{}> = (props) => {
  const tiles = [];
  for (let i = 0; i < 64; i++) {
    let color;
    if (Math.floor(i / 8) % 2) {
      color = i % 2 ? "black" : "white";
    } else {
      color = i % 2 ? "white" : "black";
    }
    tiles.push(<Tile color={color} key={i} />);
  }
  return <div className="board">{tiles}</div>;
};

export default Board;
