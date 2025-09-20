import { useState } from "react";
import * as gameUtils from "./gameUtils";
import Board from "./Board";

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

  const boardSquares = boardSquaresHistory[turnNumber];
  const winningLine = gameUtils.getWinningLine(boardSquares);
  const highlightedSquares = Array(9).fill(false);

  if (winningLine) {
    for (let i = 0; i < winningLine.length; i++) {
      highlightedSquares[winningLine[i]] = true;
    }
  } else {
    if (turnNumber > 0) {
      highlightedSquares[playerActionHistory[turnNumber - 1]] = true;
    }
  }

  const playersHeaderRow = gameUtils.players.map((player, i) => {
    return (
      <div className="block" style={{maxWidth: "100px"}}>
          <div>
            <span className="turn-history-header-text" >
              {player}
            </span>
        </div>
      </div>
    );
  });

  playersHeaderRow.splice(0, 0, (
    <div className="block" style={{maxWidth: "200px"}}>
      <div>
        <span className="turn-history-header-text">
          Turn
        </span>        
      </div>
    </div>
  ));

  const turnsTakenList = [];

  turnsTakenList.push(
    <div className="block turn-history-row" style={{"flexDirection": "row"}}>
      {playersHeaderRow}
    </div>
  )

  for (let i = 0; i < playerActionHistory.length; i += gameUtils.players.length) {
    const playerActionsDuringTurn = playerActionHistory.slice(i, i + gameUtils.players.length);

    const playerActionsDuringTurnButtons = playerActionsDuringTurn.map((playerAction, j) => {
      const iteratedTurnNumber = i + j + 1;

      let className;
      if (turnNumber == iteratedTurnNumber) {
        className = "turn-history-btn turn-history-btn-highlighted";
      } else {
        className = "turn-history-btn";
      }

      return (
        <div className="block" style={{maxWidth: "100px"}}>
          <div>
            <button className={className} onClick={() => setTurnNumber(iteratedTurnNumber)}>
              {gameUtils.getCellDisplayNumber(playerAction)}
            </button>
          </div>
        </div>
      );
    });

    playerActionsDuringTurnButtons.splice(0, 0, (
      <div className="block" style={{maxWidth: "200px"}}>
        <div>
          <span className="turn-history-header-text">
            {i / gameUtils.players.length + 1}.
          </span>
        </div>
      </div>
    ));

    turnsTakenList.push(
      <div className="block turn-history-row" style={{"flexDirection": "row"}}>
        {playerActionsDuringTurnButtons}
      </div>
    );
  }

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
        <div className="turn-history">
          {turnsTakenList}
        </div>
      </div>
    </div>
  );
}
