import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogActions, MatDialogContent, MatDialogClose, MatDialogModule, MatButtonModule, MatButton
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})

export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { titulo: string; mensaje: string }) {}
}