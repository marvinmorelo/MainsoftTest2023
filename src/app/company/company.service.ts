import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../shared/models/company-model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    const companiesUrl = `${this.apiUrl}/company/companies`;
    return this.http.get<Company[]>(companiesUrl);
  }

  getCompanyById(id: string): Observable<Company> {
    const companyUrl = `${this.apiUrl}/companies/${id}`;
    return this.http.get<Company>(companyUrl);
  }

  createCompany(company: Company): Observable<Company> {
    const companiesUrl = `${this.apiUrl}/companies`;
    return this.http.post<Company>(companiesUrl, company);
  }

  updateCompany(id: string, data: any): Observable<Company> {
    const companyUrl = `${this.apiUrl}/companies/${id}`;
    return this.http.put<Company>(companyUrl, data);
  }

  deleteCompany(id: string): Observable<void> {
    const companyUrl = `${this.apiUrl}/companies/${id}`;
    return this.http.delete<void>(companyUrl);
  }
}
