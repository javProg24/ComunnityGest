import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField,matFormFieldAnimations,MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { Usuario } from '../../../models/usuarios.model';
import { UsuariosService } from '../../../services/usuarios-services/usuarios.service.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatTabLabel } from '@angular/material/tabs';
@Component({
  selector: 'app-form-dialog',
  standalone:true,
  imports: [MatDialogContent,
    MatFormFieldModule,
    MatFormField,
    MatAutocompleteModule,
    MatSelectModule,MatInputModule,NgFor,CommonModule,ReactiveFormsModule,
  MatLabel,MatInputModule,MatOptionModule],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.css'
})
export class FormDialogComponent implements OnInit{
  formulario!:FormGroup;
  usuariosFiltrados: Usuario[] = [];
  constructor(private fb:FormBuilder,private usuarioService:UsuariosService,
  ){
  }
  ngOnInit(): void {
    this.formulario = this.fb.group({
      usuario: ['', Validators.required],
      tipo: ['', Validators.required],
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
  guardar(){

  }
}
