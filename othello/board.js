/**
 * Board
 * Defines a board "class" for an Othello game.
 */

module.exports = class Board {



	/**
	 * Construct the object with required state
	 */
	constructor(height, width) {
		this.height = height;
		this.width = width;
		this.board = [];
		for (let i = 0; i < this.height; ++i) {
			let tmp = [];
			for (let j = 0; j < this.width; ++j) {
				tmp.push(-1);
			}
			this.board.push(tmp);
		}
	}


	/**
	 * Print a representation of the board to the terminal.
	 */
	printBoard() {
		for (let i = 0; i < this.height; ++i) {
			for (let j = 0; j < this.width; ++j) {
				if (this.board[i][j] == -1) {
					process.stdout.write('.\t')
				} else {
					process.stdout.write(this.board[i][j] + "\t")
				}
			}
			console.log();
		}
	}

	/**
	 * Initializes the board, places the starting values at their
	 * respective spots
	 */
	initBoard() {
		//Right now we assume that the board size will be 8x8
		this.board[3][3] = "B";
		this.board[3][4] = "W";
		this.board[4][3] = "W";
		this.board[4][4] = "B";
	}

	/**
	 * isValidMove
	 * @param row An integer row number.
	 * @param col An integer column number.
	 * @param disc A character for the disc color.
	 * @return A boolean indicating whether the move is valid.
	 */

	isValid(row, col, disc) {

		// console.log(disc);
		// console.log(row);
		var SIZE = 8;
		var EMPTY = -1;

		if (this.board[row][col] != EMPTY) {
			return false;
		}

		//Check up
		for (let i = row - 1; i > -1; i--) {
			if (this.board[i][col] != disc && this.board[i][col] != EMPTY) {
				if (this.board[i - 1][col] == disc) {
					console.log("\nU\n");
					return true;
				}
				continue;
			} else if (this.board[i][col] == EMPTY || row == 0) {
				break;
			}
		}


		//Check Down
		for (let i = row + 1; i < 8; i++) {
			if (this.board[i][col] != disc && this.board[i][col] != EMPTY) {
				if (this.board[i + 1][col] == disc) {
					console.log("\nD\n");
					return true;
				}
			} else if (this.board[i][col] == EMPTY || row == SIZE - 1) {
				break;
			}
		}

		//Check Left
		for (let i = col - 1; i > -1; i--) {
			if (this.board[row][i] != disc && this.board[row][i] != EMPTY) {
				if (this.board[row][i - 1] == disc) {
					console.log("\nL\n");
					return true;
				}
				continue;
			} else if (this.board[row][i] == EMPTY || col == 0) {
				break;
			}
		}

		//Check Right
		for (let i = col + 1; i < SIZE; i++) {
			if (this.board[row][i] != disc && this.board[row][i] != EMPTY) {
				if (this.board[row][i + 1] == disc) {
					console.log("\nR\n");
					return true;
				}
				continue;
			} else if (this.board[row][i] == EMPTY || col == SIZE - 1) {
				break;
			}
		}


		//Temp value used to iterate through columns 
		//When moving diagonally
		var colIter = 0;

		//Check Diag-Up-Left
		colIter = col + 1;
		for (let i = row + 1; i < SIZE; i++) {
			if (colIter >= SIZE) {
				break;
			}
			if (this.board[i][colIter] != disc && this.board[i][colIter] != EMPTY
				&& this.board[i + 1][colIter + 1] == disc) {
				console.log("\nU-L\n");
				return true;
			} else if (this.board[i][colIter] == EMPTY) {
				break;
			}
			colIter++;
		}

		//Check Diag Up-right
		colIter = col - 1;
		for (let i = row + 1; i < SIZE; i++) {
			if (colIter < 0) {
				break;
			}
			if (this.board[i][colIter] != disc && this.board[i][colIter] != EMPTY
				&& this.board[i + 1][colIter - 1] == disc) {
				console.log("\nU-R\n");
				return true;
			} else if (this.board[i][colIter] == EMPTY) {
				break;
			}
			colIter--;
		}

		//Cjeck Diag bottom-right
		colIter = col + 1;
		for (let i = row - 1; i > -1; i--) {
			if (colIter >= SIZE) {
				break;
			}
			if (this.board[i][colIter] != disc && this.board[i][colIter] != EMPTY
				&& this.board[i - 1][colIter + 1] == disc) {
				console.log("\nD-R\n");
				return true;
			} else if (this.board[i][colIter] == EMPTY) {
				break;
			}
			colIter++;
		}

		//Check Diag-Bottom-Left
		colIter = col - 1;
		for (let i = row - 1; i > -1; i--) {
			if (colIter < 0) {
				break;
			}
			if (this.board[i][colIter] != disc && this.board[i][colIter] != EMPTY
				&& this.board[i - 1][colIter - 1] == disc) {
				console.log("\nD-L\n");
				return true;
			} else if (this.board[i][colIter] == EMPTY) {
				break;
			}
			colIter--;
		}

		return false;
	}

	/**
	 * placeDiscAt
	 * @param row An integer number for row.
	 * @param col An integer number for column.
	 * @param disc A character standing for disc color.
	 */
	placeDiskAt(row, col, disc) {

		this.board[row][col] = disc;

		var numWrite = 0;
		var colIter = 0;
		var SIZE = 8;
		var EMPTY = -1;

		//Check move up
		for (let i = row + 1; i < SIZE; i++) {
			numWrite++;
			if (this.board[i][col] != disc && this.board[i][col] != EMPTY &&
				this.board[i + 1][col] == disc) {
				console.log("\nUp\n");
				for (let j = row + 1; j < SIZE; j++) {
					if (numWrite > 0) {
						this.board[j][col] = disc;
						numWrite--;
					}
				}
			} else if (this.board[i][col] == EMPTY) {
				break;
			}
		}

		numWrite = 0;
		//Check Move down
		for (let i = row - 1; i > -1; i--) {
			numWrite++;
			if (this.board[i][col] != disc && this.board[i][col] != EMPTY &&
				this.board[i - 1][col] == disc) {
				console.log("\nDown\n");
				console.log("\n%d\n", numWrite);
				for (let j = row - 1; j > -1; j--) {
					if (numWrite > 0) {
						this.board[j][col] = disc;
						numWrite--;
					}
				}
			} else if (this.board[i][col] == EMPTY) {
				break;
			}
		}

		numWrite = 0;
		//Check Move right
		for (let i = col - 1; i > -1; i--) {
			numWrite++;
			if (this.board[row][i] != disc && this.board[row][i] != EMPTY &&
				this.board[row][i - 1] == disc) {
				console.log("\nRight\n");
				console.log("\n%d\n", numWrite);
				for (let j = col - 1; j > -1; j--) {
					if (numWrite > 0) {
						this.board[row][j] = disc;
						numWrite--;
					}
				}
			} else if (this.board[row][i] == EMPTY) {
				break;
			}
		}

		numWrite = 0;
		//Check Move left
		for (let i = col + 1; i < SIZE; i++) {
			numWrite++;
			if (this.board[row][i] != disc && this.board[row][i] != EMPTY &&
				this.board[row][i + 1] == disc) {
				console.log("\nLeft\n");
				console.log("\n%d\n", numWrite);
				for (let j = col + 1; j < SIZE; j++) {
					if (numWrite > 0) {
						this.board[row][j] = disc;
						numWrite--;
					}
				}
			} else if (this.board[row][i] == EMPTY) {
				break;
			}
		}

		numWrite = 0;
		colIter = col - 1;
		//Check Up Right
		for (let i = row + 1; i < SIZE; i++) {
			if (colIter < 0) {
				break;
			}
			numWrite++;
			if (this.board[i][colIter] != disc && this.board[i][colIter] != EMPTY &&
				this.board[i + 1][colIter - 1] == disc) {
				console.log("\nUp-Right\n");
				let colTemp = col - 1;
				for (let j = row + 1; j < SIZE; j++) {
					if (numWrite > 0) {
						this.board[j][colTemp] = disc;
						colTemp--;
						numWrite--;
					}
				}
			} else if (this.board[i][colIter] == EMPTY) {
				break;
			}
			colIter--;
		}

		numWrite = 0;
		colIter = col + 1;
		//Check Up Left
		for (let i = row + 1; i < SIZE; i++) {
			if (colIter >= SIZE) {
				break;
			}
			numWrite++;
			if (this.board[i][colIter] != disc && this.board[i][colIter] != EMPTY &&
				this.board[i + 1][colIter + 1] == disc) {
				console.log("\nUp-Left\n");
				let colTemp = col + 1;
				for (let j = row + 1; j < SIZE; j++) {
					if (numWrite > 0) {
						this.board[j][colTemp] = disc;
						colTemp++;
						numWrite--;
					}
				}
			} else if (this.board[i][colIter] == EMPTY) {
				break;
			}
			colIter++;
		}

		numWrite = 0;
		colIter = col + 1;
		//Check down-left
		for (let i = row - 1; i > -1; i--) {
			if (colIter >= SIZE) {
				break;
			}
			numWrite++;
			if (this.board[i][colIter] != disc && this.board[i][colIter] != EMPTY
				&& this.board[i - 1][colIter + 1] == disc) {
				console.log("\nDown-left\n");
				let colTemp = col + 1;
				for (let j = row - 1; j > -1; j--) {
					if (numWrite > 0) {
						this.board[j][colTemp] = disc;
						colTemp++;
						numWrite--;
					}
				}
			} else if (this.board[i][colIter] == EMPTY) {
				break;
			}
			colIter++;
		}

		numWrite = 0;
		colIter = col - 1;
		//Check down-right
		for (let i = row - 1; i > -1; i--) {
			if (colIter < 0) {
				break;
			}
			numWrite++;
			if (this.board[i][colIter] != disc && this.board[i][colIter] != EMPTY
				&& this.board[i - 1][colIter - 1] == disc) {
				console.log("\nDown-right\n");
				let colTemp = col - 1;
				for (let j = row - 1; j > -1; j--) {
					if (numWrite > 0) {
						this.board[j][colTemp] = disc;
						colTemp--;
						numWrite--;
					}
				}
			} else if (this.board[i][colIter] == EMPTY) {
				break;
			}
			colIter--;
		}
	}

	/**
	 * isValidMoveAvailable
	 * @param disc A character pertaining to a disc color.
	 * @return bool A boolean telling the user whether there are
	 *	 	valid moves availabe for that disc.
	 */
	isValidMoveAvailable(disc) {
		console.log(disc);

		var SIZE = 8;

		for (let i = 0; i < SIZE; i++) {
			for (let j = 0; j < SIZE; j++) {
				if (this.isValid(i, j, disc)) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * isBoardFull
	 * @return boolean Whether or not the board is full.
	 */
	isBoardFull() {
		for (let i = 0; i < this.height; ++i) {
			for (let j = 0; j < this.width; ++j) {
				if (this.board[i][j] == -1) {
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * isGameOver
	 * @return bool Whether or not the game is over.
	 */
	isGameOver() {
		if (this.isBoardFull(this.board) || !this.isValidMoveAvailable("W") ||
			!this.isValidMoveAvailable("B")) {
			return true;
		}

		return false;
	}

	/**
	 * checkWinner
	 * @return char Which player has won.  Return null if
	 * 		a tie exists.
	 */
	checkWinner() {
		let bCount = 0;
		let wCount = 0;

		let SIZE = 8;

		for (let i = 0; i < SIZE; i++) {
			for (let j = 0; j < SIZE; j++) {
				if (this.board[i][j] == 'W') {
					wCount++;
				} else {
					bCount++;
				}
			}
		}

		if (wCount > bCount) {
			return "W";
		} else if (bCount > wCount) {
			return "B";
		} else {
			return -1;
		}
		return -1;
	}
}

//let board = new Board(10, 10);
//board.printBoard();
