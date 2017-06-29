import { Component, OnInit, Input } from '@angular/core';
import { MatchDataService } from '../match-data.service';
@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.css']
})
export class MatchStatsComponent implements OnInit {

  @Input() matchId: number;
  @Input() statType: string;
  deliveryData = [];
  constructor(private _matchDataService: MatchDataService) { }

  ngOnInit() {
    this._matchDataService.fetchDeliveryData(this.matchId).subscribe((data) => {
      this.deliveryData = data;
    })
  }

}
