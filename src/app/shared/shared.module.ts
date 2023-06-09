import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmitButtonComponent } from './submit-button/submit-button.component';



@NgModule({
  declarations: [
    SubmitButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    SubmitButtonComponent
  ]
})
export class SharedModule { }
