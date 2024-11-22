import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recurso } from '../../models/historial.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialServiceService {
  private jsonUrl="http://localhost:3000/uso";
  constructor(private http:HttpClient) { }
  getHistorial(){
    return this.http.get<Recurso[]>(this.jsonUrl);
  }
  addRecurso(recurso:Recurso):Observable<Recurso>{
    return this.http.post<Recurso>(this.jsonUrl,recurso);
  }
  // eliminar
  deleteRecurso(recurso:Recurso):Observable<void>{
    const urlRecurso=`${this.jsonUrl}/${recurso.id}`;
    return this.http.delete<void>(urlRecurso);
  }
  getUsuarioSearch(cedula?:string,usuario?:string){
    
  }
  updateRecurso(recurso:Recurso){

  }
}
