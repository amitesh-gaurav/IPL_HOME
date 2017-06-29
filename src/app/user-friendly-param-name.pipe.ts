import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFriendlyParamName'
})
export class UserFriendlyParamNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let words = value.split('_');
    return words.map((word) => {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    }).join(' ');
  }

}
