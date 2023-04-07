import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent {
  title: String = "dashboard";
  constructor(private customerService: CustomerService) {

  }



  logout() {
    localStorage.removeItem("user-email");
  }
}
