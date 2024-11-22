import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterLink,RouterModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'pruueba1-app';
  constructor(private router: Router){
  }
  isHomeActive():boolean{
    return this.router.url === '/inicio'
  }
}
