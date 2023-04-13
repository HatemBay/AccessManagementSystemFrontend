import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Demand } from 'src/app/services/demand/demand';
import { DemandService } from 'src/app/services/demand/demand.service';

@Component({
  selector: 'app-demand-list',
  templateUrl: './demand-list.component.html',
  styleUrls: ['./demand-list.component.scss']
})
export class DemandListComponent {
  demands: Demand[] = [];
  myEmail = localStorage.getItem("user-email");

  constructor(private demandService: DemandService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getAll();

  }

  getAll() {
    const id = this.authService.getUserDetails().id;
    if (id) {
      this.demandService.findAllByUserId(id).subscribe((data) => {
        console.log(data[1].id);

        this.demands = data;
        this.demands = this.demands.reverse();
      });
    }
  }

}
