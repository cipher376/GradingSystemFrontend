import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: any, args?: any): any {
    console.log('piping');
    return  this.sanitizer.bypassSecurityTrustUrl(value);
  }

}


@Pipe({
  name: 'safeStyle'
})
export class SafeStylePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: any, args?: any): any {
    console.log('piping');
    return  this.sanitizer.bypassSecurityTrustStyle(value);
  }


}





// @Pipe({ name: 'orderState' })
// export class OrderStatePipe implements PipeTransform {
//   transform(orderState?: ORDER_STATE) {
//     console.log(orderState);
//     if (orderState == ORDER_STATE.CANCELLED) {
//       return 'Cancelled';
//     } else if (orderState == ORDER_STATE.COMPLETE) {
//       return 'Complete';
//     } else if (orderState == ORDER_STATE.NEW) {
//       return 'New';
//     } else if (orderState == ORDER_STATE.PENDING) {
//       return 'Pending';
//     } else if (orderState == ORDER_STATE.UNKNOWN) {
//       return 'Unknown';
//     } else if (orderState == ORDER_STATE.DELIVERED) {
//       return 'Delivered';
//     } else if (orderState == ORDER_STATE.IN_TRANSIT) {
//       return 'In transit';
//     } else if (orderState == 'New') {
//       return ORDER_STATE.NEW;
//     } else if (orderState == 'Pending') {
//       return ORDER_STATE.PENDING;
//     } else if (orderState == 'Complete') {
//       return ORDER_STATE.COMPLETE;
//     } else if (orderState == 'Unknown') {
//       return ORDER_STATE.UNKNOWN;
//     } else if (orderState == 'Delivered') {
//       return ORDER_STATE.DELIVERED;
//     } else if (orderState == 'In transit') {
//       return ORDER_STATE.IN_TRANSIT;
//     } else {
//       return
//     }
//   }
// }



@Pipe({ name: 'formatMessageTime' })
export class FormatMessageTime implements PipeTransform {
  transform(date: Date): string {
    const conv_date_number = (new Date(Date.now()).getTime()) - (new Date(date).getTime()); // in mill secs
    const secs = (conv_date_number / 1000);
    const mins = secs / 60;
    const hrs = mins / 60;
    const days = hrs / 24;
    const weeks = days / 7;
    const months = weeks / 4;
    const years = months / 12;

    if (Math.floor(years) > 0) {
      return Math.floor(years) + ' years ago';
    } else if (Math.floor(months) > 0) {
      return Math.floor(months) + ' months ago';
    } else if (Math.floor(weeks) > 0) {
      return Math.floor(weeks) + ' weeks ago';
    } else if (Math.floor(days) > 0) {
      return Math.floor(days) + ' days ago';
    } else if (Math.floor(hrs) > 0) {
      return Math.floor(hrs) + ' hrs ago';
    } else if (Math.floor(mins) > 0) {
      return Math.floor(mins) + ' mins ago';
    } else if (Math.floor(secs) > 0) {
      return Math.floor(secs) + ' secs ago';
    } else { return 'now'; }

  }
}
