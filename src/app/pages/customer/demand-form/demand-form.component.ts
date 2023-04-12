import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Customer } from 'src/app/services/customer/customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Demand } from 'src/app/services/demand/demand';
import { DemandService } from 'src/app/services/demand/demand.service';

@Component({
  selector: 'app-demand-form',
  templateUrl: './demand-form.component.html',
  styleUrls: ['./demand-form.component.scss'],
})
export class DemandFormComponent implements OnInit {
  demand: Demand;
  myDate = new Date();
  value = new Date(1970, 0, 1, 14, 57, 0);
  today: string = "";
  yes: string = "YES";
  no: string = "NO";
  customer: Customer | undefined;

  constructor(private demandService: DemandService, private router: Router,
    private datePipe: DatePipe, private customerService: CustomerService, private authService: AuthService) {
    this.demand = new Demand();
    this.demand.equipmentAdd = "NO";
    this.demand.equipmentRecovery = "NO";
  }

  async ngOnInit() {
    //@ts-ignore
    this.today = this.datePipe.transform(this.myDate, "yyyy-MM-dd");
    // this.demand.visitDateStart = new Date(1970, 0, 1, 14, 57, 0);

    this.customer = this.authService.getUserDetails();
  }

  onSubmit() {
    this.demand.user = this.customer;
    this.demand.created_at = this.demand.updated_at = this.myDate;

    this.demandService
      .save(this.demand)
      .subscribe(() => {
        alert("Demand Added Successfully");
        this.gotoCustomerList();
      });
  }

  gotoCustomerList() {
    this.router.navigate(['/customer-dashboard']);
  }

  equipmentAddChoice(item: string) {
    this.demand.equipmentAdd = item;
  }

  equipmentRecoveryChoice(item: string) {
    this.demand.equipmentRecovery = item;
  }
}
