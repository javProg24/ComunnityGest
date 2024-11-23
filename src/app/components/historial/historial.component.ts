import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { Recurso } from '../../models/historial.model';
import { HistorialServiceService } from '../../services/historial-services/historial.service.service';

@Component({
  selector: 'app-historial',
  imports: [MatFormField,
    MatLabel,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatOptionModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit, AfterViewInit{
  dataSource=new MatTableDataSource<Recurso>();
    @ViewChild(MatPaginator) paginator!:MatPaginator;
    constructor(private recursoService:HistorialServiceService){
    }
    ngOnInit(): void {
      this.getRegistro();
    }
    ngAfterViewInit(): void {
      this.dataSource.paginator=this.paginator;
  }
  getRegistro():void{
    this.recursoService.getHistorial().subscribe((datos:Recurso[])=>{
        this.dataSource.data=datos;
    })
}
}
