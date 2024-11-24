import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recurso } from '../../models/historial.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialServiceService {
  // private jsonUrl="http://localhost:3000/uso";
  constructor(private http:HttpClient) { }
  // getHistorial():Observable<Recurso[]>{
  //   return this.http.get<Recurso[]>(this.jsonUrl);
  // }
  // addRecurso(recurso:Recurso):Observable<Recurso>{
  //   return this.http.post<Recurso>(this.jsonUrl,recurso);
  // }
  // eliminar
  deleteRecurso(recurso:Recurso[],id:number):Recurso[]{
    return recurso.filter(recurso=>recurso.id!==id)
  }
  // updateRecurso(recurso:Recurso){

  // }

  
}
