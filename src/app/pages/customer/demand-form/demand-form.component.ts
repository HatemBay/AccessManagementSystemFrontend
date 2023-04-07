import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Demand } from 'src/app/services/demand/demand';
import { DemandService } from 'src/app/services/demand/demand.service';

@Component({
  selector: 'app-demand-form',
  templateUrl: './demand-form.component.html',
  styleUrls: ['./demand-form.component.scss']
})
export class DemandFormComponent {
  demand: Demand;
  constructor(private demandService: DemandService, private router: Router) {
    this.demand = new Demand();
  }

  onSubmit() {
    this.demandService
      .save(this.demand)
      .subscribe(() => this.gotoCustomerList());
  }

  gotoCustomerList() {
    this.router.navigate(['/customer-dashboard']);
  }
}
