import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Reserva } from '../../models/reservas.model';
import { ReservasService } from '../../services/reservas-services/reservas.service.service';
import { InstalacionesServiceService } from '../../services/instalaciones-services/instalaciones.service.service';
import { HerramientasService } from '../../services/herramientas-services/herramienta.service.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIcon,
    MatButton,MatOptionModule,MatSelectModule,MatPaginatorModule
  ],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit,AfterViewInit {
  dataSource=new MatTableDataSource<Reserva>();
  reservasForm: FormGroup;
  reservas: Reserva[] = [];
  columnas: string[] = ['usuario', 'tipo', 'descripcion','fechaInicio', 'fechaFin', 'estado', 'acciones'];
  filtro: string = '';
  modoEdicion = false;
  reservaSeleccionada: Reserva | null = null;
  tipos = [
    { value: 'i', label: 'Instalación' },{ value: 'h', label: 'Herramienta' }
  ];
  estadosReserva = [
    { valor: 'PENDIENTE', texto: 'Pendiente' },
    { valor: 'CONFIRMADA', texto: 'Confirmada' },
    { valor: 'CANCELADA', texto: 'Cancelada' }
  ];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(
    private fb: FormBuilder,
    private reservasService: ReservasService,
    private serviceInstala:InstalacionesServiceService,
    private serviceHerr:HerramientasService
  ) {
    this.reservasForm = this.fb.group({
      usuario: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['PENDIENTE', Validators.required]
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator=this.paginator;
  }

  ngOnInit() {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservasService.getReservas().subscribe(reservas => this.reservas = reservas);
  }

  // Buscar reservas
  // buscarReservas(): void {
  //   this.reservas = this.reservas.filter(reserva => reserva.usuario.toLowerCase().includes(this.filtro.toLowerCase()) || reserva.tipo.toString().includes(this.filtro.toLowerCase()) || reserva.estado.toLowerCase().includes(this.filtro.toLowerCase()));
  // }
  buscarReservas(searchInput: HTMLInputElement){
    if(searchInput.value){
      this.reservasService.getReservaSearch(searchInput.value).subscribe((datos)=>{
        this.reservas = datos;
      })
    }
  }
  crearReserva(): void {
    if (this.reservasForm.valid) {
      const nuevaReserva: Reserva = this.reservasForm.value;
      this.reservasService.crearReserva(nuevaReserva).subscribe(() => {
        this.cargarReservas();
        this.reservasForm.reset();
      });
    }
  }

  // Editar una reserva existente
  editarReserva(reserva: Reserva): void {
    this.modoEdicion = true;
    this.reservaSeleccionada = reserva;
    this.reservasForm.patchValue(reserva);
  }

  // Actualizar una reserva existente
  actualizarReserva(): void {
    if (this.reservasForm.valid && this.reservaSeleccionada) {
      const reservaActualizada: Reserva = { ...this.reservaSeleccionada, ...this.reservasForm.value };
      this.reservasService.actualizarReserva(reservaActualizada.id!, reservaActualizada).subscribe(() => {
        this.cargarReservas();
        this.cancelarEdicion();
      });
    }
  }

  // Eliminar una reserva
  eliminarReserva(id: number): void {
    this.reservasService.eliminarReserva(id).subscribe(() => {
      this.cargarReservas();
    });
  }

  // Cancelar edición
  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.reservaSeleccionada = null;
    this.reservasForm.reset();
  }
  tipoSeleccionado: string='';
  nombres: string[] = [];
  obtener(tipo:string):void{
    this.tipoSeleccionado = tipo;
    if(tipo=='i'){
      this.serviceInstala.getNombresInst().subscribe(nombres=>{
        this.nombres = nombres;
      })
    }else if(tipo=='h'){
      this.serviceHerr.getNombresHerra().subscribe(nombres=>{
        this.nombres=nombres;
      })
    }
  }
}
