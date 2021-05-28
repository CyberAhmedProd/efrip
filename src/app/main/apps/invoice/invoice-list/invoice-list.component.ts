import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";

import { InvoiceListService } from "app/main/apps/invoice/invoice-list/invoice-list.service";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";

@Component({
  selector: "app-invoice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrls: ["./invoice-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class InvoiceListComponent implements OnInit {
  // public
  public data: any;
  public selectedOption = 10;
  public selectedStatusOption = "";
  public ColumnMode = ColumnMode;
  public temp_id:string;
  public temp_name:string;
  public spinner:boolean=true;
  public loadingIndicator:true;

  // decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  public rows;

  /**
   * Constructor
   *
   * @param {InvoiceListService} _invoiceListService
   */
  constructor(
    private _invoiceListService: InvoiceListService,
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
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
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
    this._invoiceListService.onDatatablessChanged
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
  
  toggleSidebar2(name,category_id,category_name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.temp_id=category_id;
    this.temp_name=category_name;
   // console.log(this._coreSidebarService.getSidebarRegistry(name).category_id)
  }
  deleteCategory(id) {
    this._invoiceListService.deleteCategory(id);
    setTimeout(() => {
      this._invoiceListService.getDataTableRows();
    }, 500);
  }
  loadData(){
    this.spinner = true;
    this._invoiceListService.getDataTableRows()
    
    .then((response) => {
      this.data = response;
      this.rows = this.data;
      this.tempData = this.rows;
      this.spinner=false;
      
    });
  }
  
}
