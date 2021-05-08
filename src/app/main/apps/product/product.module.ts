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

import { ProductListComponent } from 'app/main/apps/product/product-list/product-list.component';
import { ProductListService } from 'app/main/apps/product/product-list/product-list.service';

import { NewProductSidebarComponent } from './product-list/new-product-sidebar/new-product-sidebar.component';
import {NewProductComponent} from 'app/main/apps/product/product-list/new-product/new-product.component'
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NgxMaskModule } from 'ngx-mask';
import {NewProductUploaderComponent} from 'app/main/apps/product/product-list/new-product-uploader/new-product-uploader.component'
import { FileUploadModule } from 'ng2-file-upload';
import { ImageService } from 'app/auth/service';
import { InvoiceListService } from '../invoice/invoice-list/invoice-list.service';
//import {EditProductSidebarComponent} from './product-list/edit-product-sidebar/edit-product-sidebar-component'
// routing
const routes: Routes = [
  {
    path: 'list',
    component: ProductListComponent,
    resolve: {
      uls: ProductListService
    }
  },
  {
    path: 'preview',
    redirectTo: '/apps/product/preview/4989' // Redirection
  },
  {
    path: 'edit',
    redirectTo: '/apps/product/edit/4989' // Redirection
  }
];

@NgModule({
  declarations: [
    
    ProductListComponent,
    NewProductSidebarComponent,
    NewProductComponent,
    NewProductUploaderComponent,
    
    
   
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
    CoreSidebarModule,
    CardSnippetModule,
    NgxMaskModule.forRoot(),
    FileUploadModule,
    
  ],
  providers: [ProductListService,ImageService,InvoiceListService],
  exports: [ProductListComponent]
})
export class ProductModule {}