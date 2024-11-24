import { CommonModule, NgFor } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
import { ReservasServiceService } from '../../services/reservas-services/reservas.service.service';
import { Reserva } from '../../models/reservas.model';
import { Historial } from '../../models/historial.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { MatNativeDateModule, MatOption, MatOptionModule, NativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker'
import { FormDialogComponent } from '../shared/form-dialog/form-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Usuario } from '../../models/usuarios.model';
import { UsuariosService } from '../../services/usuarios-services/usuarios.service.service';
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
    MatOptionModule,MatDatepickerModule,MatDatepickerToggle,MatNativeDateModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit, AfterViewInit{
  reservas: Reserva[]=[];
  historiales: Historial[] = [];
  filterHistorial:Historial[]=[];
  usuariosFiltrados: Usuario[] = [];
  filterReservas:Reserva[]=[];
  columnFilters: { [key: string]: string } = {};
  columns = ['id', 'usuario', 'tipo','descripcion','fechaInicio','fechaFin'];
  notification: { message: string; type: 'info' | 'success' | 'error' | 'warning'  } = {
    message: '',
    type: 'info'
  };
  filterTipo = ['Tecnológico', 'Material', 'Humano'];
  dataSource=new MatTableDataSource<Reserva>();
  dataHistorial=new MatTableDataSource<Historial>();
  ReservasColumns = ['id', 'usuario', 'tipo', 'descripcion', 'fechaInicio', 'fechaFin','estado','actions'];
  HistorialColumns=['id', 'usuario', 'tipo', 'descripcion', 'fechaInicio', 'fechaFin','actions'];
  filter = { id: '', usuario: '', tipo: '',descripcion:'',fechaInicio:'', fechaFin:''};
  formulario!:FormGroup;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild('paginatorHistorial') paginatorHistorial!: MatPaginator;
  constructor(private reservaService:ReservasServiceService,private mydialog:MatDialog,
    private historialService:HistorialServiceService,private fb:FormBuilder,private usuarioService:UsuariosService
  ){}
  ngOnInit(): void {
      this.verReservas();
      this.verHistorial();
      this.formulario = this.fb.group({
        usuario:[''],
        tipo:[''],
        descripcion:[''],
        fechaInicio:[''],
        fechaFin:['']
      })
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
    this.dataHistorial.paginator = this.paginatorHistorial;
  }
  verHistorial():void{
    this.historialService.getHistorial().subscribe({
      next:(data)=>{
        this.historiales=data;
        this.dataHistorial.data=this.historiales;
      }
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
  
    // Llamar al método para abrir el diálogo de confirmación
    this.abrirDialogoConfirmacion('Confirmar Registro', '¿Está seguro de que desea guardar este registro?')
      .subscribe(result => {
        if (result) {
          this.historialService.addHistorial(historial).subscribe(
            (response) => {
              this.notification = { message: 'Registro guardado exitosamente', type: 'success' };
              this.actualizarTablaHisto(); // Actualizar tabla si es necesario
              //this.verHistorial();
              // Desaparición automática de la notificación
              setTimeout(() => {
                this.notification = { message: '', type: 'info' };
              }, 2000);
            },
            (error) => {
              this.manejarError('Error al guardar el registro', error);
            }
          );
        }
      });
  }
  private abrirDialogoConfirmacion(titulo: string, mensaje: string): Observable<boolean> {
    const dialogRef = this.mydialog.open(DialogComponent, {
      data: { titulo, mensaje }
    });
    return dialogRef.afterClosed();
  }
  private manejarError(message: string, error: any): void {
    this.notification = { message, type: 'error' };
    console.error(message, error);
  }
  eliminarRegistro(id: number): void {
    const dialogRef = this.mydialog.open(DialogComponent, {
      data: {
        titulo: "Eliminar Registro",
        mensaje: '¿Estás seguro de eliminar este registro?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.historiales = this.historialService.deleteHistorial(this.historiales, id);
        this.actualizarTablaHisto();
        this.notification = { message: 'Registro eliminado exitosamente', type: 'success' };
        setTimeout(() => {
          this.notification = { message: '', type: 'info' };
        }, 2000);
      }
    });
  }
  actualizarTablaHisto():void{
    this.dataHistorial.data = [...this.historiales];
  }
  verUsuario() {
    this.mydialog.open(FormDialogComponent, {
      width: '400px', // Ancho opcional
      height: '600px', // Alto opcional
    });
  }
  buscarUsuario(nombre: string): void {
    if (!nombre) {
      this.usuariosFiltrados = [];
      return;
    }

    this.usuarioService.getUsuarioSearch(nombre).subscribe((usuarios) => {
      console.log('Usuarios obtenidos:', usuarios); // Verifica que los datos se reciban
      this.usuariosFiltrados = usuarios;
    });
  }
  buscar(){
    
  }
} 
