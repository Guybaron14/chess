import React from "react";
import "./Piece.css";

type props = {
  piece: string;
};

const Piece: React.FC<props> = (props) => {
  return <img alt="" src={props.piece} />;
};

export default Piece;
