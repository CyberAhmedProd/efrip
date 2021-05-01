import { Component, Input, SimpleChanges } from "@angular/core";

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
  selector: "app-edit-category-sidebar",
  templateUrl: "./edit-category-sidebar-component.html",
})
export class EditCategorySidebarComponent {
    @Input()
    category_id: string;

    @Input()
    category_name:string;
  sidebar_name: string;
  _category: Category;
  _categoryForm: FormGroup;
  _name: string;
  success:boolean=false;
  error = "";
  duplicate=false;
  timeinterval = interval(1500);
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
    if(this._categoryForm.get("name").value == this.category_name){
        this.duplicate=true;
        this.error = "Same Name";
        return;
    }
    
    if (form.valid) {
       this.editCategory();
    }
    
  }

  private editCategory() {
    this._category = new Category();
    this._category.id= this.category_id;
    this._category.name = this.name;
    this._invoiceService.editCategory(this._category).subscribe((data) => {
      if (data.success != 1) {
        this.success = true;
        this.error = data.message;
      }else {
        this.toggleSidebar("edit-category-sidebar");
        setTimeout(() => {
          this._invoiceService.getDataTableRows();
        }, 500);
      }
    });
  }

  ngOnInit(): void {
    this._categoryForm = new FormGroup({
      name: new FormControl(this.category_name, [Validators.required]),
      
    });
    //this.form.name.setValue(this.category_name);
    
    // this.timeinterval.pipe(
    //   startWith(0),
    //   switchMap(()=> this._invoiceService.getDataTableRows())
    // ).subscribe(res => console.log(res),
    //   err => console.log(err))
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
    if(this._categoryForm)
    {
      this._categoryForm.get("name").setValue(this.category_name);
    }
  }
  updateError(){
    this.error="";
  }
}
