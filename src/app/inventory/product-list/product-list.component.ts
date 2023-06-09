import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product-model';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.inventoryService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  onDeleteProduct(id: string) {
    const confirmation = confirm(
      'Are you sure you want to delete this company?'
    );
    if (confirmation) {
      this.inventoryService.deleteProduct(id).subscribe(
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
