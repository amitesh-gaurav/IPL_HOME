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
  overs: string = "";
  balls: string = "";
  runs: object = {};
  ballsFaced: object = {};
  sixes: object = {};
  fours: object = {};
  bastmenRuns: object = { 1: [], 2: [] };
  playersdDismissed: Array<String> = [];
  dismissed: object = {};
  dismissalMethod: object = {};
  fielder: object = {};
  team1: string;
  team2: string;
  lastInning = "1";
  onStrike: string = "";


  constructor(private _matchDataService: MatchDataService) { }

  ngOnInit() {
    let live = this.statType == 'live' ? true : false;
    this._matchDataService.fetchDeliveryData(this.matchId).subscribe((data) => {
      let deliveryIndex = 0;
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
    let delivery = this.deliveryData[deliveryIndex];
    this.overs = delivery.over;
    this.balls = delivery.ball;

    let inning = delivery.inning;
    if (this.lastInning != inning) {
      this.runs = {};
      this.ballsFaced = {};
      this.fours = {};
      this.sixes = {};
      this.dismissed = {};
      this.dismissalMethod = {};
      this.fielder = {};
      this.lastInning = inning;
      this.tabbedContainer["select"](delivery.batting_team);
    }

    let batsman = delivery.batsman;
    this.onStrike = batsman;

    this.dismissed[batsman] = false;
    this.dismissalMethod[batsman] = delivery.dismissal_kind;
    this.fielder[batsman] = delivery.fielder;
    if (this.runs.hasOwnProperty(batsman)) {
      this.runs[batsman] += parseInt(delivery.batsman_runs);
      this.ballsFaced[batsman] += 1;
      if (this.runs[batsman] == 4) {
        this.fours[batsman]++;
      }
      if (this.runs[batsman] == 6) {
        this.sixes[batsman]++;
      }
    }
    else {
      this.runs[batsman] = parseInt(delivery.batsman_runs);
      this.ballsFaced[batsman] = 1;
      this.sixes[batsman] = 0;
      this.fours[batsman] = 0;
      if (this.runs[batsman] == 4) {
        this.fours[batsman] = 1;
      }
      else if (this.runs[batsman] == 6) {
        this.sixes[batsman] = 1;
      }

    }

    if (delivery.player_dismissed != "") {
      this.dismissed[batsman] = true;
      delivery.dismissal_kind == 'bowled';
      this.fielder[batsman] = delivery.bowler;
    }



    this.bastmenRuns[inning] = [];

    Object.keys(this.runs).forEach((batsman) => {
      this.bastmenRuns[inning].push({ name: batsman, runs: this.runs[batsman], ballFaced: this.ballsFaced[batsman], fours: this.fours[batsman], sixes: this.sixes[batsman], dismissed: this.dismissed[batsman], dismissal_kind: this.dismissalMethod[batsman], fielder: this.fielder[batsman] });
    });


  }

  saveTabbedContainer(tabbedContainer: any) {
    this.tabbedContainer = tabbedContainer;
  }

}