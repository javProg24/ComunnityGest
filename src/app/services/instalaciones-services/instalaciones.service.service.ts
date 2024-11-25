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
  getNombresInst(): Observable<string[]> {
    return this.http.get<Instalacion[]>(this.url).pipe(
      map(instalaciones => instalaciones.map(instalacion => instalacion.nombre))
    )
  }
}
