import { Component } from "@angular/core";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Product } from "app/auth/models";
import { interval } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { startWith, switchMap } from "rxjs/operators";
import { ProductListService } from "../product-list.service";

@Component({
  selector: "app-new-product-sidebar",
  templateUrl: "./new-product-sidebar.component.html",
})
export class NewProductSidebarComponent {
  _product: Product;
  _productForm: FormGroup;
  _name: string;
  error = "";
  timeinterval=interval(1500);
  submitted = false;
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _productService: ProductListService
  ) {}

  get name() {
    return this._productForm.get("name").value;
  }
  get form() {
    return this._productForm.controls;
  }
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  submit(form) {
    this.submitted = true;
    if (form.valid) {
      this.addProduct();
    }
    
  }

  private addProduct() {
    this._product = new Product();
    this._product.name = this.name;
    this._productService.addProduct(this._product).subscribe((data) => {
      if (data.success != 1) {
        this.error = data.message;
      }else {
        this.toggleSidebar("new-product-sidebar");
        setTimeout(() => {
          this._productService.getDataTableRows();
        }, 500);
      }
    });
    
    
    
  }
  
  ngOnInit(): void {
    this._productForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
    });
    // this.timeinterval.pipe(
    //   startWith(0),
    //   switchMap(()=> this._productService.getDataTableRows())
    // ).subscribe(res => console.log(res),
    //   err => console.log(err))
  }
  updateError(){
    this.error = "";

  }

}
