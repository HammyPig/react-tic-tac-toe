import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { RotateCcw } from "lucide-react";
import { Trophy } from "lucide-react";
import * as gameUtils from "./gameUtils";

export default function TurnNavigation({ boardSquaresHistory, playerActionHistory, turnNumber, setTurnNumber, onGameReset }) {
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
    <div className="block turn-history-row" style={{"flexDirection": "row", backgroundColor: "#dad8d6", borderRadius: "10px 10px 0px 0px"}}>
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
              {gameUtils.getWinningLine(boardSquaresHistory[iteratedTurnNumber]) ? (<Trophy color="#000" size={13} strokeWidth={1} />) : null}
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

  return (
    <div className="turn-navigation">
      {turnsTakenList}
      <div className="block turn-navigation-controls" style={{flexDirection: "row", paddingTop: "10px"}}>
        <button className={turnNumber === 0 ? "turn-navigation-controls-btn-disabled" : "turn-navigation-controls-btn"} onClick={() => setTurnNumber(turnNumber - 1)} disabled={turnNumber === 0}>
          <ArrowLeft color="#666564" size={40} strokeWidth={3} />
        </button>
        <button className={turnNumber === playerActionHistory.length ? "turn-navigation-controls-btn-disabled" : "turn-navigation-controls-btn"} onClick={() => setTurnNumber(turnNumber + 1)} disabled={turnNumber === playerActionHistory.length}>
          <ArrowRight color="#666564" size={40} strokeWidth={3} />
        </button>
        <button className={playerActionHistory.length === 0 ? "turn-navigation-controls-btn-disabled" : "turn-navigation-controls-btn"} onClick={onGameReset} disabled={playerActionHistory.length === 0}>
          <RotateCcw color="#666564" size={40} strokeWidth={3} />
        </button>
      </div>

    </div>
  );
}