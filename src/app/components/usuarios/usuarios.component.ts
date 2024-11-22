import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from '../../models/usuarios.model';
import { UsuariosServiceService } from '../../services/usuarios-services/usuarios.service.service';
import { UsuarioFormComponent } from '../shared/usuario-form/usuario-form.component';
@Component({
  selector: 'app-usuarios',
  imports: [CommonModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardTitle,
    MatCardContent,
    MatCard,
    FormsModule, MatIcon, MatButtonModule, MatIconModule, MatTooltipModule, MatLabel, MatFormFieldModule,
    MatInputModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];
  columnas: string[] = ['nombre', 'correo', 'direccion', 'telefono', 'activo', 'acciones'];
  filtro: string = ''; // Declarar la propiedad filtro aquí

  constructor(private usuariosService: UsuariosServiceService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  agregarUsuario(): void {
    const dialogRef = this.dialog.open(UsuarioFormComponent);
  
    dialogRef.afterClosed().subscribe((nuevoUsuario) => {
      if (nuevoUsuario) {
        this.usuariosService.agregarUsuario(nuevoUsuario).subscribe((usuario) => {
          this.usuarios.push(usuario); // Agregar nuevo usuario a la lista
        });
      }
    });
  }
  
  
  editarUsuario(usuario: Usuario): void {
    const dialogRef = this.dialog.open(UsuarioFormComponent, {
      data: usuario, // Pasar usuario seleccionado para editar
    });
  
    dialogRef.afterClosed().subscribe((usuarioEditado) => {
      if (usuarioEditado) {
        this.usuariosService.actualizarUsuario(usuarioEditado).subscribe((actualizado) => {
          const index = this.usuarios.findIndex((u) => u.id === actualizado.id);
          if (index !== -1) {
            this.usuarios[index] = actualizado; // Actualizar en la lista
          }
        });
      }
    });
  }
  
  
  
  

  eliminarUsuario(id: number): void {
    this.usuariosService.eliminarUsuario(id).subscribe(() => {
      this.usuarios = this.usuarios.filter((u) => u.id !== id);
    });
  }

  buscarUsuario(): Usuario[] {
    return this.usuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
