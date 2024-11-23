import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuarios.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = '/json/usuarios.json';

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Simular creación de un usuario
  addUsuario(usuarios: Usuario[], nuevoUsuario: Usuario): Usuario[] {
    nuevoUsuario.id = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    return [...usuarios, nuevoUsuario];
  }

  // Simular actualización de un usuario
  updateUsuario(usuarios: Usuario[], usuarioEditado: Usuario): Usuario[] {
    return usuarios.map(usuario =>
      usuario.id === usuarioEditado.id ? { ...usuario, ...usuarioEditado } : usuario
    );
  }

  // Simular eliminación de un usuario
  deleteUsuario(usuarios: Usuario[], id: number): Usuario[] {
    return usuarios.filter(usuario => usuario.id !== id);
  }  
}