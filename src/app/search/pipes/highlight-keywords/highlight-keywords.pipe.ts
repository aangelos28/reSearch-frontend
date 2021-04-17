import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlightKeywords'
})
export class HighlightKeywordsPipe implements PipeTransform {
  transform(value: string, args: string[]): string {
    if (!args || args.length === 0) {
      return value;
    }

    const regx = new RegExp(`(${args.join('|')})`, 'gi');

    return value.replace(regx, '<span class="bg-yellow-300">$&</span>');
  }
}
