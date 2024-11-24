export interface Reserva {
    id?: number;
    usuario: string;
    tipo: number;
    fechaInicio: Date;
    fechaFin: Date;
    estado: string;
    descripcion?: string;
  }