import { Component } from '@angular/core';
import { Reporte } from '../../models/reportes.model';
import { ReportesServiceService } from '../../services/reportes-services/reportes.service.service';
import { MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-reportes',
  imports: [],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  title = 'Reportes Comunitarios'
  reportes: Reporte[]=[];
  constructor(private miServicioRep: ReportesServiceService ){
  }  

  ngOnInit():void{
    this.getReportes();
  }

  getReportes(): void{
    this.miServicioRep.getReportes().subscribe((data : Reporte[])=>{
      this.reportes = data;
      console.log(this.reportes[0])
    });
  }
}
