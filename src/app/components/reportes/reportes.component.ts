import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Reporte } from '../../models/reportes.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {  MatCardModule } from '@angular/material/card';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ReportesServiceService } from '../../services/reportes-services/reportes.service.service';
import { CommonModule } from '@angular/common';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';


@Component({
  selector: 'app-reportes',
  imports: [MatFormField, MatError, MatLabel, MatTable, MatHeaderCell, MatCell, MatRow, MatHeaderRow, ReactiveFormsModule,
     CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule,MatTableModule, MatIconModule, MatDividerModule,
    MatOption, MatRadioGroup, MatRadioButton],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit, AfterViewInit{

  title = 'Reportes Comunitarios'
  reportes: Reporte[]=[];
  filteredReportes: Reporte[] = [];
  reporteForm!: FormGroup;
  editMode: boolean=false;
  currentId!:number;
  dataSource = new MatTableDataSource<Reporte>();
  editId: string | null = null;
  notification: { message: string; type: 'info' | 'success' | 'error' | 'warning'  } = {
    message: '',
    type: 'info'
  };
  displayedColumns = ['titulo', 'descripcion', 'recursoAfectado', 'estado', 'acciones'];
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(private miServicioRep: ReportesServiceService, private fb: FormBuilder, private mydialog: MatDialog){
    
  }  
  

  ngOnInit():void{
    this.getReportes();
    this.reporteForm = this.fb.group({
      title: ['', Validators.required],
      descripcion: ['', Validators.required],
      recursoAfectado: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  getReportes(): void{
    this.miServicioRep.getReportes().subscribe((datos : Reporte[])=>{
      this.dataSource.data = datos;
    });
  }

  search(searchInput: HTMLInputElement){
    if(searchInput.value){
      this.miServicioRep.getReportesSearch(searchInput.value).subscribe((datos : Reporte[])=>{
        this.dataSource.data = datos;
      });
    }else{
      this.getReportes();
    }

  }

  

  onSubmit() {
    if (this.reporteForm.invalid) {
      return;
    }
      const newReporte:Reporte = this.reporteForm.value;
  
      if (this.editMode) {
        newReporte.id = this.currentId
        this.miServicioRep.updateReports(newReporte).subscribe((updateRep)=>{
          alert("El reporte fue editado exitosamente")
          this.getReportes();
        })
      } else {
        this.miServicioRep.addReporte(newReporte).subscribe((addRep)=>{
          alert("El reporte agregado exitosamente")
          this.getReportes();
        })
      }
  
      this.cleanForm();
  }
  delete(reporte: Reporte){


      const dialogRef = this.mydialog.open(DialogComponent,{
        data:{
          titulo: "Esta seguro de eliminar el reporte?",
        },
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.miServicioRep.deleteReports(reporte).subscribe(()=>{
            alert("Reporte eliminado exitosamente")
            this.getReportes();
          });
        }
      })
  }

  edit(reporte: Reporte){
    
    this.editMode = true;

    if(reporte && reporte.id){
      this.currentId = reporte.id;
    }else{
      console.log("Reporte o id del reporte, esta undefined")
    }
    

    this.reporteForm.setValue({
      title: reporte.title,
      descripcion: reporte.descripcion,
      recursoAfectado: reporte.recursoAfectado,
      estado: reporte.estado,
    });
  }
  cleanForm():void{
    this.reporteForm.reset({
      title: '',
      descripcion: '',
      recursoAfectado: '',
      estado: '',
    });
    this.currentId = 0;
    this.editMode = false;
  }
}
