import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CompanyFormComponent } from './company-form.component';
import { CompanyService } from '../company.service';
import { Company } from 'src/app/shared/models/company-model';

describe('CompanyFormComponent', () => {
  let component: CompanyFormComponent;
  let fixture: ComponentFixture<CompanyFormComponent>;
  let mockCompanyService: jasmine.SpyObj<CompanyService>;
  const mockActivatedRoute = {
    snapshot: {
      url: [],
    },
  };

  beforeEach(async () => {
    mockCompanyService = jasmine.createSpyObj('CompanyService', [
      'getCompanyById',
      'createCompany',
      'updateCompany',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      declarations: [CompanyFormComponent],
      providers: [
        { provide: CompanyService, useValue: mockCompanyService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on ngOnInit', () => {
    it('should call getCompanyById', () => {
      const mockCompany: Company = {
        id: '1',
        name: 'Test Company',
        address: 'Test Address',
        nit: 'Test NIT',
        phone: 'Test Phone',
      };
      mockCompanyService.getCompanyById.and.returnValue(of(mockCompany));

      component.ngOnInit();

      expect(mockCompanyService.getCompanyById).toHaveBeenCalledWith(
        component.id
      );
      expect(component.company).toEqual(mockCompany);
    });
  });

  describe('onSubmitNewCompany', () => {
    it('should create a new company on form submission', () => {
      const mockCompany: Company = {
        id: '1',
        name: 'Test Company',
        address: 'Test Address',
        nit: 'Test NIT',
        phone: 'Test Phone',
      };
      mockCompanyService.createCompany.and.returnValue(of(mockCompany));
      spyOn(window, 'confirm').and.returnValue(true);

      component.companyForm.setValue(mockCompany);
      component.onSubmitNewCompany();

      expect(mockCompanyService.createCompany).toHaveBeenCalledWith(mockCompany);
      expect(window.confirm).toHaveBeenCalled();
    });
  });

  describe('onUpdateCompany', () => {
    it('should update an existing company on form submission', () => {
      const mockCompany: Company = {
        id: '1',
        name: 'Test Company',
        address: 'Test Address',
        nit: 'Test NIT',
        phone: 'Test Phone',
      };
      component.company = mockCompany;
      mockCompanyService.updateCompany.and.returnValue(of(mockCompany));
      spyOn(window, 'confirm').and.returnValue(true);

      component.companyForm.setValue(mockCompany);
      component.onUpdateCompany(component.company.id);

      expect(mockCompanyService.updateCompany).toHaveBeenCalledWith(
        component.company.id,
        mockCompany
      );
      expect(window.confirm).toHaveBeenCalled();
    });
  });

});
