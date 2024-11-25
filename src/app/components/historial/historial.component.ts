import { CommonModule, NgFor } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule, } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HistorialServiceService } from '../../services/historial-services/historial.service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { Reserva } from '../../models/reservas.model';
import { Historial } from '../../models/historial.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule, MatOption, MatOptionModule, NativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Usuario } from '../../models/usuarios.model';
import { UsuariosService } from '../../services/usuarios-services/usuarios.service.service';
import { HerramientaServiceService } from '../../services/herramientas-services/herramienta.service.service';
import { InstalacionesServiceService } from '../../services/instalaciones-services/instalaciones.service.service';
import { ReservasService } from '../../services/reservas-services/reservas.service.service';
@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [
    MatFormField,MatLabel,MatTable,
    MatHeaderCell,MatOption, MatOptionModule,
    MatCell,MatIcon,MatInputModule,MatAutocompleteModule,
    MatRow,MatHeaderRow,ReactiveFormsModule,
    CommonModule,MatCardModule,MatFormFieldModule,
    MatInputModule,MatButtonModule,MatCheckboxModule,
    MatTableModule,MatIconModule,MatDividerModule,MatPaginator,
    MatMenuModule,MatButtonModule,MatIconModule,
    MatTabsModule,NativeDateModule,FormsModule,NgFor,
    FormsModule,MatFormFieldModule,MatSelectModule,
    MatOptionModule,MatDatepickerModule,MatDatepickerToggle,MatNativeDateModule,MatIcon],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css',
})
export class HistorialComponent implements OnInit, AfterViewInit{
  reservas: Reserva[]=[];
  usuariosFiltrados: Usuario[] = [];
  notificationHist: { message: string; type: 'info' | 'success' | 'error' | 'warning'  } = {
    message: '',type: 'info'
  };
  notificationEli: { message: string; type: 'info' | 'success' | 'error' | 'warning'  } = {
    message: '',type: 'info'
  };
  tipos = [
    { value: 'Instalacion', label: 'Instalacion' },
    { value: 'Herramienta', label: 'Herramienta' }
  ];
  dataSource=new MatTableDataSource<Reserva>();
  dataHistorial=new MatTableDataSource<Historial>();
  formulario!:FormGroup;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild('paginatorHistorial') paginatorHistorial!: MatPaginator;
  constructor(private reservaService:ReservasService,private mydialog:MatDialog,
    private historialService:HistorialServiceService,private fb:FormBuilder,private usuarioService:UsuariosService,private serviceHerra:HerramientaServiceService,
    private serviceInstala:InstalacionesServiceService,
  ){}
  ngOnInit(): void {
      this.verReservas();
      this.verHistorial();
      this.formulario = this.fb.group({
        usuario: ['',], 
        tipo: ['',[Validators.required]],    
        descripcion: ['',], 
        fechaInicio: [null,],
        fechaFin: [null,],   
      })
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataHistorial.paginator = this.paginatorHistorial;
  }
  verHistorial():void{
    this.historialService.getHistorial().subscribe((datos:Historial[])=>{
      this.dataHistorial.data=datos;
    })
  }
  verReservas():void{
    this.reservaService.getReservas().subscribe({
      next: (data) => {
        this.reservas = data;
        this.dataSource.data = this.reservas;
      },
    });
  }
  getEstadoClass(estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA'): string {
    switch (estado) {
      case 'PENDIENTE':
        return 'estado-pendiente';
      case 'CONFIRMADA':
        return 'estado-confirmada';
      case 'CANCELADA':
        return 'estado-cancelada';
      default:
        return '';
    }
  }
  nuevoRegistro(reserva: Reserva): void {
    const historial: Historial = {
      usuario: reserva.usuario,
      tipo: reserva.tipo,
      descripcion: reserva.descripcion,
      fechaInicio: reserva.fechaInicio,
      fechaFin: reserva.fechaFin,
    };
    this.historialService.addHistorial(historial).subscribe(()=>{
      this.notificationHist = { message: 'Registro guardado exitosamente', type: 'success' };
      this.verHistorial();
      setTimeout(() => {
        this.notificationHist = { message: '', type: 'info' };
      }, 2000);
    });
  }
  eliminarRegistro(historial:Historial): void {
    const dialogRef = this.mydialog.open(DialogComponent, {
      data: {
        titulo: "Eliminar Registro",
        mensaje: '¿Estás seguro de eliminar este registro?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result==true) {
        this.historialService.deleteHistorial(historial).subscribe(()=>{
          this.notificationEli = { message: 'Registro eliminado exitosamente', type: 'success' };
          this.verHistorial();
          setTimeout(() => {
            this.notificationEli = { message: '', type: 'info' };
          }, 2000);
        })   
      }
    });
    
  }
  buscarUsuario(nombre: string): void {
    if (!nombre) {
      this.usuariosFiltrados = [];
      return;
    }
    this.usuarioService.getUsuarioSearch(nombre).subscribe((usuarios) => {
      //console.log('Usuarios obtenidos:', usuarios); // Verifica que los datos se reciban
      this.usuariosFiltrados = usuarios;
    });
  }
  tipoSeleccionado: string='';
  nombres: string[] = [];
  obtener(tipo:string):void{
    this.tipoSeleccionado = tipo;
    if(tipo=='I'){
      this.serviceInstala.getNombres().subscribe(nombres=>{
        this.nombres = nombres;
      })
    }else if(tipo=='H'){
      this.serviceHerra.getNombres().subscribe(nombres=>{
        this.nombres=nombres;
      })
    }
  }
  buscar(): void {
    if (this.formulario.valid) {
      const { usuario, tipo, descripcion, fechaInicio, fechaFin } = this.formulario.value;
      this.historialService.getHistorialSearch(
        usuario,
        tipo,
        descripcion,
        fechaInicio,
        fechaFin
      ).subscribe((datos:Historial[]) => {
        // Maneja los resultados
        this.dataHistorial.data=datos;
      });
    }else{
      this.verHistorial();
    }
  }
} 
