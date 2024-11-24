import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Historial } from '../../models/historial.model';
import { Observable } from 'rxjs';
import { ReservasServiceService } from '../reservas-services/reservas.service.service';
import { Reserva } from '../../models/reservas.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialServiceService {
  private jsonUrl="http://localhost:3000/uso";
  constructor(private http:HttpClient,private servicioReserva:ReservasServiceService) { }
  getHistorial():Observable<Historial[]>{
    return this.http.get<Historial[]>(this.jsonUrl);
  }
  //guardar historial
  addHistorial(historial:Historial):Observable<Historial>{
    return this.http.post<Historial>(this.jsonUrl,historial);
  }
  // eliminar
  deleteHistorial(historial:Historial[],id:number):Historial[]{
    return historial.filter(historial=>historial.id!==id)
  }
}
