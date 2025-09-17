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

  function renderGrid() {
    const grid = [];
    const nRows = Math.sqrt(squares.length);
    const nCols = nRows;

    for (let r = 0; r < nRows; r++) {
      const row = [];

      for (let c = 0; c < nCols; c++) {
        const cellId = r * nCols + c;
        row.push(
          <Square key={cellId} value={squares[cellId]} onSquareClick={() => handleClick(cellId)} />
        );
      }

      grid.push(
        <div key={r} className="board-row">
          {row}
        </div>
      );
    }
    
    return grid;
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
      {renderGrid()}
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
    let turnNumberAsText;
    if (i == 0) {
      turnNumberAsText = "game start";
    } else {
      turnNumberAsText = "turn #" + i;
    }

    const currentTurnText = (
      <li key={i}>
        <p>
          {"You are at " + turnNumberAsText}
        </p>
      </li>
    );

    const goToTurnButton = (
      <li key={i}>
        <button onClick={() => setTurnNumber(i)}>
          {"Go to " + turnNumberAsText}
        </button>
      </li>
    );

    let content;
    if (turnNumber == i) {
      content = currentTurnText;
    } else {
      content = goToTurnButton;
    }

    return content;
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
