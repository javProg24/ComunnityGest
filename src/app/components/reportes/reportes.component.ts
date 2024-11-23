import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Reporte } from '../../models/reportes.model';
import { ReportesServiceService } from '../../services/reportes-services/reportes.service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-reportes',
  imports: [MatFormField,MatLabel,MatCard,MatError,MatSelect,MatOption,MatTable,MatHeaderCell,MatCell,MatIcon,MatHeaderRow,MatRow],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit, AfterViewInit{
filteredReportes: any;

onSubmit() {
throw new Error('Method not implemented.');
}
  title = 'Reportes Comunitarios'
  reportes: Reporte[]=[];
  reporteForm!: FormGroup;
  editMode = false;
  currentId!:number;
  dataSource = new MatTableDataSource<Reporte>();
  notification: { message: string; type: 'info' | 'success' | 'error' | 'warning'  } = {
    message: '',
    type: 'info'
  };
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private miServicioRep: ReportesServiceService, private fb: FormBuilder){
  }  
  

  ngOnInit():void{
    this.getReportes();
  }

  getReportes(): void{
    this.miServicioRep.getReportes().subscribe((datos : Reporte[])=>{
      this.dataSource.data = datos;
      console.log(this.reportes[0])
    });
  }
}
