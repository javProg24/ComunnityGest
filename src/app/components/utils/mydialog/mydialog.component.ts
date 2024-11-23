import { Component, Inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mydialog',
  imports: [MatDialogActions, MatDialogContent, MatDialogClose, MatDialogModule, MatButtonModule, MatButton],
  templateUrl: './mydialog.component.html',
  styleUrl: './mydialog.component.css'
})
export class MydialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { titulo: string; mensaje: string }) {}
}
