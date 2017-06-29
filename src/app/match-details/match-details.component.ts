import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Match } from '../class-templates/match';
@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {

  @Input() match: Match;
  @Output() statTypeEmitter: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  emitStat(statType) {
    this.statTypeEmitter.emit(statType);
  }
}
