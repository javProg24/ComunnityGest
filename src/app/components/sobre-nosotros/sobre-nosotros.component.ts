import { Component, OnInit } from '@angular/core';
import { Integrante } from '../../models/integrante';
import { IntegrantesservicesJsonService } from '../../services/integrantes-services/integrantesservices-json.service';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';
@Component({
  selector: 'app-sobre-nosotros',
  imports: [NgIf,NgFor,MatCardModule,UpperCasePipe,MatIconModule,MatButtonModule],
  templateUrl: './sobre-nosotros.component.html',
  styleUrl: './sobre-nosotros.component.css'
})
export class SobreNosotrosComponent implements OnInit{
  title="Colaboradores encargados de desarrollar el Sistema Web";
  perfiles: Integrante[]=[];
  constructor(private myService:IntegrantesservicesJsonService,private myDialog:MatDialog){

  }
  ngOnInit(): void {
    this.getPerfiles();
  }
  getPerfiles():void{
    this.myService.getIntegrantes().subscribe((data: Integrante[])=>{
      this.perfiles=data;
      console.log(this.perfiles[0]);
    })
  }
  verPerfil(perfil: Integrante):void{
    const dialogRef = this.myDialog.open(MyDialogComponent,{
      width: '350px',
      height: '',
      data:{
        nombre:perfil.nombre, 
        apellido:perfil.apellido,
        link:perfil.link,
        numero:perfil.numero,
        rol:perfil.rol
      }
    })
  }
}
