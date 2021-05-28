import { Component, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { UserListService } from 'app/main/apps/user/user-list/user-list.service';
import { UserService } from 'app/auth/service';
import { local_image } from 'app/image.const'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
  // Public
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public data: any;
  public spinner:boolean = true;
  public loadingIndicator:true;
  
  

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {UserListService} _userListService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _userListService: UserListService,
     private _coreSidebarService: CoreSidebarService,
      private _userService : UserService,
      ) {
    this._unsubscribeAll = new Subject();
    this.tempData = this.rows;
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  deleteUser(id :String){
    this._userService.deleteUser(id)
    setTimeout(() => {
      this._userListService.getDataTableRows();
     
    }, 500);
  }
  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return d.user.username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
 
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this.spinner=true;
    this.loadData();
    this._userListService.onDatatablessChanged
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(response => {
      this.data = response;
      this.rows = this.data;
      this.tempData = this.rows;
    });
  }
  loadData(){
    this.spinner = true;
    this._userListService.getDataTableRows()
    
    .then((response) => {
      this.data = response;
      this.rows = this.data;
      this.tempData = this.rows;
      this.spinner=false;
      
    });
  }
}
