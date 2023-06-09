import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/shared/models/company-model';
import { InventoryService } from '../inventory.service';
import { Product } from 'src/app/shared/models/product-model';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/company/company.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  companies: Company[];
  companyId: string = '';
  productId: string = '';
  product: Product | undefined;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {
    this.productForm = this.fb.group({
      companyId: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      imageUrl: [
        '',
        [
          Validators.required,
          Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i),
        ],
      ],
    });
    this.companies = [];
    this.productId = this.route.snapshot.url[1]?.path;
  }

  ngOnInit(): void {
    this.inventoryService.getProductById(this.productId).subscribe((resp) => {
      this.product = resp;
    });

    this.companyService.getCompanies().subscribe((resp) => {
      this.companies = resp;
    });

    if (this.product) {
      this.productForm.patchValue({
        companyId: this.product.companyId,
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
        imageUrl: this.product.imageUrl,
      });
    }
  }

  onSubmitNewProduct() {
    const confirmation = confirm(
      'Are you sure you want to create this product?'
    );
    if (confirmation) {
      if (this.productForm.valid) {
        const newProduct = this.productForm.value;
        this.inventoryService.createProduct(newProduct).subscribe(
          (response) => {
            alert('Product created successfully' + response);
            this.router.navigateByUrl('/product/products');
          },
          (error) => {
            alert('Error creating product' + error);
          }
        );
      }
    }
  }

  onUpdateProduct(id: string) {
    const confirmation = confirm(
      'Are you sure you want to update this product?'
    );
    if (confirmation) {
      if (this.productForm.valid) {
        const formData = this.productForm.value;
        const originalData: any = this.product;

        if (this.hasChanges(formData, originalData)) {
          this.inventoryService.updateProduct(id, formData).subscribe(
            (response) => {
              alert('Product updated successfully');
              this.router.navigate(['/products']);
            },
            (error) => {
              alert('Error updating product ' + error);
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
