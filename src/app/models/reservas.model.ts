export interface Reserva {
    id?: number;
    usuarioId: string;
    recursoId: number;
    fechaInicio: Date;
    fechaFin: Date;
    estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA';
    descripcion?: string;
  }