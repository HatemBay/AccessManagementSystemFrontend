import { Component } from '@angular/core';
import { Customer } from '../../../services/customer/customer';
import { CustomerService } from '../../../services/customer/customer.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent {
  customers: Customer[] = [];
  myEmail = localStorage.getItem("user-email");

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.customerService.findAll().subscribe((data) => {
      this.customers = data;
      this.customers = this.customers.reverse();
    });
  }

  del(customer: Customer) {
    this.customerService.delete(customer).subscribe(data => {
      alert("User deleted Successfully");
      this.getAll();
    });
  }

  modify(id: any) {
    var navigationExtras: NavigationExtras = {
      queryParams: {
        customerId: id,
      },
    };

    this.router.navigate(["/modifycustomer"], navigationExtras);
  }
}