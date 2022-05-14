import React from "react";
import './styles/Tile.css';

type props = { color: string };

const Tile: React.FC<props> = (props) => {
  const className = `tile ${props.color}`;
  return <div className={className}></div>;
};

export default Tile;
