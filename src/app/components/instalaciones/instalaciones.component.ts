import { Component, OnInit } from '@angular/core';
import { Instalacion } from '../../models/instalaciones.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstalacionesServiceService } from '../../services/instalaciones-services/instalaciones.service.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatOptionModule } from '@angular/material/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-instalaciones',
  imports: [MatButtonModule, MatDividerModule, MatIconModule,MatFormFieldModule,MatSelectModule,ReactiveFormsModule
    , MatInputModule, MatIconModule,MatCardModule,CommonModule,MatDialogModule,MatTableModule],
  templateUrl: './instalaciones.component.html',
  styleUrl: './instalaciones.component.css'
})
export class InstalacionesComponent implements OnInit{
  instalacionesForm!: FormGroup;
  instalaciones: Instalacion[] = [];
  editar:boolean=false;
  constructor(private instalacionesService: InstalacionesServiceService,private fb: FormBuilder,private dialog: MatDialog) {
    this.instalacionesForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      capacidad: ['', [Validators.required, Validators.min(1), Validators.max(500)]],
      horario: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.cargarInstalaciones();
  }
  onSubmit(): void {
    if (this.instalacionesForm.valid) {
      console.log('Datos del formulario:', this.instalacionesForm.value);
    }
    this.guardarOActualizar();
    this.ngOnInit();
  }
  cargarInstalaciones():void{
    this.instalacionesService.getInstalacion().subscribe((data: Instalacion[]) => {
      this.instalaciones = data;  
    });
  }

  editarInstalacion(instalacion: Instalacion): void {
    this.editar=true;
    this.instalacionesForm.setValue({
      id: instalacion.id,
      nombre: instalacion.nombre,
      tipo: instalacion.tipo,
      capacidad: instalacion.capacidad,
      horario: instalacion.horario
    });
  }

   guardarOActualizar(): void {
    console.log('INSTALAAAAAAARRRR '+ this.instalacionesForm.value);
    if (this.editar) {
      this.instalacionesService.actualizarInstalacion(this.instalacionesForm.value).subscribe(
        response => {
          console.log('Instalación actualizada', response);
          this.cargarInstalaciones();

        },
        error => {
          console.error('Error al actualizar la instalación', error);
        }
      );
    } else {
      this.instalacionesService.guardarInstalacion(this.instalacionesForm.value).subscribe(
        response => {
          console.log('Instalación guardada', response);
          this.cargarInstalaciones();

        },
        error => {
          console.error('Error al guardar la instalación', error);
        }
      );
    }
    this.limpiarFormulario();
  }

  eliminarInstalacion(instalacion: Instalacion): void {
    this.instalacionesService.eliminarInstalacion(instalacion).subscribe(
      response => {
        console.log('Instalación eliminada', response);
        this.cargarInstalaciones();
      },
      error => {
        console.error('Error al eliminar la instalación', error);
      }
    );
  }
  limpiarFormulario(): void {
    this.instalacionesForm.reset({
      id:'',
      nombre: '',  
      tipo: '',
      capacidad: null,
      horario: null
    });
  }
}
