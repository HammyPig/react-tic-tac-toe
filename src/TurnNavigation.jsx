import * as gameUtils from "./gameUtils";

export default function TurnNavigation({ playerActionHistory, turnNumber, setTurnNumber }) {
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

  return (
    <div className="turn-history">
      {turnsTakenList}
    </div>
  );
}