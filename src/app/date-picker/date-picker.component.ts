import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  constructor() { }

  @Input() name: string;
  @Input() selectDate: any;
  @Input() minDate: any;
  @Input() maxDate: any;

  model: NgbDateStruct;

  @Output() dateEmitter: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit() {

  }

  formatDatePart(datePart: number){
      return datePart.toString().length == 1 ? "0" + datePart : "" + datePart;
  }

  emitDate() {
    this.selectDate = this.model;
    let date = this.model;
    this.dateEmitter.emit(date.year + "-" + this.formatDatePart(date.month) + "-" + this.formatDatePart(date.day));
  }
}
