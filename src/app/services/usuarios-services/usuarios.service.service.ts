import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuarios.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) {}

  //CRUD usuarios
  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Creacion de un usuario
  addUsuario(usuarios: Usuario[], nuevoUsuario: Usuario): Usuario[] {
    nuevoUsuario.id = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    return [...usuarios, nuevoUsuario];
  }

  // Actualización de un usuario
  updateUsuario(usuarios: Usuario[], usuarioEditado: Usuario): Usuario[] {
    return usuarios.map(usuario =>
      usuario.id === usuarioEditado.id ? { ...usuario, ...usuarioEditado } : usuario
    );
  }

  // Eliminación de un usuario
  deleteUsuario(usuarios: Usuario[], id: number): Usuario[] {
    return usuarios.filter(usuario => usuario.id !== id);
  }
  //buscar usuario
  getUsuarioSearch(nombre?:string):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      map((usuarios)=>
        usuarios.filter((usuario)=>
          nombre? usuario.nombre.toLowerCase().includes(nombre.toLowerCase()):true
        )
      )
    )
  }
  
}
