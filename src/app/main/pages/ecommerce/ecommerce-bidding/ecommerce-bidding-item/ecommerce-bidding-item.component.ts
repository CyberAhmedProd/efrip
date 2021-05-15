import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { EcommerceService } from '../../ecommerce.service';

@Component({
  selector: 'app-ecommerce-bidding-item',
  templateUrl: './ecommerce-bidding-item.component.html',
  styleUrls: ['./ecommerce-bidding-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})

export class EcommerceBiddingItemComponent implements OnInit {
    
    @Input() auction;
    public product;
    constructor(private _ecommerceService: EcommerceService) {}
    
    ngOnInit(): void {
        this.product=this.auction.product;
    }
}