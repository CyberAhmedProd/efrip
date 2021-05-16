import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';

import { OrderListComponent } from 'app/main/apps/order/order-list/order-list.component';
import { OrderListService } from 'app/main/apps/order/order-list/order-list.service';



import { InvoicePreviewComponent } from 'app/main/apps/order/order-preview/invoice-preview.component';
import { InvoicePreviewService } from 'app/main/apps/order/order-preview/invoice-preview.service';
import { AddPaymentSidebarPreviewComponent } from 'app/main/apps/order/order-preview/sidebar/add-payment-sidebar-preview/add-payment-sidebar-preview.component';
import { SendInvoiceSidebarPreviewComponent } from 'app/main/apps/order/order-preview/sidebar/send-invoice-sidebar-preview/send-invoice-sidebar-preview.component';
// routing
const routes: Routes = [
 
  {
    path: 'list',
    component: OrderListComponent,
    resolve: {
      uls: OrderListService
    }
  },
  {
    path: 'preview/:id',
    component: InvoicePreviewComponent,
    resolve: {
      data: InvoicePreviewService
    },
    data: { path: 'user-view/:id' }
  },
  {
    path: 'preview',
    redirectTo: '/apps/invoice/preview/4989' // Redirection
  },
  {
    path: 'edit',
    redirectTo: '/apps/invoice/edit/4989' // Redirection
  }
];

@NgModule({
  declarations: [
    OrderListComponent,
    InvoicePreviewComponent,
    SendInvoiceSidebarPreviewComponent,
    AddPaymentSidebarPreviewComponent
   
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    CoreDirectivesModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    FormsModule,
    CorePipesModule,
    NgbModule,
    NgSelectModule,
    CoreSidebarModule
  ],
  providers: [OrderListService, InvoicePreviewService],
  exports: [OrderListComponent]
})
export class OrderModule {}
