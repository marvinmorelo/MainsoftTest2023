import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: [''],
      price: [''],
      description: [''],
      imageUrl: [''],
    });
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
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
  }

  onSubmit() {
    if (this.productForm.valid) {
      // El formulario es válido, puedes continuar con la lógica de guardado
    } else {
      // El formulario es inválido, puedes mostrar mensajes de error o realizar otras acciones
    }
  }
}
