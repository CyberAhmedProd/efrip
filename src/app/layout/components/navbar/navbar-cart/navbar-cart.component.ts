import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EcommerceService } from 'app/main/pages/ecommerce/ecommerce.service';
import { Cart } from 'app/auth/models';

@Component({
  selector: 'app-navbar-cart',
  templateUrl: './navbar-cart.component.html'
})
export class NavbarCartComponent implements OnInit {
  // Public
  public products = [];
  public cartList : Cart []=new Array();
  public total = 0;
  public cartListLength;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(public _ecommerceService: EcommerceService) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Remove From Cart
   *
   * @param product
   */
  removeFromCart(product) {
    if (product.isInCart === true) {
      this._ecommerceService.removeFromCart(product.id).then(res => {
        product.isInCart = false;
      console.log(product)
      });
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get Products
    this._ecommerceService.getProducts();
    
    // Get Cart List
    this._ecommerceService.getCartList().then(()=> {
      console.log(this.cartList)
      this.cartList.forEach(product => {
        
        this.total =this.total+ (product.product.price*product.quantity);
        console.log(this.total)
      })
    });

    // Subscribe to Cart List
    this._ecommerceService.onCartListChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.cartList = res;
      this.cartListLength = this.cartList.length;
      this._ecommerceService.onProductListChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
        console.log("shitman")
        this.products = res;
  
        if (this.products.length) {
          // update product is in CartList : Boolean
          this.products.forEach(product => {
            product.isInCart = this.cartList.findIndex(p => p.product.id=== product.id) > -1? true:false;
            let num=this.cartList.findIndex(p => p.product.id=== product.id)
            let bla=JSON.parse(JSON.stringify(this.cartList))
            if (product.isInCart){
              product.quantityToGet=bla[num].quantity
            }
            
            
          });
        }
      });
    });

    // Subscribe to ProductList change
    
   
  }
}
