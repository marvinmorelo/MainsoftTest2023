import { Component } from '@angular/core';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  isloading$ =   this.spinnerService.isloading$;

  constructor(private spinnerService: SpinnerService) { }


}
