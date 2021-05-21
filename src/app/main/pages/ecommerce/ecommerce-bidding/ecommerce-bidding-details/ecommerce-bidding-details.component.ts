import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { SwiperConfigInterface } from "ngx-swiper-wrapper";

import { EcommerceService } from "../../ecommerce.service";

@Component({
  selector: "app-ecommerce-bidding-details",
  templateUrl: "./ecommerce-bidding-details.component.html",
  styleUrls: ["./ecommerce-bidding-details.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { class: "ecommerce-application" },
})
export class EcommerceBiddingDetailsComponent implements OnInit {
  // public
  public contentHeader: object;
  public auction;
  public product;
  public id;
  public relatedProducts;

  // Swiper
  public swiperResponsive: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  };

  /**
   * Constructor
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(
    private _ecommerceService: EcommerceService,
    private route: ActivatedRoute
  ) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.id = data.id;
    });
    this._ecommerceService.getSelectedAuction(this.id).then(() => {
      this._ecommerceService.onSelectedAuctionChange.subscribe((res) => {
        this.auction = res;
        this.product = this.auction.product;
      });
    });
    // Subscribe to Selected Product change

    // content header
    this.contentHeader = {
      headerTitle: "Auction Details",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          {
            name: "Auction",
            isLink: true,
            link: "/pages/bidding",
          },
          {
            name: "Details",
            isLink: false,
          },
        ],
      },
    };
  }
}