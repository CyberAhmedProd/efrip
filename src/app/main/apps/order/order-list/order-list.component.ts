import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";

import { OrderListService } from "app/main/apps/order/order-list/order-list.service";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Order } from "app/auth/models";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class OrderListComponent implements OnInit {
  // public
  public data: any;
  public selectedOption = 10;
  public selectedStatusOption = "";
  public ColumnMode = ColumnMode;
  public temp_id:string;
  public temp_name:string;
  order : Order
  public spinner:boolean=true;
  public loadingIndicator:true;

  // decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  public rows;
  currentUser : any

  /**
   * Constructor
   *
   * @param {OrderListService} _orderListService
   */
  constructor(
    private _orderListService: OrderListService,
    private _coreSidebarService: CoreSidebarService
  ) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.user.username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this.spinner=true;
    this.loadData();
    this._orderListService.onDatatablessChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
    

        this.data = response;
        this.rows = this.data;
        this.tempData = this.rows;
      });
  }
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    
  }
  
  onShipping(id : string): void {
    this.order = new Order()
    this.order.id = id
    this.order.status = "Shipped"
    this._orderListService.onShipping(this.order)
    setTimeout(() => {
      this._orderListService.getDataTableRows();
    }, 500);
  
  }
  onHold(id : string): void {
    this.order = new Order()
    this.order.id = id
    this.order.status = "Shipped"
    this._orderListService.onHold(this.order)
    setTimeout(() => {
      this._orderListService.getDataTableRows();
    }, 500);
  
  }
  onDelivered(id : string): void {
    this.order = new Order()
    this.order.id = id
    this.order.status = "Shipped"
    this._orderListService.onDelivered(this.order)
    setTimeout(() => {
      this._orderListService.getDataTableRows();
    }, 500);
   
  }
  deleteOrder(id) {
    this._orderListService.deleteOrder(id);
    setTimeout(() => {
      this._orderListService.getDataTableRows();
    }, 500);
  }
  loadData(){
    this.spinner = true;
    this._orderListService.getDataTableRows()
    
    .then((response) => {
      this.data = response;
      this.rows = this.data;
      this.tempData = this.rows;
      this.spinner=false;
      
    });
  }
  
}
