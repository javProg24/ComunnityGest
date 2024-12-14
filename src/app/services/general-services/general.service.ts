import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { I_Metodos } from '../InterfaceEnti';
@Injectable({
  providedIn: 'root'
})
export class GeneralService implements I_Metodos{

  constructor(private http:HttpClient) { }
  delete<T>(url: string,id:number): Observable<T> {
    return this.http.delete<T>(`${url}/${id}`)
  }
  update<T>(url: string, Entidad:any,id:number): Observable<T> {
    return this.http.put<T>(`${url}/${id}`,Entidad)
  }
  add<T>(url:string,Entidad:any): Observable<T> {
    return this.http.post<T>(url,Entidad);
  }
  
  get<T>(url: string): Observable<T[]> {
    return this.http.get<T[]>(url);
  }
  
}
