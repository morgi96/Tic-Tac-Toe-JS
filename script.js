const gameBoard = document.querySelector('#gameboard');
const playerOneBox = document.querySelector('.player__one__box');
const playerTwoBox = document.querySelector('.player__two__box');
const playerOneTextScore = document.querySelector('.player__score__one');
const playerTwoTextScore = document.querySelector('.player__score__two');
const infoTable = document.querySelector('.info__table');
const infoText = document.querySelector('.info__text');
const circle = document.querySelector('.circle');
const btnResetGame = document.querySelector('.btn__reset');

const startCells = ['', '', '', '', '', '', '', '', ''];

let mark = 'circle';
let playerOneScore = 0;
let playerTwoScore = 0;

infoText.textContent = 'Circle goes first';
btnResetGame.addEventListener('click', reset);

// Draw cells
function createCells() {
	startCells.forEach((_cell, index) => {
		const cellElement = document.createElement('div');
		cellElement.classList.add('square');
		cellElement.id = index;
		cellElement.addEventListener('click', addMark);
		gameBoard.append(cellElement);
	});
}
createCells();

// Draw circles
function addMark(e) {
	const target = e.target;
	const displayMark = document.createElement('div');
	displayMark.classList.add(mark);
	target.append(displayMark);
	mark = mark === 'circle' ? 'cross' : 'circle';
	infoText.textContent = 'Now starting ' + mark;
	target.removeEventListener('click', addMark);
	// const isWinner = checkScore();
	// if (!isWinner) {
	// 	checkDraw();
	// }
	checkScore();
}

// Check Score who win
function checkScore() {
	let winner = false;
	const squares = document.querySelectorAll('.square');
	const winningOptions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	// Circles win
	winningOptions.forEach((array) => {
		let circleWin = array.every((cell) =>
			squares[cell].firstChild?.classList.contains('circle')
		);
		if (circleWin) {
			infoText.textContent = 'Circle wins!';
			squares.forEach((square) => square.replaceWith(square.cloneNode(true)));
			winner = true;
			playerOneScore++;
			playerOneTextScore.textContent = playerOneScore;
			return;
		}
	});

	// Cross win
	winningOptions.forEach((array) => {
		let crossWin = array.every((cell) =>
			squares[cell].firstChild?.classList.contains('cross')
		);
		if (crossWin) {
			infoText.textContent = 'Cross wins!';
			squares.forEach((square) => square.replaceWith(square.cloneNode(true)));
			winner = true;
			playerTwoScore++;
			playerTwoTextScore.textContent = playerTwoScore;
			return;
		}
	});
}

// Function which clearing game board.
const clearBoard = () => {
	const squares = document.querySelectorAll('.square');
	squares.forEach((square) => {
		square.innerHTML = '';
		square.removeEventListener('click', addMark);
		square.addEventListener('click', addMark);
	});
};

// Function which using fuction clearBoard and changing infoText after it.
function reset() {
	if (infoText.textContent.includes('Circle wins')) {
		clearBoard();
		infoText.textContent = 'Cross goes first';
		mark = 'cross';
	} else if (infoText.textContent.includes('Cross wins')) {
		clearBoard();
		infoText.textContent = 'Circle goes first';
	} else if (infoText.textContent.includes('Draw')) {
		clearBoard();
		infoText.textContent = 'Now starting ' + mark;
	}
}
