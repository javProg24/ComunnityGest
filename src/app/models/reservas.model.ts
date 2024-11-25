export interface Reserva {
    id?: number;
    usuario: string;
    tipo: string;
    fechaInicio: Date;
    fechaFin: Date;
    estado: string;
    descripcion?: string;
  }