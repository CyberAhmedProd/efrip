import { Component } from "@angular/core";

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Category } from "app/auth/models";
import { InvoiceListService } from "../invoice-list.service";

@Component({
  selector: "app-new-category-sidebar",
  templateUrl: "./new-category-sidebar.component.html",
})
export class NewCategorySidebarComponent {
  _category: Category;
  _categoryForm : FormGroup;
  _name : string ;
  submitted = false;
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _invoiceService: InvoiceListService
  ) {}

  get name(){
      return this._categoryForm.get('name').value;
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
      console.log('valid');
      this.addCategory();
      this.toggleSidebar('new-category-sidebar');
    }
    else {
        console.log('invalid')
    }
  }

  private addCategory(){
    this._category = new Category();
    this._category.name=this.name;
    this._invoiceService.addCategory(this._category);
    this._invoiceService.getDataTableRows();
    console.log(this._category.name)

  }

  ngOnInit(): void {
    this._categoryForm = new FormGroup({
        name :new FormControl("", [Validators.required]),
    });
  }
}
