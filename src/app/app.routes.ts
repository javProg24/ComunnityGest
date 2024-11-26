import { Routes } from '@angular/router';
import { InicioServiciosComponent } from './components/inicio-servicios/inicio-servicios.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { InstalacionesComponent } from './components/instalaciones/instalaciones.component';
import { HerramientasService } from './services/herramientas-services/herramienta.service.service';
import { HerramientasComponent } from './components/herramientas/herramientas.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { HistorialComponent } from './components/historial/historial.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { QueEsEsteSistemaComponent } from './components/que-es-este-sistema/que-es-este-sistema.component';

export const routes: Routes = [
    {path:'',redirectTo:'inicio', pathMatch:'full'},
    {path:'inicio',component:InicioServiciosComponent},
    {path:'que-es-este-sistema',component:QueEsEsteSistemaComponent},
    {path:'sobre-nosotros',component:SobreNosotrosComponent},
    {path:'usuarios',component:UsuariosComponent},
    {path:'instalaciones',component:InstalacionesComponent},
    {path:'herramientas',component:HerramientasComponent},
    {path:'reservas',component:ReservasComponent},
    {path:'historial',component:HistorialComponent},
    {path:'reportes',component:ReportesComponent}
];
