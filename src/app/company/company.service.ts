import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../shared/models/company-model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companies: Company[] = [
    { id: 1, name: 'Company 1', address: 'Address 1', nit: 'NIT 1', phone: '123456789' },
    { id: 2, name: 'Company 2', address: 'Address 2', nit: 'NIT 2', phone: '987654321' },
    // Agrega más empresas según sea necesario
  ];

  getCompanies(): Observable<Company[]> {
    return of(this.companies);
  }

  getCompanyById(id: number): Observable<Company | undefined> {
    const company = this.companies.find(c => c.id === id);
    return of(company);
  }

  updateCompany(company: Company): Observable<Company> {
    const index = this.companies.findIndex(c => c.id === company.id);
    if (index !== -1) {
      this.companies[index] = company;
    }
    return of(company);
  }

  deleteCompany(id: number): Observable<boolean> {
    const index = this.companies.findIndex(c => c.id === id);
    if (index !== -1) {
      this.companies.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
