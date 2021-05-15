import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { Address, LigneItem, Order, Product, User } from 'app/auth/models';

import Stepper from 'bs-stepper';


import { EcommerceService } from '../ecommerce.service';

@Component({
  selector: 'app-ecommerce-checkout',
  templateUrl: './ecommerce-checkout.component.html',
  styleUrls: ['./ecommerce-checkout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceCheckoutComponent implements OnInit {
  // Public
  public contentHeader: object;
  public products;
  public cartLists;
  public wishlist;
  order : Order;
  address : Address;
  npr : number = 0;
  tax : number;
  fullNameVar: string
  numberVar: number
  flatVar: string
  landmarkVar: string
  cityVar: string
  pincodeVar: number
  stateVar: string
  streetVar : string
  currentUser : User
  ligneItem : LigneItem
  productData : Product

  // Private
  private checkoutStepper: Stepper;

  /**
   *  Constructor
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(private _ecommerceService: EcommerceService, private _coreConfigService : CoreConfigService) {
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: false
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Stepper Next
   */
  nextStep() {
    this.checkoutStepper.next();
  }
  /**
   * Stepper Previous
   */
  previousStep() {
    this.checkoutStepper.previous();
  }

  /**
   * Validate Next Step
   *
   * @param addressForm
   */
  validateNextStep(addressForm) {
    if (addressForm.valid) {
      this.nextStep();
    }
  }
  formatPhoneNumber(){
    if(this.numberVar)
    return   this.numberVar.toString().slice(0, 2) + '-' + this.numberVar.toString().slice(2,5)
    + '-' + this.numberVar.toString().slice(5) ?? '';
  }
  calculeNpr(){
    this.npr=0
            this.products.forEach(product => {
            this.npr =this.npr+ (product.product.price*product.quantity);
    })
  }
  calculTax() : number{
    return this.tax = (this.npr/100) * 18
  }

  calculeTot() : number{
    return this.tax+this.npr
  }

  addOrder(){
      this.order = new Order()
      this.order.fullName = this.fullNameVar
      this.order.status = "Hold"
      this.order.mobile = this.numberVar
      var futureDate = new Date();
      this.order.orderedDate = futureDate;
      futureDate.setDate(futureDate.getDate() + 7);
      this.order.shippedDate = futureDate
      this.order.totalPrice = this.calculeTot()
      this.address = new Address()
      this.address.city = this.cityVar
      this.address.codePostal = this.pincodeVar
      this.address.country = this.stateVar
      this.address.street = this.streetVar
      this.order.billingAddress = this.address
      this.order.listLigneItem = []
      this.currentUser = new User()
      this.currentUser.id = JSON.parse(localStorage.getItem('currentUser')).id
      this.order.user =  this.currentUser
      this.products.forEach(product => {
        this.ligneItem = new LigneItem();
        this.productData = new Product()
        this.productData.id = product.product.id
        this.ligneItem.product = this.productData
        this.ligneItem.quantity = product.quantity
        this.order.listLigneItem.push(this.ligneItem)
      })
      this._ecommerceService.addOrder(this.order)
      
  }

  countItem(){
    var count = 0
    this.products.forEach(product => {
    count ++  
    })
    return count
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to ProductList change
    this._ecommerceService.onCartListChange.subscribe(res => {
      this.products = res;

      this.products.isInWishlist = false;
    });

    // Subscribe to Cartlist change
    this._ecommerceService.onCartListChange.subscribe(res => {
      this.cartLists = res
      this.calculeNpr();});

    // Subscribe to Wishlist change
    this._ecommerceService.onWishlistChange.subscribe(res => (this.wishlist = res));

    // update product is in Wishlist & is in CartList : Boolean
  /*  this.products.forEach(product => {
      product.isInWishlist = this.wishlist.findIndex(p => p.product.id === product.id) > -1;
      product.isInCart = this.cartLists.findIndex(p => p.product.id === product.id) > -1;
    });*/

    this.checkoutStepper = new Stepper(document.querySelector('#checkoutStepper'), {
      linear: false,
      animation: true
    });

    
    // content header
    this.contentHeader = {
      headerTitle: 'Checkout',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'eCommerce',
            isLink: true,
            link: '/pages/shop'
          },
          {
            name: 'Checkout',
            isLink: false
          }
        ]
      }
    };
  }
}
