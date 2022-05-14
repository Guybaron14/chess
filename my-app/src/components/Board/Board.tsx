import React from "react";
import Tile from "../Tile/Tile";
import "./Board.css";
import blackPawn from "../../images/blackPawn.png";
import whitePawn from "../../images/whitePawn.png";
import blackRook from "../../images/blackRook.png";
import whiteRook from "../../images/whiteRook.png";
import blackKnight from "../../images/blackKnight.png";
import whiteKnight from "../../images/whiteKnight.png";
import blackBishop from "../../images/blackBishop.png";
import whiteBishop from "../../images/whiteBishop.png";
import blackQueen from "../../images/blackQueen.png";
import whiteQueen from "../../images/whiteQueen.png";
import blackKing from "../../images/blackKing.png";
import whiteKing from "../../images/whiteKing.png";

const Board: React.FC<{}> = () => {
  const determineColor = () => {
    if (Math.floor(tiles.length / 8) % 2) {
      return tiles.length % 2 ? "white" : "black";
    } else {
      return tiles.length % 2 ? "black" : "white";
    }
  };

  const game = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
  const tiles = [];
  for (let char of game) {
    //check if char is numeric
    if (char.match(/[1-8]/)) {
      for (let i = 0; i < parseInt(char); i++) {
        const color = determineColor();
        tiles.push(<Tile color={color} key={tiles.length} />);
      }
    } else {
      const color = determineColor();
      switch (char) {
        case "p":
          tiles.push(<Tile color={color} piece={blackPawn} key={tiles.length} />);
          break;
        case "r":
          tiles.push(<Tile color={color} piece={blackRook} key={tiles.length} />);
          break;
        case "n":
          tiles.push(<Tile color={color} piece={blackKnight} key={tiles.length} />);
          break;
        case "b":
          tiles.push(<Tile color={color} piece={blackBishop} key={tiles.length} />);
          break;
        case "q":
          tiles.push(<Tile color={color} piece={blackQueen} key={tiles.length} />);
          break;
        case "k":
          tiles.push(<Tile color={color} piece={blackKing} key={tiles.length} />);
          break;
        case "P":
          tiles.push(<Tile color={color} piece={whitePawn} key={tiles.length} />);
          break;
        case "R":
          tiles.push(<Tile color={color} piece={whiteRook} key={tiles.length} />);
          break;
        case "N":
          tiles.push(<Tile color={color} piece={whiteKnight} key={tiles.length} />);
          break;
        case "B":
          tiles.push(<Tile color={color} piece={whiteBishop} key={tiles.length} />);
          break;
        case "Q":
          tiles.push(<Tile color={color} piece={whiteQueen} key={tiles.length} />);
          break;
        case "K":
          tiles.push(<Tile color={color} piece={whiteKing} key={tiles.length} />);
          break;
        default:
          break;
      }
    }
  }

  return <div className="board">{tiles}</div>;
};

export default Board;
