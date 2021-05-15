import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { Cart } from 'app/auth/models';

import { EcommerceService } from '../ecommerce.service';
@Component({
  selector: 'app-ecommerce-bidding',
  templateUrl: './ecommerce-bidding.component.html',
  styleUrls: ['./ecommerce-bidding.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})

export class EcommerceBiddingComponent implements OnInit {
    
    public contentHeader: object;
    public gridViewRef = true;
    public auctions = []
    public page = 1;
    public pageSize = 9;
    public searchText = '';
    public spinner = false;
    
    constructor( private _ecommerceService: EcommerceService,private _coreConfigService: CoreConfigService) {
        // Configure the layout
        this._coreConfigService.config = {
          layout: {
            navbar: {
              hidden: false
            },
            menu: {
              hidden: false
            },
            footer: {
              hidden: true
            },
            customizer: false,
            enableLocalStorage: false
          }
        };
    }
    listView() {
        this.gridViewRef = false;
      }
    
      /**
       * Update to Grid View
       */
    gridView() {
        this.gridViewRef = true;
      }
    ngOnInit(): void {

        this.contentHeader = {
            headerTitle: 'Auction',
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
          this.spinner=true;
          this._ecommerceService.getAuctions().then(()=> {
            this._ecommerceService.onAuctionListChange.subscribe(res => {
                this.auctions = res;
                this.spinner=false;
              });
          })
          
    }

}
