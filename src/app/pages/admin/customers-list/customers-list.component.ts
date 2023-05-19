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
  filter: boolean = false;
  input: string = '';
  currPage: number = 1;
  pages: number;
  tempPages: number;
  nbOfElements: number = 2;
  customers: Customer[] = [];
  temp: Customer[] = [];
  myEmail = localStorage.getItem('user-email');

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAll(1);
  }

  //Lazy to make a solid backend pagination :)
  getAll(page: number) {
    this.customerService.findAll().subscribe((data) => {
      this.customers = data.reverse();
      this.temp = data
        .reverse()
        .slice(
          (page - 1) * this.nbOfElements,
          (page - 1) * this.nbOfElements + this.nbOfElements
        );
      if (this.customers.length > 0) {
        this.pages = this.tempPages = Math.ceil(
          this.customers.length / this.nbOfElements
        );
      } else {
        this.pages = this.tempPages = 1;
      }
    });
  }

  del(customer: Customer) {
    this.customerService.delete(customer).subscribe((data) => {
      alert('User deleted Successfully');
      this.getAll(1);
    });
  }

  modify(id: any) {
    var navigationExtras: NavigationExtras = {
      queryParams: {
        customerId: id,
      },
    };

    this.router.navigate(['/modifycustomer'], navigationExtras);
  }

  search(input: string, page: number) {
    this.filter = true;
    this.input = input;
    this.temp = this.customers.filter((customer) => {
      return (
        customer.name.indexOf(input) !== -1 ||
        customer.cin.indexOf(input) !== -1 ||
        customer.email.indexOf(input) !== -1 ||
        customer.role.indexOf(input) !== -1
      );
    });

    //number pagination
    if (this.temp.length > 0) {
      this.tempPages = Math.ceil(this.temp.length / this.nbOfElements);
    } else {
      this.tempPages = 1;
    }
    //extracting the data we need to show in page
    this.temp = this.temp.slice(
      (page - 1) * this.nbOfElements,
      (page - 1) * this.nbOfElements + this.nbOfElements
    );

    //reset
    if (input.length === 0) {
      this.filter = false;
      this.temp = this.customers.slice(
        (page - 1) * this.nbOfElements,
        (page - 1) * this.nbOfElements + this.nbOfElements
      );
      this.tempPages = this.pages;
    }
  }

  goToPage(page: number) {
    this.currPage = page;
    //if there is a word in the search case we will paginate through the search results / else we paginate through the normal values
    if (this.filter) {
      this.search(this.input, page);
    } else this.getAll(page);
  }
}
