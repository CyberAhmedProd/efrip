import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";


import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { ProductListService } from "./product-list.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ListGroupComponent } from "app/main/components/list-group/list-group.component";
import { InvoiceListService } from "../../invoice/invoice-list/invoice-list.service";
import { Category } from "app/auth/models";



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
  public categories:Category[];
  public spinner:boolean=true;
  // decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  public rows;
  upadatetablefromchild(){
    this.loadData();
    this.ref.detectChanges()
  }
  /**
   * Constructor
   *
   * @param {ProductListService} _productListService
   */
  constructor(
    private _productListService: ProductListService,
    
    private _categoryService:InvoiceListService,
    private modalService: NgbModal,
    private ref: ChangeDetectorRef
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
  
  modalOpenForm(modalForm) {
    this.modalService.open(modalForm,{size:'lg',backdrop:'static'});
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  loadData(){
    
    this._productListService.getDataTableRows()
    
    .then((response) => {
      this.data = response;
      this.rows = this.data;
      this.tempData = this.rows;
      this.spinner=false;
      
    });
  }
  ngOnInit(): void {
    this.spinner=true;
    this.loadData();
    this._categoryService.getDataTableRows()
    
    .then((response) => {
      this.categories=response;
    })
  }

  deleteProduct(id) {
    this._productListService.deleteProduct(id);
    
    setTimeout(() => {
      this.loadData()
    }, 500);
  }
  
}
