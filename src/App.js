import { useState } from "react";

const players = ["X", "O"];

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, playerTurn, onPlay }) {
  function handleClick(i) {
    if (squares[i] || getWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = players[playerTurn];
    onPlay(nextSquares);
  }

  const winner = getWinner(squares);
  const isGameOver = !squares.includes(null) || winner
  let statusMessage;

  if (isGameOver) {
    if (winner) {
      statusMessage = "Player " + winner + " wins!";
    } else {
      statusMessage = "It's a draw!"
    }
  } else {
    statusMessage = "Player Turn: " + (players[playerTurn]);
  }

  return (
    <>
      <div className="status">{statusMessage}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [playerTurn, setPlayerTurn] = useState(0);
  const [boardSquaresHistory, setBoardSquaresHistory] = useState([Array(9).fill(null)]);

  function handlePlay(nextBoardSquares) {
    setBoardSquaresHistory([...boardSquaresHistory, nextBoardSquares]);
    setPlayerTurn((playerTurn + 1) % players.length);
  }

  const boardSquares = boardSquaresHistory[boardSquaresHistory.length - 1];

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={boardSquares} playerTurn={playerTurn} onPlay={handlePlay} />
      </div>
    </div>
  );
}

function getWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] == squares[c]) {
      return squares[a];
    }
  }

  return null;
}
