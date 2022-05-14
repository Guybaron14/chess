import React from "react";
import Draggable from "react-draggable";

type props = {
  piece: string;
};

const Piece: React.FC<props> = (props) => {
  return <Draggable><img alt="" src={props.piece} /></Draggable>;
};

export default Piece;
