import { useState } from "react";

const players = ["X", "O"];

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, turnNumber, onPlay }) {
  function handleClick(i) {
    if (squares[i] || getWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = getPlayerTurn(turnNumber);
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
    statusMessage = "Player Turn: " + getPlayerTurn(turnNumber);
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
  const [boardSquaresHistory, setBoardSquaresHistory] = useState([Array(9).fill(null)]);
  const [turnNumber, setTurnNumber] = useState(0);

  function handlePlay(nextBoardSquares) {
    setBoardSquaresHistory([...boardSquaresHistory.slice(0, turnNumber + 1), nextBoardSquares]);

    const nextTurnNumber = turnNumber + 1;
    setTurnNumber(nextTurnNumber);
  }

  const boardSquares = boardSquaresHistory[turnNumber];
  const turnsTakenList = boardSquaresHistory.map((boardSquares, i) => {
    let description;
    if (i == 0) {
      description = "Go to game start";
    } else {
      description = "Go to turn #" + i;
    }

    return (
      <li key={i}>
        <button onClick={() => setTurnNumber(i)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={boardSquares} turnNumber={turnNumber} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{turnsTakenList}</ol>
      </div>
    </div>
  );
}

function getPlayerTurn(turnNumber) {
  return players[turnNumber % players.length];
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
