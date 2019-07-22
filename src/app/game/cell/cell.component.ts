import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  @Input() 'board': any;
  @Input() 'position': any;
  @Input() 'live': boolean = false;

  constructor() { }

  ngOnInit() {}

  storeCell() {
    this.board.storeCell(this.position);
    this.live = this.board.isCellAlive(`${this.position.x} , ${this.position.y}`)
  }
}
