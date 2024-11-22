export interface Reporte {
    id: string; 
    titulo: string;
    descripcion: string;
    recursoAfectado?: string; 
    estado: 'pendiente' | 'resuelto' | 'en proceso';
}