import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShortTeamNamePipe } from '../short-team-name.pipe';
import { UserFriendlyDatePipe } from '../user-friendly-date.pipe';
import { Match } from '../class-templates/match';
@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {

  @Input() matches: Array<Match> = [];

  @Input() selectedMatch: Match = null;;

  @Output() selectedMatchEmitter: EventEmitter<Match> = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }
  emitSelectedMatch(match: Match) {
    this.selectedMatch = match;
    this.selectedMatchEmitter.emit(match);
  }

  getPaddingLength(id: string) {
    let p = [];
    while (id.length < 4) {
      p.push('X');
      id += " ";
    }

    return p;
  }

}
