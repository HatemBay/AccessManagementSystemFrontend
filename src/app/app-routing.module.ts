import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersFormComponent } from './pages/admin/customers-form/customers-form.component';
import { CustomersListComponent } from './pages/admin/customers-list/customers-list.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { ModifyCustomerComponent } from './pages/admin/modify-customer/modify-customer.component';
import { CustomerDashboardComponent } from './pages/customer/customer-dashboard/customer-dashboard.component';
import { DemandFormComponent } from './pages/customer/demand-form/demand-form.component';
import { DemandListComponent } from './pages/customer/demand-list/demand-list.component';
import { AdminDemandListComponent } from './pages/admin/admin-demand-list/admin-demand-list.component';
import { HistoryComponent } from './pages/admin/history/history.component';
import { PdfPageComponent } from './pages/customer/pdf-page/pdf-page.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "ADMIN" } },
  { path: 'customers', component: CustomersListComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "ADMIN" } },
  { path: 'addcustomer', component: CustomersFormComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "ADMIN" } },
  { path: 'modifycustomer', component: ModifyCustomerComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "ADMIN" } },
  { path: 'demands', component: AdminDemandListComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "ADMIN" } },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "ADMIN" } },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "CUSTOMER" } },
  { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "CUSTOMER" } },
  { path: 'add-demand', component: DemandFormComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "CUSTOMER" } },
  { path: 'customer-demands', component: DemandListComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "CUSTOMER" } },
  { path: 'pdf', component: PdfPageComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: "CUSTOMER" } },
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
