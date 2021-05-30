import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Cart, Order, WishList } from "app/auth/models";
import { AuthenticationService } from "app/auth/service";
import { environment } from "environments/environment";

import { BehaviorSubject, Observable } from "rxjs";
interface MyData {
  success: number;
  message: string;
}
@Injectable({
  providedIn: "root",
})
export class EcommerceService implements Resolve<any> {
  // Public
  public productList: Array<any>;
  public wishlist: Array<any>;
  public cartList: Array<any>;
  public auctionList: Array<any>;
  public selectedProduct;
  public selectedAuction;
  public relatedProducts;
  cart : Cart;

  public onProductListChange: BehaviorSubject<any>;
  public onAuctionListChange: BehaviorSubject<any>;
  public onRelatedProductsChange: BehaviorSubject<any>;
  public onWishlistChange: BehaviorSubject<any>;
  public onCartListChange: BehaviorSubject<any>;
  public onSelectedProductChange: BehaviorSubject<any>;
  public onSelectedAuctionChange:BehaviorSubject<any>;

  // Private
  private idHandel;

  private sortRef = (key) => (a, b) => {
    const fieldA = a[key];
    const fieldB = b[key];

    let comparison = 0;
    if (fieldA > fieldB) {
      comparison = 1;
    } else if (fieldA < fieldB) {
      comparison = -1;
    }
    return comparison;
  };

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
    private _httpClient: HttpClient,
    private _auth: AuthenticationService,
    private _router: Router
  ) {
    this.onProductListChange = new BehaviorSubject({});
    this.onAuctionListChange = new BehaviorSubject({});
    this.onRelatedProductsChange = new BehaviorSubject({});
    this.onWishlistChange = new BehaviorSubject({});
    this.onCartListChange = new BehaviorSubject({});
    this.onSelectedProductChange = new BehaviorSubject({});
    this.onSelectedAuctionChange = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.idHandel = route.params.id;

    return new Promise<void>((resolve, reject) => {
      Promise.all([
        this.getProducts(),
        this.getWishlist(),
        this.getCartList(),
        this.getSelectedProduct(),
      ]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get Products
   */
  getProducts(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`${environment.apiDistant}/api/product`)
        .subscribe((response: any) => {
          this.productList = response;
          this.sortProduct("featured"); // Default shorting
          resolve(this.productList);
        }, reject);
    });
  }

  getAuctions():Promise<any[]>{
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`${environment.apiDistant}/api/auction`)
        .subscribe((response: any) => {
          this.auctionList = response.reverse();
          this.onAuctionListChange.next(this.auctionList) // Default shorting
          resolve(this.auctionList);
        }, reject);
    });

  }

  /**
   * Get Wishlist
   */
  getWishlist(): Promise<WishList[]> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post<WishList[]>(
          `${environment.apiDistant}/api/wishlist/` +
            this._auth.currentUserValue?.id,
          {}
        )
        .subscribe((response: any) => {
          this.wishlist = response;
          this.onWishlistChange.next(this.wishlist);
          resolve(this.wishlist);
        }, reject);
    });
  }

  /**
   * Get CartList
   */
  getCartList(): Promise<Cart[]> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post<Cart[]>(
          `${environment.apiDistant}/api/cart/` +
            this._auth.currentUserValue?.id,
          {}
        )
        .subscribe((response: any) => {
          this.cartList = response;
          this.onCartListChange.next(this.cartList);
          resolve(this.cartList);
        }, reject);
    });
  }

  /**
   * Get Selected Product
   */
  getSelectedProduct(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`${environment.apiDistant}/api/product/` + this.idHandel)
        .subscribe((response: any) => {
          this.selectedProduct = response;
          this.onSelectedProductChange.next(this.selectedProduct);
          resolve(this.selectedProduct);
        }, reject);
    });
  }
  getSelectedAuction(id): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get(`${environment.apiDistant}/api/auction/` + id)
        .subscribe((response: any) => {
          this.selectedAuction= response;
          this.onSelectedAuctionChange.next(this.selectedAuction);
          resolve(this.selectedAuction);
        }, reject);
    });
  }
  addAuction(startingPrice,product_id,startDate,endDate){
    if(! this._auth.currentUserValue){
      this._router.navigate(['pages/authentication/login-v2'])
    }
    let user_id=this._auth.currentUserValue.id;
    let form ={
      product:{
        id:product_id,
      },
      user:{
        id:user_id,
      },
      startingPrice:startingPrice,
      startDate:startDate.toString(),
      endDate:endDate,
      bids:[]

    }
    return new Promise((resolve, reject) => {
      this._httpClient.post<any>(`${environment.apiDistant}/api/auction/add/`,form)
      .subscribe((response)=> {
        resolve(response)
      },reject)
    } )

  }
  addBid(auction_id,bidAmount){
    if(! this._auth.currentUserValue){
      this._router.navigate(['pages/authentication/login-v2'])
    }
    let user_id=this._auth.currentUserValue.id;
    return new Promise((resolve,reject)=> {
      this._httpClient.post(`${environment.apiDistant}/api/auction/bid/add/` + auction_id, 
      {
        user:{
          id:user_id
        },
        bidAmount:bidAmount
      }).subscribe((response)=>{
        resolve(response)
      },reject)
    })
  }

  /**
   * Get Related Products
   */
  getRelatedProducts(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get("api/ecommerce-relatedProducts")
        .subscribe((response: any) => {
          this.relatedProducts = response;
          this.onRelatedProductsChange.next(this.relatedProducts);
          resolve(this.relatedProducts);
        }, reject);
    });
  }

  /**
   * Sort Product
   *
   * @param sortBy
   */
  sortProduct(sortBy) {
    let sortDesc = false;

    const sortByKey = (() => {
      if (sortBy === "price-desc") {
        sortDesc = true;
        return "price";
      }
      if (sortBy === "price-asc") {
        return "price";
      }
      sortDesc = true;
      return "id";
    })();

    const sortedData = this.productList.sort(this.sortRef(sortByKey));
    if (sortDesc) sortedData.reverse();
    this.productList = sortedData;
    this.onProductListChange.next(this.productList);
  }

  /**
   * Add In Wishlist
   *
   * @param id
   */
  addToWishlist(id) {
    return new Promise<MyData>((resolve, reject) => {
      // const lengthRef = this.wishlist.length + 1;
      if(! this._auth.currentUserValue){
        this._router.navigate(['pages/authentication/login-v2'])
      }
      const wishRef = { 
         
        product: {
          id:id,
        },
        user:{
          id:this._auth.currentUserValue.id,
        } 
      };

      this._httpClient
        .post<MyData>(`${environment.apiDistant}/api/wishlist/add`, { ...wishRef })
        .subscribe((response) => {
          if (response.success === 1) {
            this.getWishlist();
            resolve(response);
          } else {
            reject();
          }
        }, reject);
    });
  }

  /**
   * Remove From Wishlist
   *
   * @param id
   */
  removeFromWishlist(id) {
    const indexRef = this.wishlist.findIndex(
      (wishlistRef) => wishlistRef.product.id === id
    ); // Get the index ref
    const indexId = this.wishlist[indexRef].id; // Get the product wishlist id from indexRef
    return new Promise<void>((resolve, reject) => {
      this._httpClient
        .delete(`${environment.apiDistant}/api/wishlist/delete/` + indexId)
        .subscribe((response: any) => {
          this.getWishlist();
          resolve();
        }, reject);
    });
  }

  /**
   * Add In Cart
   *
   * @param id
   */
  addToCart(id) {
    if(! this._auth.currentUserValue){
      this._router.navigate(['pages/authentication/login-v2'])
    }
    return new Promise<MyData>((resolve, reject) => {
      //const lengthRef = this.cartList.length + 1;
      const cartRef = {
        product: {
          id: id,
        },
        user: {
          id: this._auth.currentUserValue.id,
        },
        quantity: 1,
      };

      this._httpClient
        .post<MyData>(`${environment.apiDistant}/api/cart/add`, { ...cartRef })
        .subscribe((response) => {
          if (response.success === 1) {
            this.getCartList();
            resolve(response);
          } else {
            reject();
          }
        }, reject);
    });
  }
    /**
   * Add Order
   *
   * @param order
   */
  addOrder(order : Order) {
    return new Promise<any>((resolve, reject) => {
      this._httpClient
        .post<any>(`${environment.apiDistant}/api/order`, order)
        .subscribe((response) => {
            resolve(response);
        }, reject);
    });
  }

  updateQtyProductCart(id : string, qty : number){
    this.cart = new Cart()
    this.cart.id = id
    this.cart.quantity = qty
    return new Promise<any>((resolve,reject)=>{
      this._httpClient
      .put<any>(`${environment.apiDistant}/api/cart/update/quantity/${id}`,
      this.cart
       )
       .subscribe((response)=>{
         resolve(response);
       },reject)
    })
  }

  /**
   * Remove From Cart
   *
   * @param id
   */
  removeFromCart(id) {
    // const indexRef = this.cartList.findIndex(
    //   (cartListRef) => cartListRef.product.id === id
    // ); // Get the index ref
    // const indexId = this.cartList[indexRef].id; // Get the product wishlist id from indexRef

    return new Promise<void>((resolve, reject) => {
      this._httpClient
        .delete(`${environment.apiDistant}/api/cart/delete/` + id)
        .subscribe((response: any) => {
          this.getCartList();
          resolve();
        }, reject);
    });
  }
}
