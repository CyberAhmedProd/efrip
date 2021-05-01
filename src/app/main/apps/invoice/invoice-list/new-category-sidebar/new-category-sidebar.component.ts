import { Component } from "@angular/core";

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Category } from "app/auth/models";
import { interval } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { startWith, switchMap } from "rxjs/operators";
import { InvoiceListService } from "../invoice-list.service";

@Component({
  selector: "app-new-category-sidebar",
  templateUrl: "./new-category-sidebar.component.html",
})
export class NewCategorySidebarComponent {
  _category: Category;
  _categoryForm: FormGroup;
  _name: string;
  error = "";
  timeinterval=interval(1500);
  submitted = false;
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _invoiceService: InvoiceListService
  ) {}

  get name() {
    return this._categoryForm.get("name").value;
  }
  get form() {
    return this._categoryForm.controls;
  }
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  submit(form) {
    this.submitted = true;
    if (form.valid) {
      this.addCategory();
    }
    
  }

  private addCategory() {
    this._category = new Category();
    this._category.name = this.name;
    this._invoiceService.addCategory(this._category).subscribe((data) => {
      if (data.success != 1) {
        this.error = data.message;
        setTimeout(() => {
          this.error = "";
        },1500);
      }else {
        this.toggleSidebar("new-category-sidebar");
        setTimeout(() => {
          this._invoiceService.getDataTableRows();
        }, 500);
      }
    });
    
    
    
  }
  
  ngOnInit(): void {
    this._categoryForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
    });
    this.timeinterval.pipe(
      startWith(0),
      switchMap(()=> this._invoiceService.getDataTableRows())
    ).subscribe(res => console.log(res),
      err => console.log(err))
  }
  

}
