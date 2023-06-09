import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  template: `
    <button type="submit" [disabled]="disabled" [class]="className" (click)="onClick()">{{ label }}</button>
  `,
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent {
  @Input() label: string = "";
  @Input() disabled: boolean = false;
  @Input() className: string = "";
  @Input() clickEvent: (() => void) | undefined;

  onClick() {
    if (this.clickEvent) {
      this.clickEvent();
    }
  }
}
