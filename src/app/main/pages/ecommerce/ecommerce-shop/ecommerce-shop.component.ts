import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { Cart } from 'app/auth/models';

import { EcommerceService } from '../ecommerce.service';
@Component({
  selector: 'app-ecommerce-shop',
  templateUrl: './ecommerce-shop.component.html',
  styleUrls: ['./ecommerce-shop.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceShopComponent implements OnInit {
  // public
  public contentHeader: object;
  public shopSidebarToggle = false;
  public shopSidebarReset = false;
  public gridViewRef = true;
  public products;
  public wishlist;
  public cartList:Cart[];
  public page = 1;
  public pageSize = 9;
  public searchText = '';

  /**
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {EcommerceService} _ecommerceService
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(private _coreSidebarService: CoreSidebarService, private _ecommerceService: EcommerceService,private _coreConfigService: CoreConfigService) {
      // Configure the layout
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
   * Toggle Sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Update to List View
   */
  listView() {
    this.gridViewRef = false;
  }

  /**
   * Update to Grid View
   */
  gridView() {
    this.gridViewRef = true;
  }

  /**
   * Sort Product
   */
  sortProduct(sortParam) {
    this._ecommerceService.sortProduct(sortParam);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to ProductList change

    this._ecommerceService.onProductListChange.subscribe(res => {
      this.products = res;
      this.products.isInWishlist = false;
    });

    // Subscribe to Wishlist change
    this._ecommerceService.onWishlistChange.subscribe(res => (this.wishlist = res));

    // Subscribe to Cartlist change
    this._ecommerceService.onCartListChange.subscribe(res => (this.cartList = res));

    // update product is in Wishlist & is in CartList : Boolean
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
    

    // content header
    this.contentHeader = {
      headerTitle: 'Shop',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          }
        ]
      }
    };
  }
}
