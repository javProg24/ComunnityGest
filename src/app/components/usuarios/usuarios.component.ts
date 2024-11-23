import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuarios.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios-services/usuarios.service.service';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatCell, MatHeaderCell, MatHeaderRow, MatRow, MatTable, MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { NotificationsComponent } from '../shared/notifications/notifications.component';



@Component({
  selector: 'app-usuarios',
  imports: [
    MatCard,
    MatFormField,
    MatError,
    MatLabel,
    MatCheckbox,
    MatDivider,
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
    NotificationsComponent
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  usuarioForm!: FormGroup;
  editMode = false;
  usuarioSeleccionado!: Usuario;

  notification: { message: string; type: 'info' | 'success' | 'error' } = {
    message: '',
    type: 'info'
  };

  displayedColumns = ['id', 'nombre', 'correo', 'telefono', 'activo', 'acciones'];

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      activo: [true]
    });

    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.filteredUsuarios = [...this.usuarios]; // Inicializar lista filtrada
      },
      error: () => alert('Error cargando datos')
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsuarios = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(filterValue) ||
      usuario.correo.toLowerCase().includes(filterValue) ||
      usuario.telefono.toLowerCase().includes(filterValue)
    );
  }

  editUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
    this.usuarioForm.patchValue(usuario);
    this.editMode = true;
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) return;

    if (this.editMode) {
      this.usuarios = this.usuariosService.updateUsuario(
        this.usuarios,
        { ...this.usuarioSeleccionado, ...this.usuarioForm.value }
      );
      this.notification = { message: 'Usuario actualizado exitosamente', type: 'success' };
      this.editMode = false;
    } else {
      this.usuarios = this.usuariosService.addUsuario(this.usuarios, this.usuarioForm.value);
      this.notification = { message: 'Usuario agregado exitosamente', type: 'success' };
    }

    this.usuarioForm.reset({ activo: true });
    this.actualizarTabla(); // Actualizar tabla inmediatamente

    // Desaparición automática de la notificación
    setTimeout(() => {
      this.notification = { message: '', type: 'info' };
    }, 2000);
  }

  deleteUsuario(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        titulo: 'Confirmar Eliminación',
        mensaje: '¿Está seguro de que desea eliminar este usuario?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarios = this.usuariosService.deleteUsuario(this.usuarios, id);
        this.actualizarTabla(); // Actualizar tabla inmediatamente
        this.notification = { message: 'Usuario eliminado exitosamente', type: 'error' };

        // Desaparición automática de la notificación
        setTimeout(() => {
          this.notification = { message: '', type: 'info' };
        }, 2000);
      }
    });
  }

  actualizarTabla(): void {
    this.filteredUsuarios = [...this.usuarios];
  }
}