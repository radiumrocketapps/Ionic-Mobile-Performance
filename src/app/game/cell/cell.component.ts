import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  @Input() 'x': any;
  @Input() 'y': any;
  @Input() 'board': any;

  constructor() { }

  ngOnInit() {}

  storeCell() {
    console.log(`${this.x}, ${this.y}`);
    // this.board.storeCell(this.position);
  }

}
