import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CompanyService } from './company.service';
import { Company } from '../shared/models/company-model';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService]
    });
    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get list of companies', () => {
    const mockCompanies: Company[] = [
      { id: '1', name: 'Company 1', address: 'Address 1', nit: 'NIT 1', phone: '123456789' },
      { id: '2', name: 'Company 2', address: 'Address 2', nit: 'NIT 2', phone: '987654321' },
    ];

    service.getCompanies().subscribe(companies => {
      expect(companies).toEqual(mockCompanies);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/companies`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCompanies);
  });

  it('should get a company by ID', () => {
    const companyId = '1';
    const mockCompany: Company = { id: '1', name: 'Company 1', address: 'Address 1', nit: 'NIT 1', phone: '123456789' };

    service.getCompanyById(companyId).subscribe(company => {
      expect(company).toEqual(mockCompany);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/companies/${companyId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCompany);
  });

  it('should create a company', () => {
    const newCompany: Company = { id: '3', name: 'Company 3', address: 'Address 3', nit: 'NIT 3', phone: '987654321' };

    service.createCompany(newCompany).subscribe(createdCompany => {
      expect(createdCompany).toEqual(newCompany);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/companies`);
    expect(req.request.method).toBe('POST');
    req.flush(newCompany);
  });

  it('should update a company', () => {
    const companyId = '1';
    const updatedData = { name: 'Updated Company', address: 'Updated Address' };
    const mockUpdatedCompany: Company = {
      id: companyId, ...updatedData,
      nit: '',
      phone: ''
    };

    service.updateCompany(companyId, updatedData).subscribe(updatedCompany => {
      expect(updatedCompany).toEqual(mockUpdatedCompany);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/companies/${companyId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockUpdatedCompany);
  });

  it('should delete a company', () => {
    const companyId = '1';

    service.deleteCompany(companyId).subscribe(() => {
      // Expectations for successful deletion
    });

    const req = httpMock.expectOne(`${service.apiUrl}/companies/${companyId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  // Add more test cases for other methods as needed

});
