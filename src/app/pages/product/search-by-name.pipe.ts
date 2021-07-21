import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter'
})
export class MyFilterPipe implements PipeTransform {

  transform(items: any[], keyword: any, properties: string[]): any[] {
      console.log('Items');
      console.log(items);
      
      
    if (!items) return [];
    if (!keyword) return items;
    return items.filter(item => {
        console.log('Item');
        console.log(item.attributes);
        
      var itemFound: Boolean;
      for (let i = 0; i < properties.length; i++) {
        if (item.attributes[properties[i]].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
          itemFound = true;
          break;
        }
      }
      return itemFound;
    });

  }
}