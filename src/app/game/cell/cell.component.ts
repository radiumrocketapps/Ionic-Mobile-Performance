import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  @Input() 'board': any;
  @Input() 'position': any;

  constructor() { }

  ngOnInit() {}

  storeCell() {
    // let position = {}
    console.log(this.position);
    // this.board.storeCell({x = this.x, y = this.y});
  }

}
