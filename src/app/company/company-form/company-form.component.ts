import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from 'src/app/shared/models/company-model';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent {
  companyForm: FormGroup;
  id: string = '';
  company: Company | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) {
    this.companyForm = this.formBuilder.group({
      name: [''],
      address: [''],
      nit: [''],
      phone: [''],
    });
    this.id = this.route.snapshot.url[1]?.path;
  }

  ngOnInit() {
    this.companyService.getCompanyById(this.id).subscribe((resp) => {
      this.company = resp;
    });
    this.companyForm = this.formBuilder.group({
      name: [this.company?.name, Validators.required],
      address: [this.company?.address, Validators.required],
      nit: [this.company?.nit, Validators.required],
      phone: [
        this.company?.phone,
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
    });
  }

  onSubmitNewCompany() {
    const confirmation = confirm(
      'Are you sure you want to create this company?'
    );
    if (confirmation) {
      if (this.companyForm.valid) {
        const newCompany: Company = { ...this.companyForm.value };
        this.companyService.createCompany(newCompany).subscribe(
          (response) => {
            alert('Company created successfully' + response);
            this.router.navigateByUrl('/company/companies');
          },
          (error) => {
            alert('Error creating company' + error);
          }
        );
      }
    }
  }

  onUpdateCompany(id: string) {
    const confirmation = confirm(
      'Are you sure you want to update this company?'
    );
    if (confirmation) {
      if (this.companyForm.valid) {
        const formData = this.companyForm.value;
        const originalData: any = this.company;

        if (this.hasChanges(formData, originalData)) {
          this.companyService.updateCompany(id, formData).subscribe(
            (response) => {
              alert('Company updated successfully');
              this.router.navigate(['/companies']);
            },
            (error) => {
              alert('Error updating company ' + error);
            }
          );
        } else {
          alert('No changes detected.');
        }
      }
    }
  }

  hasChanges(formData: any, originalData: any): boolean {
    for (let key in formData) {
      if (formData[key] !== originalData[key]) {
        return true;
      }
    }
    return false;
  }
}
