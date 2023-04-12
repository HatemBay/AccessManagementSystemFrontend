import { Component } from '@angular/core';
import { map } from 'rxjs';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent {
  title: String = "dashboard";
  constructor(private customerService: CustomerService) {
    console.log(localStorage.getItem("user-info"));

  }

  async ngOnInit() {
    localStorage.setItem("user-info", await this.getUserInfo() || "");
    console.log(localStorage.getItem("user-info"));
  }

  async getUserInfo(): Promise<string | undefined> {
    return await this.customerService.findByEmail(localStorage.getItem("user-email") || "").pipe(map((res) => {
      return JSON.stringify(res);
    })).toPromise();
  }

  logout() {
    localStorage.removeItem("user-email");
    window.location.reload();
  }
}
