import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Reporte } from '../../models/reportes.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesServiceService {

  private jsonUrl="http://localhost:3000/reportes"
  constructor( private http:HttpClient) { 
  }

  getReportes():Observable<Reporte[]>{
    return this.http.get<Reporte[]>(this.jsonUrl);
  }


  //Buscar Reportes
  getReportesSearch(recursoAfectado?:string, title?:string):Observable<Reporte[]>{
    return this.http.get<Reporte[]>(this.jsonUrl).pipe(
      map((reportes)=>
        reportes.filter((reporte)=>
        (recursoAfectado ? reporte.recursoAfectado?.toLocaleLowerCase().includes(recursoAfectado.toLowerCase()):true)
        )
      )
    );
  }

  //Crear Reportes
  addReporte(reporte:Reporte):Observable<Reporte>{
    return this.http.post<Reporte>(this.jsonUrl, reporte);
  }

  //Editar Reportes
  updateReports(reporte: Reporte):Observable<Reporte>{
    const urlReporte = `${this.jsonUrl}/${reporte.id}`
    return this.http.put<Reporte>(urlReporte, reporte);
  }

  //Eliminar Reportes
  deleteReports(reporte:Reporte):Observable<void>{
    const urlReporte = `${this.jsonUrl}/${reporte.id}`
    return this.http.delete<void>(urlReporte);
  }
}
