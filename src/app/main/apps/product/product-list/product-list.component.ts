import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";


import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { ProductListService } from "./product-list.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ListGroupComponent } from "app/main/components/list-group/list-group.component";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProductListComponent implements OnInit {
  // public
  public data: any;
  public selectedOption = 10;
  public selectedStatusOption = "";
  public ColumnMode = ColumnMode;
  public temp_id:string;
  public temp_name:string;

  // decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  public rows;

  /**
   * Constructor
   *
   * @param {ProductListService} _productListService
   */
  constructor(
    private _productListService: ProductListService,
    private _coreSidebarService: CoreSidebarService,
    private modalService: NgbModal
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
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    
  }
  
  toggleSidebar2(name,category_id,category_name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.temp_id=category_id;
    this.temp_name=category_name;
   // console.log(this._coreSidebarService.getSidebarRegistry(name).category_id)
  }
  modalOpenForm(modalForm) {
    this.modalService.open(modalForm,{size:'lg',backdrop:'static'});
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this._productListService.onDatatablessChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response) => {
      this.data = response;
      this.rows = this.data;
      this.tempData = this.rows;
    });
  }

  deleteProduct(id) {
    this._productListService.deleteProduct(id);
    setTimeout(() => {
      this._productListService.getDataTableRows();
    }, 500);
  }
  
}
