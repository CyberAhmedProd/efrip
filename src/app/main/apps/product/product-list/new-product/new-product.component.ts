import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

import Stepper from "bs-stepper";
import * as snippet from "app/main/forms/form-elements/input-mask/input-mask.snippetcode";
import { InvoiceListService } from "app/main/apps/invoice/invoice-list/invoice-list.service";
import { ChangeDetectorRef } from "@angular/core";
import { Category } from "app/auth/models";
import { AuthenticationService } from "app/auth/service";
import { ProductListService } from "../product-list.service";
@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NewProductComponent implements OnInit {
  public TDNameVar;

  public TDQuantityVar;
  public TDPriceVar;
  @Input()
  public modal;
  @Input()
  public categories: Category[];
  public textLength;
  public selectedItem;
  public maxLength: number = 150;
  public selectBasic = [];
  public images = [];
  public submitIsEnabled=false;
  updatesubmitbutton(){
    console.log("hahahah")
    this.submitIsEnabled=true;
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
  onSubmit() {
    let toSend = {
      name: this.TDNameVar,
      user: {
        id: this._authService.currentUserValue.id,
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
    this._productService.addProduct(toSend).subscribe(data => {
      console.log(data)
    })
    setTimeout(() => {
      this._productService.getDataTableRows();
    }, 500);
    this.modal.close();
    
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

    console.log("yes", this.categories);
    this.selectedItem = this.categories[0];
    this.bsStepper = document.querySelectorAll(".bs-stepper");

    // content header
  }
}
