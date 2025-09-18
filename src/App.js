import { useState } from "react";

const players = ["X", "O"];

function Square({ value, onSquareClick, isHighlighted }) {
  let highlightedStyle;
  if (isHighlighted) {
    highlightedStyle = {"backgroundColor": "yellow"};
  } else {
    highlightedStyle = {};
  }

  return (
    <button className="square" style={highlightedStyle} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, highlightedSquares, turnNumber, onPlay }) {
  function handleClick(cellId) {
    if (squares[cellId] || getWinner(squares)) {
      return;
    }

    onPlay(cellId);
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
          <Square key={cellId} value={squares[cellId]} isHighlighted={highlightedSquares[cellId]} onSquareClick={() => handleClick(cellId)} />
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

function Game() {
  const [boardSquaresHistory, setBoardSquaresHistory] = useState([Array(9).fill(null)]);
  const [playerActionHistory, setPlayerActionHistory] = useState([]);
  const [turnNumber, setTurnNumber] = useState(0);
  const [isTurnHistoryInAscendingOrder, setIsTurnHistoryInAscendingOrder] = useState(true);

  function handlePlay(cellId) {
    const player = getPlayerTurn(turnNumber);
    setPlayerActionHistory([...playerActionHistory.slice(0, turnNumber), [player, cellId]]);

    const boardSquares = boardSquaresHistory[turnNumber];
    const nextBoardSquares = boardSquares.slice();
    nextBoardSquares[cellId] = player;
    setBoardSquaresHistory([...boardSquaresHistory.slice(0, turnNumber + 1), nextBoardSquares]);

    const nextTurnNumber = turnNumber + 1;
    setTurnNumber(nextTurnNumber);
  }

  function handleToggleTurnHistorySortOrder() {
    setIsTurnHistoryInAscendingOrder(!isTurnHistoryInAscendingOrder);
  }

  const boardSquares = boardSquaresHistory[turnNumber];
  const winningLine = getWinningLine(boardSquares);
  const highlightedSquares = Array(9).fill(false);

  if (winningLine) {
    for (let i = 0; i < winningLine.length; i++) {
      highlightedSquares[winningLine[i]] = true;
    }
  } else {
    if (turnNumber > 0) {
      highlightedSquares[playerActionHistory[turnNumber - 1][1]] = true;
    }
  }

  const turnsTakenList = boardSquaresHistory.map((boardSquares, i) => {
    let turnNumberAsText;
    if (i == 0) {
      turnNumberAsText = "game start";
    } else {
      turnNumberAsText = `turn #${i} (${playerActionHistory[i - 1]})`
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

  const orderedTurnsTakenList = isTurnHistoryInAscendingOrder ? turnsTakenList : [...turnsTakenList].reverse();
  const turnHistorySortButtonText = "Sort by " + (isTurnHistoryInAscendingOrder ? "ascending" : "descending");

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={boardSquares} highlightedSquares={highlightedSquares} turnNumber={turnNumber} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={handleToggleTurnHistorySortOrder}>
          {turnHistorySortButtonText}
        </button>
        <ol>{orderedTurnsTakenList}</ol>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <section className="section">
      <div className="container">
        <Game />
      </div>
    </section>
  )
}

function getPlayerTurn(turnNumber) {
  return players[turnNumber % players.length];
}

function getWinningLine(squares) {
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
      return winningLines[i];
    }
  }

  return null;
}

function getWinner(squares) {
  const winningLine = getWinningLine(squares);
  const winner = winningLine ? squares[winningLine[0]] : null;
  return winner;
}
