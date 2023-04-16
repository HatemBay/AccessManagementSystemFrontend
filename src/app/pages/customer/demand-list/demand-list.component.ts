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
  //@ts-ignore
  demand: Demand = {};
  myEmail = localStorage.getItem("user-email");
  pdfOptions: any;
  hidden: boolean = true;


  constructor(private demandService: DemandService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.getAll();

  }

  getAll() {
    const id = this.authService.getUserDetails().id;
    if (id) {
      this.demandService.findAllByUserId(id).subscribe((data) => {
        this.demands = data.filter(data => data.user?.email === this.myEmail).reverse();
        console.log(data[1].id);
      });
    }
  }

  goToPdf(id: any) {
    var navigationExtras: NavigationExtras = {
      queryParams: {
        demandId: id,
      },
    };
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/pdf`], navigationExtras)
    );

    window.open(url, '_blank');
    // this.router.navigate(["/pdf"], navigationExtras);
  }

}
