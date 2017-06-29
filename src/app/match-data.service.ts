import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "RxJS/Rx";
import 'rxjs/add/operator/map'
import { Match } from './class-templates/match';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class MatchDataService {

  filterSetSubject: Subject<any> = new Subject<any>();
  filterSetValue: any;

  constructor(private _http: Http) { }

  public getFilterSetValue(): Subject<any> {
    this.filterSetSubject.next(this.filterSetValue);
    return this.filterSetSubject;
  }



  public fetchMatchData(): Observable<Array<Match>> {
    return this._http.get("./assets/matches.csv").map(response => this.CSVTOJSON(response.text()));
  }

  private CSVTOJSON(CSVdata: string): Array<Match> {
    let filterSets = { 'season': new Set<string>(), 'city': new Set<string>(), 'winner': new Set<string>(), 'player_of_match': new Set<string>() };
    let resultJSON: Array<Match> = [];
    let rows = CSVdata.split("\n");
    let headers = rows[0].split(",");
    for (let i = 1; i < rows.length - 1; i++) {
      let col = rows[i].split(",");
      let match: Match = { id: "", season: "", city: "", date: "", team1: "", team2: "", toss_winner: "", toss_decision: "", result: "", dl_applied: "", winner: "", win_by_runs: "", win_by_wickets: "", player_of_match: "", venue: "", umpire1: "", umpire2: "", umpire3: "" };
      for (let j = 0; j < headers.length; j++) {
        match[headers[j]] = col[j];
        if (filterSets.hasOwnProperty(headers[j])) {
          filterSets[headers[j]].add(col[j]);
        }
      }
      resultJSON.push(match);
    }

    let filterSetValue: any = {};
    Object.keys(filterSets).forEach((filterName) => {
      filterSetValue[filterName] = Array.from(filterSets[filterName]);
    })

    this.filterSetValue = filterSetValue;
    this.filterSetSubject.next(this.filterSetValue);
    return resultJSON;
  }

  public fetchDeliveryData(matchId: number) {
    return this._http.get("./assets/" + matchId + ".csv")
      .map(response => this.CSVTOJSONDeliveries(response.text()));

  }


  private CSVTOJSONDeliveries(CSVdata: string): Array<any> {
    let resultJSON: Array<any> = [];
    let rows = CSVdata.split("\n");
    let headers = ["match_id", "inning", "batting_team", "bowling_team", "over", "ball", "batsman", "non_striker", "bowler", "is_super_over", "wide_runs", "bye_runs", "legbye_runs", "noball_runs", "penalty_runs", "batsman_runs", "extra_runs", "total_runs", "player_dismissed", "dismissal_kind", "fielder"];
    for (let i = 0; i < rows.length - 1; i++) {
      let col = rows[i].split(",");
      let delivery = {};
      for (let j = 0; j < headers.length; j++) {
        delivery[headers[j]] = col[j];
      }
      resultJSON.push(delivery);
    }
    return resultJSON;
  }
}