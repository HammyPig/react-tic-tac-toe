import { useState } from "react";
import * as gameUtils from "./gameUtils";
import Board from "./Board";

export default function Game() {
  const [boardSquaresHistory, setBoardSquaresHistory] = useState([Array(9).fill(null)]);
  const [playerActionHistory, setPlayerActionHistory] = useState([]);
  const [turnNumber, setTurnNumber] = useState(0);
  const [isTurnHistoryInAscendingOrder, setIsTurnHistoryInAscendingOrder] = useState(true);

  function handlePlay(cellId) {
    const player = gameUtils.getPlayerTurn(turnNumber);
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
  const winningLine = gameUtils.getWinningLine(boardSquares);
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
      const [player, cellId] = playerActionHistory[i - 1];
      const cellDisplayNumber = gameUtils.getCellDisplayNumber(cellId);
      turnNumberAsText = `turn #${i} (${player}, ${cellDisplayNumber})`
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

  const winner = gameUtils.getWinner(boardSquares);
  const isGameOver = !boardSquares.includes(null) || winner

  let statusMessage;
  if (isGameOver) {
    if (winner) {
      statusMessage = "Player " + winner + " wins!";
    } else {
      statusMessage = "It's a draw!"
    }
  } else {
    statusMessage = "Player Turn: " + gameUtils.getPlayerTurn(turnNumber);
  }

  const orderedTurnsTakenList = isTurnHistoryInAscendingOrder ? turnsTakenList : [...turnsTakenList].reverse();
  const turnHistorySortButtonText = "Sort by " + (isTurnHistoryInAscendingOrder ? "ascending" : "descending");

  return (
    <div className="block game" style={{"flexDirection": "row"}}>
      <div className="block">
        <div className="game-board">
          <div className="game-border">
            <Board squares={boardSquares} highlightedSquares={highlightedSquares} turnNumber={turnNumber} onPlay={handlePlay} />
          </div>
        </div>
        <div className="status">{statusMessage}</div>
      </div>
      <div className="block">
        <div className="game-info">
          <button onClick={handleToggleTurnHistorySortOrder}>
            {turnHistorySortButtonText}
          </button>
          <ol>{orderedTurnsTakenList}</ol>
        </div>
      </div>
    </div>
  );
}
