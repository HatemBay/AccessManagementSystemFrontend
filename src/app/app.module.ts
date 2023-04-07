import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { CustomersFormComponent } from './pages/customers-form/customers-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './services/customer/customer.service';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { ModifyCustomerComponent } from './pages/modify-customer/modify-customer.component';
import { CustomerDashboardComponent } from './pages/customer/customer-dashboard/customer-dashboard.component';
import { DemandFormComponent } from './pages/customer/demand-form/demand-form.component';

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
  ],
  // declarations: [AppComponent, CustomersListComponent, CustomersFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent],
})
export class AppModule { }
