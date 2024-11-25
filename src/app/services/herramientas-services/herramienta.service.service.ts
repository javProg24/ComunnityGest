import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Herramienta } from '../../models/herramientas.model';

@Injectable({
  providedIn: 'root'
})
export class HerramientaServiceService {
  private url='http://localhost:3000/herramientas';
  constructor(private http:HttpClient) { }
  getHerramientas():Observable<Herramienta>{
    return this.http.get<Herramienta>(this.url);
  }
  getNombres(): Observable<string[]> {
    return this.http.get<Herramienta[]>(this.url).pipe(
      map(herramientas => herramientas.map(herramienta => herramienta.nombre))
    );
  }
}
