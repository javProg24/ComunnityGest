import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Instalacion } from '../../models/instalaciones.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstalacionesServiceService {
  private url = 'http://localhost:3000/instalaciones';
  constructor(private http:HttpClient) { }
  getInstalacion():Observable<Instalacion[]>{
    return this.http.get<Instalacion[]>(this.url);
  }
  getNombres(): Observable<string[]> {
    return this.http.get<Instalacion[]>(this.url).pipe(
      map(instalaciones => instalaciones.map(instalacion => instalacion.nombre))
    )
  }
  guardarInstalacion(instalacion: Instalacion): Observable<Instalacion> {
    console.log('INSTALAAAAAAARRRR '+instalacion.nombre);
    return this.http.post<Instalacion>(this.url, instalacion);
  }

  actualizarInstalacion(instalacion: Instalacion): Observable<Instalacion> {
    return this.http.put<Instalacion>(`${this.url}/${instalacion.id}`, instalacion);
  }

  eliminarInstalacion(instalacion: Instalacion): Observable<Instalacion> {
    return this.http.delete<Instalacion>(`${this.url}/${instalacion.id}`);
  }
}
