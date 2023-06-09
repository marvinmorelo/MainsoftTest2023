import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from 'src/app/shared/models/company-model';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    });
  }

  editCompany(id:number){
    console.log(id);
    
  }

  deleteCompany(id:number) {
    console.log(id);
    
  }
}