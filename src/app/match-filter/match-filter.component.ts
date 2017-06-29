import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatchDataService } from '../match-data.service';
import { Observable } from 'rxjs/Rx'
@Component({
  selector: 'app-match-filter',
  templateUrl: './match-filter.component.html',
  styleUrls: ['./match-filter.component.css']
})
export class MatchFilterComponent implements OnInit {

  @Input() filterSetValue: any;
  @Input() filterValue = { 'season': 'All Data', 'city': 'All Data', 'team': 'All Data', 'winner': 'All Data', 'player_of_match': 'All Data', 'fromDate': 'All Data', 'toDate': 'All Data' };
  @Input() fromDate: any;
  @Input() toDate: any;
  @Input() minDate: any;
  @Input() maxDate: any;
  filterKeys: Array<string> = ['season', 'city', 'team', 'winner', 'player_of_match'];

  selectedFilter: string;

  @Output() filterEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _matchDataService: MatchDataService) { }

  ngOnInit() {
    this.selectedFilter = this.filterKeys[0];

  }

  showFilterMenu(filterKey) {
    this.selectedFilter = filterKey;
  }

  emitDefaultFilters() {
    this.filterEmitter.emit({ 'season': 'All Data', 'city': 'All Data', 'team': 'All Data', 'winner': 'All Data', 'player_of_match': 'All Data', 'fromDate': 'All Data', 'toDate': 'All Data' });
  }

  emitFilters(value: string, selectedFilter: string) {
    this.filterValue[selectedFilter] = value;
    this.filterEmitter.emit(this.filterValue);
  }

}