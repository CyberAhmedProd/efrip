import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";

import Stepper from "bs-stepper";
import { InvoiceListService } from "app/main/apps/invoice/invoice-list/invoice-list.service";
import { ChangeDetectorRef } from "@angular/core";
import { Category } from "app/auth/models";
import { AuthenticationService } from "app/auth/service";
import { ProductListService } from "app/main/apps/product/product-list/product-list.service";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { EcommerceService } from "../../ecommerce.service";
import * as moment from 'moment';
@Component({
  selector: "app-new-auction",
  templateUrl: "./ecommerce-bidding-add.component.html",
  styleUrls: ["./ecommerce-bidding-add.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EcommerceBiddingAddComponent implements OnInit {
  public TDNameVar;
  public spinner = false;
  public TDQuantityVar;
  public TDPriceVar;
  public loading=false;
  public currentDate:Date;
  public MinMaxDPdata: NgbDateStruct;
  @Input()
  public modal;
  @Input()
  public categories: Category[];
  public textLength;
  public selectedItem;
  public maxLength: number = 150;
  public selectBasic = [];
  public images = [];
  public submitIsEnabled = false;
  public toastStyle: object = {};
  @Output() updatetable = new EventEmitter<any>();
  updateparenttable() {
    this.updatetable.emit();
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
  submit(){
    this.loading=true;
    let endDate=this.MinMaxDPdata.year+"-"+this.MinMaxDPdata.month+"-"+this.MinMaxDPdata.day
    let formattedDate = (moment(this.currentDate)).format('DD-mmm-YYYY HH:mm:ss')
    let seconddate=new Date(endDate)
    console.log(formattedDate)
    console.log(seconddate)
    
    this._ecommerceService.addAuction(this.TDPriceVar,this.selectedItem.id,this.currentDate.toISOString(),seconddate.toISOString())
    .then(data => {
      this.loading=false;
      console.log(data)
      this.modal.dismiss();
      this._ecommerceService.getAuctions()
    })
  }
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
    this._productService.addProduct(toSend).subscribe();
    setTimeout(() => {
      this._productService.getDataTableRows();
    }, 500);
    this.modal.close();
    this.updateparenttable();
  }
  updateCounter() {
    console.log(this.textLength);
  }

  constructor(
    private _categroyService: InvoiceListService,
    private _ref: ChangeDetectorRef,
    private _authService: AuthenticationService,
    private _productService: ProductListService,
    private _ecommerceService : EcommerceService
  ) {}

  ngOnInit(): void {
    this.currentDate=new Date()
      this.spinner=true;
      this._productService.getDataTableRows().then(data => {
          this.categories=data
          this.selectedItem = this.categories[0];
          this.spinner=false;
      })
    this.horizontalWizardStepper = new Stepper(
      document.querySelector("#stepper1"),
      {}
    );
    
    this.bsStepper = document.querySelectorAll(".bs-stepper");

    // content header
  }
}
