import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Demand } from 'src/app/services/demand/demand';
import { DemandService } from 'src/app/services/demand/demand.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-demand-list',
  templateUrl: './admin-demand-list.component.html',
  styleUrls: ['./admin-demand-list.component.scss'],
})
export class AdminDemandListComponent {
  //@ts-ignore
  @ViewChild('editModal') editModal: TemplateRef<any>;
  filter: boolean = false;
  currPage: number = 1;
  input: string = '';
  demands: Demand[] = [];
  temp: Demand[] = [];
  pages: number;
  tempPages: number;
  nbOfElements: number = 2;
  myEmail = localStorage.getItem('user-email');
  selectedDemand: Demand | undefined;
  demand: any = {
    refusalReason: '',
    notes: '',
  };

  constructor(
    private demandService: DemandService,
    private router: Router,
    private authService: AuthService,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.getAll(1);
  }

  //Lazy to make a solid backend pagination :)
  getAll(page: number) {
    const id = this.authService.getUserDetails().id;
    if (id) {
      this.demandService.findAll().subscribe((data) => {
        this.demands = data.filter((val) => val.state === null).reverse();

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

  accept(demand: Demand, id: number) {
    demand.state = true;
    this.demandService.update(demand, id).subscribe((data) => {
      alert('Demand Accepted');
      this.getAll(1);
    });
  }

  addModal(demand: Demand) {
    this.modalService.open(this.editModal);
    this.selectedDemand = demand;
  }

  dismissModal(modal: any) {
    modal.dismiss('Cross click');
  }

  toRefuseForm(id: any) {
    this.modalService.open;
    var navigationExtras: NavigationExtras = {
      queryParams: {
        demandId: id,
      },
    };

    this.router.navigate(['/demand-refuse'], navigationExtras);
  }

  refuseDemand(modal: any) {
    if (this.selectedDemand && this.selectedDemand.id) {
      this.selectedDemand.refusalReason = this.demand.refusalReason;
      this.selectedDemand.notes = this.demand.notes;
      this.selectedDemand.state = false;

      this.demandService
        .update(this.selectedDemand, this.selectedDemand.id)
        .subscribe(() => {
          alert('Demand Refused');
          this.demand = {};
          this.dismissModal(modal);
          this.getAll(1);
        });
    }
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
        demand.user.name.indexOf(input) !== -1 ||
        demand.user.companyName.toString().indexOf(input) !== -1 ||
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
