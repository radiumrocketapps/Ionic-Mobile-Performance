
export default class Board {
  public liveCells;
  public nextBoard;
  public deadCells;

  constructor(liveCells = new Map()) {
    this.liveCells = liveCells
    this.nextBoard = new Map()
    this.deadCells = new Map()
  }

  getLiveCells = () => {
    // Return live cells in each Board.
    return this.liveCells
  }

  addCell = position => {
    // Take the cell position and add it to liveCells.
    this.liveCells.set(position.x + ' , ' + position.y, {
      x: position.x,
      y: position.y
    })
  }

  removeCell = position => {
    // Delete a cell in liveCells using the position.
    this.liveCells.delete(position)
  }

  isCellAlive = position => {
    // Allow to know if a cell is alive or not.
    return this.liveCells.has(position)
  }

  storeCell = position => {
    // Use the position in each cell behaviour, that allow the user to set the initial state of the cell and the board.
    if (this.isCellAlive(position.x + ' , ' + position.y)) {
      this.removeCell(position.x + ' , ' + position.y)
    } else {
      this.addCell(position)
    }
    return new Board(this.liveCells)
  }

  addBoard = () => {
    // In each board, this function calculates the new live and dead cells and, so, the new board.
    this.liveCells.forEach(item => {
      this.calculateLiveCellsNeighbors(item)
    })
    this.deadCells.forEach(item => {
      this.calculateDeadCellsNeighbors(item)
    })
    return new Board(this.nextBoard)
  }

  calculateLiveCellsNeighbors = position => {
    // With the position, It calculates the live cells for the new board and also take into account the neighbors of each live cell.
    var liveNeighbors = 0 //This is because initialy we don't know how many live neighbors are there
    //Here we are going to check the state of all the cells neighbors. This will alow us to apply the rules
    for (var i = position.x - 1; i <= position.x + 1; i++) {
      for (var j = position.y - 1; j <= position.y + 1; j++) {
        //This is to make sure that we don't check if the cell we are currently analysing is counted has a live cell
        if (i === position.x && j === position.y) continue
        //if the neighboor is alive we add to the liveNeighbors counter else it goes to the deadCell Map we defined in the constructor
        if (this.isCellAlive(i + ' , ' + j)) {
          liveNeighbors++
        } else {
          this.deadCells.set(i + ' , ' + j, { x: i, y: j })
        }
      }
    }
    //Here we are applying the rules of the game. 2 or 3 live neighbors means that the cell remains alive and lives on to the next board.
    if (liveNeighbors === 2 || liveNeighbors === 3)
      this.nextBoard.set(position.x + ' , ' + position.y, {
        x: position.x,
        y: position.y
      })
  }

  calculateDeadCellsNeighbors = position => {
    // With the position, It calculates the dead cells for the new board that will be 'live' or 'dead' in the next board.
    var liveNeighbors = 0
    for (var i = position.x - 1; i <= position.x + 1; i++) {
      for (var j = position.y - 1; j <= position.y + 1; j++) {
        if (i === position.x && j === position.y) continue

        if (this.isCellAlive(i + ' , ' + j)) {
          liveNeighbors++
        }
      }
    }
    //Applying the game rule that says when a dead cell has 3 neighboors it's reborn.
    if (liveNeighbors === 3)
      this.nextBoard.set(position.x + ' , ' + position.y, {
        x: position.x,
        y: position.y
      })
  }
}