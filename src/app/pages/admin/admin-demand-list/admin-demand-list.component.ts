import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Demand } from 'src/app/services/demand/demand';
import { DemandService } from 'src/app/services/demand/demand.service';
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-admin-demand-list',
  templateUrl: './admin-demand-list.component.html',
  styleUrls: ['./admin-demand-list.component.scss']
})
export class AdminDemandListComponent {
  //@ts-ignore
  @ViewChild("editModal") editModal: TemplateRef<any>;
  demands: Demand[] = [];
  myEmail = localStorage.getItem("user-email");
  selectedDemand: Demand | undefined;
  demand: any = {
    refusalReason: '',
    notes: ''
  };

  constructor(private demandService: DemandService, private router: Router, private authService: AuthService, public modalService: NgbModal,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.getAll();

  }

  getAll() {
    const id = this.authService.getUserDetails().id;
    if (id) {
      this.demandService.findAll().subscribe((data) => {
        console.log(data);

        this.demands = data.filter(val => val.state === null);
        this.demands = this.demands.reverse();
      });
    }
  }

  accept(demand: Demand, id: number) {
    demand.state = true;
    this.demandService.update(demand, id).subscribe(data => {
      alert("Demand Accepted");
      this.getAll();
    });
  }

  addModal(demand: Demand) {
    this.modalService.open(this.editModal);
    this.selectedDemand = demand;
  }

  dismissModal(modal: any) {
    modal.dismiss("Cross click");
  }

  toRefuseForm(id: any) {
    this.modalService.open
    var navigationExtras: NavigationExtras = {
      queryParams: {
        demandId: id,
      },
    };

    this.router.navigate(["/demand-refuse"], navigationExtras);
  }

  refuseDemand(modal: any) {
    console.log(this.demand);
    console.log(this.selectedDemand);
    if (this.selectedDemand && this.selectedDemand.id) {
      this.selectedDemand.refusalReason = this.demand.refusalReason;
      this.selectedDemand.notes = this.demand.notes;
      this.selectedDemand.state = false;

      this.demandService.update(this.selectedDemand, this.selectedDemand.id).subscribe(() => {
        alert("Demand Refused");
        this.demand = {};
        this.dismissModal(modal);
        this.getAll();
      })
    }
  }
}
