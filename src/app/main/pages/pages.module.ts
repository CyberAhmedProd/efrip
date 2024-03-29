import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { ProfileModule } from './profile/profile.module';

import { AccountSettingsModule } from './account-settings/account-settings.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AuthenticationModule,
    MiscellaneousModule,
    Ng2FlatpickrModule,
    ProfileModule,
    AccountSettingsModule,
    EcommerceModule
  ],

  providers: []
})
export class PagesModule {}
