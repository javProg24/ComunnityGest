export interface Reserva {
    id?: number;
    usuario: string;
    tipo: string;
    fechaInicio: Date;
    fechaFin: Date;
    estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA';
    descripcion: string;
  }