import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Reporte } from '../../models/reportes.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesServiceService {
  private reportes: Reporte[] = [];
  private reportesSubject = new BehaviorSubject<Reporte[]>([]);

  reportes$ = this.reportesSubject.asObservable();
  constructor() { }
  listarReportes(): void {
    this.reportesSubject.next(this.reportes);
  }

  agregarReporte(reporte: Reporte): void {
    this.reportes.push({ ...reporte, id: this.generarId() });
    this.listarReportes();
  }

  editarReporte(id: string, reporteEditado: Reporte): void {
      const index = this.reportes.findIndex((r) => r.id === id);
      if (index > -1) {
          this.reportes[index] = { ...reporteEditado, id };
          this.listarReportes();
      }
  }

  eliminarReporte(id: string): void {
      this.reportes = this.reportes.filter((r) => r.id !== id);
      this.listarReportes();
  }

  buscarPorEstado(estado: string): Reporte[] {
      return this.reportes.filter((r) => r.estado === estado);
  }

  private generarId(): string {
      return Math.random().toString(36).substr(2, 9);
}
}
