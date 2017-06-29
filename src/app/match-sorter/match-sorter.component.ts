import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-match-sorter',
  templateUrl: './match-sorter.component.html',
  styleUrls: ['./match-sorter.component.css']
})
export class MatchSorterComponent implements OnInit {

  @Input() sortKeys: Array<any>;
  @Output() sortType: EventEmitter<any> = new EventEmitter();


  constructor() { }
  ngOnInit() {
  }

  emitSortType(type: any, index: number) {
    type["value"] = !type["value"];
    this.sortKeys[index] = type;
    this.sortType.emit([type, index]);
  }

}
