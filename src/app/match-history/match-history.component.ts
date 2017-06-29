import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatchDataService } from '../match-data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatchListComponent } from '../match-list/match-list.component';
import { MatchDetailsComponent } from '../match-details/match-details.component';
import { Match } from '../class-templates/match';
@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {

  matches: Array<Match> = [];
  displayMatches: Array<Match> = [];
  filterMatches: Array<Match> = [];
  title: string = "Match History";
  selectedMatch: Match = null;
  totalItems: number;
  itemsPerPage: number = 6;
  page: any = 1;
  previousPage: any;
  statType: string = null;
  refineType: boolean = true;
  sortKeys: Array<object> = [{ 'type': 'season', 'value': true }, { 'type': 'city', 'value': true }];
  currentSort: object;
  selectedSeason: string = 'All Seasons';
  filterSetValue: object;
  filterValue: object = { 'season': 'All Data', 'city': 'All Data', 'team': 'All Data', 'winner': 'All Data', 'player_of_match': 'All Data', 'fromDate': 'All Data', 'toDate': 'All Data' };
  fromDate: object;
  toDate: object;
  minDate: object;
  maxDate: object;
  constructor(private _matchDataService: MatchDataService, private _modalService: NgbModal) { }
  ngOnInit() {
    //this.matches = this._matchDataService.getAllMatchData();
    this._matchDataService.fetchMatchData().subscribe((data) => {
      this.matches = data;
      this.displayMatches = this.matches;
      this.filterMatches = this.matches;
      this.filterSetValue = this.generateFilterSet();
      this.setDefaultDateRange();
      this.totalItems = this.filterMatches.length;
      this.loadPage(this.page);
      this.changeRefineType(true);
      this.currentSort = this.sortKeys[0];
    })

  }

  setDefaultDateRange() {
    let dateToJSON = (date: string) => {
      let dateJSON = { year: 2013, month: 2, day: 1 };
      let dateParams = date.split('-');
      dateJSON.year = parseInt(dateParams[0]);
      dateJSON.month = parseInt(dateParams[1]);
      dateJSON.day = parseInt(dateParams[2]);

      return dateJSON;
    }

    this.minDate = this.fromDate = dateToJSON(this.matches[0].date);
    this.maxDate = this.toDate = dateToJSON(this.matches[this.matches.length - 1].date);
  }
  generateFilterSet() {
    let filterSets = { 'season': new Set<string>(), 'city': new Set<string>(), 'team': new Set<string>(), 'winner': new Set<string>(), 'player_of_match': new Set<string>() };
    for (let i = 0; i < this.matches.length; i++) {
      filterSets.season.add(this.matches[i].season);
      filterSets.city.add(this.matches[i].city);
      filterSets.winner.add(this.matches[i].winner);
      filterSets.player_of_match.add(this.matches[i].player_of_match);
      filterSets.team.add(this.matches[i].team1);
    }

    let filterSetValue: any = {};
    Object.keys(filterSets).forEach((filterName) => {
      filterSetValue[filterName] = Array.from(filterSets[filterName]);
    })

    return filterSetValue;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }

    this.selectedMatch = null;

  }

  loadData() {
    this.displayMatches = this.filterMatches.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
  }
  loadMatchDetails(selectedMatch: Match) {
    this.selectedMatch = selectedMatch;
  }

  loadMatchStats(statType: string, matchStatsModal) {
    if (statType != null) {
      this.statType = statType;
      this._modalService.open(matchStatsModal, { windowClass: 'dark-modal' });
    }

  }

  changeRefineType(type: boolean) {
    this.refineType = type;
  }

  changeSortType(type: any) {
    this.currentSort = type[0];
    this.sortKeys[type[1]] = this.currentSort;
    this.displayMatches = this.displayMatches.sort((Match1: Match, Match2: Match) => {
      let compare = (a: string, b: string): number => {
        return a > b ? 1 : a < b ? -1 : 0;
      }
      return this.currentSort["value"] ? compare(Match1[this.currentSort["type"]], Match2[this.currentSort["type"]]) : compare(Match2[this.currentSort["type"]], Match1[this.currentSort["type"]]);
    });
  }

  applyFilters(filterValue: any) {
    this.filterValue = filterValue;
    let filterMatches = JSON.parse(JSON.stringify(this.matches));
    Object.keys(this.filterValue).forEach((filterName) => {
      if (this.filterValue[filterName] != 'All Data') {
        filterMatches = filterMatches.filter((match: Match) => {
          if (filterName == 'team') {
            return match['team1'] == this.filterValue[filterName] || match['team2'] == this.filterValue[filterName];
          }
          else if (filterName == 'fromDate') {
            return new Date(match.date).getTime() >= new Date(this.filterValue[filterName]).getTime();
          }
          else if (filterName == 'toDate') {
            return new Date(match.date).getTime() <= new Date(this.filterValue[filterName]).getTime();
          }
          else {
            return match[filterName] == this.filterValue[filterName];
          }
        });
      }
    });

    this.selectedMatch = null;
    this.filterMatches = filterMatches;
    this.totalItems = this.filterMatches.length;
    this.page = 1;
    this.loadData();
  }

}