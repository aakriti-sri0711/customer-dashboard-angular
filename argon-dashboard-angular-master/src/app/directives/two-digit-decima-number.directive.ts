import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appTwoDigitDecimaNumber]'
})
export class TwoDigitDecimaNumberDirective {

  // private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  // private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-'];
  // constructor(private el: ElementRef) {
  // }
  // @HostListener('keydown', ['$event'])
  // onKeyDown(event: KeyboardEvent) {
  // console.log(this.el.nativeElement.value);
  // // Allow Backspace, tab, end, and home keys
  // if (this.specialKeys.indexOf(event.key) !== -1) {
  // return;
  // }
  // let current: string = this.el.nativeElement.value;
  // let next: string = current.concat(event.key);
  // if (next && !String(next).match(this.regex)) {
  // event.preventDefault();
  // }
  // }
  @Input("decimals") decimals: number = 0;

  private check(value: string) {
      if (this.decimals <= 0) {
          return String(value).match(new RegExp(/^\d*\.?\d{0,2}$/g));
      } else {
          var regExpString =
              "^\\s*((\\d+(\\.\\d{0," +
              this.decimals +
              "})?)|((\\d*(\\.\\d{1," +
              this.decimals +
              "}))))\\s*$";
          return String(value).match(new RegExp(regExpString));
      }
  }

  private run(oldValue) {
      setTimeout(() => {
          let currentValue: string = this.el.nativeElement.value;
          if (currentValue !== '' && !this.check(currentValue)) {
              this.el.nativeElement.value = oldValue;
          }
      });
  }

  constructor(private el: ElementRef) {}

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
      this.run(this.el.nativeElement.value);
  }

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent) {
      this.run(this.el.nativeElement.value);
  }


}
