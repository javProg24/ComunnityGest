import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Herramienta } from '../../models/herramientas.model';
import { HerramientasService } from '../../services/herramientas-services/herramienta.service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTable, MatTableModule } from '@angular/material/table';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatOption } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-herramientas',
  imports: [ MatFormFieldModule , MatFormField, MatLabel, MatTable, MatHeaderCell, MatCell, MatRow, MatHeaderRow, ReactiveFormsModule,
    CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule,MatTableModule, MatIconModule, MatDividerModule],
  templateUrl: './herramientas.component.html',
  styleUrl: './herramientas.component.css'
})
export class HerramientasComponent implements OnInit {
  title = 'Gestión de Herramientas';
  herramientas: Herramienta[] = [];
  herramientaForm!: FormGroup;
  editMode = false;
  currentId!: number;
  dataSource = new MatTableDataSource<Herramienta>();
  displayedColumns = ['nombre', 'ubicacion', 'descripcion', 'acciones'];

  constructor(
    private herramientaService: HerramientasService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getHerramientas();
    this.herramientaForm = this.fb.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  getHerramientas(): void {
    this.herramientaService.getHerramientas().subscribe((datos) => {
      this.dataSource.data = datos;
    });
  }

  onSubmit(): void {
    if (this.herramientaForm.invalid) return;

    const newHerramienta: Herramienta = this.herramientaForm.value;
    if (this.editMode) {
      newHerramienta.id = this.currentId;
      this.herramientaService.updateHerramienta(newHerramienta).subscribe(() => {
        alert('Herramienta actualizada');
        this.getHerramientas();
      });
    } else {
      this.herramientaService.addHerramienta(newHerramienta).subscribe(() => {
        alert('Herramienta agregada');
        this.getHerramientas();
      });
    }

    this.cleanForm();
  }

  delete(herramienta: Herramienta): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { titulo: '¿Está seguro de eliminar la herramienta?' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.herramientaService.deleteHerramienta(herramienta.id!).subscribe(() => {
          alert('Herramienta eliminada');
          this.getHerramientas();
        });
      }
    });
  }

  edit(herramienta: Herramienta): void {
    this.editMode = true;
    this.currentId = herramienta.id!;
    this.herramientaForm.setValue({
      nombre: herramienta.nombre,
      ubicacion: herramienta.ubicacion,
      descripcion: herramienta.descripcion
    });
  }

  cleanForm(): void {
    this.herramientaForm.reset();
    this.editMode = false;
  }
}
