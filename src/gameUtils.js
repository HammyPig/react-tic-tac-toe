const players = ["X", "O"];

export function getPlayerTurn(turnNumber) {
  return players[turnNumber % players.length];
}

export function getWinningLine(squares) {
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

export function getWinner(squares) {
  const winningLine = getWinningLine(squares);
  const winner = winningLine ? squares[winningLine[0]] : null;
  return winner;
}

export function getCellDisplayNumber(cellId) {
    return cellId + 1;
}
