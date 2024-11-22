import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
export interface DialogPerfil{
  nombre: string,
  apellido: string,
  link:string,
  numero: string,
  rol:string
}
@Component({
  selector: 'app-my-dialog',
  imports: [MatButtonModule,MatIconModule,MatDialogModule],
  templateUrl: './my-dialog.component.html',
  styleUrl: './my-dialog.component.css'
})
export class MyDialogComponent {
  constructor(public dialogRef:MatDialogRef<MatDialogModule>,
    @Inject(MAT_DIALOG_DATA) public data:DialogPerfil){}
    onCerrar():void{
      this.dialogRef.close(true);
    }
}
