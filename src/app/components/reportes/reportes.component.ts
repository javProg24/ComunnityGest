import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Reporte } from '../../models/reportes.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ReportesServiceService } from '../../services/reportes-services/reportes.service.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NotificationsComponent } from '../utils/notifications/notifications.component';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MydialogComponent } from '../utils/mydialog/mydialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-reportes',
  imports: [MatCard, MatFormField, MatError, MatLabel, MatTable, MatHeaderCell, MatCell, MatIcon, MatRow, MatHeaderRow, ReactiveFormsModule,
     CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule,MatTableModule, MatIconModule, MatDividerModule,
    NotificationsComponent, MatOption, MatRadioGroup, MatRadioButton],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit, AfterViewInit{

  title = 'Reportes Comunitarios'
  reportes: Reporte[]=[];
  filteredReportes: Reporte[] = [];
  reporteForm!: FormGroup;
  editMode = false;
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
    this.reporteForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      recursoAfectado: [''],
      estado: ['', Validators.required],
    });
  }  
  

  ngOnInit():void{
    this.getReportes();
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
    if (this.reporteForm.invalid) return;
  
      const newReporte = this.reporteForm.value as Reporte;
  
      if (this.editMode) {
        this.miServicioRep.updateReports(this.editId!, newReporte);
      } else {
        this.miServicioRep.addReporte(newReporte);
      }
  
      this.resetForm();
  }
  delete(reporte: Reporte){


      const dialogRef = this.mydialog.open(MydialogComponent,{
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

  }

  resetForm(): void {
    this.reporteForm.reset();
    this.editMode = false;
    this.editId = null;
  }
}
