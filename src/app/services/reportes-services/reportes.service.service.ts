import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
