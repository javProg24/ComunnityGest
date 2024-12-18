import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reserva } from '../../models/reservas.model';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private jsonUrl = 'http://localhost:3000/reservas';

  constructor(private http: HttpClient) { }

  // Obtener todas las reservas
  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.jsonUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener una reserva por ID
  getReservaById(id: number): Observable<Reserva> {
    const url = `${this.jsonUrl}/${id}`;
    return this.http.get<Reserva>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Crear una nueva reserva
  crearReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.jsonUrl, reserva).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar una reserva existente
  actualizarReserva(id: number, reserva: Reserva): Observable<Reserva> {
    const url = `${this.jsonUrl}/${id}`;
    return this.http.put<Reserva>(url, reserva).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar una reserva
  eliminarReserva(id: number): Observable<void> {
    const url = `${this.jsonUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Error en el servicio', error);
    return throwError('Ocurrió un error en la solicitud, intenta de nuevo más tarde.');
  }
  getReservaSearch(usuario?:string,tipo?:string,estado?:string):Observable<Reserva[]>{
    return this.http.get<Reserva[]>(this.jsonUrl).pipe(
      map((reservas)=>
        reservas.filter((reserva)=>
          (usuario? reserva.usuario.toLowerCase().includes(usuario.toLowerCase()):true)
          &&
          (tipo? reserva.tipo.toLowerCase().includes(tipo.toLowerCase()):true)
          &&
          (estado? reserva.estado.toLowerCase().includes(estado.toLowerCase()):true)
        )
      )
    )
  }
}
