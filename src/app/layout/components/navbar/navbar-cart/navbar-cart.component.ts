import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EcommerceService } from 'app/main/pages/ecommerce/ecommerce.service';
import { Cart } from 'app/auth/models';
import { CardStatisticsModule } from 'app/main/ui/card/card-statistics/card-statistics.module';

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
  public test=0;

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
    product.product.isInCart = false;
    this._ecommerceService.removeFromCart(product.id).then(res => {
      
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  updateTotal(){
    this.total=0
            this.cartListLength = this.cartList.length;
            this.cartList.forEach(product => {
        
            this.total =this.total+ (product.product.price*product.quantity);
    })
  }
  valueChanged(value){
    console.log(value)
  }
  checkout(){
    console.log(this.cartList)
  }
  getInput(cartItem,event){
    cartItem.quantity = event;
    this.updateTotal()
  }
  /**
   * On init
   */
  ngOnInit(): void {
    // Get Products
    
    this._ecommerceService.getProducts();
    
    // Get Cart List
    this._ecommerceService.getCartList().then(()=> {
      if(this.cartList){
        this._ecommerceService.onCartListChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
          this.cartList = res;
          if(this.cartList){
            this.total=0
            this.cartListLength = this.cartList.length;
            this.cartList.forEach(product => {
        
            this.total =this.total+ (product.product.price*product.quantity);
            })
          }
          
          this._ecommerceService.onProductListChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
            
            this.products = res;
      
            if (this.products.length) {
              // update product is in CartList : Boolean
              if(this.cartList){
                this.products.forEach(product => {
                 // product.isInWishlist = this.wishlist.findIndex(p => p.product.id === product.id) > -1;
                 let num=this.cartList.findIndex(p => p.product.id === product.id)
                 //console.log(num)
                 if(num!=-1){
                  product.isInCart =true;
                 }else {
                  product.isInCart =false;
                 }
                 
                });
          
              }
            }
          });
        });

      }
      
    });

    // Subscribe to Cart List
    

    // Subscribe to ProductList change
    
   
  }
}
