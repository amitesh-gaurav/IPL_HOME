import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatchDataService } from '../match-data.service';
import { Delivery } from '../class-templates/delivery';
import { Observable } from 'rxjs/Rx'
@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.css']
})
export class MatchStatsComponent implements OnInit {


  @ViewChild('tabbedContainer') tabbedContainer: ElementRef;

  @Input() matchId: number;
  @Input() statType: string;
  deliveryData: Array<Delivery> = [];
  matchLength: number = 1;
  runs: object = {};
  ballsFaced: object = {};
  bastmenRuns: object = { 1: [], 2: [] };
  team1: string;
  team2: string;
  lastInning = "1";
  constructor(private _matchDataService: MatchDataService) { }

  ngOnInit() {
    let live = this.statType == 'live' ? true : false;
    this._matchDataService.fetchDeliveryData(this.matchId).subscribe((data) => {
      let deliveryIndex = 0;
      this.matchLength = data.length;
      this.team1 = data[0].batting_team;
      this.team2 = data[0].bowling_team;
      if (live) {
        let emitDeliveries = setInterval(() => {
          this.deliveryData.push(data[deliveryIndex]);
          this.doAnalytics(deliveryIndex);
          deliveryIndex++;
          if (deliveryIndex == data.length) {
            clearInterval(emitDeliveries);
          }
        }, 200);
      }
      else {
        for (let i = 0; i < data.length; i++) {
          this.deliveryData.push(data[i]);
          this.doAnalytics(i);
        }
      }


    });
  }

  doAnalytics(deliveryIndex: number) {
    //this.tabbedContainer.select(this.deliveryData[deliveryIndex].batting_team);
    let inning = this.deliveryData[deliveryIndex].inning;
    if (this.lastInning != inning) {
      this.runs = {};
      this.ballsFaced = {};
      this.lastInning = inning;
      this.tabbedContainer["select"](this.deliveryData[deliveryIndex].batting_team);
    }

    let batsman = this.deliveryData[deliveryIndex].batsman;

    if (this.runs.hasOwnProperty(batsman)) {
      this.runs[batsman] += parseInt(this.deliveryData[deliveryIndex].batsman_runs);
      this.ballsFaced[batsman] += 1;
    }
    else {
      this.runs[batsman] = 0;
      this.ballsFaced[batsman] = 0;
    }


    this.bastmenRuns[inning] = [];

    Object.keys(this.runs).forEach((batsman) => {
      this.bastmenRuns[inning].push({ name: batsman, runs: this.runs[batsman], ballFaced: this.ballsFaced[batsman] });
    });


  }

  saveTabbedContainer(tabbedContainer: any) {
    this.tabbedContainer = tabbedContainer;
  }

}