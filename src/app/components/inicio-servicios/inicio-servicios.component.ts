import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-inicio-servicios',
  imports: [MatCardModule,NgFor,RouterLink,RouterLinkActive,MatButtonModule],
  templateUrl: './inicio-servicios.component.html',
  styleUrl: './inicio-servicios.component.css'
})
export class InicioServiciosComponent {
  menuItems=[
    {title: 'Instalaciones', icon:'/image/instalaciones.png',buttonText:'Entrar',routerLink:'/instalaciones'},
    {title: 'Herramientas', icon:'/image/herramienta.png',buttonText:'Entrar',routerLink:'/herramientas'},
    {title: 'Reservas', icon:'/image/reserva.png',buttonText:'Entrar',routerLink:'/reservas'},
    {title: 'Usuarios', icon:'/image/usuario.png',buttonText:'Entrar',routerLink:'/usuarios'},
    {title: 'Uso de Recursos', icon:'/image/historial.png',buttonText:'Entrar',routerLink:'/historial'},
    {title: 'Reportes', icon:'/image/reporte.png',buttonText:'Entrar',routerLink:'/reportes'},
  ]
}
