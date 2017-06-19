import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterListPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items) 
      return [];

    if(!value) 
      return items;
      
    return items.filter(it => it[field].toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

}
