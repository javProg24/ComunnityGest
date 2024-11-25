import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
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
    MatButton
  ],
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  reservasForm: FormGroup;
  reservas: Reserva[] = [];
  columnas: string[] = ['usuario', 'tipo', 'fechaInicio', 'fechaFin', 'estado', 'acciones'];
  filtro: string = '';
  modoEdicion = false;
  reservaSeleccionada: Reserva | null = null;

  estadosReserva = [
    { valor: 'PENDIENTE', texto: 'Pendiente' },
    { valor: 'CONFIRMADA', texto: 'Confirmada' },
    { valor: 'CANCELADA', texto: 'Cancelada' }
  ];

  constructor(
    private fb: FormBuilder,
    private reservasService: ReservasService,
  ) {
    this.reservasForm = this.fb.group({
      usuario: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      estado: ['PENDIENTE', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.reservasService.getReservas().subscribe(reservas => this.reservas = reservas);
  }

  // Buscar reservas
  buscarReservas(): void {
    this.reservas = this.reservas.filter(reserva => reserva.usuario.toLowerCase().includes(this.filtro.toLowerCase()) || reserva.tipo.toString().includes(this.filtro.toLowerCase()) || reserva.estado.toLowerCase().includes(this.filtro.toLowerCase()));
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

}
