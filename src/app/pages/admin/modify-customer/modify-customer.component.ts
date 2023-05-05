import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Customer } from 'src/app/services/customer/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-modify-customer',
  templateUrl: './modify-customer.component.html',
  styleUrls: ['./modify-customer.component.scss']
})
export class ModifyCustomerComponent {
  customer: Customer;
  customerId: any;
  data: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.customer = new Customer();
    this.customerId = this.route.snapshot.queryParamMap.get("customerId");
    this.getCustomerData();
  }

  ngOnInit() {
  }

  async getCustomerData() {
    // return await this.customerService.findById(this.customerId).pipe(map(data => data)).toPromise();
    return this.customerService.findById(this.customerId).pipe(map(data => {
      return data;
    })).subscribe(data => {
      this.customer = data;
      this.customer.password = "";
      this.data = data;
    });
  }

  onSubmit() {
    this.customerService
      .save(this.customer)
      .subscribe((val) => this.gotoCustomerList());
  }

  gotoCustomerList() {
    this.router.navigate(['/customers']);
  }

  updateCustomer(customer: Customer, id: number) {
    this.customerService.update(customer, id).subscribe(res => {
      console.log(res);
    })
  }
}
