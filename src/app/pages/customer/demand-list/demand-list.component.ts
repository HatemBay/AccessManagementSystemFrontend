import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Demand } from 'src/app/services/demand/demand';
import { DemandService } from 'src/app/services/demand/demand.service';

@Component({
  selector: 'app-demand-list',
  templateUrl: './demand-list.component.html',
  styleUrls: ['./demand-list.component.scss'],
})
export class DemandListComponent {
  filter: boolean = false;
  input: string = '';
  currPage: number = 1;
  pages: number;
  tempPages: number;
  nbOfElements: number = 5;
  demands: Demand[] = [];
  temp: Demand[] = [];
  //@ts-ignore
  demand: Demand = {};
  myEmail = localStorage.getItem('user-email');
  pdfOptions: any;
  hidden: boolean = true;

  constructor(
    private demandService: DemandService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getAll(1);
  }

  getAll(page: number) {
    const id = this.authService.getUserDetails().id;
    if (id) {
      this.demandService.findAllByUserId(id).subscribe((data) => {
        this.demands = data
          .filter((data) => data.user?.email === this.myEmail)
          .reverse();
        this.temp = [...this.demands].slice(
          (page - 1) * this.nbOfElements,
          (page - 1) * this.nbOfElements + this.nbOfElements
        );
        if (this.demands.length > 0) {
          this.pages = this.tempPages = Math.ceil(
            this.demands.length / this.nbOfElements
          );
        } else {
          this.pages = this.tempPages = 1;
        }
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

  search(input: string, page: number) {
    this.input = input;
    this.filter = true;

    this.temp = this.demands.filter((demand) => {
      const createdAt = new Date(demand.created_at);
      const visitDayStart = new Date(demand.visitDayStart);
      const visitDayEnd = new Date(demand.visitDayEnd);
      const createdAtFormatted =
        createdAt.getDate() +
        '/' +
        '0' +
        (createdAt.getMonth() + 1) +
        '/' +
        createdAt.getFullYear();
      const visitDayStartFormatted =
        visitDayStart.getDate() +
        '/' +
        '0' +
        (visitDayStart.getMonth() + 1) +
        '/' +
        visitDayStart.getFullYear();
      const visitDayEndFormatted =
        visitDayEnd.getDate() +
        '/' +
        '0' +
        (visitDayEnd.getMonth() + 1) +
        '/' +
        visitDayEnd.getFullYear();
      return (
        demand.concernedLocal.indexOf(input) !== -1 ||
        demand.concernedSite.indexOf(input) !== -1 ||
        createdAtFormatted.indexOf(input) !== -1 ||
        visitDayStartFormatted.indexOf(input) !== -1 ||
        visitDayEndFormatted.indexOf(input) !== -1 ||
        demand.demandObject.indexOf(input) !== -1
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
      this.temp = this.demands.slice(
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
