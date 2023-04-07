import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersFormComponent } from './pages/customers-form/customers-form.component';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { ModifyCustomerComponent } from './pages/modify-customer/modify-customer.component';
import { CustomerDashboardComponent } from './pages/customer/customer-dashboard/customer-dashboard.component';
import { DemandFormComponent } from './pages/customer/demand-form/demand-form.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "ADMIN" } },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "CUSTOMER" } },
  { path: 'customers', component: CustomersListComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "ADMIN" } },
  { path: 'addcustomer', component: CustomersFormComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "ADMIN" } },
  { path: 'modifycustomer', component: ModifyCustomerComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "ADMIN" } },
  { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "CUSTOMER" } },
  { path: 'add-demand', component: DemandFormComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "CUSTOMER" } },
  { path: 'forbidden', component: ForbiddenComponent },
];

// const routes: Routes = [
//   // { path: 'dashboard', component: DashboardComponent},
//   { path: 'customers', component: CustomersListComponent},
//   { path: 'addcustomer', component: CustomersFormComponent},
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
