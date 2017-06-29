import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFriendlyDate'
})
export class UserFriendlyDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let months= ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let dateParts =  value.split("-");
    return months[parseInt(dateParts[1])-1]+", " + dateParts[2];
  }

}
