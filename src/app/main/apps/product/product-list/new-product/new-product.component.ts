import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import Stepper from "bs-stepper";
import * as snippet from 'app/main/forms/form-elements/input-mask/input-mask.snippetcode';

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class NewProductComponent implements OnInit {
  public TDNameVar;
  public TDEmailVar;
  public TDQuantityVar;
  public TDPriceVar;
  public twitterVar;
  public facebookVar;
  public googleVar;
  public linkedinVar;
  public landmarkVar;
  public addressVar;
  public textLength;
  public selectedItem;
  public maxLength:number=150;
  public selectBasic = [
    { id:"test",name: "UK" },
    { name: "USA" },
    { name: "Spain" },
    { name: "France" },
    { name: "Italy" },
    { name: "Australia" },
  ];

  public selectMulti = [
    { name: "English" },
    { name: "French" },
    { name: "Spanish" },
  ];
  public selectMultiSelected;
  changeFn(selectedItem){
    console.log(selectedItem)
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
    return false;
  }
  updateCounter(){
    console.log(this.textLength)

  }
  constructor() {}

  ngOnInit(): void {
    this.horizontalWizardStepper = new Stepper(
      document.querySelector("#stepper1"),
      {}
    );
    this.selectedItem=this.selectBasic[0]
    this.bsStepper = document.querySelectorAll(".bs-stepper");

    // content header
  }
}
