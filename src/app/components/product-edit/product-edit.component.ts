import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css',
})
export class ProductEditComponent {
  productId: number;
  productFormGroup?: FormGroup;
  private submitted: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {
    this.productId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productsService.getProduct(this.productId).subscribe((product) => {
      this.productFormGroup = this.fb.group({
        id: [product.id, Validators.required],
        name: [product.name, Validators.required],
        price: [product.price, Validators.required],
        quantity: [product.quantity, Validators.required],
        selected: [product.selected, Validators.required],
        available: [product.available, Validators.required],
      });
    });
  }

  onUpdateProduct() {
    this.productsService
      .updateProduct(this.productFormGroup?.value)
      .subscribe((data) => {
        alert('Success Product updated');
      });
  }
}
