import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatFormField, MatLabel, MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { Recurso } from '../../models/historial.model';
import { HistorialServiceService } from '../../services/historial-services/historial.service.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';
import { FormDialogComponent } from '../shared/form-dialog/form-dialog.component';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NotificationsComponent } from '../shared/notifications/notifications.component';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-historial',
  imports: [
    MatCard,
    MatFormField,
    MatError,
    MatLabel,
    MatCheckbox,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatIcon,
    MatRow,
    MatHeaderRow,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
    NotificationsComponent,MatPaginator],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit, AfterViewInit{
  registros: Recurso[]=[];
  filterRegistro:Recurso[]=[];
  notification: { message: string; type: 'info' | 'success' | 'error' | 'warning'  } = {
    message: '',
    type: 'info'
  };
  dataSource=new MatTableDataSource<Recurso>();
  displayedColumns = ['id', 'usuario', 'tipo', 'recursos', 'fecha', 'horaInicio','horaFin','actions'];
    @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private recursoService:HistorialServiceService,private mydialog:MatDialog){
    }
  ngOnInit(): void {
      this.getRegistro();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
  }
  getRegistro():void{
    this.recursoService.getHistorial().subscribe(
      {
        next:(data)=>{
          this.registros=data;
          this.filterRegistro=[...this.registros]
        }
      }
    )
  }
  nuevo():void{
    const dialogWind = this.mydialog.open(FormDialogComponent,{
        width: '600px', // Ajusta el ancho
        height: '400px', // Opcional: Ajusta la altura
        maxWidth: '80vw', // Máximo ancho permitido (opcional)
    })
    dialogWind.afterClosed().subscribe((nuevoRegistro)=>{
      if(nuevoRegistro){
        this.recursoService.addRecurso(nuevoRegistro).subscribe((registro)=>{
          this.registros.push(registro);
        })
      }
    })
  }
  eliminarRegistro(id:number):void{
    const dialogRef =  this.mydialog.open(DialogComponent,{
      data: {
        titulo: "Eliminacion de pelicula",
        mensaje: '¿Estas seguro de eliminar el registro?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        this.registros=this.recursoService.deleteRecurso(this.registros,id);
        console.log(this.registros)
        this.actualizarTabla();
        this.notification={message:'Registro eliminado exitosamente',type:'error'}
        
        setTimeout(() => {
          this.notification = { message: '', type: 'info' };
        }, 2000);
      }
    });
  }

  actualizarTabla():void{
    this.filterRegistro=[...this.registros];
  }
} 
