import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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
    cancelar(): void {
      this.dialogRef.close(false); // Si el usuario cancela
    }
    confirmar(): void {
      this.dialogRef.close(false); // Si el usuario cancela
    }
}
