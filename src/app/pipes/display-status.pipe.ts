import { Pipe, PipeTransform } from '@angular/core';
import { COMPLAINT_STATUS } from '../constants/shared.constants';
@Pipe({
  name: 'displayStatus'
})
export class DisplayStatusPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let result = '';
    switch (value) {
      case COMPLAINT_STATUS.Not_Started: {
        result = 'Not started';
        break;
      }
      case COMPLAINT_STATUS.In_Progress: {
        result = 'In Progress';
        break;
      }
      case COMPLAINT_STATUS.Completed: {
        result = 'Completed';
        break;
      }
      default: {
        result = 'N/A';
      }
    }
    return result;
  }
}
