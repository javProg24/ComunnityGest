import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../../models/reservas.model';

@Injectable({
  providedIn: 'root'
})
export class ReservasServiceService {
  private jsonUrl = "http://localhost:3000/reservas";
  constructor(private http: HttpClient) { }
  getURL(): string {
    return this.jsonUrl;
  }
  getReservas(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.jsonUrl);
  }

  getReservasPorUsuario(usuarioId: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.jsonUrl}?usuarioId=${usuarioId}`);
  }

  getReservasPorRecurso(recursoId: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.jsonUrl}?recursoId=${recursoId}`);
  }

  crearReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.jsonUrl, reserva);
  }

  actualizarReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.jsonUrl}/${reserva.id}`, reserva);
  }

  eliminarReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.jsonUrl}/${id}`);
  }
}
