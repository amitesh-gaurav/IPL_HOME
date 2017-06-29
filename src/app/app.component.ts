import { Component, OnInit } from '@angular/core';
import { MatchDataService } from './match-data.service';
import { MatchHistoryComponent } from './match-history/match-history.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _matchDataService: MatchDataService) { }

  ngOnInit() {
    this._matchDataService.fetchMatchData();
  }
}
