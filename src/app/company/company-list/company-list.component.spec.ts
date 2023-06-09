import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CompanyListComponent } from './company-list.component';
import { CompanyService } from '../company.service';
import { Company } from 'src/app/shared/models/company-model';
import { of } from 'rxjs';

describe('CompanyListComponent', () => {
  let component: CompanyListComponent;
  let fixture: ComponentFixture<CompanyListComponent>;
  let mockCompanyService: jasmine.SpyObj<CompanyService>;

  beforeEach(async () => {
    mockCompanyService = jasmine.createSpyObj('CompanyService', ['getCompanies', 'deleteCompany']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CompanyListComponent],
      providers: [{ provide: CompanyService, useValue: mockCompanyService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch companies on ngOnInit', () => {
    const mockCompanies: Company[] = [
      { id: '1', name: 'Company 1', address: 'Address 1', nit: 'NIT 1', phone: 'Phone 1' },
      { id: '2', name: 'Company 2', address: 'Address 2', nit: 'NIT 2', phone: 'Phone 2' },
    ];
    mockCompanyService.getCompanies.and.returnValue(of(mockCompanies));

    component.ngOnInit();

    expect(mockCompanyService.getCompanies).toHaveBeenCalled();
    expect(component.companies).toEqual(mockCompanies);
  });

  it('should delete a company', () => {
    const companyId = '1';
    spyOn(window, 'confirm').and.returnValue(true);
    mockCompanyService.deleteCompany.and.returnValue(of(undefined));
  
    component.onDeleteCompany(companyId);
  
    expect(window.confirm).toHaveBeenCalled();
    expect(mockCompanyService.deleteCompany).toHaveBeenCalledWith(companyId);
  });

});
