import { DigitDecimaNumberDirective } from './../_directives/decimal-number.directivs';
import { PermissionService } from './../services/permission.service';
import { ErrorHandlerService } from './../services/error-handler.service';
import { RepositoryService } from './../services/repository.service';
import { EnvironmentUrlService } from './../services/environment-url.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from './material.module';
import { AuthGuard } from '../services/auth/auth.guard';

@NgModule({
  declarations: [DigitDecimaNumberDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
    MaterialModule,
  ],
  providers:[
    EnvironmentUrlService,
    RepositoryService,
    ErrorHandlerService,
    PermissionService,
    AuthGuard
  ]
})
export class SharedModule {}
