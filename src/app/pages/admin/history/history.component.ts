import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Demand } from 'src/app/services/demand/demand';
import { DemandService } from 'src/app/services/demand/demand.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  demands: Demand[] = [];
  myEmail = localStorage.getItem("user-email");

  constructor(private demandService: DemandService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    const id = this.authService.getUserDetails().id;
    if (id) {
      this.demandService.findAll().subscribe((data) => {
        this.demands = data.filter(val => val.state !== null).reverse();
        console.log(this.demands[0].state);

      });
    }
  }

}
