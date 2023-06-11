import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Company } from 'src/app/shared/models/company-model';
import { InventoryService } from '../inventory.service';
import { CompanyService } from 'src/app/company/company.service';

import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let mockFormBuilder: FormBuilder;
  let mockInventoryService: Partial<InventoryService>;
  let mockRouter: Partial<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockCompanyService: Partial<CompanyService>;

  beforeEach(async () => {
    mockFormBuilder = jasmine.createSpyObj(['group']);
    mockInventoryService = jasmine.createSpyObj(['getProductById', 'createProduct', 'updateProduct']);
    mockRouter = jasmine.createSpyObj(['navigateByUrl']);

    mockCompanyService = jasmine.createSpyObj(['getCompanies']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductFormComponent],
      providers: [
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: InventoryService, useValue: mockInventoryService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CompanyService, useValue: mockCompanyService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should initialize the form with proper validators', () => {
  //   const mockFormGroup = jasmine.createSpyObj(['patchValue']);
  //   const mockCompanies: Company[] = [];

  //   (mockFormBuilder.group as jasmine.Spy).and.returnValue(mockFormGroup);
  //   (mockCompanyService.getCompanies as jasmine.Spy).and.returnValue(of(mockCompanies));

  //   component.ngOnInit();

  //   expect(mockFormBuilder.group).toHaveBeenCalledWith({
  //     companyId: ['', Validators.required],
  //     name: ['', Validators.required],
  //     price: ['', [Validators.required, Validators.min(0)]],
  //     description: ['', Validators.required],
  //     imageUrl: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i),
  //       ],
  //     ],
  //   });
  //   expect(mockCompanyService.getCompanies).toHaveBeenCalled();
  //   expect(mockFormGroup.patchValue).toHaveBeenCalled();
  // });

  it('should submit new product when form is valid and confirmation is accepted', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    const mockFormValue = { companyId: 'company1', name: 'Test Product', price: 10, description: 'Test Description', imageUrl: 'http://example.com/image.jpg' };
    const mockResponse = 'Response';

    (mockInventoryService.createProduct as jasmine.Spy).and.returnValue(of(mockResponse));

    component.productForm.setValue(mockFormValue);
    component.onSubmitNewProduct();

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to create this product?');
    expect(mockInventoryService.createProduct).toHaveBeenCalledWith(mockFormValue);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/product/products');
  });

  it('should not submit new product when form is invalid', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    const mockFormValue = { companyId: 'company1', name: '', price: 10, description: 'Test Description', imageUrl: 'http://example.com/image.jpg' };

    component.productForm.setValue(mockFormValue);
    component.onSubmitNewProduct();

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to create this product?');
    expect(mockInventoryService.createProduct).not.toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should not submit new product when confirmation is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    const mockFormValue = { companyId: 'company1', name: 'Test Product', price: 10, description: 'Test Description', imageUrl: 'http://example.com/image.jpg' };

    component.productForm.setValue(mockFormValue);
    component.onSubmitNewProduct();

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to create this product?');
    expect(mockInventoryService.createProduct).not.toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });

  // it('should update product when form is valid, confirmation is accepted, and changes are detected', () => {
  //   spyOn(window, 'confirm').and.returnValue(true);

  //   const mockFormValue = { companyId: 'company1', name: 'Test Product', price: 10, description: 'Test Description', imageUrl: 'http://example.com/image.jpg' };
  //   const mockOriginalData = { companyId: 'company1', name: 'Old Product', price: 5, description: 'Old Description', imageUrl: 'http://example.com/old-image.jpg' };
  //   const mockResponse = 'Response';

  //   (mockInventoryService.updateProduct as jasmine.Spy).and.returnValue(of(mockResponse));

  //   component.product = mockOriginalData;
  //   component.productForm.setValue(mockFormValue);
  //   component.onUpdateProduct('productId');

  //   expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to update this product?');
  //   expect(mockInventoryService.updateProduct).toHaveBeenCalledWith('productId', mockFormValue);
  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['/products']);
  // });

  it('should not update product when form is invalid', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    const mockFormValue = { companyId: 'company1', name: '', price: 10, description: 'Test Description', imageUrl: 'http://example.com/image.jpg' };

    component.productForm.setValue(mockFormValue);
    component.onUpdateProduct('productId');

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to update this product?');
    expect(mockInventoryService.updateProduct).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should not update product when confirmation is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    const mockFormValue = { companyId: 'company1', name: 'Test Product', price: 10, description: 'Test Description', imageUrl: 'http://example.com/image.jpg' };

    component.productForm.setValue(mockFormValue);
    component.onUpdateProduct('productId');

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to update this product?');
    expect(mockInventoryService.updateProduct).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should return true when form data has changes', () => {
    const formData = { name: 'New Name', price: 10, description: 'New Description' };
    const originalData = { name: 'Old Name', price: 5, description: 'Old Description' };

    const result = component.hasChanges(formData, originalData);

    expect(result).toBe(true);
  });

  it('should return false when form data has no changes', () => {
    const formData = { name: 'Old Name', price: 5, description: 'Old Description' };
    const originalData = { name: 'Old Name', price: 5, description: 'Old Description' };

    const result = component.hasChanges(formData, originalData);

    expect(result).toBe(false);
  });
});
