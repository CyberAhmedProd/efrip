import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { EcommerceService } from 'app/main/pages/ecommerce/ecommerce.service';

@Component({
  selector: 'app-ecommerce-checkout-item',
  templateUrl: './ecommerce-checkout-item.component.html',
  styleUrls: ['../ecommerce-checkout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceCheckoutItemComponent implements OnInit {
  // Input Decorator
  @Input() product;
  qtyVar : number;                                                                         
  displayCounter(numberValue) {
    console.log(numberValue);
    this.qtyVar = numberValue
    this._ecommerceService.updateQtyProductCart(this.product.id, this.qtyVar)
    setTimeout(() => {
      this._ecommerceService.getCartList();
    }, 200);
  
  }
  countPrice(){
    return this.product.quantity * this.product.product.price;
  }

  /**
   * Constructor
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(private _ecommerceService: EcommerceService) {
    
  }

  /**
   * Remove From Cart
   *
   * @param product
   */
  removeFromCart(product) {
    //if (product.isInCart === true) {
      this._ecommerceService.removeFromCart(product.id).then(res => {
       // product.isInCart = false;
      });
   // }
  }

  /**
   * Toggle Wishlist
   *
   * @param product
   */
  toggleWishlist(product) {
    if (product.isInWishlist === true) {
      this._ecommerceService.removeFromWishlist(product.id).then(res => {
        product.isInWishlist = false;
      });
    } else {
      this._ecommerceService.addToWishlist(product.id).then(res => {
        product.isInWishlist = true;
      });
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {}
}
