import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent {
  companyForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router:Router) {
    this.companyForm = this.formBuilder.group({
      name: [''],
      address: [''],
      nit: [''],
      phone: [''],
    });
  }

  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      nit: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  // Resto del código del componente

  onSubmit(){
    this.router.navigateByUrl('/company/companies')
  }
}
