import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../models/usuarios.model';
import { FormsModule } from '@angular/forms';
import { MatFormField, matFormFieldAnimations, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-usuario-form',
  imports: [
            MatDialogContent,
            FormsModule,
            MatButtonModule,
            MatFormFieldModule,
            MatLabel,
            MatInputModule,
            MatFormField,
            MatRadioModule,
            MatSelectModule,
            MatDialogActions,MatFormField,MatRadioModule,MatRadioButton,NgIf],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {
  usuario: Usuario;

  constructor(
    public dialogRef: MatDialogRef<UsuarioFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Si se pasa datos (editar), usar esos datos, si no, usar los valores predeterminados
    this.usuario = this.data ? { ...this.data } : { nombre: '', correo: '', direccion: '', telefono: '', activo: true };
  }

  guardar(): void {
    // Solo cerrar el diálogo si los datos son válidos
    if (this.usuario.nombre && this.usuario.correo) {
      this.dialogRef.close(this.usuario); // Cierra el diálogo y pasa los datos del usuario
    } else {
      // Aquí puedes agregar lógica si necesitas mostrar un mensaje o manejar un error
      alert('Los datos del usuario son inválidos');
    }
  }

  cancelar(): void {
    this.dialogRef.close(); // Cierra el diálogo sin guardar
  }
}
