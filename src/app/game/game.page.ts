import { Component, OnInit } from '@angular/core';
import Board from './board-logic';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  public intervalRef;
  public state = {
    columns: 100,
    rows: 100,
    gameRunning: false,
    density: .5,
    interval: 100,
    board: new Board()
  };
  public numberOfLiveCells: number;

  constructor() {
    this.numberOfLiveCells = this.state.rows * this.state.columns * this.state.density;
  }

  ngOnInit() {
    this.handleStart();
  }

  getBoard = () => {
    return document.getElementById('board');
  }

  dynamicBoard = () => {
    const board = this.getBoard();
    const calculation = this.state.rows * 26;
    board.style.height = calculation + 'px';
    board.style.width = calculation + 'px';
  }

  aleatoryMapping() {
    for(let x = 0; x < this.state.columns; x++) {
      for(let y = 0; y < this.state.rows; y++) {
        const random_boolean = Math.random() < this.state.density;
        if (random_boolean && this.state.board.getLiveCells().size < this.numberOfLiveCells) {
          this.storeCell({x, y});
        }
      }
    }
  }

  handleStart = () => {
    this.aleatoryMapping();
    if (!this.state.gameRunning) {
      this.state.gameRunning = true;
      console.log('running')

      this.intervalRef = setInterval(
        () => this.runGame(),
        this.state.interval
      );
    }
  }

  handleStop = () => {
    this.state.gameRunning = false;
    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
  }

  runGame = () => {
    this.state.board = this.state.board.addBoard();
  }

  storeCell(position) {
    if (!this.state.gameRunning) {
      this.state.board.storeCell(position);
    }
  }

  returnArrayForNgFor(length){
    return new Array(length);
  }
}
