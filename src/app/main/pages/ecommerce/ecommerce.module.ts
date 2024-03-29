import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';


import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { EcommerceService } from './ecommerce.service';
import { EcommerceDetailsComponent } from './ecommerce-details/ecommerce-details.component';
import { EcommerceItemComponent } from './ecommerce-item/ecommerce-item.component';
import { EcommerceShopComponent } from './ecommerce-shop/ecommerce-shop.component';
import { EcommerceSidebarComponent } from './ecommerce-shop/sidebar/sidebar.component';
import { EcommerceWishlistComponent } from './ecommerce-wishlist/ecommerce-wishlist.component';
import { EcommerceCheckoutComponent } from './ecommerce-checkout/ecommerce-checkout.component';
import { EcommerceCheckoutItemComponent } from './ecommerce-checkout/ecommerce-checkout-item/ecommerce-checkout-item.component';
import {EcommerceBiddingComponent} from './ecommerce-bidding/ecommerce-bidding.component'
import { from } from 'rxjs';
import {EcommerceBiddingItemComponent} from './ecommerce-bidding/ecommerce-bidding-item/ecommerce-bidding-item.component'
import {EcommerceBiddingDetailsComponent} from './ecommerce-bidding/ecommerce-bidding-details/ecommerce-bidding-details.component'
import { NgxMaskModule } from 'ngx-mask';
import {EcommerceBiddingAddComponent} from './ecommerce-bidding/ecommerce-bidding-add/ecommerce-bidding-add.component'
import { ProductListService } from 'app/main/apps/product/product-list/product-list.service';
import { InvoiceListService } from 'app/main/apps/invoice/invoice-list/invoice-list.service';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  observer: true
};

// routing
const routes: Routes = [
  {
    path: 'shop',
    component: EcommerceShopComponent,
    resolve: {
     // ecommerce: EcommerceService
    }
  },
  {
    path: 'details/:id',
    component: EcommerceDetailsComponent,
    resolve: {
      ecommerce: EcommerceService
    }
  },
  {
    path: 'wishlist',
    component: EcommerceWishlistComponent,
    resolve: {
      ecommerce: EcommerceService
    }
  },
  {
    path: 'checkout',
    component: EcommerceCheckoutComponent,
    resolve: {
      ecommerce: EcommerceService
    }
  },
  {
    path: 'details',
    redirectTo: '/apps/e-commerce/details/27' //Redirection
  },
  {
    path :'bidding',
    component: EcommerceBiddingComponent
  },
  {
    path :'bidding/details/:id',
    component :EcommerceBiddingDetailsComponent
  }
];

@NgModule({
  declarations: [
    EcommerceShopComponent,
    EcommerceSidebarComponent,
    EcommerceDetailsComponent,
    EcommerceWishlistComponent,
    EcommerceCheckoutComponent,
    EcommerceItemComponent,
    EcommerceCheckoutItemComponent,
    EcommerceBiddingComponent,
    EcommerceBiddingItemComponent,
    EcommerceBiddingDetailsComponent,
    EcommerceBiddingAddComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SwiperModule,
    FormsModule,
    CoreTouchspinModule,
    ContentHeaderModule,
    CoreSidebarModule,
    CoreCommonModule,
    NgbModule,
    NouisliderModule,
    NgxMaskModule.forRoot(),
    NgSelectModule,
    Ng2FlatpickrModule,
    CoreDirectivesModule,

    
    
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    ProductListService,InvoiceListService
  ]
})
export class EcommerceModule {}
