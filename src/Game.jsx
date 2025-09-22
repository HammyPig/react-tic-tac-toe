import { useState } from "react";
import * as gameUtils from "./gameUtils";
import Board from "./Board";
import TurnNavigation from "./TurnNavigation";

export default function Game() {
  const [boardSquaresHistory, setBoardSquaresHistory] = useState([Array(9).fill(null)]);
  const [playerActionHistory, setPlayerActionHistory] = useState([]);
  const [turnNumber, setTurnNumber] = useState(0);

  function handlePlay(cellId) {
    const player = gameUtils.getPlayerTurn(turnNumber);
    setPlayerActionHistory([...playerActionHistory.slice(0, turnNumber), cellId]);

    const boardSquares = boardSquaresHistory[turnNumber];
    const nextBoardSquares = boardSquares.slice();
    nextBoardSquares[cellId] = player;
    setBoardSquaresHistory([...boardSquaresHistory.slice(0, turnNumber + 1), nextBoardSquares]);

    const nextTurnNumber = turnNumber + 1;
    setTurnNumber(nextTurnNumber);
  }

  function handleGameReset() {
    setBoardSquaresHistory([Array(9).fill(null)]);
    setPlayerActionHistory([]);
    setTurnNumber(0);
  }

  const boardSquares = boardSquaresHistory[turnNumber];
  const winningLine = gameUtils.getWinningLine(boardSquares);
  const highlightedSquares = Array(9).fill(false);
  let isBoardDisabled = false;

  if (winningLine) {
    for (let i = 0; i < winningLine.length; i++) {
      highlightedSquares[winningLine[i]] = true;
    }

    isBoardDisabled = true;
  } else {
    if (turnNumber > 0) {
      highlightedSquares[playerActionHistory[turnNumber - 1]] = true;
    }
  }

  return (
    <div className="block game">
      <div className="block">
        <Board
          squares={boardSquares}
          highlightedSquares={highlightedSquares}
          turnNumber={turnNumber}
          onPlay={handlePlay}
          isDisabled={isBoardDisabled}
        />
      </div>
      <div className="block">
        <TurnNavigation
          boardSquaresHistory={boardSquaresHistory}
          playerActionHistory={playerActionHistory}
          turnNumber={turnNumber}
          setTurnNumber={setTurnNumber}
          onGameReset={handleGameReset}
        />
      </div>
    </div>
  );
}
