import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersListComponent } from './pages/admin/customers-list/customers-list.component';
import { CustomersFormComponent } from './pages/admin/customers-form/customers-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './services/customer/customer.service';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { ModifyCustomerComponent } from './pages/admin/modify-customer/modify-customer.component';
import { CustomerDashboardComponent } from './pages/customer/customer-dashboard/customer-dashboard.component';
import { DemandFormComponent } from './pages/customer/demand-form/demand-form.component';
import { DemandListComponent } from './pages/customer/demand-list/demand-list.component';
import { DatePipe } from '@angular/common';
import { AdminDemandListComponent } from './pages/admin/admin-demand-list/admin-demand-list.component';
import { NgbActiveModal, } from '@ng-bootstrap/ng-bootstrap';
import { HistoryComponent } from './pages/admin/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    CustomersFormComponent,
    ModifyCustomerComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    ForbiddenComponent,
    ModifyCustomerComponent,
    CustomerDashboardComponent,
    DemandFormComponent,
    DemandListComponent,
    AdminDemandListComponent,
    HistoryComponent,
  ],
  // declarations: [AppComponent, CustomersListComponent, CustomersFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CustomerService, DatePipe, NgbActiveModal, NgbActiveModal, NgModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
