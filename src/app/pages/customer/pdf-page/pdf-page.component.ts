import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Demand } from 'src/app/services/demand/demand';
import { DemandService } from 'src/app/services/demand/demand.service';
import * as html2pdf from 'html2pdf.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pdf-page',
  templateUrl: './pdf-page.component.html',
  styleUrls: ['./pdf-page.component.scss']
})
export class PdfPageComponent implements OnInit {
  demand: Demand = {};
  demandId: any;
  data: any = {};
  checkedAdd: boolean = false;
  checkedRecovery: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private demandService: DemandService,
    private renderer: Renderer2,
    private pippe: DatePipe
  ) {
    this.demand = new Demand();
    this.demandId = this.route.snapshot.queryParamMap.get("demandId");
    this.getDemand();
  }

  async ngOnInit() {
    this.demand = await this.getDemandData();
    // this.generatePDF(this.demand);
  }

  getDemand() {
    this.demandService.findById(this.demandId).subscribe(data => {
      this.demand = data;
      this.generatePDF(data);
      // this.router.navigate(["/customer-demands"]);
    });
  }

  async getDemandData(): Promise<Demand> {
    //@ts-ignore
    return await this.demandService.findById(this.demandId).pipe(map(data => {
      this.demand = data;
    })).toPromise();
  }

  generatePDF(demand: Demand) {
    // Get the HTML template element
    const element = document.getElementById('pdf');

    for (const [key, value] of Object.entries(demand)) {
      if (!(['equipmentAdd', 'equipmentRecovery', 'updated_at', 'id', 'user', 'state'].includes(key))) {
        this.renderer.setProperty(element.querySelector(`#${key}`), 'textContent', value);
      }
    }
    var state: string;
    if (demand.equipmentAdd === "YES") this.checkedAdd = true;
    if (demand.equipmentRecovery === "YES") this.checkedRecovery = true;
    demand.state ? state = 'accepted' : state = 'refused';

    this.renderer.setProperty(element.querySelector(`#${state}`), 'textContent', "OUI");
    this.renderer.setProperty(element.querySelector('#visitDayStart'), 'textContent', this.pippe.transform(new Date(demand.visitDayStart), 'dd/MM/yyyy'));
    this.renderer.setProperty(element.querySelector('#visitDayEnd'), 'textContent', this.pippe.transform(new Date(demand.visitDayEnd), 'dd/MM/yyyy'));
    this.renderer.setProperty(element.querySelector('#created_at'), 'textContent', this.pippe.transform(new Date(demand.created_at), 'dd/MM/yyyy'));
    this.renderer.setProperty(element.querySelector('#updated_at'), 'textContent', this.pippe.transform(new Date(demand.updated_at), 'dd/MM/yyyy'));
    this.renderer.setProperty(element.querySelector('#userName'), 'textContent', demand.user.name);
    this.renderer.setProperty(element.querySelector('#cin'), 'textContent', demand.user.cin);

    // Create a configuration object for html2pdf
    const config = {
      margin: [0, 0, 0, 0],
      filename: 'myPDF.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Call the html2pdf library to generate the PDF
    html2pdf()
      .from(element)
      .set(config)
      .save();
  }
}
