import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx'
@Component({
  selector: 'app-searchable-dropdown',
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.css']
})
export class SearchableDropdownComponent implements OnInit {
  @Input() data: Array<any> = [];
  @Input() debounce: number = 400;
  @Input() selectedValue: any = 'All Data';

  displayData: Array<any> = [];
  randomId: string;
  @Output() selectedValueEmitter: EventEmitter<String> = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {
    this.displayData = this.data.slice(0, 5);;
    this.randomId = "searchableDropDown" + Math.floor(Math.random() * 10000 + 100000);
  }

  bindSearchEvent(target) {

    this.selectedValue = "";

    Observable.fromEvent(target, "keyup").map(e => e["target"].value).debounceTime(this.debounce).subscribe((searchText) => {
      if (searchText == undefined || searchText.length < 3) {
        this.selectedValue = 'All Data';
        this.displayData = this.data.slice(0, 5);
      }

      else {
        let displayData = this.data.filter((item) => {
          return item.replace(/\s/g, '').toLowerCase().indexOf(searchText.replace(/\s/g, '').toLowerCase()) != -1;
        });
        this.displayData = displayData.slice(0, displayData.length > 5 ? 5 : displayData.length);
      }
    });
  }
  emitSelectedData(item) {
    this.selectedValue = item;
    this.selectedValueEmitter.emit(this.selectedValue);
  }

}
