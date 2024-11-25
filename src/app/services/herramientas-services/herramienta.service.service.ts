import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Herramienta } from '../../models/herramientas.model';

@Injectable({
  providedIn: 'root'
})
export class HerramientasService {
  private apiUrl = 'http://localhost:3000/herramientas'; // URL de la API

  constructor(private http: HttpClient) {}

  getHerramientas(): Observable<Herramienta[]> {
    return this.http.get<Herramienta[]>(this.apiUrl);
  }

  getNombres(): Observable<string[]> {
    return this.http.get<Herramienta[]>(this.apiUrl).pipe(
      map(herramientas => herramientas.map(herramienta => herramienta.nombre))
    );
  }

  addHerramienta(herramienta: Herramienta): Observable<Herramienta> {
    return this.http.post<Herramienta>(this.apiUrl, herramienta);
  }

  updateHerramienta(herramienta: Herramienta): Observable<Herramienta> {
    return this.http.put<Herramienta>(`${this.apiUrl}/${herramienta.id}`, herramienta);
  }

  deleteHerramienta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

