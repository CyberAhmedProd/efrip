import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";

import Stepper from "bs-stepper";
import { InvoiceListService } from "app/main/apps/invoice/invoice-list/invoice-list.service";
import { ChangeDetectorRef } from "@angular/core";
import { Category } from "app/auth/models";
import { AuthenticationService } from "app/auth/service";
import { ProductListService } from "../product-list.service";
import { NewProductUploaderComponent } from "../new-product-uploader/new-product-uploader.component";
@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EditProductComponent implements OnInit {
  public TDNameVar;
  @ViewChild(NewProductUploaderComponent) child: NewProductUploaderComponent;
  public TDQuantityVar;
  public TDPriceVar;
  @Input()
  productToUpdate;
  @Input()
  public modal;
  @Input()
  public categories: Category[];
  @Input()
  public isForEdit: boolean = false;
  public textLength;
  public selectedItem;
  public maxLength: number = 150;
  public selectBasic = [];
  public images = [];
  public submitIsEnabled = false;
  public toastStyle: object = {};7
  
  @Output() updatetable = new EventEmitter<any>();
  public loading = false;
  updateparenttable() {
    console.log("hahah");
    this.updatetable.emit();
    this._ref.detectChanges();
  }
  updatesubmitbutton(value) {
    this.submitIsEnabled = value;
    this._ref.detectChanges();
  }
  addItem(newItem: any) {
    this.images.push(newItem);
  }

  public selectMulti = [
    { name: "English" },
    { name: "French" },
    { name: "Spanish" },
  ];
  public selectMultiSelected;
  changeFn(selectedItem) {
    console.log(selectedItem);
  }
  // private

  private horizontalWizardStepper: Stepper;
  private bsStepper;

  /**
   * Horizontal Wizard Stepper Previous
   */

  /**
   * Vertical Wizard Stepper Next
   */
  /**
   * Horizontal Wizard Stepper Next
   *
   * @param data
   */

  horizontalWizardStepperNext(data) {
    if (data.form.valid === true) {
      this.horizontalWizardStepper.next();
    }
  }
  /**
   * Horizontal Wizard Stepper Previous
   */
  horizontalWizardStepperPrevious() {
    this.horizontalWizardStepper.previous();
  }

  /**
   * On Submit
   */
  async onSubmit() {
    this.loading = true;
    this.child.updateparent();
    let toSend = {
      id: this.productToUpdate.id,
      name: this.TDNameVar,
      user: {
        id: this.productToUpdate.user.id,
      },
      category: {
        id: this.selectedItem.id,
      },
      quantity: this.TDQuantityVar,
      price: this.TDPriceVar,
      details: this.textLength,
      description: null,
      featured: true,
      images: this.images,
    };
    var foo = new Promise<void>((resolve, reject) => {
      this._productService.editProduct(toSend).subscribe((data) => {
        resolve();
      });
    });
    foo.then(() => {
      
      this._productService.getDataTableRows().then(()=>{
        this.loading=false;
        this._ref.detectChanges();
        this.modal.close();
      })
      //this.updateparenttable();
      
    })
    // this._productService.editProduct(toSend).subscribe(data => {
    //   console.log(data)
    // });
    // setTimeout(() => {

    // }, 3000);

    
  }
  updateCounter() {
    console.log(this.textLength);
  }

  constructor(
    private _categroyService: InvoiceListService,
    private _ref: ChangeDetectorRef,
    private _authService: AuthenticationService,
    private _productService: ProductListService
  ) {}

  ngOnInit(): void {
    this.horizontalWizardStepper = new Stepper(
      document.querySelector("#stepper1"),
      {}
    );
    //this.selectedItem = this.categories[0];
    this.bsStepper = document.querySelectorAll(".bs-stepper");
    this.TDNameVar = this.productToUpdate.name;
    this.TDPriceVar = this.productToUpdate.price;
    this.TDQuantityVar = this.productToUpdate.quantity;
    this.textLength = this.productToUpdate.details;
    this.selectedItem = this.productToUpdate.category;
    if (this.productToUpdate.images.length) {
      this.submitIsEnabled = true;
      this.productToUpdate.images.forEach((item) => {
        item.spinner = false;
      });
    }

    // content header
  }
}
