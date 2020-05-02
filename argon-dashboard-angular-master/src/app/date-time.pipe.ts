import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(date: any, format: string): any {
    // console.log('hehehehe')
    if(!format){
      format = "MMM DD, YYYY"
    }

    if(!date){
      date = new Date()
    }


    return moment(date).format(format);
    
  }

}
