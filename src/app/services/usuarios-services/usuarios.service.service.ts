import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosServiceService {
  // private url = '/json/usuarios.json';
  private url = 'http://localhost:3000/usuario'
  constructor(private http: HttpClient) {}
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }
  
  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    usuario.id = Date.now(); // Generar ID único
    return of(usuario); // Retornar usuario creado
  }
  
  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    return of(usuario); // Simular actualización del usuario
  }
  
  // Eliminar un usuario (simulado)
  eliminarUsuario(id: number): Observable<number> {
    return of(id);
  }
}
