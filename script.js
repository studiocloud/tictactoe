const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const notification = document.getElementById('notification');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    function handleCellClick(event) {
      const clickedCell = event.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

      if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
      }

      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
      clickedCell.setAttribute('data-player', currentPlayer);

      checkForWinner();
      togglePlayer();
    }

    function togglePlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkForWinner() {
      for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
          gameActive = false;
          highlightWinningCells(condition);
          showNotification(`Player ${gameState[a]} wins!`);
          return;
        }
      }

      if (!gameState.includes('')) {
        gameActive = false;
        showNotification('It\'s a draw!');
      }
    }

    function highlightWinningCells(winningCells) {
      winningCells.forEach(index => {
        cells[index].style.backgroundColor = '#dbeafe';
      });
    }

    function showNotification(message) {
      notification.textContent = message;
      notification.style.color = currentPlayer === 'X' ? 'var(--primary-color)' : 'var(--accent-color)';
    }

    function resetGame() {
      gameState = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      currentPlayer = 'X';
      notification.textContent = '';
      cells.forEach(cell => {
        cell.textContent = '';
        cell.removeAttribute('data-player');
        cell.style.backgroundColor = 'white';
      });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
