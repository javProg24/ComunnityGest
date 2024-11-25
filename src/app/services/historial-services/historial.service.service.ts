import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Historial } from '../../models/historial.model';
import { map, Observable } from 'rxjs';
import { ReservasServiceService } from '../reservas-services/reservas.service.service';
import { Reserva } from '../../models/reservas.model';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root'
})
export class HistorialServiceService {
  private jsonUrl="http://localhost:3000/uso";
  constructor(private http:HttpClient) { }
  getHistorial():Observable<Historial[]>{
    return this.http.get<Historial[]>(this.jsonUrl);
  }
  //guardar historial
  addHistorial(historial:Historial):Observable<Historial>{
    return this.http.post<Historial>(this.jsonUrl,historial);
  }
  // eliminar
  deleteHistorial(historial:Historial):Observable<void>{
    const urlHisto = `${this.jsonUrl}/${historial.id}`
    return this.http.delete<void>(urlHisto);
  }
  getUserSearch(usuario?:string):Observable<Historial[]>{
    return this.http.get<Historial[]>(this.jsonUrl).pipe(
      map((historial)=>
        historial.filter((history)=>
          usuario? history.usuario.toLowerCase().includes(usuario.toLowerCase()):true
        )
      )
    )
  }
  getTipeSearch(tipo?:string):Observable<Historial[]>{
    return this.http.get<Historial[]>(this.jsonUrl).pipe(
      map((historial)=>
        historial.filter((history)=>
          tipo? history.tipo.toLowerCase().includes(tipo.toLowerCase()):true
        )
      )
    )
  }
  getDescriptionSearch(descripcion?:string):Observable<Historial[]>{
    return this.http.get<Historial[]>(this.jsonUrl).pipe(
      map((historial)=>
        historial.filter((history)=>
          descripcion? history.descripcion.toLowerCase().includes(descripcion.toLowerCase()):true
        )
      )
    )
  }
  getDateStartSearch(fechaInicio?:string):Observable<Historial[]>{
    return this.http.get<Historial[]>(this.jsonUrl).pipe(
      map((historial)=>
        historial.filter((history)=>
          fechaInicio? history.fechaInicio.toLocaleDateString().includes(fechaInicio.toLowerCase()):true
        )
      )
    )
  }
  getDateEndtSearch(fechaFin?:string):Observable<Historial[]>{
    return this.http.get<Historial[]>(this.jsonUrl).pipe(
      map((historial)=>
        historial.filter((history)=>
          fechaFin? history.fechaFin.toLocaleDateString().includes(fechaFin.toLowerCase()):true
        )
      )
    )
  }
  getHistorialSearch(
    usuario?: string,
    tipo?: string,
    descripcion?: string,
    fechaInicio?: Date,
    fechaFin?: Date
  ): Observable<Historial[]> {
    return this.http.get<Historial[]>(this.jsonUrl).pipe(
      map((historiales) =>
        historiales.filter((historial) => {
          // Asegúrate de que cada condición retorne un valor booleano.
          return (
            (usuario ? historial.usuario.toLowerCase().includes(usuario.toLowerCase()) : true) &&
            (tipo ? historial.tipo.toLowerCase().includes(tipo.toLowerCase()) : true) &&
            (descripcion ? historial.descripcion.toLowerCase().includes(descripcion.toLowerCase()) : true) &&
            (fechaInicio ? historial.fechaInicio.toISOString().includes(fechaInicio.toISOString()) : true) &&
            (fechaFin ? historial.fechaFin.toISOString().includes(fechaFin.toISOString()) : true)
          );
        })
      )
    );
  }
  
  
  
}
