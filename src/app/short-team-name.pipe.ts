import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTeamName'
})
export class ShortTeamNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let words = value.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = this.firstLowerCaseChar(words[i]);
    }
    return words.join("");
  }

  firstLowerCaseChar(word: string) {
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) >= 'a' && word.charAt(i) <= 'z') {
        return word.substr(0, i);
      }
    }
    return word;
  }

}
