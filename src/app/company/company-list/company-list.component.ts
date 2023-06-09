import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from 'src/app/shared/models/company-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];

  constructor(private companyService: CompanyService, private router:Router) { }

  ngOnInit() {
  //   this.getCompanies();
  // }

  // getCompanies() {
  //   this.companyService.getCompanies().subscribe(companies => {
  //     this.companies = companies;
  //   });
  }



  onDeleteCompany(id:string) {
    const confirmation = confirm('Are you sure you want to delete this company?');
    if (confirmation) {
      this.companyService.deleteCompany(id)
        .subscribe(
          () => {
            console.log('Company deleted successfully');
            alert('Company deleted successfully');
            this.router.navigate(['/companies']);
          },
          (error) => {
            console.error('Error deleting company', error);
            alert('Error deleting company');
          }
        );
    }
  }
  
}